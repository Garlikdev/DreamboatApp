import { ipcMain } from 'electron'
import db from '../db/models'
import { Client } from '@/types/types'

ipcMain.handle('client-getall', async () => {
    try {
        const getClients = db
            .prepare(
                `
            SELECT * FROM client
        `
            )
            .all() as Client[]

        return getClients
    } catch (error) {
        console.error('Error fetching boats:', error)
        throw error
    }
})

ipcMain.handle('client-add', async (event, clientData) => {
    try {
        const insertClient = db.prepare(`
            INSERT INTO client (
                name, street, postal_code, city, pesel, phone, email
            ) VALUES (
                @name, @street, @postal_code, @city, @pesel, @phone, @email
            )
        `)

        const clientResult = insertClient.run(clientData)

        return {
            id: clientResult.lastInsertRowid,
            ...clientData,
        }
    } catch (error) {
        console.error('Error adding client:', error)
        throw new Error('Failed to add client')
    }
})

ipcMain.handle('client-edit', async (event, clientId, clientData) => {
    try {
        const updateClient = db.prepare(`
            UPDATE client
            SET name = @name,
                street = @street,
                postal_code = @postal_code,
                city = @city,
                pesel = @pesel,
                phone = @phone,
                email = @email
            WHERE id = @id
        `)

        const clientResult = updateClient.run({
            ...clientData,
            id: clientId,
        })

        if (clientResult.changes === 0) {
            throw new Error('No client found with the provided ID')
        }

        return {
            id: clientId,
            ...clientData,
        }
    } catch (error) {
        console.error('Error editing client:', error)
        throw new Error('Failed to edit client')
    }
})

export const clientIpcHandles = () => {
    // All handlers are already registered when this module is imported
}
