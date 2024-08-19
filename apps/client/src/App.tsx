import React from 'react';
import { Box, Container } from "@chakra-ui/react";
import CreateBookingForm from './components/form/CreateBookingForm';
// import CreateRoomForm from './components/CreateRoomForm';
// import CreateUserForm from './components/form/CreateUserForm';

const App: React.FC = () => {
    return (
        <Container>
            <Box>
                <CreateBookingForm />
            </Box>
        </Container>
    );
};

export default App;