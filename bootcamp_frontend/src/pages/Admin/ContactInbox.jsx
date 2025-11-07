// src/pages/admin/ContactInbox.jsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ContactInbox = () => {
  return (
    <Box maxW="800px" mx="auto" mt={10} p={6} bg="gray.800" rounded="md" color="white">
      <Heading size="md" mb={4}>📨 Contact Inbox</Heading>
      <Text color="gray.400">This page will display all student contact messages.</Text>
    </Box>
  );
};

export default ContactInbox;
