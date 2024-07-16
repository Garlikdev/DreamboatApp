import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { BoatSchema } from '../schemas/boatSchema'

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
            const [availability, setAvailability] = useState<string>('Dostępny')
            const [endDate, setEndDate] = useState<string | null>(null)
            const boatId = row.original.id

            useEffect(() => {
                const checkAvailability = async () => {
                    try {
                        const reservations =
                            await window.electron.ipcRenderer.invoke(
                                'boat-check-availability',
                                boatId
                            )
                        const now = new Date().toISOString()

                        if (reservations.length > 0) {
                            const currentReservation = reservations.find(
                                (reservation: any) => {
                                    const start = new Date(reservation.start)
                                    const end = new Date(reservation.end)
                                    return (
                                        now >= start.toISOString() &&
                                        now <= end.toISOString()
                                    )
                                }
                            )

                            if (currentReservation) {
                                setAvailability('Pływa')
                                setEndDate(currentReservation.end)
                            } else {
                                setAvailability('Dostępny')
                                setEndDate(null)
                            }
                        } else {
                            setAvailability('Dostępny')
                            setEndDate(null)
                        }
                    } catch (error) {
                        console.error('Error checking availability:', error)
                        setAvailability('Błąd')
                        setEndDate(null)
                    }
                }

                checkAvailability()
            }, [boatId])

            return (
                <div>
                    {endDate && availability === 'Pływa' ? (
                        <Badge
                            variant={
                                availability === 'Pływa'
                                    ? 'destructive'
                                    : 'default'
                            }
                        >
                            Od {new Date(endDate).toLocaleString()}
                        </Badge>
                    ) : (
                        <Badge
                            variant={
                                availability === 'Pływa'
                                    ? 'destructive'
                                    : 'default'
                            }
                        >
                            {availability}
                        </Badge>
                    )}
                </div>
            )
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
