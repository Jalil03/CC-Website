/* // middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jl_secret';

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default protect;
 */
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

const protect = async (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'jl_secret'; // ✅ fallback for dev

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // ✅ Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('✅ Token decoded:', decoded);

    // ✅ Fetch user from DB
    const student = await Student.findById(decoded.id).select('-password');
    if (!student) {
      return res.status(401).json({ msg: 'Invalid or expired token (user not found)' });
    }

    // ✅ Attach user to request
    req.user = student;
    next();
  } catch (err) {
    console.error('❌ JWT Verification Error:', err.message);
    return res.status(401).json({ msg: 'Token not valid or expired' });
  }
};

export default protect;
