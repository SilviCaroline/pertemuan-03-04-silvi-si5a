// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: mahasiswa (id, nama, jurusan)
//
// TODO Mahasiswa: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi", status : "aktif" },
  { id: 2, nama: "Budi", jurusan: "Informatika", status : "cuti" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer", status : "aktif" },
  { id: 4, nama: "Dewi", jurusan: "Sistem Informasi", status : "aktif" },
];

// TODO 1: GET /mahasiswa -> kirim seluruh data sebagai JSON
app.get("/mahasiswa", (req, res) => {
  // lengkapi di sini
  res.json(mahasiswa);
});

// latihan 1 
// Buat fungsi untuk mengambil data mahasiswa aktif, dengan alamat : /mahasiswa/aktif
app.get("/mahasiswa/aktif", (req, res) => {
  const mahasiswaAktif = mahasiswa.filter((m) => m.status === "aktif");
  res.json(mahasiswaAktif);
});

// TODO 2: GET /mahasiswa/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/mahasiswa/:id", (req, res) => {
  // lengkapi di sini
  const { id } = req.params;
  const mahasiswa = mahasiswa.find((m) => m.id === parseInt(id));
  if (!mahasiswa) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }
  res.json(mahasiswa);
});

// TODO 3: POST /mahasiswa -> ambil { nama, jurusan } dari req.body,
// buat objek baru dengan id = mahasiswa.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/mahasiswa", (req, res) => {
  // lengkapi di sini
  const { nama, jurusan } = req.body;
  const newMahasiswa = {
    id: mahasiswa.length + 1,
    nama,
    jurusan,
    status: "aktif"
  };
  mahasiswa.push(newMahasiswa);
  res.status(201).json(newMahasiswa);
});

// TODO 4: PUT /mahasiswa/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/mahasiswa/:id", (req, res) => {
  // lengkapi di sini
  const { id } = req.params;
  const { nama, jurusan } = req.body;
  const index = mahasiswa.findIndex((m) => m.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }
  mahasiswa[index] = { ...mahasiswa[index], nama, jurusan };
  res.json(mahasiswa[index]);
});

// TODO 5: DELETE /mahasiswa/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/mahasiswa/:id", (req, res) => {
  // lengkapi di sini
  const { id } = req.params;
  const index = mahasiswa.findIndex((m) => m.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }
  mahasiswa.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

