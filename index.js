const connection = require('./conf');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

// GET

app.get('/api/album', (req, res) => {
  connection.query('SELECT * from album', (err, results) => {
    if (err) {
      res.status(500).send('ERREUR lors de la récupération des albums');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/track', (req, res) => {
  connection.query('SELECT * from track', (err, results) => {
    if (err) {
      res.status(500).send('ERREUR lors de la récupération des albums');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/album/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * from album WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send("ERREUR lors de la récupération d'un album");
    } else {
      res.json(results);
    }
  });
});

app.get('/api/album/:id/tracks', (req, res) => {
  const id = req.params.id;
  let genre = '';
  let title = '';
  let artist = '';

  if (req.query.genre) {
    genre = `AND a.genre="${req.query.genre}"`;
  }

  if (req.query.title) {
    title = `AND a.album_title LIKE "%${req.query.title}%"`;
  }

  if (req.query.artist) {
    artist = `AND a.artist LIKE "${req.query.artist}%"`;
  }

  connection.query(
    `SELECT a.id, a.album_title, a.genre, a.artist, t.title FROM track t JOIN album a ON t.album_id = a.id WHERE a.id = ${id} ${genre} ${title} ${artist}`,
    (err, results) => {
      if (err) {
        res.status(500).send('ERREUR lors de la récupération des tracks');
      } else {
        res.json(results);
      }
    }
  );
});

// POST

app.post('/api/album', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO album SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("ERREUR lors de la sauvegarde d'un albums");
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/api/track', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO track SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("ERREUR lors de la sauvegarde d'une track");
    } else {
      res.sendStatus(200);
    }
  });
});

// DELETE

app.delete('/api/album/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM album WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send("ERREUR lors de la suppression d'un album");
    } else {
      res.sendStatus(200);
    }
  });
});

// PUT

app.put('/api/album/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query(
    'UPDATE album SET ? WHERE id = ?',
    [formData, id],
    (err, results) => {
      if (err) {
        res.status(500).send("ERREUR lors de la modification d'un album");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put('/api/track/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query(
    'UPDATE track SET ? WHERE id = ?',
    [formData, id],
    (err, results) => {
      if (err) {
        res.status(500).send("ERREUR lors de la modification d'une track");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
