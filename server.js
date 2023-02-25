const express = require('express');
const path = require('path');
const uuid = require('uuid');
const db = require('./helpers/db');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uuid.v4(),
      title,
      text,
    };

    db.readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Note not posted');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  if (noteId) {
    db.readAndDeleteById(noteId, './db/db.json');
  }

  // Respond with no content
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
