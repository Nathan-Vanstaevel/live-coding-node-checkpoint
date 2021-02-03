const connection = require('./conf');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

// GET

app.get('/api/user', (req, res) => {
  connection.query('SELECT * from user', (err, results) => {
    if (err) {
      res.status(500).send('ERREUR lors de la récupération du user');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/post', (req, res) => {
  connection.query('SELECT * from post', (err, results) => {
    if (err) {
      res.status(500).send('ERREUR lors de la récupération des post');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/post/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * from post WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send("ERREUR lors de la récupération d'un post");
    } else {
      res.json(results);
    }
  });
});

app.get('/api/post/:id/comment', (req, res) => {
  connection.query('SELECT * from comment', (err, results) => {
    if (err) {
      res.status(500).send('ERREUR lors de la récupération des commentaire');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/post/:id/comment/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * from comment WHERE id=${id}`, (err, results) => {
    if (err) {
      res.status(500).send("ERREUR lors de la récupération d'un commentaire");
    } else {
      res.json(results);
    }
  });
});

// POST

app.post('/api/post', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO post SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('ERREUR lors de la publication');
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/api/comment', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO comment SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("ERREUR lors de la publication d'un commentaire");
    } else {
      res.sendStatus(200);
    }
  });
});

// DELETE

app.delete('/api/post/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM post WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send('ERREUR lors de la suppression du post');
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/comment/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM comment WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send('ERREUR lors de la suppression du commentaire');
    } else {
      res.sendStatus(200);
    }
  });
});

// PUT

app.put('/api/post/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query(
    'UPDATE post SET ? WHERE id = ?',
    [formData, id],
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send('ERREUR lors de la modification de la publication');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put('/api/comment/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connection.query(
    'UPDATE comment SET ? WHERE id = ?',
    [formData, id],
    (err, results) => {
      if (err) {
        res.status(500).send('ERREUR lors de la modification du commentaire');
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
