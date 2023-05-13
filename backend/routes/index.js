const express = require("express");

const pool = require("../config");


router = express.Router();



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







exports.router = router;
