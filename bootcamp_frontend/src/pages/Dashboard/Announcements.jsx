import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  Spinner,
  SimpleGrid,
  HStack,
  useToast,
  Button,
} from '@chakra-ui/react';
import { FaBullhorn, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get('/announcements');
        setAnnouncements(res.data);
      } catch (err) {
        toast({
          title: 'Failed to fetch announcements.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [toast]);

  return (
    <Box px={{ base: 4, md: 8 }} py={8} minH="100vh" bg="gray.900" color="white">
      {/* Back Button */}
      <Box mb={6}>
        <Button
          onClick={() => navigate('/home')}
          variant="ghost"
          colorScheme="purple"
          leftIcon={<FaArrowLeft />}
          fontWeight="semibold"
          _hover={{
            transform: 'translateX(-4px)',
            bg: 'gray.700',
            color: 'purple.300',
          }}
        >
          Back to Overview
        </Button>
      </Box>

      {/* Header */}
      <HStack mb={6} spacing={3}>
        <Icon as={FaBullhorn} boxSize={6} color="purple.400" />
        <Heading size="lg" color="purple.200">
          Announcements
        </Heading>
      </HStack>

      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <Spinner size="lg" color="purple.400" />
        </Box>
      ) : announcements.length === 0 ? (
        <Text color="gray.500" fontSize="md" textAlign="center">
          No announcements available.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {announcements.map((a) => (
            <Box
              key={a._id}
              p={5}
              bg="gray.800"
              rounded="lg"
              shadow="lg"
              borderLeft="4px solid"
              borderColor="purple.500"
            >
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {a.title}
              </Text>
              <Text fontSize="sm" color="gray.300" mb={3}>
                {a.message}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(a.date).toLocaleString()}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Announcements;
