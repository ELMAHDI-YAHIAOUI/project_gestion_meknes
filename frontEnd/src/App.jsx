import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './components';
import Edit from './components/edit';
import Show from './components/show';
import Create from './components/create';
import Login from './components/loginComponent/login';
import Register from './components/loginComponent/register';
import Logout from './components/loginComponent/Logout';
import CommandeForm from './components/commandeComponent/commande'
import ListCommandeComponent from './components/commandeComponent/listCommandeComponent'
import AffectationCommande from './components/commandeComponent/affectationCommandeComponent'
import FormComponent from './components/commandeComponent/testFormComponent'
import FF from './components/xsxs'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/Edit/:id' element={<Edit />} />
                <Route path='/Create' element={<Create />} />
                <Route path='/Show/:id' element={<Show />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Logout' element={<Logout />} />

                <Route path='/CommandeForm' element={<CommandeForm/>} />
                <Route path='/ListCommandeComponent' element={<ListCommandeComponent/>} />
                <Route path='/AffectationCommande' element={<AffectationCommande/>} />
                <Route path='/FormComponent' element={<FormComponent/>} />
                <Route path='/FF' element={<FF/>} />
            </Routes>
        </Router>
    );
}

export default App;
