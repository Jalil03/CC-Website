// controllers/testController.js
import Test from '../models/Test.js';
import Student from '../models/Student.js';
import js_beautify from 'js-beautify';


export const submitTest = async (req, res) => {
  try {
    const { weekNumber, answer } = req.body;

    const test = await Test.findOne({ weekNumber });
    if (!test) return res.status(404).json({ msg: 'Test not found' });

    if (test.correctAnswer.toLowerCase() === answer.toLowerCase()) {
      // Avoid duplicate progress entries
      if (!req.user.progress.includes(weekNumber)) { 
        req.user.progress.push(weekNumber);
        await req.user.save();
      }
      return res.json({ msg: '✅ Correct! Progress updated.' });
    }

    res.status(400).json({ msg: '❌ Incorrect answer. Try again!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit test' });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ weekNumber: 1 });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
};


// Import this at the top if needed
const beautify = js_beautify

export const createTest = async (req, res) => {
  try {
    let { weekNumber, question, correctAnswer, questionType, choices } = req.body;

    if (['code_html', 'code_js', 'code_css'].includes(questionType)) {
      const marker = '<!DOCTYPE html>';
      const index = question.indexOf(marker);

      if (index !== -1) {
        const beforeCode = question.slice(0, index).trim();
        const code = question.slice(index).trim();

        const beautified = beautify(code, {
          indent_size: 2,
          space_in_empty_paren: true,
          preserve_newlines: true,
          max_preserve_newlines: 10,
          wrap_line_length: 80
        });

        question = `${beforeCode}\n${beautified}`;
      }
    }

    const test = new Test({
      weekNumber,
      question,
      correctAnswer,
      questionType,
      choices,
    });

    await test.save();
    res.status(201).json({ msg: 'Test created successfully', test });
  } catch (err) {
    console.error('❌ Error creating test:', err);
    res.status(500).json({ error: 'Failed to create test' });
  }
};




// controllers/testController.js
export const getTestByWeek = async (req, res) => {
    try {
      const { weekNumber } = req.params;
  
      const test = await Test.findOne({ weekNumber });
  
      if (!test) return res.status(404).json({ msg: 'Test not found' });
  
      // Don’t expose correct answer!
      const { _id, question } = test;
      res.json({ _id, question });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch test' });
    }
  };
  