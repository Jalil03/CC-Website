// src/components/AdminActions.jsx
import { Box, Grid, GridItem, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarWeek, FaClipboardCheck, FaBullhorn, FaFlask, FaInbox } from 'react-icons/fa';

const actions = [
  { label: 'Manage Students', icon: FaUsers, path: '/admin/students' },
  { label: 'Manage Weeks', icon: FaCalendarWeek, path: '/admin/weeks' },
  { label: 'Review Submissions', icon: FaClipboardCheck, path: '/admin/submissions' },
  { label: 'Manage Announcements', icon: FaBullhorn, path: '/admin/announcements' },
  { label: 'Manage Tests', icon: FaFlask, path: '/admin/tests' },
  { label: 'Contact Inbox', icon: FaInbox, path: '/admin/contact' },
];

const AdminActions = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6} mt={8}>
      {actions.map((action, i) => (
        <GridItem
          key={i}
          bg={bg}
          p={6}
          rounded="xl"
          boxShadow="lg"
          textAlign="center"
          cursor="pointer"
          transition="all 0.2s ease"
          _hover={{ transform: 'scale(1.05)', bg: 'purple.700', color: 'white' }}
          onClick={() => navigate(action.path)}
        >
          <Icon as={action.icon} boxSize={6} mb={3} color="purple.300" />
          <Text fontWeight="bold">{action.label}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default AdminActions;

