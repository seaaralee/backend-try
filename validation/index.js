const { check, validationResult } = require('express-validator');

exports.runValidation = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.validationDaftar = [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().matches(/.+\@.+\..+/).withMessage('email harus bertanda @'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('password minimal 6 characters')
]

exports.validationLogin = [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('password', 'password tidak boleh kosong').notEmpty(),
]