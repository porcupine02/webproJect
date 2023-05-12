const express = require('express')
const pool = require('../config')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const { isLoggedIn } = require("../middlewares");

router = express.Router();
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})


router.post('/user/login', async (req, res, next) => {

    console.log('success')
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send('Incorrect username or password')
    }
    const { username, password } = req.body


    console.log(username + ' ' + password)
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        const [users] = await conn.query('SELECT * FROM login WHERE user_name = ?', [username])
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

router.get('/user/', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    const id = req.user.login_id;
    console.log(id)
    try {
        const [booking, fields1] = await pool.query("select booking.*, DATE_FORMAT(check_in, '%Y-%m-%d') as check_in, date_format(check_out, '%Y-%m-%d') as check_out from booking where cus_id = ?", [id])
        const [user, fields2] = await pool.query("select *, DATE_FORMAT(DOB, '%Y-%m-%d') as DOB from customers join login using (cus_id) where cus_id = ?", [id])
        console.log(user)
        res.status(200).send({ "booking": booking, "user": user })
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }


    // console.log(req.user)
    // res.json(req.user)
})

// router.get('/user/', isLoggedIn, async (req, res, next) => {
//     console.log("from profile page" + req.params.token)
//     // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
//     const token = req.body.token;

//     const [booking, fields1] = await pool.query(`
//     select *
//     from booking
//     join login
//     using (cus_id)
//     join tokens
//     using (login_id)
//     where token = ?` [token])
//     console.log(req.user)
//     res.json(req.user)
// })
router.put('/changepassword', async (req, res, next) => {
    //  console.log(req.user)
    console.log("alsdjflaksdjflasjdfljasdlkfj")


    //  res.json(req.user)
})




exports.router = router