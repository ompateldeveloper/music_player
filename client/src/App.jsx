import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import { cn } from './lib/utils'
import { useThemeContext } from "./contexts/ThemeContext"
import Signin from "./pages/Signin"
import { useAuthContext } from "./contexts/AuthContextProvider"
import Signup from "./pages/Signup"
function App() {
    const { theme, setTheme } = useThemeContext();
    const {user} = useAuthContext()
    return (
        <div className={cn('App ', theme == 'dark' ? "dark:bg-zinc-100 dark" : "bg-zinc-100 text-zinc-800")}>
            <Routes>
                {/* <Route path={'/'} element={<Landing/>}/> */}

                <Route path={'*'} element={<Navigate to='/' />} />

                <Route path={"/"} element={
                    !user ?
                        <Navigate to="/signin" replace />
                        :
                        <Dashboard />
                } />
                <Route path={"/signin"} element={
                    user ?
                        <Navigate to="/" replace />
                        : <Signin />
                } />
                <Route path={"/signup"} element={
                    user ?
                        <Navigate to="/" replace />
                        : <Signup />
                } />

            </Routes>
        </div>
    )
}

export default App
