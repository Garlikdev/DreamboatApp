import { useQuery } from '@tanstack/react-query'
import { DataTable } from '../tables/data-table'
import { columns } from './columns'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'

const fetchBoats = async () => {
    const boats = await window.electron.ipcRenderer.invoke('boat-getall')
    return boats
}

const Boats = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['boat-getall'],
        queryFn: () => fetchBoats(),
    })

    if (isPending) return <div>Ładowanie...</div>
    if (error) return <div>Wystąpił błąd pobierania danych</div>

    return (
        <div className="w-full flex flex-col gap-4 items-start">
            <div className="flex gap-8 items-center">
                <h1 className="text drop-shadow-lg text-2xl font-bold">
                    Jednostki
                </h1>
                <NavLink to="/boats/new">
                    <Button>Dodaj</Button>
                </NavLink>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Boats
