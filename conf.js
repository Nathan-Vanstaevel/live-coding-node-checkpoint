const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // l'adresse du serveur
  user: 'root', // identifiant mysql
  password: 'root', // mot de passe mysql
  database: 'playlist_db', // nom de la database
});

module.exports = connection;
