
// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: produk
// Atribut: kode_produk, nama, kategori, harga_beli, harga_jual, stok, minimum_stok
//
// TODO Produk: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let produk = [
  {
    id: 1,
    kode_produk: "LMP001",
    nama: "Lampu LED 12W",
    kategori: "Penerangan",
    harga_beli: 15000,
    harga_jual: 20000,
    stok: 10,
    minimum_stok: 5
  },
  {
    id: 2,
    kode_produk: "KBL001",
    nama: "Kabel Listrik 10m",
    kategori: "Peralatan Listrik",
    harga_beli: 30000,
    harga_jual: 40000,
    stok: 8,
    minimum_stok: 5
  },
  {
    id: 3,
    kode_produk: "STK001",
    nama: "Stop Kontak 4 Lubang",
    kategori: "Aksesoris Listrik",
    harga_beli: 25000,
    harga_jual: 35000,
    stok: 3,
    minimum_stok: 5
  },
  {
    id: 4,
    kode_produk: "LMP002",
    nama: "Lampu Emergency",
    kategori: "Penerangan",
    harga_beli: 45000,
    harga_jual: 60000,
    stok: 0,
    minimum_stok: 3
  }
];

// TODO 1: GET /produk -> kirim seluruh data sebagai JSON
app.get("/produk", (req, res) => {
  
  res.json(produk);
});

// Latihan 1
// Buat fungsi untuk mengambil data produk yang stoknya masih tersedia
// dengan alamat: /produk/tersedia
app.get("/produk/tersedia", (req, res) => {
  const produkTersedia = produk.filter((m) => m.stok > 0);
  res.json(produkTersedia);
});

// Latihan 2
// Buat fungsi untuk mengambil produk yang stoknya berada di bawah minimum
// dengan alamat: /produk/kritis
app.get("/produk/kritis", (req, res) => {
  const produkKritis = produk.filter((m) => m.stok <= m.minimum_stok);
  res.json(produkKritis);
});

// TODO 2: GET /produk/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/produk/:id", (req, res) => {

  const { id } = req.params;

  const dataProduk = produk.find((m) => m.id === parseInt(id));

  if (!dataProduk) {
    return res.status(404).json({
      message: "Data tidak ditemukan"
    });
  }

  res.json(dataProduk);
});

// TODO 3: POST /produk -> ambil data produk dari req.body,
// buat objek baru dengan id = produk.length + 1,
// simpan ke array, dan kirim response dengan status 201
app.post("/produk", (req, res) => {


  const {
    kode_produk,
    nama,
    kategori,
    harga_beli,
    harga_jual,
    stok,
    minimum_stok
  } = req.body;

  const newProduk = {
    id: produk.length + 1,
    kode_produk,
    nama,
    kategori,
    harga_beli,
    harga_jual,
    stok,
    minimum_stok
  };

  produk.push(newProduk);

  res.status(201).json(newProduk);
});

// TODO 4: PUT /produk/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404,
// jika ditemukan gabungkan data lama dengan req.body
// lalu kirim data yang telah diperbarui
app.put("/produk/:id", (req, res) => {

  const { id } = req.params;

  const index = produk.findIndex(
    (m) => m.id === parseInt(id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Data tidak ditemukan"
    });
  }

  produk[index] = {
    ...produk[index],
    ...req.body
  };

  res.json(produk[index]);
});

// TODO 5: DELETE /produk/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404,
// jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/produk/:id", (req, res) => {
  // lengkapi di sini

  const { id } = req.params;

  const index = produk.findIndex(
    (m) => m.id === parseInt(id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Data tidak ditemukan"
    });
  }

  produk.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
}); 
