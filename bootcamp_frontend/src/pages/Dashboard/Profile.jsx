import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Box, Heading, VStack, Text, Flex , Button } from '@chakra-ui/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import { BarChart3Icon } from 'lucide-react';
  
const Profile = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // 👈 Define the hook

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/tests/results/me');
        setResults(res.data || []);
      } catch (err) {
        console.error('Error loading grades', err);
      }
    };

    fetchResults();
  }, []);

  // ✅ Deduplicate by test._id (keep latest submission per test)
  const latestResultsMap = {};
  results.forEach((res) => {
    const testId = res.test?._id;
    if (!testId) return;

    // if it's newer, overwrite
    if (!latestResultsMap[testId] || new Date(res.createdAt) > new Date(latestResultsMap[testId].createdAt)) {
      latestResultsMap[testId] = res;
    }
  });

  const uniqueResults = Object.values(latestResultsMap);

  // Group by week
  const weekMap = {};
  uniqueResults.forEach((res) => {
    const week = res.test?.weekNumber || res.weekNumber || 'Unknown';
    if (!weekMap[week]) weekMap[week] = [];
    weekMap[week].push(res);
  });

  const weekSummaries = Object.entries(weekMap).map(([week, submissions]) => {
    const correct = submissions.filter((r) => r.isCorrect).length;
    const total = submissions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { week, score };
  });

  const totalCorrect = uniqueResults.filter((r) => r.isCorrect).length;
  const totalSubmitted = uniqueResults.length;
  const overallScore = totalSubmitted > 0 ? Math.round((totalCorrect / totalSubmitted) * 100) : 0;

  return (
    <Box p={6} color="white">
      <Heading mb={6} display="flex" alignItems="center" gap={2}>
          <BarChart3Icon size={28} color="#a78bfa" />
          My Grades
      </Heading>

      <Box mb={4} onClick={() => navigate('/home')}>
        <Button variant="ghost" color="gray.400" leftIcon={<FaArrowLeft />}>
          Back to Overview
        </Button>
      </Box>
      

      <Flex justify="center" mb={8} textAlign="center">
        <Box>
          <Heading size="md" mb={2}>📈 Overall Score</Heading>
          <Box w="150px" h="150px" mx="auto">
            <CircularProgressbar
              value={overallScore}
              text={`${overallScore}%`}
              styles={buildStyles({
                textColor: 'white',
                pathColor: '#805AD5',
                trailColor: '#2D3748',
              })}
            />
          </Box>
        </Box>
      </Flex>

      <VStack spacing={4}>
        {weekSummaries.length === 0 ? (
          <Text>No grades yet.</Text>
        ) : (
          weekSummaries.map((summary, i) => (
            <Box key={i} bg="gray.700" p={4} rounded="md" w="100%">
              <Text fontWeight="bold">Week {summary.week}</Text>
              <Text fontSize="sm">Score: {summary.score}%</Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default Profile;
