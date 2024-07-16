import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
    BrowserRouter,
} from 'react-router-dom'
import dreamboatLogo from './assets/images/dreamboatblue.png'
import Boats from './components/boats/Boats'
import AddBoat from './components/boats/AddBoat'
import Clients from './components/clients/Clients'
import Reservations from './components/reservations/Reservations'
import Stats from '@/components/stats/Stats'
import { ModeToggle } from './components/mode-toggle'
import {
    BriefcaseBusiness,
    Calendar,
    LayoutDashboard,
    Sailboat,
    ShipWheel,
    Users,
} from 'lucide-react'
import { Card } from './components/ui/card'
import AddClient from './components/clients/AddClient'
import AddReservation from './components/reservations/AddReservation'
import Ports from './components/ports/Ports'
import AddPort from './components/ports/AddPort'
import Employees from './components/employees/Employees'
import AddEmployee from './components/employees/AddEmployee'
import { Separator } from './components/ui/separator'

declare global {
    interface Window {
        electron: any
    }
}

function App() {
    return (
        <BrowserRouter>
            <div className="flex w-screen p-4 h-screen bg-neutral-50 dark:bg-neutral-950">
                <Sidebar />
                <div className="w-full px-4 overflow-y-auto">
                    <Routes>
                        // Pulpit
                        <Route path="/">
                            <Route index={true} element={<Stats />} />
                        </Route>
                        // Jednostki
                        <Route path="boats">
                            <Route index={true} element={<Boats />} />
                            <Route path="new" element={<AddBoat />} />
                        </Route>
                        // Klienci
                        <Route path="clients">
                            <Route index={true} element={<Clients />} />
                            <Route path="new" element={<AddClient />} />
                        </Route>
                        // Czarter
                        <Route path="reservations">
                            <Route index={true} element={<Reservations />} />
                            <Route path="new" element={<AddReservation />} />
                        </Route>
                        // Czarter
                        <Route path="ports">
                            <Route index={true} element={<Ports />} />
                            <Route path="new" element={<AddPort />} />
                        </Route>
                        // Czarter
                        <Route path="employees">
                            <Route index={true} element={<Employees />} />
                            <Route path="new" element={<AddEmployee />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

function Sidebar() {
    return (
        <Card className="w-[16rem] gap-4 p-4 flex flex-col text-sm">
            <img
                alt="logo Dreamboat"
                className="w-48 drop-shadow-lg"
                src={dreamboatLogo}
            />
            <div className="flex flex-col justify-between h-full overflow-hidden">
                <div className="overflow-y-auto overflow-x-hidden gap-2 flex flex-col">
                    <NavItem
                        to="/"
                        label="Pulpit"
                        icon={LayoutDashboard}
                        exact={true}
                    />

                    <NavItem
                        to="/reservations"
                        label="Rezerwacje"
                        icon={Calendar}
                        exact={true}
                    />
                    <Separator />
                    <NavItem
                        to="/boats"
                        label="Jednostki"
                        icon={Sailboat}
                        exact={true}
                    />
                    <NavItem
                        to="/clients"
                        label="Klienci"
                        icon={Users}
                        exact={true}
                    />
                    <NavItem
                        to="/ports"
                        label="Porty"
                        icon={ShipWheel}
                        exact={true}
                    />
                    <NavItem
                        to="/employees"
                        label="Pracownicy"
                        icon={BriefcaseBusiness}
                        exact={true}
                    />
                </div>
                <div className="w-full items-center justify-center flex pb-1">
                    <ModeToggle />
                </div>
            </div>
        </Card>
    )
}

interface NavItemProps {
    to: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    exact?: boolean
}

function NavItem({ to, label, icon: Icon, exact = false }: NavItemProps) {
    return (
        <div>
            <NavLink
                to={to}
                end={exact}
                className={({ isActive }) =>
                    `hover:bg-blue-200 dark:hover:bg-blue-800 p-2 flex gap-2 rounded-xl items-center transition-colors duration-300 ${isActive && 'bg-blue-300 font-bold dark:bg-blue-700'}`
                }
            >
                {({ isActive }) => (
                    <>
                        <Icon
                            className={`h-4 ${isActive ? 'text-white' : 'text-blue-500'}`}
                        />
                        {label}
                    </>
                )}
            </NavLink>
        </div>
    )
}

export default App
