const express = require("express");
const pool = require("../config");
const path = require("path")
router = express.Router();
const multer = require('multer');
const Joi = require("joi");
const { isLoggedIn } = require("../middlewares");


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/imagehotel");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});










// show
router.get("/admin", async function (req, res, next) {
    try {
        console.log("hello world")

        const [booking, fields1] = await pool.query(" select * from booking")
        const [rooms, fields2] = await pool.query(" select * from roomdetail r left outer join image i on (r.room_img_id = i.room_img_id)")
        res.send({ booking: JSON.stringify(booking), rooms: JSON.stringify(rooms) })

    } catch (err) {
        console.log(err)
    }

});

router.get("/update/:roomId", async function (req, res, next) {
    try {
        const [room, fields1] = await pool.query("select * from roomdetail where room_id = ?",
            [req.params.roomId]);
        const [img, fields3] = await pool.query("select * from image where room_img_id = ?",
            [room[0].room_img_id]);

        console.log(room[0].room_img_id)
        console.log(img)
        res.render("update", { room: room, img: img })

    } catch (err) {
        console.log(err)
    }

});

// update
router.put("/admin/updateroom/:id", async function (req, res, next) {
    // เอารูปไปใส่ใน img table ก่อนแล้ว ดึง room_img_id มาใช้
    try {
        const room_id = req.params.id;
        const room_type = req.body.type;
        const price = req.body.price;
        const description = req.body.description;

        // res.send("addd image complete!")

        const [room, fields3] = await pool.query(" update roomdetail \
        set \
        where room_id = ?",
            [room_id])
        res.send("addd room complete!")

    } catch (err) {
        console.log(err)
    }
});


router.get("/admin/create", isLoggedIn, async function (req, res, next) {
    console.log(req.user)
    try {
        const [roomtype, field] = await pool.query("select distinct room_type from roomdetail")
        console.log(roomtype)
        res.status(200).send(JSON.stringify(roomtype))
    } catch (err) {
        console.log(err)
    }
});



const checkCreate = Joi.object({
    room_type: Joi.string().min(10).required(),
    price: Joi.number().integer().required(),
    description: Joi.string().min(50).required(),
    service1: Joi.valid('yes', 'no').required(),
    service2: Joi.valid('yes', 'no').required(),
    service3: Joi.valid('yes', 'no').required(),
    service4: Joi.valid('yes', 'no').required(),
    people: Joi.number().required(),
    count: Joi.number().required()
})
router.post("/admin/create", isLoggedIn, upload.array("myImage", 5), async function (req, res, next) {
    // add people
    try {
        await checkCreate.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" })
    }
    console.log(req.files)
    const file = req.files
    let pathArray = [];
    if (!file.length) {
        return res.status(400).send({ message: "กรุณาอัพโหลดไฟล์ภาพ" });
    }

    const room_type = req.body.room_type
    const price = req.body.price
    const description = req.body.description
    const service1 = req.body.service1
    const service2 = req.body.service2
    const service3 = req.body.service3
    const service4 = req.body.service4
    const people = req.body.people
    const count = req.body.count


    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        // insert service ก่อนค่อยเอาเข้าตารางเพราะต้องใช้ id แล้วค่อยไป insert image
        const [ins_service] = await conn.query('insert into services(breakfast, pool, wifi, air_conditioner) value(?, ?, ?, ?)', [service1, service2, service3, service4])
        const [room] = await conn.query('insert into roomdetail(room_type, price, description, service_id, people, count) value(?, ?, ?, ?, ?, ?)', [room_type, price, description, ins_service.insertId, people, count])


        req.files.forEach((file, index) => {
            if (index > 0) {
                let path = [room.insertId, file.path.substring(6)];
                pathArray.push(path);
            }
        });

        await conn.query("insert into images(room_id, file_path, main) values (?, ?, ?)", [room.insertId, req.files[0].path.substring(6), 1])

        const [img] = await pool.query(
            "INSERT INTO images(room_id, file_path) VALUES ?",
            [pathArray]
        );
        await conn.query('update roomdetail set room_img_id = ? where room_id = ?', [img.insertId, room.insertId])
        conn.commit()
        res.status(201).send('complete')
    } catch (err) {
        console.log(err)
        conn.rollback()
        return res.status(400).send({ message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" })
    } finally {
        conn.release()
    }
});





exports.router = router;