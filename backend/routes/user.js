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
        return res.status(400).send('กรุณากรอก username password')

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
            return res.status(400).send('กรุณากรอก username password')
        }


        // const hash = await bcrypt.hash(user.password, 5)

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('กรุณากรอก username password')
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
        res.status(200).json({ 'token': token, user: user })
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
        const message = 'มีชื่อ username ซ้ำ'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const emailValidator = async (value, helpers) => {
    const [rows] = await pool.query("SELECT email FROM users WHERE email = ?", [value])
    if (rows.length > 0) {
        const message = 'ใช้email ซ้ำ'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signUpSchema = Joi.object({
    email: Joi.string().required().email().external(emailValidator),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    fname: Joi.string().required().min(5).max(15).pattern(/^[a-zA-Z\s]+$/),
    lname: Joi.string().required().min(5).max(15).pattern(/^[a-zA-Z\s]+$/),
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
    const password = await bcrypt.hash(req.body.password, 5)

    try {
        let results = await conn.query(
            'INSERT INTO users ( first_name, last_name, phone, email, DOB) VALUES (?, ?, ?, ?, ?)', [fname, lname, phone, email, dob]
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

// const userNameForgot = Joi.object({
//     username: Joi.string().required
// })

const passForgotSchema = Joi.object({
    password: Joi.string().required().custom(passwordValidator),
    username: Joi.string().required(),
    confirm_password: Joi.string().required()
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
router.put('/report/:reportId', async function (req, res, next) {
    console.log(req.params.reportId)
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query("update reports set status = 'accept' where report_id = ?", [req.params.reportId])
        const [reports] = await pool.query("select *  from reports where status = 'submit'")
        const [Countreports] = await pool.query("select count(report_id) as CountReport from reports where status = 'submit'")
        const [allReports] = await pool.query("select *  from reports")
        conn.commit()
        res.status(202).send({ reports: reports, allReports: allReports, Countreports : Countreports })
    } catch (err) {
        conn.rollback()
        res.status(400).send(err.toString())
    } finally {
        conn.release()
    }

})
router.get('/report', async function (req, res, next) {
    try {
        const [reports] = await pool.query("select * from reports where status = 'submit' order by report_time desc")
        const [Countreports] = await pool.query("select count(report_id) as CountReport from reports where status = 'submit'")
        const [allReports] = await pool.query("select *, concat(c.first_name, ' ', last_name) as 'name' from reports join users c using (cus_id) order by report_time desc")
        res.status(200).send({ reports: reports, allReports: allReports, Countreports: Countreports })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "เกิดข้อผิดพลาด" })
    }




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
    console.log(req.body.confirm_password)

    try {
        await passForgotSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('ใส่รหัสไม่ถูกต้อง')
    }
    const password = await bcrypt.hash(req.body.password, 5)

    const [user] = await pool.query('SELECT login_id FROM login WHERE username = ?', req.body.username)

    console.log("user" + user[0].login_id)


    try {
        console.log(req.body)
        const [rows, fields] = await pool.query('UPDATE login set password = ? WHERE username = ?', [password, req.body.username])
        const [updateToken] = await pool.query('UPDATE tokens set token = ? WHERE login_id = ?', [password, user[0].login_id])

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
        const [customer] = await pool.query("select * from login where login_id = ?", [req.user.login_id])
        const [booking, fields1] = await pool.query("select *, DATE_FORMAT(check_in, '%Y-%m-%d') as check_in, date_format(check_out, '%Y-%m-%d') as check_out, DATE_FORMAT(timestamp_booking, '%Y-%m-%d %H:%i') as timestamp_booking, booking.status as bstatus from booking join payments using (booking_id) where cus_id = ? order by timestamp_booking desc", [id])
        const [user, fields2] = await pool.query("select *, DATE_FORMAT(DOB, '%Y-%m-%d') as DOB from users join login using (cus_id)  where cus_id = ?", [id])
        const [allbooking, fields3] = await pool.query("select *, DATE_FORMAT(check_in, '%Y-%m-%d') as check_in, date_format(check_out, '%Y-%m-%d') as check_out, DATE_FORMAT(timestamp_booking, '%Y-%m-%d %H:%i') as timestamp_booking, booking.status as bstatus from booking join payments using (booking_id) order by timestamp_booking desc")
        const [image] = await pool.query("select * from images where cus_id = ?", [customer[0].cus_id])



        console.log(user)
        res.status(200).send({ "booking": booking, "user": user, 'allbooking': allbooking, image: image })
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


router.put('/changepassword', isLoggedIn, async (req, res, next) => {


    console.log(req.user)
    const login_id = req.user.login_id
    console.log(login_id)
    const newPassword = await bcrypt.hash(req.body.newPassword, 5)

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query("update login set password = ? where login_id = ?", [newPassword, login_id])
        conn.commit()
        res.status(201).send("เปลี่ยนรหัสผ่านเรียบร้อย")
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

})

router.post('/changeProfile', isLoggedIn, upload.single('file_image'), async (req, res, next) => {
    console.log(req.user)
    const login_id = req.user.login_id
    console.log(req.user.login_id)

    const file = req.file
    console.log(file)
    // if (!req.file) {
    //     return res.status(400).send({ message: "กรุณาอัพโหลดไฟล์ภาพ" });
    // }

    const [cus_id] = await pool.query("select * from login where login_id = ?", [login_id])
    const [check_image] = await pool.query("select * from images where cus_id = ?", [cus_id[0].cus_id])
    console.log(check_image)



    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        if (check_image.length > 0) {
            await conn.query("update images set file_path = ? where cus_id = ?", [file.path.substring(6), cus_id[0].cus_id])
        } else {
            await conn.query("insert into images(file_path, cus_id) values(?, ?)", [file.path.substring(6), cus_id[0].cus_id])
        }

        const [image] = await pool.query("select * from images where cus_id = ?", [cus_id[0].cus_id])
        conn.commit()
        res.status(201).json({ image: image })
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

})




exports.router = router