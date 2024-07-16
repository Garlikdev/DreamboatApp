import { ipcMain } from 'electron'
import db from '../db/models'
import { Port } from '@/types/types'

ipcMain.handle('port-getall', async () => {
    try {
        const getPorts = db
            .prepare(
                `
            SELECT * FROM port
        `
            )
            .all() as Port[]

        return getPorts
    } catch (error) {
        console.error('Error fetching boats:', error)
        throw error
    }
})

export const portIpcHandles = () => {
    // All handlers are already registered when this module is imported
}
