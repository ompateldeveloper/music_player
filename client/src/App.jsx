import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"

function App() {
    return (
        <div className="App bg-zinc-100 dark:bg-zinc-900 dark">
            <Routes>
                {/* <Route path={'/'} element={<Landing/>}/> */}
                <Route path={'/'} element={<Dashboard/>}/>
            </Routes>
        </div>
    )
}

export default App
