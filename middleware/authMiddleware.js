const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //   check if there is cookie inside the user browser
  if (token) {
    jwt.verify(token, "todo list", (err, decodedToken) => {
      if (err) {
        console.log(decodedToken);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
