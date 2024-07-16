import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Boat } from '@/types/types'

// Custom APIs for renderer
const api = {
    getAllBoats: () => ipcRenderer.invoke('boat-getall'),
    getAllPorts: () => ipcRenderer.invoke('port-getall'),
    addBoat: (boat: Boat) => ipcRenderer.invoke('boat-add', boat),
    boatCheckAvailability: (boatId: number) =>
        ipcRenderer.invoke('boat-check-availability', boatId),
    reservationFetchBoats: () => ipcRenderer.invoke('reservation-fetch-boats'),
    reservationFetchClients: () =>
        ipcRenderer.invoke('reservation-fetch-clients'),
    reservationFetchCompanies: () =>
        ipcRenderer.invoke('reservation-fetch-companies'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
