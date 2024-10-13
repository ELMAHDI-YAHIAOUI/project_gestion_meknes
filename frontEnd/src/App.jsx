import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './components';
import Edit from './components/edit';
import Show from './components/show';
import Create from './components/create';
import Login from './components/loginComponent/login';
import Register from './components/loginComponent/register';
import Logout from './components/loginComponent/Logout';

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
            </Routes>
        </Router>
    );
}

export default App;