const express = require('express');
const router = express.Router();
const Validator = require('fastest-validator');
const Karyawan = require('../models/karyawan');


const v = new Validator();

// READ API
router.get('/', async(req, res) => {
    const kary = await Karyawan.find();
    return res.json(kary);
});

// READ API BY ID
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const kary = await Karyawan.findById(id);
    return res.json(kary || {});
});


// CREATE API
router.post('/', async(req, res) => {
    const schema = {
        user_id: 'string|optional',
        fullname: 'string|optional',
        statuspernikahan: 'string|optional',
        nik: 'string|optional',
        identitas: 'string|optional',
        divisi: 'string|optional',
        tanggalmasuk: 'string|optional',
        statuskaryawan: 'string|optional',
        email: 'string|optional',
        phone: 'string|optional',
        alamat: 'string|optional',
        posisi: 'string|optional',
        site: 'string|optional',
        telegram: 'string|optional',
        pendidikan: 'string|optional',
        institusi: 'string|optional',
        tempatlahir: 'string|optional',
        tanggallahir: 'string|optional',
        status : 'string|optional',
        role_trello : 'string|optional',
        nikkaryawan: 'string|optional',
        jurusan: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if(validate.length){
        return res
        .status(400)
        .json(validate);
    }

    const kary = await Karyawan.create(req.body);
    
    res.json(kary);

});


// UPDATE API
router.put('/:id', async(req, res) =>{
    const id = req.params.id;

    let kary = await Karyawan.findByPk(id);

    if(!kary){
        return res.json({message: 'Data Not Found'});
    }

    const schema = {
        user_id: 'string|optional',
        fullname: 'string|optional',
        statuspernikahan: 'string|optional',
        nik: 'string|optional',
        identitas: 'string|optional',
        divisi: 'string|optional',
        tanggalmasuk: 'string|optional',
        statuskaryawan: 'string|optional',
        email: 'string|optional',
        phone: 'string|optional',
        alamat: 'string|optional',
        posisi: 'string|optional',
        site: 'string|optional',
        telegram: 'string|optional',
        pendidikan: 'string|optional',
        institusi: 'string|optional',
        tempatlahir: 'string|optional',
        tanggallahir: 'string|optional',
        status : 'string|optional',
        role_trello : 'string|optional',
        nikkaryawan: 'string|optional',
        jurusan: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if(validate.length){
        return res
        .status(400)
        .json(validate);
    }

    kary = await kary.update(req.body);
    res.json(kary);
});


// DELETE API
router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    const kary = await Karyawan.findById(id);

    if(!kary){
        return res.json({message: 'Product Not Found'});
    }

    await kary.remove();

    res.json({
        message: 'Data Deleted'
    });
});

module.exports = router;

// o p t i o n . c o d e . 2

// // SHOW ALL DATA
// router.get('/', async (req, res) => {
//     try {
//         const karyawan = await Karyawan.find();
//         res.json(karyawan);
//     } catch(err) {
//         res.json({ message: err});
//     }
// });


// // POST AN DATA
// router.post('/', async (req, res) => {
//     const kary = new Karyawan({
//         user_id: req.body.user_id,
//         fullname: req.body.fullname,
//         status_pernikahan: req.body.status
//     });
//     try {
//         const savedData = await kary.save();
//         res.json(savedData);
//     } catch(err) {
//         res.json({ message: err});
//     }
// });

// // FIND SPECIFIC DATA
// router.get('/:karyawanId', async (req, res) => {
//     try {
//         const kary = await Karyawan.findById(req.params.karyawanId);
//         res.json(kary);
//     } catch(err) {
//         res.json({ message: err});
//     }
// });

// // DELETE AN DATA
// router.delete('/:karyawanId', async (req, res) => {
//     try {
//         const removeData = await Karyawan.remove({_id: req.params.karyawanId})
//         res.json(removeData);
//     } catch(err) {
//         res.json({ message: err});
//     }
// });

// // UPDATE AN DATA
// router.patch('/:karyawanId', async (req, res) => {
//     try {
//         const updateData = await Karyawan.updateOne({_id: req.params.karyawanId}, { $set: {user_id}});
//         res.json(updateData);
//     } catch(err) {
//         res.json({ message: err});
//     }
// });

// module.exports = router;