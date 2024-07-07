export interface Boat {
    id?: number;
    name: string;
    pricePerHour: number;
    deposit: number;
    capacity: number;
    pricing?: Pricing[];
}

export interface Pricing {
    id?: number;
    boat_id: number;
    days: number;
    price: number;
}

export interface Reservation {
    id?: number;
    boat_id: number;
    port?: string;
    invoice?: boolean;
    invoice_number?: string;
    company_id?: number;
    client_id: number;
    zaliczka?: number;
    patent_name: string;
    patent_number: number;
    cleaning: number;
    start_date: Date;
    end_date?: Date;
    start_time: string;
    end_time?: string;
}