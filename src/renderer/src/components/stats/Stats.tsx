import { NavLink } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Calendar, DollarSign, Sailboat } from 'lucide-react'

const Stats = () => {
    return (
        <div className="w-full flex flex-col gap-0 items-start">
            <div className="text drop-shadow-lg text-2xl font-bold">Pulpit</div>
            <div className="gap-4 my-2 w-full grid grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <CardTitle>Dochód</CardTitle>
                        <DollarSign className="h-4 !mt-0" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">25,000zł</p>
                        <p className="text-neutral-500 text-xs">
                            +30.2% w tym miesiącu
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <CardTitle>Rezerwacje</CardTitle>
                        <Calendar className="h-4 !mt-0" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">253</p>
                        <p className="text-neutral-500 text-xs">
                            +15.8% w tym miesiącu
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <CardTitle>Na wodzie</CardTitle>
                        <Sailboat className="h-4 !mt-0" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">6/26</p>
                        <p className="text-neutral-500 text-xs">
                            +69.2% w tym miesiącu
                        </p>
                    </CardContent>
                </Card>
                <Card className="col-span-2">
                    <CardHeader className="flex flex-row items-start justify-between">
                        <CardTitle>Dochód</CardTitle>
                        <DollarSign className="h-4 !mt-0" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">25,000zł</p>
                        <p className="text-neutral-500">
                            +30.2% w tym miesiącu
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <CardTitle>Rezerwacje</CardTitle>
                        <Calendar className="h-4 !mt-0" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">253</p>
                        <p className="text-neutral-500">
                            +15.8% w tym miesiącu
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Stats
