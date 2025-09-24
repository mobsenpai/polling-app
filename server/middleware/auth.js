
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) { 
      return next();
    } else {
      res.status(401).json({ msg: 'User not authenticated' });
    }
  },
};