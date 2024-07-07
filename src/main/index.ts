import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import moment from 'moment'
import icon from '../../resources/icon.png'
import db from './db/models'
import { Boat, Pricing } from '@/types/types'

function createWindow(): void {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        },
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // await sequelize.authenticate()
    // console.log('Database connected')
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // Add Boat Handler
    ipcMain.handle('boats-add', (event, boat: Boat) => {
        const { pricing, ...boatData } = boat

        try {
            // Insert the boat
            const insertBoatStmt = db.prepare(`
            INSERT INTO boat (name, pricePerHour, deposit, capacity)
            VALUES (@name, @pricePerHour, @deposit, @capacity)
        `)
            const newBoat = insertBoatStmt.run(boatData)
            const boatId = newBoat.lastInsertRowid

            // Insert the pricing entries
            if (pricing && pricing.length > 0) {
                const insertPricingStmt = db.prepare(`
                INSERT INTO pricing (boat_id, days, price)
                VALUES (@boat_id, @days, @price)
            `)
                const insertMany = db.transaction((entries: Pricing[]) => {
                    for (const entry of entries) insertPricingStmt.run(entry)
                })
                insertMany(
                    pricing.map((price: any) => ({
                        boat_id: boatId,
                        days: price.days,
                        price: price.price,
                    }))
                )
            }

            return { ...boatData, id: boatId, pricing }
        } catch (error) {
            console.error('Error creating boat and pricing entries:', error)
            throw error
        }
    })

    // Get All Boats Handler
    ipcMain.handle('boats-getall', () => {
        try {
            const boatsStmt = db.prepare(`
            SELECT * FROM boat
        `)
            const pricingStmt = db.prepare(`
            SELECT * FROM pricing WHERE boat_id = ?
        `)

            const boats = boatsStmt.all().map((boat: Boat) => {
                const pricing = pricingStmt
                    .all(boat.id)
                    .sort((a: Pricing, b: Pricing) => a.days - b.days)
                return { ...boat, pricing: pricing || [] }
            })

            return boats
        } catch (error) {
            console.error('Error fetching boats:', error)
            throw error
        }
    })

    // Add Reservation Handler
    ipcMain.handle('reservations-add', (event, reservationData) => {
        try {
            // Format the current date
            const now = moment()
            const day = now.format('DD')
            const month = now.format('MM')
            const year = now.format('YY')

            const invoiceNumber = `${day}${month}${year}`

            // Add the invoice number to the reservation data
            reservationData.invoice_number = invoiceNumber

            // Insert the reservation
            const insertReservationStmt = db.prepare(`
            INSERT INTO reservations (
                boat_id, port, invoice, invoice_number, company_id, client_id, zaliczka, patent_name, patent_number,
                cleaning, start_date, end_date, start_time, end_time
            ) VALUES (
                @boat_id, @port, @invoice, @invoice_number, @company_id, @client_id, @zaliczka, @patent_name, @patent_number,
                @cleaning, @start_date, @end_date, @start_time, @end_time
            )
        `)
            const newReservation = insertReservationStmt.run(reservationData)

            return { ...reservationData, id: newReservation.lastInsertRowid }
        } catch (error) {
            console.error('Error creating reservation:', error)
            throw error
        }
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
