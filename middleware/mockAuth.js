const mockAuth = (req, res, next) => {
  // get userId dynamically from header
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(401).json({
      message: 'user-id header is required'
    });
  }

  req.user = {
    userId
  };

  next();
};

module.exports = mockAuth;
