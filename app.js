const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();
mongoose
  .connect(process.env.MONGODB_URI)
  .then((then) => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Register View Engine
app.set("view engine", "ejs");

// Listen for Requests
app.listen(3000, () => {
  console.log("Server is Running on Port 3000");
});
// Middleware & Static Files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Mongoose and Mongo Sandbox Routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "About My New Blog",
//     body: "More About My New Blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("6761de954571d03e5646085b")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// Routes
app.get("/", (req, res) => {
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
