import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/form/LoginForm';
import RoomList from './components/list/RoomList';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute/>}>
            <Route path="/" element={<RoomList />} />
            </Route>
        </Routes>
    </Router>

    );
};

export default App;