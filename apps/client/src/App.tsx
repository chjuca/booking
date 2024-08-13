import React from 'react';
import { Box, Container } from "@chakra-ui/react";
import CreateRoomForm from './components/CreateRoomForm';

const App: React.FC = () => {
    return (
        <Container>
            <Box>
                <CreateRoomForm />
            </Box>
        </Container>
    );
};

export default App;