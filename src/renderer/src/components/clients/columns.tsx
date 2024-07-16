import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Client } from '@/types/types'

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: 'name',
        header: 'Imię i nazwisko',
    },
    {
        accessorKey: 'phone',
        header: 'Nr telefonu',
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
    },
    {
        id: 'actions',
        header: 'Akcje',
        cell: ({ row }) => {
            const client = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
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
