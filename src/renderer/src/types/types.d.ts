export interface Boat {
    id?: number
    name: string
    pricePerHour: number
    deposit: number
    capacity: number
    pricing: Pricing[]
}

export interface Client {
    id?: number
    name: string
    street: string
    postal_code: string
    city: string
    phone: number
    email: string
    pesel: string
}

export interface Pricing {
    id?: number
    boat_id: number
    days: number
    price: number
}

export interface Employee {
    id?: number
    name: string
    nr_dowodu: string
}

export interface Reservation {
    id?: number
    boat_id: number
    port: string
    invoice: boolean
    invoice_number?: string
    company_id?: number
    client_id: number
    zaliczka?: number
    patent_name: string
    patent_number: number
    cleaning: number
    employee_id: number
    start: Date
    end: Date
}

export interface Port {
    id?: number
    name: string
    city: string
}

type TransformedBoat = Boat & { pricing: Pricing[] }
