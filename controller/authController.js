const userModel = require("../models/user");

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
    res.json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports = { login_get, login_post, signup_get, signup_post };
