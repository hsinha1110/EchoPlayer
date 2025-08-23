import express from "express";

import Note, { NoteDocument } from "./models/notes"; // Importing the Note model
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
interface IncomingBody {
  title: string;
  description?: string;
}
// create a post route
app.post("/create", async (req, res) => {
  // here we need data so that we can create new note/todo
  // res.send("<h1>Hello World</h1>");
  const newNote = new Note<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  await newNote.save();
  res.json({ message: "I am listening to create !!" });
});

//update note
app.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    return res.json({ message: "Note not found!" });
  }

  const { title, description } = req.body as IncomingBody;
  if (title) note.title = title;
  if (description) note.description = description;

  await note.save();
  res.json({
    note,
  });
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
