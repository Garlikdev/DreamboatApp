import { ipcMain } from 'electron'
import moment from 'moment'
import { Reservation } from '@/types/types'
import db from '../db/models'

ipcMain.handle('reservation-getall', async () => {
    try {
        const getReservations = db
            .prepare(
                `
            SELECT * FROM reservation
        `
            )
            .all() as Reservation[]

        return getReservations
    } catch (error) {
        console.error('Error fetching boats:', error)
        throw error
    }
})

ipcMain.handle('reservation-add', async (event, reservationData) => {
    try {
        const now = moment()
        const day = now.format('DD')
        const month = now.format('MM')
        const year = now.format('YY')

        const invoiceNumber = `${day}${month}${year}`
        reservationData.invoice_number = invoiceNumber

        const insertReservation = db.prepare(`
            INSERT INTO reservations (
                boat_id, port, invoice, invoice_number, company_id,
                client_id, zaliczka, patent_name, patent_number,
                cleaning, start_date, end_date, start_time, end_time
            ) VALUES (
                @boat_id, @port, @invoice, @invoice_number, @company_id,
                @client_id, @zaliczka, @patent_name, @patent_number,
                @cleaning, @start_date, @end_date, @start_time, @end_time
            )
        `)

        const reservationResult = insertReservation.run(reservationData)
        return {
            id: reservationResult.lastInsertRowid as number,
            ...reservationData,
        }
    } catch (error) {
        console.error('Error creating reservation:', error)
        throw error
    }
})

ipcMain.handle('reservation-edit', async (event, reservationData) => {
    try {
        const updateReservation = db.prepare(`
            UPDATE reservation
            SET 
                boat_id = @boat_id,
                port = @port,
                invoice = @invoice,
                invoice_number = @invoice_number,
                company_id = @company_id,
                client_id = @client_id,
                zaliczka = @zaliczka,
                patent_name = @patent_name,
                patent_number = @patent_number,
                cleaning = @cleaning,
                start = @start,
                end = @end
            WHERE id = @id
        `)

        const reservationResult = updateReservation.run(reservationData)

        return {
            changes: reservationResult.changes,
            ...reservationData,
        }
    } catch (error) {
        console.error('Error editing reservation:', error)
        throw error
    }
})

ipcMain.handle('reservation-fetch-boats', async () => {
    try {
        const boats = db.prepare('SELECT id, name FROM boat').all()
        return boats
    } catch (error) {
        console.error('Error fetching boats:', error)
        throw error
    }
})
ipcMain.handle('reservation-fetch-clients', async () => {
    try {
        const clients = db.prepare('SELECT id, name FROM client').all()
        return clients
    } catch (error) {
        console.error('Error fetching clients:', error)
        throw error
    }
})

ipcMain.handle('reservation-fetch-companies', async () => {
    try {
        const companies = db.prepare('SELECT id, name FROM company').all() // Adjust table and column names as per your database schema
        return companies
    } catch (error) {
        console.error('Error fetching companies:', error)
        throw error
    }
})

export const reservationIpcHandles = () => {
    // All handlers are already registered when this module is imported
}
