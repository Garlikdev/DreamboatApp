import { useQuery } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { DataTable } from '../tables/data-table'
import { columns } from './columns'

const fetchClients = async () => {
    const boats = await window.electron.ipcRenderer.invoke('client-getall')
    return boats
}

const Clients = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['client-getall'],
        queryFn: () => fetchClients(),
    })

    if (isPending) return <div>Ładowanie...</div>
    if (error) return <div>Wystąpił błąd pobierania danych</div>

    return (
        <div className="w-full flex flex-col gap-4 items-start">
            <div className="flex gap-8 items-center">
                <h1 className="text drop-shadow-lg text-2xl font-bold">
                    Klienci
                </h1>
                <NavLink to="/clients/new">
                    <Button>Dodaj</Button>
                </NavLink>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Clients
