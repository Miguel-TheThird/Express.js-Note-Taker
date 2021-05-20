const express = require('express');
const path = require('path');
const fs = require("fs")

// Sets up the Express App

const app = express();
const PORT = 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname , '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

 app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes); 
}); 


// Starts the server to begin listening

app.listen(PORT, () => console.log(`Note Taker App is listening to PORT ${PORT}`));





