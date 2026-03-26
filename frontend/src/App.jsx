import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/send' element={<SendMoney />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
