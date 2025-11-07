import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  Flex,
  useColorModeValue,
  Collapse,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Weeks = () => {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const navigate = useNavigate();

  const cardBg = useColorModeValue('gray.800', 'gray.700');
  const hoverBg = useColorModeValue('gray.700', 'gray.600');

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const res = await API.get('/weeks');
        const today = new Date();
        const filtered = res.data.filter(
          (week) => !week.releaseDate || new Date(week.releaseDate) <= today
        );
        setWeeks(filtered);
      } catch (err) {
        console.error('Error loading weeks', err);
      }
    };

    fetchWeeks();
  }, []);

  const handleToggle = (weekId) => {
    setSelectedWeekId(prevId => (prevId === weekId ? null : weekId));
  };

  return (
    <Box maxW="3xl" mx="auto" px={4} py={8}>
      <Button
        onClick={() => navigate('/home')}
        leftIcon={<FaArrowLeft />}
        variant="ghost"
        colorScheme="purple"
        mb={6}
        _hover={{ transform: 'translateX(-4px)', bg: 'gray.700' }}
      >
        Back to Overview
      </Button>

      <Flex align="center" mb={6}>
        <Icon as={BookOpenIcon} color="purple.300" boxSize={6} mr={2} />
        <Heading size="md" color="purple.200">
          Available Weeks
        </Heading>
      </Flex>
      <Button
  mt={4}
  colorScheme="purple"
  size="sm"
  onClick={() => navigate('/submit')}
>
  Submit Project
</Button>

      <VStack spacing={4} align="stretch">
        {weeks.length === 0 ? (
          <Text color="gray.500" fontSize="sm" textAlign="center">
            No available weeks yet.
          </Text>
        ) : (
          weeks.map((week, index) => (
            <MotionBox
              key={week._id}
              bg={cardBg}
              p={4}
              rounded="lg"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              onClick={() => handleToggle(week._id)}
            >
              <Text fontWeight="semibold" color="purple.300">
                Week {week.weekNumber}: {week.title}
              </Text>
              {week.description && (
                <Text fontSize="sm" color="gray.400" mt={1}>
                  {week.description}
                </Text>
              )}

              {/* Collapsible content viewer */}
              <Collapse in={selectedWeekId === week._id} animateOpacity>
                <Box mt={4} bg="gray.900" p={3} rounded="md">
                  {week.pdfUrl ? (
                    <Box>
                      <Text fontSize="sm" color="gray.400" mb={2}>
                        Preview:
                      </Text>
                      <iframe
                        src={week.pdfUrl}
                        title={`Week ${week.weekNumber} Content`}
                        width="100%"
                        height="400px"
                        style={{ border: 'none', borderRadius: '8px' }}
                      />
                    </Box>
                  ) : (
                    <Text fontSize="sm" color="gray.500">
                      No content available for this week yet.
                    </Text>
                  )}
                </Box>
              </Collapse>
            </MotionBox>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default Weeks;
