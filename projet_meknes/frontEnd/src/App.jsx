
import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Index from './components'
import Edit from './components/edit'
import Show from './components/show'
import Create from './components/create'
import CommandeForm from './components/commande'
function App() {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Index/>} />
                    <Route path='/CommandeForm' element={<CommandeForm/>} />


                    <Route path='/Edit/:id' element={<Edit/>} />
                    <Route path='/Create' element={<Create/>} />
                    <Route path='/Show/:id' element={<Show/>} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
