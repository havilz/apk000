const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Setup koneksi database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_db'
});

// Middleware untuk parsing JSON
app.use(express.json());

// API untuk simpan data registrasi seller
app.post('/api/seller-info', async (req, res) => {
  const { business_type, name, email, phone, password, home_address, store_name, store_address, product_type } = req.body;

  // Validasi data
  if ([business_type, name, email, phone, password, home_address, store_name, store_address, product_type].includes(undefined)) {
    return res.status(400).json({ message: 'Some fields are missing or undefined' });
  }

  // Query untuk menyimpan data
  const query = `
    INSERT INTO users (business_type, name, email, phone, password, home_address, store_name, store_address, product_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  
  try {
    const [result] = await db.execute(query, [business_type, name, email, phone, password, home_address, store_name, store_address, product_type]);
    res.status(201).json({ message: 'Data successfully saved', userId: result.insertId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Failed to save data', error: error.message || 'Unknown error' });
  }
});

// API untuk pendaftaran pembeli
app.post('/api/buyer-registration', async (req, res) => {
  const { name, email, password } = req.body;

  // Validasi input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  // Simpan data ke database
  const query = 'INSERT INTO buyers (name, email, password) VALUES (?, ?, ?)';
  try {
    const [result] = await db.execute(query, [name, email, password]);
    res.status(201).json({ message: 'Pendaftaran pembeli berhasil' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Gagal mendaftar pembeli', error: error.message });
  }
});

// API untuk login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password diperlukan' });
  }

  try {
    // Cek di tabel users (penjual atau penyedia jasa)
    let query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    let [rows] = await db.execute(query, [email, password]);

    if (rows.length > 0) {
      const user = rows[0];
      return res.status(200).json({
        success: true,
        userId: user.id,
        businessType: user.business_type,  // Ini untuk penjual atau penyedia jasa
      });
    }

    // Jika tidak ditemukan di tabel users, cek di tabel buyers (pembeli)
    query = 'SELECT * FROM buyers WHERE email = ? AND password = ?';
    [rows] = await db.execute(query, [email, password]);

    if (rows.length > 0) {
      const buyer = rows[0];
      return res.status(200).json({
        success: true,
        userId: buyer.id,
        businessType: 'Buyer',  // Ini untuk pembeli
      });
    }

    // Jika tidak ditemukan di kedua tabel
    return res.status(401).json({ success: false, message: 'Email atau password salah' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat login', error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const [products] = await db.execute('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint untuk menambahkan produk
app.post('/api/add-product', async (req, res) => {
  const { image, name, price, description, status, likes, rating } = req.body;
  
  // Validasi data
  if (!name || !price) {
    return res.status(400).json({ message: 'Nama dan harga produk harus diisi' });
  }

  // Simpan produk ke database
  const query = `
    INSERT INTO products (image, name, price, description, status, likes, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    await db.execute(query, [image, name, price, description, status, likes, rating]);
    res.status(200).json({ message: 'Produk berhasil ditambahkan' });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan produk', error: error.message });
  }
});

// Mulai server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
