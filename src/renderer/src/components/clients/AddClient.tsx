import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { boatSchema, BoatSchema } from '../schemas/boatSchema'

import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { clientSchema, ClientSchema } from '../schemas/clientSchema'

const AddClient = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const form = useForm<ClientSchema>({
        resolver: zodResolver(clientSchema),
    })

    const { control, handleSubmit } = form

    const { mutate } = useMutation({
        mutationKey: ['client-add'],
        mutationFn: async (data: ClientSchema) => {
            const response = await window.electron.ipcRenderer.invoke(
                'client-add',
                data
            )
            return response // Return the response data from login function
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['client-getall'] })
            toast({
                title: 'Sukces!',
                description: 'Jednostka została dodana do bazy danych',
            })
            navigate('/clients')
        },
        onError: (error: any) => {
            // Handle API errors here
            console.log(error)
            toast({
                title: 'Wystąpił błąd!',
                description: error.message,
            })
        },
    })

    const onSubmit = (data: ClientSchema) => mutate(data)

    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <h1>Nowy klient</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imię i nazwisko</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Jan Kowalski"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ulica</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ul. Kwiatkowa 2/5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="postal_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kod pocztowy</FormLabel>
                                <FormControl>
                                    <Input placeholder="11-400" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="pesel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pesel</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="--------------"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numer telefonu</FormLabel>
                                <FormControl>
                                    <Input placeholder="000000000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="j.kowalski@gmail.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Dodaj</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddClient
