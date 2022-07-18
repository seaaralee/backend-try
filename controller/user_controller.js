require('dotenv').config();
const User = require('../models/user_model');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.DaftarUser = async (req, res) => {
    const { username, email, password } = req.body

    const emailUser = await User.findOne({email: email})
    const usernameuser = await User.findOne({username: username})

    if(usernameuser) {
        return res.status(404).json({
            status: false,
            message: 'username sudah tersedia'
        })
    }

    if(emailUser) {
        return res.status(404).json({
            status: false,
            message: 'email sudah tersedia'
        })
    }

    const hashPassword = await bcryptjs.hash(password, 10)
    const user = new User({
        username: username,
        email: email,
        password: hashPassword,
    })

    user.save()

    return res.status(201).json({
        status: 'true',
        message: 'User berhasil di daftarkan'
    })
}

exports.LoginUser = async (req, res) => {
    const{ username, password } = req.body

    const datauser = await User.findOne({$or:[{username: username}, {email: username}]})
    if(datauser) {
        // jika user nya ada maka masuk proses sini
        const passwordUser = await bcryptjs.compare(password, datauser.password)
        if(passwordUser) {
            // jika password nya ada maka masuk proses sini
            const data = {
                id: datauser._id
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                message: 'berhasil',
                token: token
            })
        } else {
            return res.status(404).json({
                status: false,
                message: 'password salah',
            })
        }
    } else {
        return res.status(404).json({
            status: false,
            message: 'username atau email tidak terdaftar',
        })
    }
}

exports.getSingleUser = async (req,res) => {
    const user = await User.findOne({_id: req.id})
    return res.status(200).json({
        message: 'berhasil di panggil',
        data: user
    })
}