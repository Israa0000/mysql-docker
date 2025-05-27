const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// COFIGURACIÓN DE LA CONEXIÓN A LA BASE DE DATOS
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass1234',
  port: 3306
});

// ENLACES EN HTML
app.get('/', (req, res) => {
  db.query('SHOW DATABASES', (err, results) => {
    if (err) return res.status(500).send('Error en la consulta');
    let html = `<html><head><title>Bases de datos</title></head><body>`;
    html += `<h1>Bases de datos</h1>`;
    html += `<table border="1"><tr><th>Database</th></tr>`;
    results.forEach(row => {
      html += `<tr><td><a href="/db/${row.Database}">${row.Database}</a></td></tr>`;
    });
    html += `</table></body></html>`;
    res.send(html);
  });
});

// TABLAS DE UNA BASE DE DATOS EN HTML
app.get('/db/:dbname', (req, res) => {
  const dbname = req.params.dbname;
  db.changeUser({ database: dbname }, (err) => {
    if (err) return res.status(500).send('No se pudo cambiar de base de datos');
    db.query('SHOW TABLES', (err, results) => {
      if (err) return res.status(500).send('Error en la consulta');
      let html = `<html><head><title>Tablas de ${dbname}</title></head><body>`;
      html += `<h1>Tablas en ${dbname}</h1>`;
      html += `<a href="/">Volver</a>`;
      html += `<table border="1"><tr><th>Tabla</th></tr>`;
      results.forEach(row => {
        const tableName = row[`Tables_in_${dbname}`];
        html += `<tr><td><a href="/db/${dbname}/table/${tableName}">${tableName}</a></td></tr>`;
      });
      html += `</table></body></html>`;
      res.send(html);
    });
  });
});

// DATOS DE UNA TABLA EN HTML
app.get('/db/:dbname/table/:tablename', (req, res) => {
  const dbname = req.params.dbname;
  const tablename = req.params.tablename;
  db.changeUser({ database: dbname }, (err) => {
    if (err) return res.status(500).send('No se pudo cambiar de base de datos');
    db.query(`SELECT * FROM \`${tablename}\` LIMIT 100`, (err, results, fields) => {
      if (err) return res.status(500).send('Error en la consulta');
      let html = `<html><head><title>${tablename}</title></head><body>`;
      html += `<h1>Tabla: ${tablename} en ${dbname}</h1>`;
      html += `<a href="/db/${dbname}">Volver</a>`;
      if (results.length === 0) {
        html += `<p>La tabla está vacía.</p>`;
      } else {
        html += `<table border="1"><tr>`;
        fields.forEach(f => html += `<th>${f.name}</th>`);
        html += `</tr>`;
        results.forEach(row => {
          html += `<tr>`;
          fields.forEach(f => html += `<td>${row[f.name]}</td>`);
          html += `</tr>`;
        });
        html += `</table>`;
      }
      html += `</body></html>`;
      res.send(html);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});