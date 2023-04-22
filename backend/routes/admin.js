const express = require("express");
const pool = require("../config");
const path = require("path")
router = express.Router();
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/imagehotel')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })



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

// create
router.post("/admin/addroom", upload.array("myImage", 5), async function (req, res, next) {
    // เอารูปไปใส่ใน img table ก่อนแล้ว ดึง room_img_id มาใช้

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const file = req.files;
        console.log(file)
        const room_type = req.body.room_type;
        const description = req.body.room_description;
        const service = {
            breakfast: req.body.breakfast,
            pools: req.body.pool,
            wifi: req.body.wifi,
            air: req.body.air
        }
        const price = req.body.price;
        const count = req.body.count_room;
        console.log("tyep : " + room_type)
        console.log("des : " + description)
        console.log(service)
        console.log("price : " + price)
        console.log("count : " + count)

        // not
        // let pic1 = req.file;
        let pic1 = 'test';
        let pic2 = req.body.pic2;
        let pic3 = req.body.pic3;
        let pic4 = req.body.pic4;
        if (pic2 = undefined) {
            pic2 = null
        }
        if (pic3 = undefined) {
            pic3 = null
        }
        if (pic4 = undefined) {
            pic4 = null
        }
        // not
        if (service.breakfast) {
            var breakfast = "yes";
        } else {
            var breakfast = "no";
        }
        if (service.pools) {
            var pools = "yes";
        } else {
            var pools = "no";
        }
        if (service.wifi) {
            var wifi = "yes";
        } else {
            var wifi = "no";
        }
        if (service.air) {
            var air = "yes";
        } else {
            var air = "no";
        }

        const [services, fields4] = await conn.query(" insert into services(breakfast, pool, wifi, air_conditioner) value(?,?,?,?)",
            [breakfast, pools, wifi, air])
        const serviceId = services.insertId
        console.log(serviceId)



        const [img, fields1] = await conn.query(" insert into image(pic1, pic2, pic3, pic4) values(?,?,?,?)",
            [pic1, pic2, pic3, pic4])
        const imgId = img.insertId
        console.log(imgId)
        // res.send("addd image complete!")
        const [room, fields3] = await conn.query(" insert into roomdetail(room_type, price, description, room_img_id, service_id) value(?,?,?,?,?)",
            [room_type, price, description, imgId, serviceId])

        conn.commit()
        res.redirect("/admin")

    } catch (err) {
        console.log(err)
        await conn.rollback();
        return next(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});


// insert vacantroom
router.post("/admin/vacantroom/:roomId", async function (req, res, next) {
    var start = new Date(req.query.start);
    var end = new Date(req.query.end);


    var loop = new Date(start);
    while (loop <= end) {
        console.log("aksdfjlksdaf")
        const [vacant, field] = await pool.query("insert into vacantroom(room_id, count, date) value(?,?,?)",
            [req.params.roomId, 10, loop])
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }


    // const start = req.query.start
    // const end = req.query.end
    // console.log(req.query.count)
    // res.send({ start: start, id: req.params.roomId })
    // for (x = start; x <= end; x++) {
    //     console.log(x)
    //     const [vacant, field] = await pool.query("insert into vacantroom(room_id, count, date) value(?,?,?)",
    //         [req.params.roomId, 10, x])
    //     console.log(req.params.roomId)

    // }
});



router.get("/admin/vacantroom/", async function (req, res, next) {
    try {
        const [vacantroom, field] = await pool.query("select * from vacantroom")
        console.log(vacantroom)
        res.send({ vacantroom: JSON.stringify(vacantroom) })
    } catch (err) {
        console.log(err)
    }
});
exports.router = router;