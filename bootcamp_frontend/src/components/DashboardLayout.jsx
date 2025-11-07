// src/components/DashboardLayout.jsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar'; // adjust path if different

const DashboardLayout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.900" color="white">
      <Navbar />
      <Box flex="1" p={6} mt="60px">
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
