const express = require('express')
const pool = require('../config')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const { isLoggedIn } = require("../middlewares");

router = express.Router();
const loginSchema = Joi.object({
    username : Joi.string().required(),
    password: Joi.string().required()
})


router.post('/user/login', async (req, res, next) =>{

    console.log('success')
    try{
        await loginSchema.validateAsync(req.body, {abortEarly : false})
    } catch(err){
        return res.status(400).send('Incorrect username or password')
    }
    const {username, password} = req.body


        console.log(username+ ' ' + password)
        const conn = await pool.getConnection()
        await conn.beginTransaction()

        try{
            const[users] = await conn.query('SELECT * FROM login WHERE user_name = ?', [username])
            //  console.log(users[0].password)
            const user = users[0]
            console.log(user)
            if(!user){
                throw new Error('Incorrect username or password')
            }


            const hash = await bcrypt.hash(user.password, 5)

            if (!(await bcrypt.compare(password, hash))) {
                throw new Error('Incorrect username or password')
            }

            const[tokens] = await conn.query('SELECT * FROM tokens WHERE login_id = ?', [user.login_id])

            let token = tokens[0]?.token
            if(!token){

                token = generateToken()
                await conn.query(
                    'INSERT INTO tokens(login_id,token) VALUES(?, ?)', [user.login_id, token]
                )
            }
            conn.commit()
            res.status(200).json({'token' : token})
        }catch(err){
            conn.rollback()
            res.status(400).json(err.toString())
        } finally{
            conn.release()
        }

})

 router.get('/user/me',  isLoggedIn, async (req, res, next) => {
         // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
         console.log(req.user)
         res.json(req.user)
     })
 router.put('/changepassword',async (req, res, next) => {
        //  console.log(req.user)
         console.log("alsdjflaksdjflasjdfljasdlkfj")

        //  res.json(req.user)
     })




exports.router = router