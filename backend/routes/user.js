const express = require('express')
const pool = require('../config')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const { isLoggedIn } = require("../middlewares");
const multer = require('multer');
const path = require('path');

router = express.Router();
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/imagehotel')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


router.post('/user/login', async (req, res, next) => {

    console.log('success')
    console.log

    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('กรุณากรอก usernam password')

    }
    const { username, password } = req.body


    console.log(username + ' ' + password)
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        const [users] = await conn.query('SELECT * FROM login WHERE username = ?', [username])
        //  console.log(users[0].password)
        const user = users[0]
        console.log(user)
        if (!user) {
            throw new Error('Incorrect username or password')
        }


        const hash = await bcrypt.hash(user.password, 5)

        if (!(await bcrypt.compare(password, hash))) {
            throw new Error('Incorrect username or password')
        }

        const [tokens] = await conn.query('SELECT * FROM tokens WHERE login_id = ?', [user.login_id])

        let token = tokens[0]?.token
        if (!token) {

            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(login_id,token) VALUES(?, ?)', [user.login_id, token]
            )
        }
        conn.commit()
        res.status(200).json({ 'token': token })
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

})
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    console.log(req.user)
    res.json(req.user)
})
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM login WHERE username = ?", [value])
    console.log(rows)
    if (rows.length > 0) {
        const message = 'มีชื่อ ซ้ำ'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signUpSchema = Joi.object({
    email: Joi.string().required().email(),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    fname: Joi.string().required().min(5).max(15),
    lname: Joi.string().required().min(5).max(15),
    username: Joi.string().required().min(5).max(25).external(usernameValidator),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    dob: Joi.date().required()

})

router.post('/signUp', async function (req, res, next) {

    try {
        await signUpSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }


    console.log(req.body)




    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    const fname = req.body.fname
    const lname = req.body.lname
    const phone = req.body.phone
    const dob = req.body.dob
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    try {
        let results = await conn.query(
            'INSERT INTO customers ( first_name, last_name, phone, email, DOB) VALUES (?, ?, ?, ?, ?)', [fname, lname, phone, email, dob]
        )

        const cusId = results[0].insertId;
        console.log(cusId)

        await conn.query(
            'INSERT INTO login (cus_id, username, password, login_role) VALUES (?, ?, ?, 2)', [cusId, username, password]
        )

        conn.commit()
        res.status(201).send()
        // res.send('true')
    } catch (err) {
        conn.rollback();
        res.status(400).json(err.toString());

    } finally {

        conn.release();
    }


})

const usernameForgotValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM login WHERE username = ?", [value])
    console.log(rows)
    if (rows.length == 0) {
        const message = 'ไม่มีชื่อนี้'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}


const userNameForgotSchema = Joi.object({
    username: Joi.string().required().external(usernameForgotValidator)
})

const passForgotSchema = Joi.object({
    password: Joi.string().required().custom(passwordValidator),
    username: Joi.string().required()
})

const checkReport = Joi.object({
    content: Joi.string().required()
})
router.post('/report', isLoggedIn, async function (req, res, next) {

    try {
        await checkReport.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('กรุณากรอกข้อมูล')
    }
    const content = req.body.content
    const login_id = req.user.login_id

    const [customer] = await pool.query('select cus_id from login where login_id = ?', [login_id])
    const cus_id = customer[0].cus_id


    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query("insert into reports(content, cus_id) values(?, ?)", [content, cus_id])
        conn.commit()
        res.status(201).json("กำลังจะดำเนินการ")
    } catch (err) {
        conn.rollback()
        res.status(400).send(err.toString())
    } finally {
        conn.release()
    }
})
router.put('/report', async function (req, res, next) {

})
router.get('/report', async function (req, res, next) {

    console.log(req.body.username)



})
router.post('/forgot', async function (req, res, next) {

    console.log(req.body.username)

    try {
        await userNameForgotSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('ใส่ชื่อผิด')
    }

    try {
        // console.log(req.body)
        const [rows, fields] = await pool.query(
            'SELECT password FROM login WHERE username = ?', [req.body.username]
        );

        if (!rows) {
            res.json('Wrong')
        }
        return res.json(rows);
    } catch (err) {
        return next(err)
    }
})

router.put('/forgot', async function (req, res, next) {

    try {
        await passForgotSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('ใส่รหัสไม่ถูกต้อง')
    }


    try {
        console.log(req.body)
        const [rows, fields] = await pool.query('UPDATE login set password = ? WHERE username = ?', [req.body.password, req.body.username])
        res.json(rows)
    } catch (err) {
        console.log(err)
    }
})

router.get('/user/', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    const id = req.user.login_id;
    console.log(id)
    try {
        const [booking, fields1] = await pool.query("select *, DATE_FORMAT(check_in, '%Y-%m-%d') as check_in, date_format(check_out, '%Y-%m-%d') as check_out, DATE_FORMAT(timestamp_booking, '%Y-%m-%d %H:%i') as timestamp_booking, booking.status as bstatus from booking join payments using (booking_id) where cus_id = ? order by timestamp_booking desc", [id])
        const [user, fields2] = await pool.query("select *, DATE_FORMAT(DOB, '%Y-%m-%d') as DOB from customers join login using (cus_id)  where cus_id = ?", [id])
        console.log(user)
        res.status(200).send({ "booking": booking, "user": user })
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }


    // console.log(req.user)
    // res.json(req.user)
})
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    console.log(req.user)
    res.json(req.user)
})


const check_changePassword = Joi.object({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required().custom(passwordValidator)
})
router.put('/changepassword', isLoggedIn, async (req, res, next) => {


    try {
        await check_changePassword.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('รหัสไม่ถูกต้อง')
    }
    console.log(req.user)
    const login_id = req.user.login_id
    console.log(login_id)
    // const req.user
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword
    console.log(oldPassword)

    const [old] = await pool.query("select * from login where login_id = ?", [login_id])
    const older = old[0].password
    console.log(older)
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        if (oldPassword == older) {
            await conn.query("update login set password = ? where login_id = ?", [newPassword, login_id])
            conn.commit()
            res.status(201).send("เปลี่ยนรหัสผ่านเรียบร้อย")
        } else {
            return res.status(404).send({
                message: "รหัสผ่านเก่าไม่ถูกต้อง"
            })
        }
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

})

router.put('/changeProfile', isLoggedIn, upload.single('profileImage'), async (req, res, next) => {
    console.log(req.user)
    const login_id = req.user.login_id
    console.log(req.user.login_id)

    const file = req.files
    console.log(file)
    console.log(req.files)
    let pathArray = [];
    // if (!file.length) {
    //     return res.status(400).send({ message: "กรุณาอัพโหลดไฟล์ภาพ" });
    // }

    const [cus_id] = await pool.query("select * from login where login_id = ?", [login_id])
    const [check_image] = await pool.query("select * from images where cus_id = ?", [cus_id])
    console.log(check_image)



    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        if (check_image.length > 0) {
            await conn.query("update images set file_path = ? where cus_id = ?", [])

        }
        conn.commit()
        res.status(201).json("complele")
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

})




exports.router = router