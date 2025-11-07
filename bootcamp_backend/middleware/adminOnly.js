const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Not authorized, token missing' });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Admin access only' });
  }

  next();
};

export default adminOnly;
