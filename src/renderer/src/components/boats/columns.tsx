import { ColumnDef } from '@tanstack/react-table'
import { BoatSchema } from '../schemas/boatSchema'
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
import { Badge } from '../ui/badge'

export const columns: ColumnDef<BoatSchema>[] = [
    {
        accessorKey: 'name',
        header: 'Nazwa',
    },
    {
        id: 'availability',
        header: 'Dostępność',
        cell: ({ row }) => {
            return <Badge variant="destructive">Pływa</Badge>
        },
    },
    {
        accessorKey: 'pricing',
        header: 'zł/dzień',
        cell: ({ row }) => {
            // Retrieve the pricing array from the row data
            const pricing = row.getValue('pricing') as Array<{
                days: number
                price: number
            }>

            // Sort the pricing array by 'days' to ensure the first element is for one day
            const sortedPricing = pricing.sort(
                (a: { days: number }, b: { days: number }) => a.days - b.days
            )

            // Access the price for one day
            const oneDayPrice = sortedPricing[0]?.price

            if (oneDayPrice) {
                const formatted = new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: 'PLN',
                    maximumFractionDigits: 0,
                }).format(oneDayPrice)
                return <div className="text-right font-medium">{formatted}</div>
            } else {
                return <div className="text-right font-medium">Brak</div>
            }
        },
    },
    {
        accessorKey: 'pricePerHour',
        header: 'zł/godz',
        cell: ({ row }) => {
            const pricePerHour = parseFloat(row.getValue('pricePerHour'))
            const formatted = new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
                maximumFractionDigits: 0,
            }).format(pricePerHour)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'deposit',
        header: () => <div className="text-right">Kaucja</div>,
        cell: ({ row }) => {
            const deposit = parseFloat(row.getValue('deposit'))
            const formatted = new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
                maximumFractionDigits: 0,
            }).format(deposit)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: 'actions',
        header: 'Akcje',
        cell: ({ row }) => {
            const boat = row.original

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
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(boat.id)
                            }
                        >
                            Edytuj
                        </DropdownMenuItem>
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
