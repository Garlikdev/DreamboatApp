import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ClientSchema } from '../schemas/clientSchema'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'

const EditClient = ({ client }: { client: ClientSchema }) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: client,
    })

    const { mutate } = useMutation({
        mutationKey: ['client-edit'],
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

    const onSubmit = (data: ClientSchema) => {
        mutate({ id: client.id, ...data })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => <input {...field} placeholder="Name" />}
            />
            <Controller
                name="street"
                control={control}
                render={({ field }) => (
                    <input {...field} placeholder="Street" />
                )}
            />
            <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                    <input {...field} placeholder="Postal Code" />
                )}
            />
            <Controller
                name="city"
                control={control}
                render={({ field }) => <input {...field} placeholder="City" />}
            />
            <Controller
                name="pesel"
                control={control}
                render={({ field }) => <input {...field} placeholder="PESEL" />}
            />
            <Controller
                name="phone"
                control={control}
                render={({ field }) => <input {...field} placeholder="Phone" />}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => <input {...field} placeholder="Email" />}
            />
            <button type="submit">Edit Client</button>
        </form>
    )
}

export default EditClient
