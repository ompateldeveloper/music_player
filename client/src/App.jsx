import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
import {cn} from './lib/utils'
import { useThemeContext } from "./contexts/ThemeContext"
function App() {
    const {theme,setTheme}  = useThemeContext();
    return (
        <div className={cn('App ',theme=='dark' ? "dark:bg-zinc-100 dark":"bg-zinc-100")}>
            <Routes>
                {/* <Route path={'/'} element={<Landing/>}/> */}
                <Route path={'/'} element={<Dashboard/>}/>
            </Routes>
        </div>
    )
}

export default App
