  import React, { useEffect, useState } from 'react';
  import {
    Box,
    Heading,
    VStack,
    Text,
    Button,
    useToast,
    HStack,
    Icon,
    Badge,
    Spinner,
    Textarea,
  } from '@chakra-ui/react';
  import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
  import { useNavigate } from 'react-router-dom';
  import API from '../../services/api';

  const ReviewSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState({});
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          const res = await API.get('/submissions/all'); // ✅ Make sure this route is in backend
          setSubmissions(res.data);
        } catch (err) {
          toast({
            title: 'Failed to fetch submissions.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      };

      fetchSubmissions();
    }, [toast]);

    const handleReview = async (id, status) => {
      try {
        await API.patch(`/submissions/${id.trim()}/review`, {
          status,
          feedback: feedbacks[id] || '',
        });
        toast({
          title: `Submission ${status} successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setSubmissions((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, status, feedback: feedbacks[id] || '' } : s
          )
        );
      } catch (err) {
        toast({
          title: 'Review failed.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    return (
      <Box minH="100vh" bg="gray.900" color="white" px={6} py={4}>
        <Button
          variant="ghost"
          color="gray.400"
          leftIcon={<FaArrowLeft />}
          mb={4}
          onClick={() => navigate('/admin')}
          _hover={{ color: 'purple.400' }}
        >
          Back to Overview
        </Button>

        <Heading size="lg" mb={6} color="purple.200" fontWeight="extrabold">
          Student Project Submissions
        </Heading>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <Spinner size="lg" color="purple.400" />
          </Box>
        ) : submissions.length === 0 ? (
          <Text color="gray.500">No submissions yet.</Text>
        ) : (
          <VStack spacing={6} align="stretch">
            {submissions.map((s) => (
              <Box
                key={s._id}
                p={5}
                bg="gray.800"
                rounded="lg"
                shadow="md"
                borderLeft="4px solid"
                borderColor="purple.500"
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Week {s.weekNumber}
                  </Text>
                  <Badge colorScheme={s.status === 'accepted' ? 'green' : s.status === 'rejected' ? 'red' : 'purple'}>
                    {s.status || 'pending'}
                </Badge>

                </HStack>

                <Text fontSize="sm" color="gray.300">
                  Submitted by: {s.studentId?.name || 'Unknown'}
                </Text>

                <HStack mt={2} spacing={3}>
                  <Button
                    as="a"
                    href={s.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="purple"
                    size="sm"
                    leftIcon={<Icon as={FaExternalLinkAlt} />}
                  >
                    View Repository
                  </Button>
                </HStack>

                <Textarea
                  placeholder="Optional feedback..."
                  size="sm"
                  mt={4}
                  bg="gray.700"
                  value={feedbacks[s._id] || ''}
                  onChange={(e) =>
                    setFeedbacks({ ...feedbacks, [s._id]: e.target.value })
                  }
                />

                <HStack mt={3} spacing={4}>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleReview(s._id, 'accepted')}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleReview(s._id, 'rejected')}
                  >
                    Reject
                  </Button>
                </HStack>

                {s.feedback && (
                  <Text fontSize="xs" mt={3} color="green.300">
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

  export default ReviewSubmissions;
