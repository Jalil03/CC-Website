import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminNavBar2 = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || { name: 'Admin' });

  const bg = useColorModeValue('rgba(26, 32, 44, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const hoverBg = useColorModeValue('purple.600', 'purple.500');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      px={6}
      py={4}
      bg="rgba(20, 20, 30, 0.7)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid rgba(255,255,255,0.05)"
      borderRadius="2xl"
      mx={4}
      mt={3}
      boxShadow="0 0 15px rgba(128,0,255,0.15)"
    >
      <Text
        fontWeight="bold"
        fontSize="lg"
        color="purple.300"
        letterSpacing="wider"
        cursor="pointer"
        onClick={() => navigate('/admin')}
      >
        ⚙️ Admin Panel
      </Text>

      <Menu>
        <MenuButton
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          cursor="pointer"
        >
          <Avatar
            name={user.name?.charAt(0)?.toUpperCase() || 'A'}
            bg="orange.500"
            size="sm"
            color="white"
          />
        </MenuButton>

        <MenuList
          bg={bg}
          border="1px solid rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          boxShadow="0 4px 20px rgba(0,0,0,0.3)"
          p={2}
          rounded="xl"
          minW="160px"
        >
          <Text px={3} py={1} fontWeight="bold" color="purple.300">
            {user.name || 'Admin'}
          </Text>

          <Divider borderColor="gray.700" my={2} />

          <MenuItem
            onClick={() => navigate('/admin/profile')}
            _hover={{ bg: hoverBg }}
            bg="transparent"
            color="white"
            fontWeight="medium"
            rounded="md"
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            _hover={{ bg: 'red.500', color: 'white' }}
            color="red.300"
            fontWeight="medium"
            rounded="md"
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AdminNavBar2;
