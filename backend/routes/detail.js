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

// router.post("/blogs/search", async function (req, res, next) {
//   // Your code here
// });

// router.post("/blogs/addlike/:blogId", async function (req, res, next) {
//   //ทำการ select ข้อมูล blog ที่มี id = req.params.blogId
//   try{
//     const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE id=?", [
//       req.params.blogId,
//     ]);
//     //ข้อมูล blog ที่เลือกจะอยู่ในตัวแปร rows
//     console.log('Selected blogs =', rows)
//     //สร้างตัวแปรมาเก็บจำนวน like ณ ปัจจุบันของ blog ที่ select มา
//     let likeNum = rows[0].like
//     console.log('Like num =', likeNum) // console.log() จำนวน Like ออกมาดู
//     //เพิ่มจำนวน like ไปอีก 1 ครั้ง
//     likeNum += 1

//     //Update จำนวน Like กลับเข้าไปใน DB
//     const [rows2, fields2] = await pool.query("UPDATE blogs SET blogs.like=? WHERE blogs.id=?", [
//       likeNum, req.params.blogId,
//     ]);

//     // return json response
//     return res.json({
//       blogId: Number(req.params.blogId),
//       likeNum: likeNum
//     })
//   } catch (err) {
//     res.json(err)
//   }
// });

// router.post("/blogs", upload.single('blog_image'), async function (req, res, next) {
//   const file = req.file;
//     if (!file) {
//       const error = new Error("Please upload a file");
//       error.httpStatusCode = 400;
//       return res.json(error)
//     }

//     const title = req.body.title;
//     const content = req.body.content;
//     const status = req.body.status;
//     const pinned = req.body.pinned;

//     const conn = await pool.getConnection()
//     // Begin transaction
//     await conn.beginTransaction();

//     try {
//       let results = await conn.query(
//         "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
//         [title, content, status, pinned]
//       )
//       const blogId = results[0].insertId;

//       await conn.query(
//         "INSERT INTO images(blog_id, file_path) VALUES(?, ?);",
//         [blogId, file.path.substr(6)])

//       await conn.commit()
//       res.json("success!")
//     } catch (err) {
//       await conn.rollback();
//       res.json(err)
//     } finally {
//       console.log('finally')
//       conn.release();
//     }
// });

router.get("/detail/:id",async function (req, res, next) {
  try{
    const [row_room, columns_room] = await pool.query('SELECT * FROM  roomdetail r join image i on (r.room_img_id = i.room_img_id) join services s on (r.service_id = s.service_id) WHERE r.room_id = ?',[req.params.id])
    return res.json(row_room);
  } catch(err){
    res.json(err)
  }

 

});

router.get("/search", async function(req, res, next){
  try{
    console.log(req.query.search)
    let query = 'SELECT * FROM roomdetail r join image i using(room_img_id)'
    let params = []
    if(req.query.search){
      query = query + 'WHERE r.room_type LIKE ?'
      params = [`%${req.query.search}%`]
    }
   
    const[row_room, columns_room] = await pool.query(query, params)
    return res.json(row_room)
  } catch(err){
    res.json(err)
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
