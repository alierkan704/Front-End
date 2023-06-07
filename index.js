const express = require('express');
const { Pool } = require('pg');

// PostgreSQL veritabanı yapılandırması
const pool = new Pool({
  user: 'postgres',
  host: 'your_host',
  database: 'postgres',
  password: 'depixen-pass',
  port: '5439',
});

const app = express();
app.use(express.json());

// POST isteklerini kabul eden "/save-card" rotası
app.post('/save-card', (req, res) => {
  const { title, description, image } = req.body;

  // Verileri veritabanına kaydetme
  pool.query(
    'INSERT INTO tb_casestudy (title, description, imageuri, createddate) VALUES ($1, $2, $3, NOW())',
    [title, description, image],
    (err, result) => {
      if (err) {
        console.error('Kart kaydedilirken hata oluştu:', err);
        res.status(500).json({ error: 'Kart kaydedilirken hata oluştu' });
      } else {
        console.log('Kart başarıyla kaydedildi');
        res.status(200).json({ message: 'Kart başarıyla kaydedildi' });
      }
    }
  );
});

// Sunucuyu başlat
app.listen(3000, () => {
  console.log('API sunucusu 3000 numaralı port üzerinde çalışıyor');
});
