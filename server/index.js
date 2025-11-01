const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Obtener productos
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los productos' });
        res.json(results);
    });
});

// Crear producto
app.post('/productos', (req, res) => {
    const { nombre, precio, stock, categoria, descripcion } = req.body;

    if (!nombre || precio == null || stock == null || !categoria || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const sql = 'INSERT INTO productos (nombre, precio, stock, categoria, descripcion) VALUES (?,?,?,?,?)';
    db.query(sql, [nombre, precio, stock, categoria, descripcion], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al guardar el producto' });

        res.json({
            message: 'Producto guardado correctamente',
            id: result.insertId,
            nombre, precio, stock, categoria, descripcion
        });
    });
});

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock, categoria, descripcion } = req.body;

    const sql = `
        UPDATE productos
        SET nombre = ?, precio = ?, stock = ?, categoria = ?, descripcion = ?
        WHERE id = ?
    `;

    db.query(sql, [nombre, precio, stock, categoria, descripcion, id], (err) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el producto' });

        res.json({ message: 'Producto actualizado correctamente' });
    });
});

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el producto' });

        res.json({ message: 'Producto eliminado' });
    });
});

app.listen(3001, () => console.log('Servidor backend corriendo en puerto 3001'));
