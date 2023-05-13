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

// // create
// router.post("/admin/addroom", upload.single('pic1'), async function (req, res, next) {
//     // เอารูปไปใส่ใน img table ก่อนแล้ว ดึง room_img_id มาใช้

//     const conn = await pool.getConnection()
//     await conn.beginTransaction();

//     try {
//         const room_type = req.body.room_type;
//         const price = req.body.price;
//         const description = req.body.description;

//         let pic1 = req.file;
//         let pic2 = req.body.pic2;
//         let pic3 = req.body.pic3;
//         let pic4 = req.body.pic4;
//         if (pic2 = undefined) {
//             pic2 = null
//         }
//         if (pic3 = undefined) {
//             pic3 = null
//         }
//         if (pic4 = undefined) {
//             pic4 = null
//         }
//         let breakfast = req.body.breakfast;
//         let pools = req.body.pool;
//         let wifi = req.body.wifi;
//         let air_conditioner = req.body.air;
//         if (!breakfast) {
//             breakfast = "no";
//         }
//         if (!pools) {
//             pools = "no";
//         }
//         if (!wifi) {
//             wifi = "no";
//         }
//         if (!air_conditioner) {
//             air_conditioner = "no";
//         }

//         const [services, fields4] = await conn.query(" insert into services(breakfast, pool, wifi, air_conditioner) value(?,?,?,?)",
//             [breakfast, pools, wifi, air_conditioner])
//         const serviceId = services.insertId
//         console.log(serviceId)



//         const [img, fields1] = await conn.query(" insert into image(pic1, pic2, pic3, pic4) values(?,?,?,?)",
//             [pic1.path.substr(6), pic2, pic3, pic4])
//         const imgId = img.insertId
//         console.log(imgId)
//         // res.send("addd image complete!")
//         const [room, fields3] = await conn.query(" insert into roomdetail(room_type, price, description, room_img_id, service_id) value(?,?,?,?,?)",
//             [room_type, price, description, imgId, serviceId])

//         conn.commit()
//         res.redirect("/admin")

//     } catch (err) {
//         console.log(err)
//         await conn.rollback();
//         return next(error)
//     } finally {
//         console.log('finally')
//         conn.release();
//     }
// });

// update roomdetail
// router.put("/admin/update/:roomId", async function (req, res, next) {
//     const roomId = req.params.roomId
//     const [[serviceId]] = await pool.query('select service_id from roomdetail where room_id = ?', [roomId])
//     const [[imgId]] = await pool.query('select room_img_id from roomdetail where room_id = ?', [roomId])
//     try {
//         console.log(req)
//         res.send({ service: serviceId, img: imgId })


//     } catch (err) {
//         console.log(err)
//     }
// })


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
    room_type: Joi.string().required(),
    price: Joi.number().integer().required(),
    description: Joi.string().required(),
    service1: Joi.valid('yes', 'no').required(),
    service2: Joi.valid('yes', 'no').required(),
    service3: Joi.valid('yes', 'no').required(),
    service4: Joi.valid('yes', 'no').required(),
    people: Joi.number().required(),
})
router.post("/admin/create", isLoggedIn, upload.array("myImage", 5), async function (req, res, next) {
    // add people
    try {
        await checkCreate.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }

    const file = req.files;
    let pathArray = [];

    if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    const room_type = req.body.room_type
    const price = req.body.price
    const description = req.body.description
    const service1 = req.body.service1
    const service2 = req.body.service2
    const service3 = req.body.service3
    const service4 = req.body.service4
    const people = req.body.people
    const image = req.body.myImage




    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        console.log("asdfsdf")
        // insert image and service ก่อนค่อยเอาเข้าตารางเพราะต้องใช้ id
        const [ins_service] = await conn.query('insert into services(breakfast, pool, wifi, air_conditioner) value(?, ?, ?, ?)', [service1, service2, service3, service4])
        const [room] = await conn.query('insert into roomdetail(room_type, price, description, service_id, room_img_id, people) value(?, ?, ?, ?, ?, ?)', [room_type, price, description, ins_service.insertId, image, people])


        req.files.forEach((file, index) => {
            let path = [blogId, file.path.substring(6), index == 0 ? 1 : 0];
            pathArray.push(path);
        });

        await pool.query(
            "INSERT INTO images(room_id, file_path) VALUES (?, ?);",
            [room.insertId, pathArray]
        );
        console.log(image)



        conn.commit()
    } catch (err) {
        console.log(err)
        conn.rollback()
    } finally {
        conn.release()
        console.log("finally")
        res.status(201).send('complate')
    }
});





exports.router = router;