import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  Box,
  Heading,
  VStack,
  Text,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { FlaskConicalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate

// 1. Import react-syntax-highlighter + a theme
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 2. Optional: detect language from the snippet
const detectLanguage = (code) => {
  // If snippet includes doctype or <html>, treat it as HTML
  if (
    code.toLowerCase().includes('<!doctype html') ||
    code.toLowerCase().includes('<html')
  ) {
    return 'html';
  }
  // If snippet looks like CSS (.class { } or #id { }), treat it as CSS
  if (/\.(\w+)\s*\{|#(\w+)\s*\{/.test(code)) {
    return 'css';
  }
  // Otherwise, default to JS
  return 'javascript';
};

// 3. Split the question string by either:
//    - `<!DOCTYPE html>` for HTML
//    - OR if that’s not found, split by the first colon `:` for JS/CSS
const splitQuestionAndCode = (text) => {
  const htmlMarker = '<!DOCTYPE html>';
  const htmlIndex = text.indexOf(htmlMarker);

  // If we find <!DOCTYPE html>, do the HTML split
  if (htmlIndex !== -1) {
    return {
      questionText: text.substring(0, htmlIndex).trim(),
      codeSnippet: text.substring(htmlIndex).trim(),
    };
  }

  // Otherwise, look for the first colon
  const colonIndex = text.indexOf(':');
  if (colonIndex !== -1) {
    return {
      questionText: text.substring(0, colonIndex).trim(),
      codeSnippet: text.substring(colonIndex + 1).trim(),
    };
  }

  // If no colon and no <!DOCTYPE html> is found,
  // we assume there's no code snippet in this question
  return { questionText: text, codeSnippet: null };
};

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const toast = useToast();
    const navigate = useNavigate(); // 👈 Define the hook

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await API.get('/tests/student/all');
        console.log('Fetched tests:', res.data);
        setTests(res.data);
      } catch (err) {
        console.error('Error loading tests', err);
      }
    };
    fetchTests();
  }, []);

  const handleAnswerChange = (testId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [testId]: value,
    }));
  };

  const handleSubmit = async (testId) => {
    try {
      const res = await API.post(`/tests/${testId}/submit`, {
        answer: answers[testId],
      });
      console.log(`Test ${testId} submission response:`, res.data);
      setResults((prev) => ({
        ...prev,
        [testId]: {
          status: res.data.isCorrect ? 'correct' : 'incorrect',
          msg: res.data.msg,
        },
      }));
      toast({
        title: res.data.msg,
        status: res.data.isCorrect ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      const msg = err.response?.data?.msg || 'Error submitting answer';
      toast({ title: msg, status: 'error', duration: 3000, isClosable: true });
      console.error(`Error submitting test ${testId}:`, err);
    }
  };

  return (
    <Box p={6} color="white">
      <Heading mb={4} display="flex" alignItems="center" gap={2}>
          <FlaskConicalIcon size={28} color="#a78bfa" />
          Tests
        </Heading>

       <Box mb={4} onClick={() => navigate('/home')}>
              <Button variant="ghost" color="gray.400" leftIcon={<FaArrowLeft />}>
                Back to Overview
              </Button>
            </Box>
      <VStack spacing={6} align="stretch">
        {tests.length === 0 ? (
          <Text>No tests available yet.</Text>
        ) : (
          tests.map((test) => {
            // 4. Split the question + code
            const { questionText, codeSnippet } = splitQuestionAndCode(test.question);
            console.log(`Test ${test._id} code snippet:`, codeSnippet);

            // 5. Decide which language to use for highlighting
            const lang = codeSnippet ? detectLanguage(codeSnippet) : 'javascript';

            return (
              <Box key={test._id} bg="gray.700" p={5} rounded="md">
                <Text fontWeight="bold" mb={1}>
                  Week {test.weekNumber}
                </Text>
                <Text mb={2}>{questionText}</Text>

                {/* 6. Render the code snippet if it exists */}
                {codeSnippet && (
                  <Box mb={4}>
                    <SyntaxHighlighter
                      language={lang}
                      style={dracula}
                      showLineNumbers
                      wrapLongLines
                      PreTag="div"
                      customStyle={{
                        backgroundColor: '#1e1e1e',
                        padding: '16px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                      }}
                    >
                      {codeSnippet}
                    </SyntaxHighlighter>
                  </Box>
                )}

                <Input
                  placeholder="Your answer"
                  value={answers[test._id] || ''}
                  onChange={(e) => handleAnswerChange(test._id, e.target.value)}
                  bg="gray.800"
                  borderColor="gray.600"
                />

                <Button
                  mt={2}
                  onClick={() => handleSubmit(test._id)}
                  colorScheme="purple"
                  isDisabled={results[test._id]?.status === 'correct'}
                >
                  Submit Answer
                </Button>

                {results[test._id] && (
                  <Text
                    mt={2}
                    fontSize="sm"
                    color={
                      results[test._id].status === 'correct'
                        ? 'green.300'
                        : 'red.300'
                    }
                  >
                    {results[test._id].msg}
                  </Text>
                )}
              </Box>
            );
          })
        )}
      </VStack>

      {/* Summary Section */}
      {tests.length > 0 && Object.keys(results).length === tests.length && (
        <Box mt={10} p={4} bg="gray.800" rounded="md" border="1px solid #4A5568">
          <Heading size="md" mb={3}>
            📊 Your Test Summary
          </Heading>
          <Text>Total Submitted: {Object.keys(results).length}</Text>
          {(() => {
            const total = Object.keys(results).length;
            const correct = Object.values(results).filter(
              (r) => r.status === 'correct'
            ).length;
            const score = total > 0 ? Math.round((correct / total) * 100) : 0;
            return (
              <>
                <Text>Correct Answers: {correct}</Text>
                <Text>Score: {score}%</Text>
              </>
            );
          })()}
        </Box>
      )}
    </Box>
  );
};

export default Tests;
