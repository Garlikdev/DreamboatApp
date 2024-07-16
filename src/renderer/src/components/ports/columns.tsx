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
import { Port } from '@/types/types'

export const columns: ColumnDef<Port>[] = [
    {
        accessorKey: 'name',
        header: 'Nazwa',
    },
    {
        accessorKey: 'city',
        header: 'Miejscowość',
    },
    {
        id: 'actions',
        header: 'Akcje',
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Otwórz menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Port</DropdownMenuLabel>
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
