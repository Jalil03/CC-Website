import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
  Spinner,
  VStack,
  HStack,
  Icon,
  Image,
  Button,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  FlaskConicalIcon,
  RocketIcon,
  Sparkles,
  ArrowRightIcon,
} from 'lucide-react';
import { FiSmile } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';
import API from '../../services/api';
import logo from '../../assets/logo.png';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionButton = motion(Button);

const Home = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [showAllTests, setShowAllTests] = useState(false);

  const gap = useBreakpointValue({ base: 6, md: 8 });
  const visibleTests = showAllTests ? tests : tests.slice(0, 3);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      setUser(stored && stored !== 'undefined' ? JSON.parse(stored) : {});
    } catch (err) {
      console.error('Error parsing user:', err);
    }

    const fetchData = async () => {
      try {     
        const weeksRes = await API.get('/weeks');
        const testsRes = await API.get('/tests/student/all');
        const today = new Date();

        const availableWeeks = weeksRes.data.filter(
          (week) => !week.releaseDate || new Date(week.releaseDate) <= today
        );

        setWeeks(availableWeeks || []);
        setTests(testsRes.data || []);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const bounce = {
    whileHover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <DashboardLayout>
      <Flex direction="column" align="center" mt={8} mb={10}>
        <MotionImage
          src={logo}
          alt="Bootcamp Logo"
          boxSize="80px"
          mb={3}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />

        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HStack spacing={2} mb={1}>
            <Heading size="lg" color="purple.200" fontWeight="extrabold">
              Welcome back, {user?.name || 'Student'}
            </Heading>
            <Icon as={FiSmile} boxSize={6} color="purple.300" />
          </HStack>

          <HStack spacing={2} justify="center">
            <Icon as={Sparkles} boxSize={4} color="purple.300" />
            <Text fontSize="sm" color="gray.400">
              Let’s craft some code and conquer challenges
            </Text>
            <Icon as={RocketIcon} boxSize={4} color="purple.300" />
          </HStack>
        </MotionBox>
      </Flex>

      {loading ? (
        <Flex justify="center" mt={10}>
          <Spinner />
        </Flex>
      ) : (
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={gap}
          mt={8}
          align="flex-start"
          width="100%"
          px={{ base: 2, md: 0 }}
        >
          {/* Weekly Content */}
          <Box
            flex={1}
            width="100%"
            bg="gray.800"
            p={6}
            rounded="xl"
            boxShadow="lg"
            mb={{ base: 6, md: 0 }}
          >
            <HStack mb={4}>
              <Icon as={BookOpenIcon} color="purple.300" boxSize={5} />
              <Text fontSize="lg" fontWeight="bold">Weekly Content</Text>
            </HStack>

            {weeks.length > 0 ? (
              <VStack align="stretch" spacing={4}>
                {weeks.map((week) => (
                  <MotionBox
                    key={week._id}
                    p={4}
                    bg="gray.700"
                    rounded="md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text fontWeight="bold" color="purple.200">
                      Week {week.weekNumber}: {week.title}
                    </Text>
                    {week.description && (
                      <Text fontSize="sm" color="gray.300" mt={1}>
                        {week.description}
                      </Text>
                    )}
                  </MotionBox>
                ))}
              </VStack>
            ) : (
              <Text fontSize="md" color="gray.400">
                This week’s content will be available soon.
              </Text>
            )}
          </Box>

          {/* Tests */}
          <Box
            flex={1}
            width="100%"
            bg="gray.800"
            p={6}
            rounded="xl"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <HStack mb={4}>
                <Icon as={FlaskConicalIcon} color="purple.300" boxSize={5} />
                <Text fontSize="lg" fontWeight="bold">Tests Available</Text>
              </HStack>

              {tests.length > 0 ? (
                <VStack align="stretch" spacing={4}>
                  {visibleTests.map((test, index) => (
                    <MotionBox
                      key={test._id}
                      bg="gray.700"
                      p={4}
                      rounded="md"
                      shadow="md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HStack justify="space-between">
                        <Icon as={ArrowRightIcon} boxSize={4} color="purple.300" />
                        <Text fontWeight="bold" fontSize="sm" color="purple.200">
                          Test {index + 1}
                        </Text>
                        <Text
                          fontSize="xs"
                          bg="purple.500"
                          px={2}
                          py={0.5}
                          rounded="md"
                          color="white"
                          fontWeight="semibold"
                        >
                          Week {test.weekNumber}
                        </Text>
                      </HStack>

                      <Text
                        mt={2}
                        fontSize="sm"
                        color="gray.300"
                        noOfLines={3}
                        title={test.question}
                      >
                        {test.question}
                      </Text>

                      <Flex justify="flex-end" mt={3}>
                        <Button
                          size="sm"
                          colorScheme="purple"
                          variant="outline"
                          fontSize="xs"
                          onClick={() => navigate('/tests')}
                        >
                          View Test
                        </Button>
                      </Flex>
                    </MotionBox>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="md" color="gray.400">
                  No upcoming tests yet. Keep learning!
                </Text>
              )}
            </Box>

            {/* See More */}
            {tests.length > 3 && !showAllTests && (
              <Flex justify="center" mt={6}>
                <MotionButton
                  {...bounce}
                  onClick={() => setShowAllTests(true)}
                  colorScheme="purple"
                  size="sm"
                  variant="ghost"
                >
                  See More
                </MotionButton>
              </Flex>
            )}
          </Box>
        </Flex>
      )}
    </DashboardLayout>
  );
};

export default Home;
