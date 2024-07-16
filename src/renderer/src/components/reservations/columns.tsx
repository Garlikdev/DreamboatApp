import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import moment from 'moment'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Reservation } from '@/types/types'

export const columns: ColumnDef<Reservation>[] = [
    {
        accessorKey: 'boat_id',
        header: 'Jednostka',
    },
    {
        accessorKey: 'port',
        header: 'Port',
    },
    {
        accessorKey: 'invoice',
        header: 'Faktura',
        cell: ({ row }) => (row.original.invoice ? 'Tak' : 'Nie'),
    },
    {
        accessorKey: 'invoice_number',
        header: 'Umowa',
    },
    {
        accessorKey: 'company_id',
        header: 'Firma',
    },
    {
        accessorKey: 'client_id',
        header: 'Klient',
    },
    {
        accessorKey: 'zaliczka',
        header: 'Zaliczka',
    },
    {
        accessorKey: 'cleaning',
        header: 'Sprzątanie',
    },
    {
        accessorKey: 'start',
        header: 'Start',
        cell: ({ row }) =>
            moment(row.original.start).format('YYYY-MM-DD HH:mm'),
    },
    {
        accessorKey: 'end',
        header: 'Koniec',
        cell: ({ row }) => moment(row.original.end).format('YYYY-MM-DD HH:mm'),
    },
    {
        id: 'actions',
        header: 'Akcje',
        cell: ({ row }) => {
            const reservation = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Otwórz menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Jednostka</DropdownMenuLabel>
                        <DropdownMenuItem>Edytuj</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Rezerwacje</DropdownMenuLabel>
                        <DropdownMenuItem>Dodaj nową</DropdownMenuItem>
                        <DropdownMenuItem>Sprawdź terminy</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
