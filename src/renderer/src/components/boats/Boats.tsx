import { useQuery } from '@tanstack/react-query'
import { BoatSchema } from '../schemas/boatSchema'
import { DataTable } from './data-table'
import { columns } from './columns'

const fetchBoats = async () => {
    const boats = await window.electron.ipcRenderer.invoke('boats-getall')
    return boats
}

const Boats = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['boats-getall'],
        queryFn: () => fetchBoats(),
    })

    if (isPending) return <div>Ładowanie...</div>
    if (error) return <div>Wystąpił błąd pobierania danych</div>

    return (
        <div className="w-full flex flex-col gap-0 items-start">
            <h1 className="text drop-shadow-lg text-2xl font-bold">Jachty</h1>
            <ul>
                <DataTable columns={columns} data={data} />
            </ul>
        </div>
    )
}

export default Boats
