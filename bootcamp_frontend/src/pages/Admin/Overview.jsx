import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaUsers,
  FaClipboardCheck,
  FaCalendarWeek,
  FaBullhorn,
  FaPlusCircle,
  FaFlask,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import AdminNavbar from '../../components/AdminNavBar2';

const Overview = () => {
  const [metrics, setMetrics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await API.get('/admin/overview');
        setMetrics([
          { label: 'Total Students', value: res.data.totalStudents, icon: FaUsers },
          { label: 'Submissions', value: res.data.totalSubmissions, icon: FaClipboardCheck },
          { label: 'Weeks', value: res.data.totalWeeks, icon: FaCalendarWeek },
          { label: 'Announcements', value: res.data.totalAnnouncements, icon: FaBullhorn },
        ]);
      } catch (err) {
        console.error('Error loading metrics:', err);
      }
    };
    fetchMetrics();
  }, []);

  // ✅ Added "Manage Students" in admin actions
  const adminActions = [
    { label: 'Manage Students', icon: FaUsers, route: '/admin/students' }, // 👈 new
    { label: 'Manage Tests', icon: FaFlask, route: '/admin/tests' },
    { label: 'Manage Announcements', icon: FaBullhorn, route: '/admin/announcements' },
    { label: 'Add New Week', icon: FaPlusCircle, route: '/admin/weeks' },
    { label: 'Review Submissions', icon: FaClipboardCheck, route: '/admin/submissions' },
  ];

  const cardBg = useColorModeValue('gray.800', 'gray.700');
  const hoverBg = useColorModeValue('purple.600', 'purple.500');

  return (
    <Box minH="100vh" bg="gray.900" color="white" px={6} py={6}>
      <AdminNavbar />

      <Box maxW="7xl" mx="auto">
        <Heading
          size="lg"
          mb={8}
          textAlign="center"
          fontWeight="extrabold"
          color="purple.300"
        >
          Admin Dashboard Overview
        </Heading>

        {/* Statistics Section */}
        <Text fontSize="md" mb={4} color="gray.400" fontWeight="semibold">
          Platform Statistics
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={12}>
          {metrics.map((metric, index) => (
            <Box
              key={index}
              p={6}
              bg={cardBg}
              rounded="xl"
              textAlign="center"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.700"
              transition="all 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Icon as={metric.icon} boxSize={6} mb={3} color="purple.400" />
              <Text fontSize="sm" color="gray.400" mb={1}>
                {metric.label}
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {metric.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Admin Actions Section */}
        <Text fontSize="md" mb={4} color="gray.400" fontWeight="semibold">
          Admin Management Tools
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} mb={12}>
          {adminActions.map((action, index) => (
            <Button
              key={index}
              onClick={() => navigate(action.route)}
              leftIcon={<Icon as={action.icon} />}
              bg="purple.700"
              _hover={{ bg: hoverBg, transform: 'scale(1.03)' }}
              color="white"
              size="lg"
              rounded="xl"
              py={6}
              boxShadow="lg"
              fontWeight="semibold"
              transition="all 0.2s ease"
            >
              {action.label}
            </Button>
          ))}
        </SimpleGrid>

        {/* Chart Section */}
        <Box
          bg="gray.800"
          p={8}
          rounded="xl"
          boxShadow="lg"
          mt={4}
        >
          <Heading size="md" color="purple.200" mb={4} textAlign="center">
            Platform Statistics Overview
          </Heading>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis
                dataKey="label"
                stroke="#CBD5E0"
                angle={-45}
                textAnchor="end"
                interval={0}
                tickMargin={20}
                height={80}
                tick={{ fontSize: 10 }}
              />
              <YAxis stroke="#CBD5E0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A202C', borderColor: '#4A5568' }}
                labelStyle={{ color: '#FBD38D' }}
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
              />
              <Bar dataKey="value" fill="#9F7AEA" barSize={30} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
