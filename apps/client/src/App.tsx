import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/form/LoginForm';
import RoomList from './components/list/RoomList';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import BookingList from './components/list/BookingList';

const App: React.FC = () => {
    return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute/>}>
            <Route path="/" element={<RoomList />} />
            <Route path="/bookings" element={<BookingList />} />
            </Route>
        </Routes>
    </Router>

    );
};

export default App;