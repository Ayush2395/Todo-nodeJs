const express = require("express");
const routes = require("./routes/routes");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cookiParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookiParser());

app.set("view engine", "ejs");

// mongodb database connection
mongoose.connect("mongodb://localhost:27017/Todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Database connected"));

// main route
app.get("/", (req, res) => {
  res.render("index", { title: "Todos" });
});
app.get("/pokemon", requireAuth, (req, res) => {
  res.render("pokemon", { title: "Pokemon" });
});

// auth routes
app.use(routes);

// error page route
app.use((req, res) => {
  res.render("404", { title: "Page not found" });
});

app.listen(port, () => console.log(`server running on port ${port}`));
