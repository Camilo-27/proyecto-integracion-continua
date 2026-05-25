const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123',
  database: process.env.DB_NAME || 'tododb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function crearTabla() {
  pool.query(`
    CREATE TABLE IF NOT EXISTS tareas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      descripcion TEXT,
      estado ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente',
      creada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('MySQL no listo, reintentando en 3s...');
      setTimeout(crearTabla, 3000);
    } else {
      console.log('Tabla tareas lista');
    }
  });
}

crearTabla();

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', mensaje: 'API funcionando correctamente' });
});

// GET /api/tareas
router.get('/tareas', (req, res) => {
  pool.query('SELECT * FROM tareas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST /api/tareas
router.post('/tareas', (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo) return res.status(400).json({ error: 'El título es obligatorio' });
  pool.query(
    'INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)',
    [titulo, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, titulo, descripcion, estado: 'pendiente' });
    }
  );
});

// GET /api/tareas/:id
router.get('/tareas/:id', (req, res) => {
  pool.query('SELECT * FROM tareas WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(results[0]);
  });
});

// PUT /api/tareas/:id
router.put('/tareas/:id', (req, res) => {
  const { titulo, descripcion, estado } = req.body;
  pool.query(
    'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?',
    [titulo, descripcion, estado, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
      res.json({ mensaje: 'Tarea actualizada correctamente' });
    }
  );
});

// DELETE /api/tareas/:id
router.delete('/tareas/:id', (req, res) => {
  pool.query('DELETE FROM tareas WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  });
});

module.exports = router;