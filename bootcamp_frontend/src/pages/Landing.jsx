import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Stack,
  Image,
  HStack,
  Link,
  SimpleGrid,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDiscord, FaGithub, FaLinkedin, FaInstagram, FaCode, FaServer, FaUsers, FaGraduationCap, FaFolderOpen ,FaCertificate  } from 'react-icons/fa';
import logo from '../assets/logo.png';
import ContactForm from './ContactForm';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Landing = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);


  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      color="white"
      bgGradient="linear(to-b, #0f0c29, #302b63, #24243e)"
    >
      {/* Background Container */}
      <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={0} overflow="hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: "transparent" },
            particles: {
              number: { value: 50 },
              size: { value: 1.5 },
              move: { enable: true, speed: 0.5 },
              opacity: { value: 0.3 },
              color: { value: "#ffffff" },
            },
          }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />

        <Box
          position="absolute"
          w="100%"
          h="100%"
          bgImage="url('https://www.transparenttextures.com/patterns/stardust.png')"
          opacity={0.04}
        />

        <Box
          position="absolute"
          w="100%"
          h="100%"
          backgroundImage="linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)"
          backgroundSize="40px 40px"
        />

        <Box
          position="absolute"
          top="30%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)"
          filter="blur(120px)"
        />

        {/* Responsive glow blobs */}
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          top="10%"
          left="10%"
          w="200px"
          h="200px"
          bgGradient="linear(to-br, pink.400, purple.500)"
          borderRadius="full"
          filter="blur(100px)"
          opacity={0.15}
          animation={`${float} 10s ease-in-out infinite`}
        />
        <Box
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          bottom="10%"
          right="10%"
          w="200px"
          h="200px"
          bgGradient="linear(to-br, blue.400, purple.500)"
          borderRadius="full"
          filter="blur(100px)"
          opacity={0.15}
          animation={`${float} 14s ease-in-out infinite`}
        />
        <Box
          display={{ base: 'none', md: 'block' }}
          as="svg"
          position="absolute"
          bottom="5%"
          right="5%"
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
          opacity="0.06"
          fill="none"
          stroke="white"
          strokeWidth="1"
        >
          <polygon points="50,15 90,85 10,85" stroke="currentColor" fill="transparent">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="40s"
              repeatCount="indefinite"
            />
          </polygon>
        </Box>

        <Image
          src={logo}
          alt="Floating Logo"
          position="absolute"
          top="8%"
          right="-60px"
          boxSize={{ base: '140px', md: '240px' }}
          opacity={0.03}
          transform="rotate(-20deg)"
          animation={`${float} 6s ease-in-out infinite`}
          pointerEvents="none"
        />
      </Box>

      {/* Content */}
      <Box position="relative" zIndex={1}>
      <MotionFlex
              as="nav"
              justify="space-between"
              align="center"
              px={{ base: 6, md: 10 }}
              py={3}
              mt={4}
              mx="auto"
              maxW="container.xl"
              position="sticky"
              top="0"
              zIndex="999"
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              boxShadow="0 10px 30px rgba(0, 0, 0, 0.25)"
              style={{
                WebkitBackdropFilter: 'blur(20px)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                borderBottomLeftRadius: '60px 40px',
                borderBottomRightRadius: '60px 40px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >

          <HStack spacing={4} align="center">
            <Image src={logo} alt="Logo" boxSize="40px" borderRadius="full" />
            <Heading size="md" bgGradient="linear(to-r, violet.400, purple.500)" bgClip="text">
              Code Crafters
            </Heading>
          </HStack>
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }} fontWeight="medium">
            <Link href="#home" _hover={{ color: 'purple.400' }}>Home</Link>
            <Link href="#about" _hover={{ color: 'purple.400' }}>About</Link>
            <Link href="#contact" _hover={{ color: 'purple.400' }}>Contact</Link>
            <Button colorScheme="purple" size="sm" onClick={() => navigate('/login')}>Login</Button>
            <Button colorScheme="purple" variant="outline" size="sm" onClick={() => navigate('/register')}>Sign Up</Button>
          </HStack>
          <IconButton display={{ base: 'flex', md: 'none' }} icon={<HamburgerIcon />} variant="ghost" aria-label="Open menu" onClick={onOpen} />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="#1a202c" color="white">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="start">
                <Text cursor="pointer" onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100); // wait for drawer to close
                    }}>
                      Home
                    </Text>
                  <Text cursor="pointer" onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100); // wait for drawer to close
                    }}>
                      About
                    </Text>

                    <Text cursor="pointer" onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100); // wait for drawer to close
                    }}>
                      Contact Us
                    </Text>
                  <Button colorScheme="purple" size="sm" onClick={() => { navigate('/login'); onClose(); }}>Login</Button>
                  <Button colorScheme="purple" variant="outline" size="sm" onClick={() => { navigate('/register'); onClose(); }}>Sign Up</Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </MotionFlex>

        {/* Hero Section */}
        <MotionBox
  id="home"
  minH={{ base: 'auto', md: '100vh' }}
  position="relative"
  scrollMarginTop="100px"
  px={6}
  py={{ base: 16, md: 40 }}
  textAlign="center"
  overflow="hidden"
>

          <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 50 },
      size: { value: 1.5 },
      move: { enable: true, speed: 0.5 },
      opacity: { value: 0.3 },
      color: { value: "#ffffff" },
    },
  }}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  }}
