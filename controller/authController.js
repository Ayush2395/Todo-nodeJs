const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  const errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "This email is already registered.";
  }

  if (err.message.includes("todo validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

// create json web token
const createToken = (id) => {
  return jwt.sign({ id }, "todo list", { expiresIn: maxAge });
};

const login_get = (req, res) => {
  res.render("login", { title: "Login" });
};
const signup_get = (req, res) => {
  res.render("signup", { title: "Signup" });
};
const login_post = (req, res) => {
  res.send("user login");
};
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({user:user._id});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = { login_get, login_post, signup_get, signup_post };
