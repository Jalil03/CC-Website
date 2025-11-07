import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const AdminCard = ({ title, value }) => {
  return (
    <Box
      bg="gray.800"
      border="1px solid #4c4c6d"
      boxShadow="lg"
      rounded="2xl"
      p={6}
      textAlign="center"
    >
      <VStack spacing={2}>
        <Text color="gray.400" fontSize="sm">
          {title}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {value}
        </Text>
      </VStack>
    </Box>
  );
};

export default AdminCard;
