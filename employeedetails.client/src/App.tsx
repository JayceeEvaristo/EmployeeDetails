import './App.css';

import { Routes, Route } from 'react-router-dom';

import EmployeeList from './components/Employee/EmployeeList';

function App() {
    return (
        <Routes>
            <Route path="/" element={<EmployeeList />} />
        </Routes>
    );
}

export default App;