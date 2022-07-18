const mongoose = require('mongoose');

const karyawan = mongoose.Schema({
    user_id: String,
    fullname: String,
    status_pernikahan: String,
    nik: Number,
    identitas: String,
    divisi: String,
    tanggal_masuk: Date,
    status_karyawan: String,
    email: String,
    phone: Number,
    alamat: String,
    posisi: String,
    site: String,
    telegram: String,
    createdby: String,
    createddate: String,
    pendidikan: String
});

module.exports = mongoose.model('Karyawan', karyawan)