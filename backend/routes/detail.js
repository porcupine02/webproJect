const express = require("express")
const path = require("path")
const pool = require("../config")
const { isLoggedIn } = require("../middlewares");

router = express.Router()

// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })


router.get("/detail/:id", async function (req, res, next) {
  try {
    const [rate] = await pool.query('SELECT sum(rate) as `Sumrate`, count(rate) as `countRate`, FLOOR(sum(rate) / count(rate)) AS result FROM comments  WHERE room_id = ?', [req.params.id])
    const [row_room, columns_room] = await pool.query(`SELECT * FROM  roomdetail r join services s using (service_id) where r.room_id = ?`, [req.params.id])
    const [images, fields] = await pool.query(`select file_path from images where room_id = ?`, [req.params.id])
    const [comments, fields1] = await pool.query(`select c.*, concat(u.first_name, ' ', u.last_name) as name, DATE_FORMAT(post_time, '%Y-%m-%d %H%i') AS post_time  from comments c join customers u using (cus_id) where room_id = ?`, [req.params.id])

    console.log(row_room)
    console.log(comments)
    console.log(images)
    console.log(req.params.id)
    return res.send({
      room: row_room,
      images: images,
      comments: comments,
      rate:rate
    });
  } catch (err) {
    res.send(err)
  }



});

router.get("/search", async function (req, res, next) {
  try {
    console.log(req.query.search)
    let query = 'SELECT * FROM customers'
    let params = []
    if (req.query.search) {
      query = query + ' WHERE first_name LIKE ? or last_name like ? or email like ? or cus_id = ?'
      // params = [`%${req.query.search}%`]
      params = [req.query.search, req.query.search, req.query.search, req.query.search]
    }
    console.log("pass")
    console.log(query, params)

    const [result] = await pool.query(query, params)
    console.log("pass")
    return res.status(200).send({ result: result })
  } catch (err) {
    return res.status(400).send({ message: "เกิดข้อผิดพลาด" })

  }
})

router.put("/blogs/:id", function (req, res) {
  // Your code here
  return;
});

router.delete("/blogs/:id", function (req, res) {
  // Your code here
  return;
});

exports.router = router;
