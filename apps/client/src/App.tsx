import React from 'react';
import { Box, Container } from "@chakra-ui/react";
import RoomList from './components/list/RoomList';
// import CreateBookingForm from './components/form/CreateBookingForm';
// import CreateRoomForm from './components/form/CreateRoomForm';
// import CreateUserForm from './components/form/CreateUserForm';

const App: React.FC = () => {
    return (
        <Box>
            <RoomList />
        </Box>
    );
};

export default App;