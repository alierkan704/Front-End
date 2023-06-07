const express = require('express');
const app = express();
const { Pool } = require('pg');

// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'depixen-pass',
  port: '5439',
});

app.use(express.json());

app.post('/save-card', (req, res) => {
  const { title, description, image } = req.body;

  // Save the card data to the database
  pool.query(
    'INSERT INTO cards (title, description, image) VALUES ($1, $2, $3)',
    [title, description, image],
    (err, result) => {
      if (err) {
        console.error('Error saving card:', err);
        res.status(500).json({ error: 'Error saving card' });
      } else {
        console.log('Card saved successfully');
        res.status(200).json({ message: 'Card saved successfully' });
      }
    }
  );
});

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

