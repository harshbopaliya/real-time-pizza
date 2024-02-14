if (!req.isAuthenticated()) {
  return next();
}

return res.redirect("/");

module.exports = guest;
