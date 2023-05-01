const express = require("express");
const path =require('path')
const pool = require("../config");


router = express.Router();

// Require multer for file upload
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
  
})
const upload = multer({ storage: storage })

router.get("/",async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
       'SELECT * FROM  roomdetail r join image i on (r.room_img_id = i.room_img_id) join services s on (r.service_id = s.service_id) '
    );
    return res.json(rows);
  } catch (err) {
    return next(err)
  }
});

// router.post("/register", async function(req, res, next){
//   try{
//     console.log(req.body)
//     const email = req.body.email
//     const password = req.body.password
//     const [rows, fields] = await pool.query('SELECT user_name, password FROM login WHERE user_name = ? and password = ?', [email, password])
//     console.log(rows)

//     res.json(rows)
//     // const [rows, fields] = await pool.query()
//   }catch(err){
//     console.log(err)
//   }
// });

router.post('/signUp', upload.single(''), async function(req, res, next){
   
      
  console.log(req.body)
  const fname = req.body.fname
  const lname = req.body.lname
  const phone = req.body.phone
  const dob = req.body.dob
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
        let results =  await conn.query(
        'INSERT INTO customers ( first_name, last_name, phone, email, DOB) VALUES (?, ?, ?, ?, ?)', [fname, lname, phone, email, dob]
      )
     
      const cusId = results[0].insertId;
      console.log(cusId)

      await conn.query(
        'INSERT INTO login (cus_id, user_name, password, login_role) VALUES (?, ?, ?, 2)', [cusId, username, password]
      )
    
      await conn.commit()
      res.json('true')
    } catch (err) {
      await conn.rollback();
      res.json(err)
    } finally {
      console.log('finally')
      conn.release();
    }
      
    
})

router.post('/forgot', async function(req, res, next ){

  console.log(req.body.email)

    try {
      // console.log(req.body)
      const [rows, fields] = await pool.query(
         'SELECT password FROM login WHERE user_name = ?', [req.body.email]
      );
      if(!rows){
        res.json('Wrong')
      }
      return res.json(rows);
    } catch (err) {
      return next(err)
    }
})

router.put('/forgot', async function(req, res, next){
   try{
      console.log(req.body)
      const [rows, fields] = await pool.query('UPDATE login set password = ? WHERE user_name = ?', [req.body.password, req.body.email])
      res.json(rows)
   } catch(err){
      console.log(err)
   }
})



exports.router = router;
