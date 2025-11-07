import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  useToast,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCrown } from "react-icons/fa";
import API from "../../services/api";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data);
    } catch (err) {
      console.error("Error fetching student:", err);
      toast({
        title: "Failed to load student details",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/students/${id}/promote`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Student promoted to admin successfully 🎉",
        status: "success",
        duration: 3000,
      });
      fetchStudent();
    } catch (err) {
      toast({
        title: "Failed to promote student",
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (loading)
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" color="purple.400" />
        <Text mt={4} color="gray.400">Loading student details...</Text>
      </Box>
    );

  if (!student)
    return (
      <Box textAlign="center" mt={20}>
        <Text color="gray.400">No student found.</Text>
      </Box>
    );

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={6}>
      <Button
        leftIcon={<FaArrowLeft />}
        variant="ghost"
        color="gray.400"
        onClick={() => navigate("/admin/students")}
        mb={6}
      >
        Back to Students
      </Button>

      <Heading size="lg" color="purple.300" mb={6}>
        👤 Student Profile
      </Heading>

      <Box bg="gray.800" p={6} rounded="xl" boxShadow="lg" mb={8}>
        <Text fontSize="xl" fontWeight="bold">{student.name}</Text>
        <Text color="gray.400" fontSize="sm" mb={2}>{student.email}</Text>
        <Text color={student.isAdmin ? "yellow.400" : "gray.500"}>
          {student.isAdmin ? "Admin" : "Student"}
        </Text>

        {!student.isAdmin && (
          <Button
            leftIcon={<FaCrown />}
            mt={4}
            colorScheme="purple"
            onClick={handlePromote}
          >
            Promote to Admin
          </Button>
        )}
      </Box>

      <Divider mb={8} borderColor="gray.700" />

      {/* Submissions Section */}
      <Heading size="md" mb={4} color="purple.200">
        📂 Project Submissions
      </Heading>
      {student.submissions && student.submissions.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {student.submissions.map((sub, i) => (
            <Box
              key={i}
              bg="gray.800"
              p={4}
              rounded="xl"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.700"
              _hover={{ transform: "scale(1.02)", transition: "0.2s" }}
            >
              <Text fontWeight="bold">{sub.projectTitle || "Untitled Project"}</Text>
              <Text fontSize="sm" color="gray.400" mt={1}>
                Week: {sub.week?.weekNumber || "N/A"}
              </Text>
              <Text fontSize="sm" color="gray.400">
                Status: {sub.status || "Pending"}
              </Text>
              <Text fontSize="sm" color="gray.400">
                Feedback: {sub.feedback || "No feedback yet"}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.500">No submissions available.</Text>
      )}
    </Box>
  );
};

export default StudentDetails;
