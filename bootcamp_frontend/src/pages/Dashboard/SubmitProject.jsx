import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  HStack,
  Icon,
  Text,
  Badge,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import API from '../../services/api';

const SubmitProject = () => {
  const [weekNumber, setWeekNumber] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Fetch current user's submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get('/submissions/student');
        setSubmissions(res.data || []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleSubmit = async () => {
    try {
      await API.post('/submissions', {
        weekNumber,
        githubRepo: githubLink,
      });

      toast({
        title: 'Project submitted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setWeekNumber('');
      setGithubLink('');
      navigate('/home');
    } catch (error) {
      toast({
        title: 'Submission failed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'purple';
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="gray.800" rounded="md" color="white">
      {/* Back to Overview */}
      <Button
        onClick={() => navigate('/home')}
        variant="ghost"
        mb={6}
        color="gray.400"
        leftIcon={<FaArrowLeft />}
        _hover={{ color: 'purple.300', transform: 'translateX(-2px)' }}
      >
        Back to Overview
      </Button>

      <Heading size="md" mb={6} color="purple.300">
        Submit Your Project
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Week Number</FormLabel>
        <Input
          value={weekNumber}
          onChange={(e) => setWeekNumber(e.target.value)}
          placeholder="e.g. 1"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>GitHub Repository Link</FormLabel>
        <Input
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          placeholder="https://github.com/your-project"
        />
      </FormControl>

      <Button colorScheme="purple" onClick={handleSubmit} width="full" mb={10}>
        Submit
      </Button>

      {/* User Submission History */}
      <Heading size="sm" mb={4} color="purple.200">
        Your Submissions
      </Heading>

      {loading ? (
        <Spinner color="purple.400" />
      ) : submissions.length === 0 ? (
        <Text fontSize="sm" color="gray.400">
          No submissions yet.
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {submissions.map((s) => (
            <Box
              key={s._id}
              p={4}
              bg="gray.700"
              rounded="md"
              shadow="md"
              borderLeft="4px solid"
              borderColor="purple.500"
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">Week {s.weekNumber}</Text>
                <Badge colorScheme={getBadgeColor(s.status)}>{s.status}</Badge>
              </HStack>

              <HStack mt={2} spacing={3}>
                <Button
                  as="a"
                  href={s.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xs"
                  colorScheme="purple"
                  variant="link"
                  leftIcon={<Icon as={FaExternalLinkAlt} />}
                >
                  View Repo
                </Button>
              </HStack>

              {s.feedback && (
                <Text mt={2} fontSize="xs" color="green.300">
                  Feedback: {s.feedback}
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SubmitProject;
