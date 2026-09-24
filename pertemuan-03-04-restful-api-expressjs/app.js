// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: produk (id, nama, kategori, status)
//
// TODO Produk: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let produk = [
  { id: 1, nama: "Lampu LED 12W", kategori: "Penerangan", status : "tersedia" },
  { id: 2, nama: "Kabel Listrik 10m", kategori: "Peralatan Listrik", status : "tersedia" },
  { id: 3, nama: "Stop Kontak 4 Lubang", kategori: "Aksesoris Listrik", status : "tersedia" },
  { id: 4, nama: "Lampu Emergency", kategori: "Penerangan", status : "habis" },
];

// TODO 1: GET /produk -> kirim seluruh data sebagai JSON
app.get("/produk", (req, res) => {
  // lengkapi di sini
  res.json(produk);
});

// latihan 1 
// Buat fungsi untuk mengambil data produk tersedia, dengan alamat : /produk/tersedia
app.get("/produk/tersedia", (req, res) => {
  const produkTersedia = produk.filter((m) => m.status === "tersedia");
  res.json(produkTersedia);
});

// TODO 2: GET /produk/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/produk/:id", (req, res) => {
  // lengkapi di sini
  const { id } = req.params;
  const dataProduk = produk.find((m) => m.id === parseInt(id));
  if (!dataProduk) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }
  res.json(dataProduk);
});

// TODO 3: POST /produk -> ambil { nama, kategori } dari req.body,
// buat objek baru dengan id = produk.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/produk", (req, res) => {
  // lengkapi di sini
  const { nama, kategori } = req.body;
  const newProduk = {
    id: produk.length + 1,
    nama,
    kategori,
    status: "tersedia"
  };
  produk.push(newProduk);
  res.status(201).json(newProduk);
});

// TODO 4: PUT /produk/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/produk/:id", (req, res) => {
  // lengkapi di sini
  const { id } = req.params;
  const { nama, kategori } = req.body;
  const index = produk.findIndex((m) => m.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }
  produk[index] = { ...produk[index], nama, kategori };
  res.json(produk[index]);
});

// TODO 5: DELETE /produk/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/produk/:id", (req, res) => {
  // lengkapi di sini
  const { id } = req.params;
  const index = produk.findIndex((m) => m.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }
  produk.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});

