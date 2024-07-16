import { ipcMain } from 'electron'
import db from '../db/models'
import { Boat, Pricing, TransformedBoat } from '@/types/types'

ipcMain.handle('boat-check-availability', async (event, boatId) => {
    try {
        const now = new Date().toISOString()
        const query = `
            SELECT * FROM reservation
            WHERE boat_id = ?
              AND start <= ?
              AND end >= ?
        `
        const reservations = db.prepare(query).all(boatId, now, now)
        return reservations
    } catch (error) {
        console.error('Error fetching reservations:', error)
        throw error
    }
})

ipcMain.handle('boat-add', async (event, boat) => {
    const { pricing, ...boatData } = boat

    try {
        const insertBoat = db.prepare(`
            INSERT INTO boat (name, pricePerHour, deposit, capacity)
            VALUES (@name, @pricePerHour, @deposit, @capacity)
        `)

        const boatResult = insertBoat.run(boatData)
        const boatId = boatResult.lastInsertRowid as number

        if (pricing && pricing.length > 0) {
            const insertPricing = db.prepare(`
                INSERT INTO pricing (boat_id, days, price)
                VALUES (@boat_id, @days, @price)
            `)

            const insertMany = db.transaction((entries: Pricing[]) => {
                for (const entry of entries) {
                    insertPricing.run(entry)
                }
            })

            insertMany(
                pricing.map((price: Pricing) => ({
                    boat_id: boatId,
                    days: price.days,
                    price: price.price,
                }))
            )
        }

        return { id: boatId, ...boatData }
    } catch (error) {
        throw new Error('Jednostka o takiej nazwie już istnieje.')
    }
})

ipcMain.handle('boat-getall', async () => {
    try {
        const getBoats = db
            .prepare(
                `
            SELECT * FROM boat
        `
            )
            .all() as Boat[]

        const getPricing = db.prepare(`
            SELECT * FROM pricing WHERE boat_id = ?
        `)

        const transformedBoats: TransformedBoat[] = getBoats.map((boat) => {
            const pricing = getPricing.all(boat.id) as Pricing[]
            return { ...boat, pricing }
        })

        return transformedBoats
    } catch (error) {
        console.error('Error fetching boats:', error)
        throw error
    }
})

export const boatIpcHandles = () => {
    // All handlers are already registered when this module is imported
}
