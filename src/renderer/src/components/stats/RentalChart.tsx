import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
    { month: 'Kwiecień', desktop: 186, mobile: 80 },
    { month: 'Maj', desktop: 305, mobile: 200 },
    { month: 'Czerwiec', desktop: 237, mobile: 120 },
    { month: 'Lipiec', desktop: 73, mobile: 190 },
    { month: 'Sierpień', desktop: 209, mobile: 130 },
    { month: 'Wrzesień', desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: 'Motorówki',
        color: 'hsl(var(--chart-1))',
    },
    mobile: {
        label: 'Skutery',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig

export function RentalChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Przegląd</CardTitle>
                <CardDescription>Kwiecień - Wrzesień 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis tickLine={false} axisLine={false} width={26} />
                        <ChartTooltip
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            radius={4}
                        >
                            <LabelList dataKey="desktop" position="top" />
                        </Bar>
                        <Bar
                            dataKey="mobile"
                            fill="var(--color-mobile)"
                            radius={4}
                        >
                            <LabelList dataKey="desktop" position="top" />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
