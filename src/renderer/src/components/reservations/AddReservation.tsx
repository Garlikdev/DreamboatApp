import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import {
    reservationSchema,
    ReservationSchema,
} from '../schemas/reservationSchema'
import { Checkbox } from '../ui/checkbox'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { useEffect, useState } from 'react'
import { BoatSchema } from '../schemas/boatSchema'
import { Client } from '@/types/types'

const AddReservation = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const form = useForm<ReservationSchema>({
        resolver: zodResolver(reservationSchema),
    })

    const { control, handleSubmit, watch } = form

    const [showCompanyField, setShowCompanyField] = useState(false)

    const [selectedBoat, setSelectedBoat] = useState<BoatSchema>()

    const watchInvoice = watch('invoice', false)

    useEffect(() => {
        setShowCompanyField(watchInvoice)
    }, [watchInvoice])

    // Fetch boats data
    const { data: boats, isLoading: isLoadingBoats } = useQuery({
        queryKey: ['boat-getall'],
        queryFn: () => window.electron.ipcRenderer.invoke('boat-getall'),
    })

    // Fetch companies data
    const { data: companies, isLoading: isLoadingCompanies } = useQuery({
        queryKey: ['reservation-fetch-companies'],
        queryFn: () =>
            window.electron.ipcRenderer.invoke('reservation-fetch-companies'),
    })

    const { data: ports, isLoading: isLoadingPorts } = useQuery({
        queryKey: ['port-getall'],
        queryFn: () => window.electron.ipcRenderer.invoke('port-getall'),
    })

    const { data: clients, isLoading: isLoadingClients } = useQuery({
        queryKey: ['reservation-fetch-clients'],
        queryFn: () =>
            window.electron.ipcRenderer.invoke('reservation-fetch-clients'),
    })

    const { mutate } = useMutation({
        mutationKey: ['reservation-add'],
        mutationFn: async (data: ReservationSchema) => {
            const response = await window.electron.ipcRenderer.invoke(
                'reservation-add',
                data
            )
            return response
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['reservations-getall'] })
            toast({
                title: 'Sukces!',
                description: 'Rezerwacja została dodana!',
            })
            navigate('/reservations')
        },
        onError: (error: any) => {
            console.log(error)
            toast({
                title: 'Wystąpił błąd!',
                description: 'Spróbuj ponownie później!',
            })
        },
    })

    const handleAddCompany = () => {
        // Function to add a new company
        // After adding, invalidate the companies query to refetch the companies list
        queryClient.invalidateQueries({ queryKey: ['companies-fetch'] })
    }

    const onSubmit = (data: ReservationSchema) => mutate(data)

    return (
        <div className="relative">
            <h1 className="text drop-shadow-lg text-2xl font-bold mb-2">
                Nowe zamówienie
            </h1>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="flex flex-wrap gap-4">
                        <Card className="flex-auto">
                            <CardHeader>
                                <CardTitle>Dane podstawowe</CardTitle>
                                <CardDescription>
                                    Wybierz port, jednostkę oraz datę czarteru
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {isLoadingPorts ? (
                                    <p>Ładowanie portów...</p>
                                ) : (
                                    <FormField
                                        control={control}
                                        name="port"
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Wybierz port" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {ports === null ? (
                                                            ports.map(
                                                                (port: any) => (
                                                                    <SelectItem
                                                                        key={
                                                                            port.id
                                                                        }
                                                                        value={String(
                                                                            port.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            port.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectLabel>
                                                                Brak danych
                                                            </SelectLabel>
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                )}
                                {isLoadingBoats ? (
                                    <p>Ładowanie jednostek</p>
                                ) : (
                                    <FormField
                                        control={control}
                                        name="boat_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jednostka</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        const boat = boats.find(
                                                            (boat: any) =>
                                                                boat.id ===
                                                                parseInt(value)
                                                        )
                                                        setSelectedBoat(boat)
                                                    }}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Wybierz jednostkę" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {boats.map(
                                                            (boat: any) => (
                                                                <SelectItem
                                                                    key={
                                                                        boat.id
                                                                    }
                                                                    value={String(
                                                                        boat.id
                                                                    )}
                                                                >
                                                                    {boat.name}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                                {selectedBoat && (
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>
                                                                Wybrana
                                                                jednostka
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p>
                                                                <strong>
                                                                    Nazwa:
                                                                </strong>
                                                                {
                                                                    selectedBoat.name
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Cena za
                                                                    dzień:
                                                                </strong>
                                                                {
                                                                    selectedBoat
                                                                        .pricing[0]!
                                                                        .price
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Cena za
                                                                    godzinę:
                                                                </strong>
                                                                {
                                                                    selectedBoat.pricePerHour
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Kaucja:
                                                                </strong>
                                                                {
                                                                    selectedBoat.deposit
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Pojemność:
                                                                </strong>
                                                                {
                                                                    selectedBoat.capacity
                                                                }
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={control}
                                    name="start"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Rozpoczęcie czarteru
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="dark:[color-scheme:dark]"
                                                    type="datetime-local"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="end"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Zakończenie czarteru
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="dark:[color-scheme:dark]"
                                                    type="datetime-local"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card className="flex-auto">
                            <CardHeader>
                                <CardTitle>Dane klienta</CardTitle>
                                <CardDescription>
                                    Wybierz klienta z listy lub dodaj nowego
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <FormField
                                    control={control}
                                    name="invoice"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormLabel>Faktura</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {showCompanyField && (
                                    <>
                                        {isLoadingCompanies ? (
                                            <p>Loading companies...</p>
                                        ) : (
                                            <FormField
                                                control={control}
                                                name="company_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Firma
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Wybierz firmę" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {companies ===
                                                                    null ? (
                                                                        companies.map(
                                                                            (
                                                                                company: any
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        company.id
                                                                                    }
                                                                                    value={String(
                                                                                        company.id
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        company.name
                                                                                    }
                                                                                </SelectItem>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <SelectLabel>
                                                                            Brak
                                                                            danych
                                                                        </SelectLabel>
                                                                    )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                        <Button
                                            type="button"
                                            onClick={handleAddCompany}
                                        >
                                            Dodaj firmę
                                        </Button>
                                    </>
                                )}
                                {isLoadingClients ? (
                                    <p>Ładowanie klientów...</p>
                                ) : (
                                    <FormField
                                        control={control}
                                        name="client_id"
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Wybierz klienta" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {clients === null ? (
                                                            clients.map(
                                                                (
                                                                    client: any
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            client.id
                                                                        }
                                                                        value={String(
                                                                            client.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            client.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectLabel>
                                                                Brak danych
                                                            </SelectLabel>
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                )}
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="patent_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Dane patentowe
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Imię i Nazwisko"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="patent_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        placeholder="Numer"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="flex-auto">
                            <CardHeader>
                                <CardTitle>Opłaty dodatkowe</CardTitle>
                                <CardDescription>
                                    Zaliczka i sprzątanie
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={control}
                                    name="zaliczka"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zaliczka</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    placeholder="500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="cleaning"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sprzątanie</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    placeholder="150"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <Button className="fixed right-12 bottom-4" type="submit">
                        Zapisz Rezerwację
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AddReservation
