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



router.get("/searchQuery", async function (req, res, next) {
    const header = req.query.search
    console.log(header)
    if (header.includes("check_in")) {
        header.push(" DATE_FORMAT(check_in, '%Y-%m-%d') as check_in ")
    }
    if (header.includes("check_out")) {
        header.push(" DATE_FORMAT(check_out, '%Y-%m-%d') as check_out ")
    }
    if (header.includes("timestamp_booking")) {
        header.push(" DATE_FORMAT(timestamp_booking, '%Y-%m-%d (%H:%i)') as timestamp_booking ")
    }
    if (header.includes("payment_date")) {
        header.push(" DATE_FORMAT(payment_date, '%Y-%m-%d') as payment_date ")
    }
    if (header.includes("DOB")) {
        header.push(" DATE_FORMAT(DOB, '%Y-%m-%d') as DOB ")
    }

    try {
        let query = "select " + header
        // format date

        console.log(query + ` from booking join payments using (booking_id) join users using (cus_id)`)

        const [result] = await pool.query(query + ` from booking join payments using (booking_id) join users using (cus_id)`)
        console.log(result)
        res.status(200).send({ result: result })

    } catch (err) {
        console.log(err)
    }

});
router.delete("/deleteRoom/:roomId", async function (req, res, next) {
    console.log(req.params.roomId)

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    const date = new Date()
    const room_id = req.params.roomId
    const [check] = await conn.query('select * from unvalible_room where room_id = ? and date > ?', [room_id, date])
    const [allRooms] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE main = 1 and room_id != ?', [room_id])

    console.log(check)
    try {
        if (check.length <= 0) {
            await conn.query("delete from roomdetail where room_id = ?", [req.params.roomId])
            conn.commit()
            console.log("allRooms")
            console.log(allRooms)

            res.status(204).send({ allRooms: allRooms })
        } else {
            res.status(400).send("can't delete this room because have booked")
        }
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }

});







// show
router.get("/admin", async function (req, res, next) {
    console.log(req.body)
    try {
        console.log("hello world")

        const [customers] = await pool.query(" select *, concat(first_name, ' ', last_name) as name, DATE_FORMAT(DOB, '%Y-%m-%d') as DOB from users left outer join images using (cus_id)")
        const [booking] = await pool.query(" select * from booking")
        const [allRooms] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE main = 1')
        console.log(allRooms)

        // const [rooms, fields2] = await pool.query(" select * from roomdetail r left outer join image i on (r.room_img_id = i.room_img_id)")
        res.send({ booking: booking, customers: customers, allRooms: allRooms })

    } catch (err) {
        console.log(err)
    }

});

router.get("/admin/update/:roomId", async function (req, res, next) {
    const roomId = req.params.roomId
    console.log("roomId")
    console.log(roomId)
    const [room] = await pool.query("select * from roomdetail join services using (service_id) where room_id = ?", [roomId])
    console.log(room)
    try {
        const [room] = await pool.query("select * from roomdetail join services using (service_id) where room_id = ?", [roomId])
        res.status(200).send(room)

    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "เกิดข้อผิดพลาด กรุณาลองใหม่" })
    }

});

// update
router.put("/admin/update/:id", async function (req, res, next) {
    try {
        await checkCreate.validateAsync(req.body)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" })
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        console.log("params")
        const room_id = req.params.id;
        const room_type = req.body.room_type;
        const price = req.body.price;
        const description = req.body.description;
        const service1 = req.body.service1;
        const service2 = req.body.service2;
        const service3 = req.body.service3;
        const service4 = req.body.service4;
        const people = req.body.people;
        const count = req.body.count;
        const service_id = req.body.service_id
        console.log(description)

        console.log("roomdetail")
        console.log(room_id)
        await conn.query("update roomdetail set room_type = ?, price = ?, description = ?, count = ?, people = ? where room_id = ? ",
            [room_type, price, description, count, people, room_id]);

        console.log("service")
        console.log(service_id)
        console.log(service3)
        await conn.query("update services set breakfast = ?, pool = ?, wifi = ?, air_conditioner = ? where service_id = ?",
            [service1, service2, service3, service4, service_id])

        const [selec] = await conn.query("select * from roomdetail where room_id = ?", [room_id])
        console.log(selec)
        console.log("after")
        conn.commit()

        res.status(201).send("update room complete!")
    } catch (err) {
        console.log(err)
        conn.rollback()
    } finally {
        conn.release()
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
    count: Joi.number().required(),
    service_id: Joi.number().optional()
})
router.post("/admin/create", isLoggedIn, upload.array("myImage", 6), async function (req, res, next) {
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

        console.log(req.files)
        req.files.forEach((file, index) => {
            if (index > 0) {
                let path = [room.insertId, file.path.substring(6)];
                pathArray.push(path);
            }
        });

        const [imgM] = await conn.query("insert into images(room_id, file_path, main) values (?, ?, ?)", [room.insertId, req.files[0].path.substring(6), 1])

        if (file.length > 1) {
            const [img] = await pool.query(
                "INSERT INTO images(room_id, file_path) VALUES ?",
                [pathArray]
            );
            await conn.query('update roomdetail set room_img_id = ? where room_id = ?', [img.insertId, room.insertId])
        }
        await conn.query('update roomdetail set room_img_id = ? where room_id = ?', [imgM.insertId, room.insertId])


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


router.put('/confirmPayment/:id', isLoggedIn, async function (req, res, next) {
    console.log(req.params.id)

    const bookedId = req.params.id

    try {
        const [rows1, fields1] = await pool.query(
            'update payments set status = ?  where booking_id = ?', [2, bookedId]
        )
        console.log(rows1)
        const [row2, field] = await pool.query(
            'SELECT status FROM payments WHERE booking_id = ?', [bookedId]
        )
        res.json(row2)
    } catch (error) {
        res.status(500).json(error)
    }

})





exports.router = router;