/>
{/* Floating Orbs */}
          <Box
            position="absolute"
            top="35%"
            left="8%"
            w="60px"
            h="60px"
            bg="linear-gradient(145deg, #7f00ff, #e100ff)"
            borderRadius="full"
            boxShadow="0 0 30px rgba(128, 90, 213, 0.5)"
            animation={`${float} 9s ease-in-out infinite`}
            opacity={0.3}
            zIndex={0}
          />    
          <MotionVStack
            spacing={6}
            maxW="lg"
            mx="auto"
            position="relative"
            zIndex={1}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MotionHeading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="extrabold"
              bgGradient="linear(to-r, #d946ef, #7c3aed, #9333ea)"
              bgClip="text"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              Unlock Your Tech Career
            </MotionHeading>

            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300">
              Build real projects. Learn modern tools. Get mentored by industry experts in our immersive 6-week full-stack bootcamp.
            </Text>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} pt={4} justify="center">
              <Button size="lg" px={8} colorScheme="purple" fontWeight="bold" bgGradient="linear(to-r, purple.500, pink.400)" _hover={{ boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)', transform: 'scale(1.05)' }} transition="all 0.3s ease" onClick={() => navigate('/register')}>Join Now</Button>
              <Button size="lg" px={8} variant="outline" colorScheme="purple" fontWeight="bold" _hover={{ bg: 'whiteAlpha.100', boxShadow: '0 0 10px rgba(128, 90, 213, 0.5)', transform: 'scale(1.05)' }} transition="all 0.3s ease" onClick={() => navigate('/login')}>Login</Button>
            </Stack>
          </MotionVStack>
          <Box
  position="absolute"
  bottom="30%"
  right="15%"
  w="80px"
  h="80px"
  bg="linear-gradient(145deg, #9333ea, #f43f5e)"
  borderRadius="full"
  boxShadow="0 0 30px rgba(236, 72, 153, 0.4)"
  animation={`${float} 11s ease-in-out infinite`}
  opacity={0.2}
/>
        </MotionBox>

<Flex justify="center" mt={6}>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    <Link href="#about">
      <Box
        as="span"
        fontSize="2xl"
        scrollMarginTop="100px"
        color="purple.400"
        cursor="pointer"
      >
        ↓
      </Box>
    </Link>
  </motion.div>
</Flex>
        {/* About Section */}
        {/* About Section with Icons Instead of Emojis */}
      <MotionBox id="about" py={{ base: 16, md: 24 }} px={6}>
        <VStack spacing={8} maxW="5xl" mx="auto" textAlign="center">
          <Heading size="xl" color="purple.300">What You'll Learn</Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300">
            Our full-stack bootcamp is built to transform beginners into job-ready developers. Over 6 immersive weeks, you'll master:
          </Text>
          <VStack spacing={3} fontSize={{ base: 'sm', md: 'md' }} color="gray.400" align="start">
            <HStack><FaCode color="#d946ef" /><Text>Frontend: HTML, CSS, JavaScript, React</Text></HStack>
            <HStack><FaServer color="#7c3aed" /><Text>Backend: Node.js, Express, MongoDB</Text></HStack>
            <HStack><FaUsers color="#9333ea" /><Text>Git, GitHub, Agile workflows, team collaboration</Text></HStack>
            <HStack><FaFolderOpen color="#a855f7" /><Text>Real-world projects to build your portfolio</Text></HStack>
            <HStack><FaGraduationCap color="#d946ef" /><Text>Mentorship & feedback from industry professionals</Text></HStack>
          </VStack>
        </VStack>
      </MotionBox>
        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} px={6} textAlign="center">
  {[
    { value: '100+', label: 'Students Trained' },
    { value: '10+', label: 'Projects Built' },
    { value: '6 Weeks', label: 'Bootcamp Duration' },
    { value: 'Yes', label: 'Certificate Awarded' }, // ✅ added here
  ].map((stat, i) => (
    <MotionBox
  key={i}
  p={6}
  borderRadius="2xl"
  bg="rgba(255,255,255,0.05)"
  backdropFilter="blur(10px)"
  border="1px solid rgba(255,255,255,0.15)"
  whileHover={{ scale: 1.05 }}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: i * 0.2 }}
  viewport={{ once: true }}
>
  <VStack spacing={3} align="center">
    {stat.label === 'Certificate Awarded' && (
      <FaGraduationCap size={32} color="#a78bfa" />
    )}
    <Heading size="xl" color="purple.400">
      {stat.value}
    </Heading>
    <Text color="gray.400">{stat.label}</Text>
  </VStack>
</MotionBox>

  ))}
</SimpleGrid>


        {/* Contact Section */}
        <MotionBox id="contact" py={{ base: 16, md: 24 }} px={6}>
          <VStack spacing={8} maxW="3xl" mx="auto" textAlign="center">
            <Heading size="xl" color="purple.300">Let’s Connect</Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300">
              Have a question? Reach out or join our community below.
            </Text>
            <HStack spacing={6} justify="center" flexWrap="wrap">
              <Link href="https://discord.com" isExternal><FaDiscord size={28} /></Link>
              <Link href="https://github.com/Code-Crafters-BM" isExternal><FaGithub size={28} /></Link>
              <Link href="https://www.linkedin.com/in/code-crafters/" isExternal><FaLinkedin size={28} /></Link>
              <Link href="https://www.instagram.com/codecrafters__bm/" isExternal><FaInstagram size={28} /></Link>
            </HStack>
            {/* <Button size="md" colorScheme="purple" onClick={() => (window.location.href = 'mailto:codecrafters61@gmail.com')}>
              Send Email
            </Button> */}
            <ContactForm />
          </VStack>
        </MotionBox>

        {/* Footer */}
        <Box py={4} textAlign="center" fontSize="sm" color="gray.500" borderTop="1px" borderColor="gray.700">
          &copy; {new Date().getFullYear()} Code Crafters Club. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
