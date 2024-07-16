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

const AddBoat = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const form = useForm<BoatSchema>({
        resolver: zodResolver(boatSchema),
    })

    const { control, handleSubmit } = form
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'pricing',
    })

    const { mutate } = useMutation({
        mutationKey: ['boat-add'],
        mutationFn: async (data: BoatSchema) => {
            const response = await window.electron.ipcRenderer.invoke(
                'boat-add',
                data
            )
            return response // Return the response data from login function
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['boat-getall'] })
            toast({
                title: 'Sukces!',
                description: 'Jednostka została dodana do bazy danych',
            })
            navigate('/')
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

    const onSubmit = (data: BoatSchema) => mutate(data)

    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <h1>Nowa jednostka</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nazwa jednostki</FormLabel>
                                <FormControl>
                                    <Input placeholder="Saxdor" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Pricing Fields */}
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid grid-cols-3 gap-4 items-end"
                            >
                                <FormField
                                    control={control}
                                    name={`pricing.${index}.days`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Liczba dni</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1"
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? String(index + 1)
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`pricing.${index}.price`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cena</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="100"
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? String(
                                                                  field.value
                                                              )
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    className="w-16"
                                    onClick={() => remove(index)}
                                >
                                    Usuń
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button
                        type="button"
                        onClick={() =>
                            append({ days: fields.length + 1, price: 0 })
                        }
                    >
                        Dodaj cenę
                    </Button>
                    <FormField
                        control={form.control}
                        name="pricePerHour"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cena za godzinę</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="500"
                                        {...field}
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ''
                                        }
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deposit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kaucja</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="5000"
                                        {...field}
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ''
                                        }
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Załoga</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="8"
                                        {...field}
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ''
                                        }
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
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

export default AddBoat
