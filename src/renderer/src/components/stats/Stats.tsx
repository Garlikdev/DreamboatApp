import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    BriefcaseBusiness,
    Calendar,
    DollarSign,
    Sailboat,
    ShipWheel,
    Users,
} from 'lucide-react'
import { RentalChart } from './RentalChart'

const Stats = () => {
    return (
        <div className="w-full flex flex-col gap-0 items-start">
            <h1 className="text drop-shadow-lg text-2xl font-bold mb-2">
                Pulpit
            </h1>
            <div className="w-full flex flex-col gap-4">
                <div className="gap-4 w-full grid grid-cols-3 xl:grid-cols-6">
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Dochód</CardTitle>
                            <DollarSign className="h-4 !mt-0" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl lg:text-4xl xl:text-2xl 2xl:text-4xl font-bold">
                                25,979zł
                            </p>
                            <p className="text-neutral-500 text-xs">
                                +30.2% w tym miesiącu
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Czarter</CardTitle>
                            <Calendar className="h-4 !mt-0" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl lg:text-4xl font-bold">
                                253
                            </p>
                            <p className="text-neutral-500 text-xs">
                                +15.8% w tym miesiącu
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Klienci</CardTitle>
                            <Users className="h-4 !mt-0" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl lg:text-4xl font-bold">
                                112
                            </p>
                            <p className="text-neutral-500 text-xs">
                                +69% w tym miesiącu
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Jednostki</CardTitle>
                            <Sailboat className="h-4 !mt-0" />
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-4xl lg:text-5xl xl:text-6xl font-bold">
                                26
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Porty</CardTitle>
                            <ShipWheel className="h-4 !mt-0" />
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-4xl lg:text-5xl xl:text-6xl font-bold">
                                2
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Pracownicy</CardTitle>
                            <BriefcaseBusiness className="h-4 !mt-0" />
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-4xl lg:text-5xl xl:text-6xl font-bold">
                                6
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="gap-4 w-full grid grid-cols-3">
                    <div className="col-span-3 xl:col-span-2">
                        <RentalChart />
                    </div>
                    <Card className="col-span-3 xl:col-span-1">
                        <CardHeader>
                            <CardTitle>Ostatnie rezerwacje</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Saxdor 320 GTO
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Janusz Kwiatkowski
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +1,999zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Grandezza 28
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Jadwiga Nowak
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +3900zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Mirakul 30 HT
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Stefan Dąbrowski
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +2999zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sea Ray 290 SDX
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Damian Pomidor
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +4500zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sea Doo GTX 230
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Anna Kowalska
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +3399zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sea Doo GTX 230
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Anna Kowalska
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +3399zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sea Doo GTX 230
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Anna Kowalska
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +3399zł
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sea Doo GTX 230
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Anna Kowalska
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +3399zł
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Stats
