import express from "express";
import "./db"; // Importing the database connection
// create a server
const app = express();

// this will parse the incoming request with JSON payloads
app.use(express.json());

// this will parse the incoming request from html form
app.use(express.urlencoded({ extended: false }));

// create a get route
app.get("/", (request, response) => {
  response.send("<h1>Hello World,How are you?</h1>");
});

// create a route
app.post("/", (req, res) => {
  // here we need data so that we can create new note/todo
  // res.send("<h1>Hello World</h1>");
  console.log(req.body);
  res.json({ message: "I am listening " });
});

// create a post route
app.post("/create", (req, res) => {
  // here we need data so that we can create new note/todo
  // res.send("<h1>Hello World</h1>");
  console.log(req.body);
  res.json({ message: "I am listening to create !!" });
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
