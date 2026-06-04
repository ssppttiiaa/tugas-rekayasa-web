const express = require("express");
const app = express();

app.use(express.json());

const authRoutes =
require("./library-api/routes/authRoutes");

const userRoutes =
require("./library-api/routes/userRoutes");

const bookRoutes =
require("./library-api/routes/bookRoutes");

const borrowingRoutes =
require("./library-api/routes/borrowingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrowings", borrowingRoutes);

module.exports = app;