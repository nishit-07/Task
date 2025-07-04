const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { name, price, category_id, colors, tags } = req.body;

    if (!name || !price || !category_id || !colors || colors.length === 0) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO products (name, price, category_id, colors, tags) VALUES (?, ?, ?, ?, ?)',
      [name, price, category_id, JSON.stringify(colors), tags ? JSON.stringify(tags) : null]
    );

    res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      JOIN categories c ON p.category_id = c.id
    `);
    
    const formattedProducts = products.map(product => {
      // Safely parse colors and tags
      const parseField = (field) => {
        try {
          return field ? JSON.parse(field) : null;
        } catch (e) {
          return field; // Return original value if parsing fails
        }
      };

      return {
        ...product,
        colors: parseField(product.colors),
        tags: parseField(product.tags)
      };
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;