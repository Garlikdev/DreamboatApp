import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
} from 'react-router-dom'
import dreamboatLogo from './assets/images/dreamboatblue.png'
import Boats from './components/boats/Boats'
import AddBoat from './components/boats/AddBoat'
import Clients from './components/clients/Clients'
import Rentals from './components/rentals/Rentals'
import Stats from '@/components/stats/Stats'
import { ModeToggle } from './components/mode-toggle'
import { Calendar, Sailboat, User } from 'lucide-react'
import { Separator } from './components/ui/separator'

declare global {
    interface Window {
        electron: any
    }
}

function App() {
    return (
        <Router>
            <div className="flex w-screen p-4 h-screen bg-neutral-50 dark:bg-neutral-950">
                <Sidebar />
                <div className="w-full flex justify-center px-8 py-4 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Stats />} />
                        <Route path="/boats" element={<Boats />} />
                        <Route path="/boats/add" element={<AddBoat />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/rentals" element={<Rentals />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

function Sidebar() {
    return (
        <div className="w-[20rem] shadow-lg gap-4 p-4 flex flex-col rounded-3xl bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white text-sm">
            <NavLink to="/" className="items-center justify-center flex group">
                <img
                    alt="logo Dreamboat"
                    className="h-14 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                    src={dreamboatLogo}
                />
            </NavLink>
            <div className="flex flex-col justify-between h-full overflow-hidden">
                <div className="overflow-y-auto">
                    <h1 className="uppercase font-bold tracking-wide text-neutral-500 text-xs py-1">
                        Czarter
                    </h1>
                    <NavItem to="/boats" label="Jachty" icon={Sailboat}>
                        <SubNavItem to="/boats/add" label="Nowa jednostka" />
                    </NavItem>
                    <Separator />
                    <NavItem to="/clients" label="Klienci" icon={User}>
                        <SubNavItem to="/clients/add" label="Nowy klient" />
                    </NavItem>
                    <Separator />
                    <NavItem to="/rentals" label="Rezerwacje" icon={Calendar}>
                        <SubNavItem to="/rentals/add" label="Nowe zamówienie" />
                    </NavItem>
                    <Separator />
                    <h1 className="uppercase font-bold tracking-wide text-neutral-500 text-xs py-1">
                        Firma
                    </h1>
                    <NavItem to="/porty" label="Porty" icon={Sailboat}>
                        <SubNavItem to="/porty/add" label="Nowy port" />
                    </NavItem>
                    <Separator />
                    <NavItem to="/pracownicy" label="Pracownicy" icon={User}>
                        <SubNavItem
                            to="/pracownicy/add"
                            label="Nowy pracownik"
                        />
                    </NavItem>
                    <Separator />
                </div>
                <div className="w-full items-center justify-center flex pb-1">
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

interface NavItemProps {
    to: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    children: React.ReactNode
}

function NavItem({ to, label, icon: Icon, children }: NavItemProps) {
    return (
        <div>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `hover:bg-blue-200 dark:hover:bg-blue-800 p-2 flex gap-2 font-bold rounded-xl items-center transition-colors duration-300 ${isActive && 'bg-blue-300 dark:bg-blue-700'}`
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
            <div className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-xl transition-colors duration-300">
                {children}
            </div>
        </div>
    )
}

interface SubNavItemProps {
    to: string
    label: string
}

function SubNavItem({ to, label }: SubNavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `p-2 pl-8 block rounded-xl ${isActive && 'font-bold'}`
            }
        >
            {label}
        </NavLink>
    )
}

export default App
