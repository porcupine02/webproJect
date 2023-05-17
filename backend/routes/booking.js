const express = require("express");
const { isLoggedIn } = require("../middlewares");
const pool = require("../config");
const path = require("path")
const Joi = require('joi')
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
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
  const upload = multer({ storage: storage });

// Get comment
router.get('/booking', isLoggedIn,  async function(req, res, next){

    // console.log(req.query.room)
    // console.log(req.query.begin)
    // console.log(req.query.end)

    console.log(req.user)

    const roomId = req.query.room.split(' ')[0]
    const begin = req.query.room.split(' ')[1]
    const end = req.query.room.split(' ')[2]
    console.log(begin)
    try{
        const[room, fields] = await pool.query(`SELECT * FROM roomdetail join images using(room_id) WHERE room_id = ? and main = 1`, [roomId])
        const[countRooms, feild3] = await pool.query('SELECT min(ur.count) as ucount FROM roomdetail rd join unvalible_room ur using(room_id) WHERE room_id = ? and (date between  ? and  ?)', [roomId, begin, end])
        const [countDays, feild1] = await pool.query('SELECT DATEDIFF( ? , ?) AS counts', [end, begin])
        const [dateNow, feilds] = await pool.query(`SELECT NOW() as 'date' `)
        const [dob, feild2] = await pool.query('SELECT * FROM customers')
        console.log(countDays[0].counts)
        console.log(dateNow[0].date)

        // console.log(countRooms)
      
        res.status(200).json({room : JSON.stringify(room), countDays : JSON.stringify(countDays[0].counts), dateNow : JSON.stringify(dateNow[0].date), dob:JSON.stringify(dob), ucount : JSON.stringify(countRooms)})
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
    
});



router.post('/invoice', isLoggedIn, upload.single('file_image'), async function(req, res, next){
    // console.log(req.file.path)
    console.log(req.body)
    // console.log(req.user.login_id)

    const [cusId] = await pool.query('SELECT cus_id FROM login WHERE login_id = ?', [req.user.login_id])
    // console.log(cusId[0].cus_id)

    const cus_id = cusId[0].cus_id
    const {fname, lname, checkIn, checkOut, countDays, countRooms, priceForDay, price, allPrice, roomId, paidAmount, people, allCountRooms} = req.body
    const[dateCount] = await pool.query(`SELECT DATEDIFF(?, ?) AS DateDiff;`, [checkOut, checkIn])
    var countDate = dateCount[0].DateDiff
    var date = checkIn
    var num = []

    for(let j  = 0; j < countDate + 1; j++){
      if(j == 0){
 
        const[uCountRooms] = await pool.query(`SELECT min(count) as min_count FROM unvalible_room WHERE date = ? and room_id = ?`, [date, roomId])
        console.log(uCountRooms)
        if(uCountRooms[0].min_count == null){
          num[j] = Number(allCountRooms)
          console.log(num[j])
        }
        else{
          num[j] = uCountRooms[0].min_count
        }
      }
      else{
        const[unvals] = await pool.query(`SELECT ADDDATE( ?,  1) AS DateAdd;`, [date])
        date = unvals[0].DateAdd
        const[uCountRoomsMoreOne] = await pool.query(`SELECT min(count) as min_count FROM unvalible_room WHERE date = ? and room_id = ?`, [date, roomId])
        // console.log(uCountRoomsMoreOne)
        if(uCountRoomsMoreOne[0].min_count == null){
          num[j] = Number(allCountRooms)
        }
        else{
          num[j] = uCountRoomsMoreOne[0].min_count
        }
        console.log(num[j])
      }
    }
    //จำนวนห้อง
    console.log(num)

    

    // console.log(dateCount[0].DateDiff)

   
 
    // console.log(typeof(countDate))

    
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
       
        const[booking] = await conn.query('INSERT INTO booking (cus_id, room_id, price, check_in, check_out, booking_fname, booking_lname, timestamp_booking, people, countRoom) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [cus_id, roomId, price, checkIn, checkOut, fname, lname, new Date(), people, countRooms])
        console.log(booking.insertId)

         if(!req.file && paidAmount == ''){
        await conn.query('INSERT INTO payments(payment_date, payment_total_money, booking_id, status) VALUES (?, ?, ?, ?)', [new Date(), allPrice, booking.insertId, 'incomplete'])
          }

          else if(paidAmount != allPrice){
            await conn.query('INSERT INTO payments(payment_date, payment_slip, payment_total_money, booking_id, payment_amount, status) VALUES (?, ?, ?, ?, ?, ?)', [new Date(), req.file.path, allPrice, booking.insertId, paidAmount,'incomplete'])
          }
          else{
            await conn.query('INSERT INTO payments(payment_date, payment_slip, payment_total_money, booking_id, payment_amount, status) VALUES (?, ?, ?, ?, ?, ?)', [new Date(), req.file.path, allPrice, booking.insertId, paidAmount,'complete'])
          }
          var dates = checkIn
          console.log(num[0])
        if(num[0] != null){
          for(let i = 0; i < countDate + 1; i++){
              if(i == 0){
                  conn.query('INSERT INTO unvalible_room (room_id, count, date) VALUES (?, ?, ?)', [roomId, num[i] - countRooms, dates])
              }
              else{
                  const[unval] = await pool.query(`SELECT   ADDDATE( ?,  1) AS DateAdd;`, [dates])
                     console.log(unval)
                     dates = unval[0].DateAdd
                     conn.query('INSERT INTO unvalible_room (room_id, count, date) VALUES (?, ?, ?)', [roomId, num[i] - countRooms, dates])
              }
  
          }
        }
        else{
          for(let i = 0; i < countDate + 1; i++){
            if(i == 0){
                conn.query('INSERT INTO unvalible_room (room_id, count, date) VALUES (?, ?, ?)', [roomId, allCountRooms - countRooms, dates])
            }
            else{
                const[unval] = await pool.query(`SELECT   ADDDATE( ?,  1) AS DateAdd;`, [dates])
                   console.log(unval)
                   dates = unval[0].DateAdd
                   conn.query('INSERT INTO unvalible_room (room_id, count, date) VALUES (?, ?, ?)', [roomId, allCountRooms - countRooms, dates])
            }

        }
        }

        
        // res.send(payment)
        await conn.commit()


       res.status(200).json(booking)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        // console.log('finally')
        conn.release();
    }

    // const[booking, fields] = await pool.query(`SELECT * FROM roomdetail WHERE room_id = ?`)
    
})




// Delete payment
router.delete('/deleteBooking/:id', isLoggedIn, async function(req, res, next){
    console.log(req.params.id)


    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
      
            await conn.query("delete from payments where payment_id =?", [req.params.id])

            

            conn.commit()
            res.status(201).send("ถูกcancel")
       
        
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }
  
    
    
});

// Delete comment
router.put('/editBooking',isLoggedIn, async function(req, res, next){

    console.log(req.body)
      const bookedId = req.body.bookedId
    const bookedCheckIn = req.body.bookedCheckIn
    const bookedCheckOut = req.body.bookedCheckOut
    const bookedRoomId = req.body.bookedRoomId
    const bookedCountRoom = req.body.bookedCountRoom
    console.log(bookedId, bookedCheckIn, bookedCheckOut, bookedRoomId, bookedCountRoom)
    const[dateCount] = await pool.query(`SELECT DATEDIFF(?, ?) AS DateDiff;`, [bookedCheckOut, bookedCheckIn])
    console.log(dateCount)
    const CountDate = dateCount[0].DateDiff
    console.log(CountDate)
    var dateCheckIn = bookedCheckIn
    var alldate = []
    //loop ไอดีห้อง จำนวนวัน ที่น้อยที่สุด วันที่
    for(let i = 0; i < CountDate + 1; i++){
      if(i == 0){
        const[room] = await pool.query('SELECT room_id,  min(unvalible_room.count) as minCountRoom, DATE_FORMAT(date, "%Y-%m-%d") as date FROM unvalible_room WHERE room_id = ? and date = ?', [bookedRoomId, bookedCheckIn])
        alldate[i] = room[0]

      }
      else{
        const[unval] = await pool.query(`SELECT   ADDDATE( ?,  1) AS DateAdd;`, [dateCheckIn])
        console.log(unval)
        const[room] = await pool.query('SELECT room_id,  min(unvalible_room.count) as minCountRoom, DATE_FORMAT(date, "%Y-%m-%d") as date FROM unvalible_room WHERE room_id = ? and date = ?', [bookedRoomId, unval[0].DateAdd])
        alldate[i] = room[0]
        dateCheckIn = unval[0].DateAdd
      }
    }
    console.log(alldate)
    

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
      
            await conn.query("update booking set status = ? where booking_id = ?", [4, bookedId])

            console.log(alldate[0].minCountRoom + bookedCountRoom)
            console.log(alldate[0].room_id)
            console.log(alldate[0].date)

            for(let i = 0; i < alldate.length; i++){
              await conn.query("update unvalible_room set count = ? where room_id = ? and date = ?", [alldate[i].minCountRoom + bookedCountRoom, alldate[i].room_id, alldate[i].date])
              
            }

            conn.commit()
            res.status(201).send("ถูกcancel")
       
        
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }
});

router.put('/checkIn/:id', isLoggedIn, async function(req, res, next){
    console.log(req.params.id)

    const bookedId = req.params.id

        try {
          const [rows1, fields1] = await pool.query(
            'update booking set status = ?  where booking_id = ?', [3, bookedId]
          )
          console.log(rows1)
          const [row2, field] = await pool.query(
            'SELECT status FROM booking WHERE booking_id = ?', [bookedId]
          )
          res.json(row2)
      } catch (error) {
          res.status(500).json(error)
      }

       
        
  
})


router.put('/checkOut/:id', isLoggedIn, async function(req, res, next){
  console.log(req.params.id)

  const bookedId = req.params.id

      try {
        const [rows1, fields1] = await pool.query(
          'update booking set status = ?  where booking_id = ?', [2, bookedId]
        )
        console.log(rows1)
        const [row2, field] = await pool.query(
          'SELECT status FROM booking WHERE booking_id = ?', [bookedId]
        )
        console.log(row2)
        res.json(row2)
    } catch (error) {
        res.status(500).json(error)
    }

     
      

})


exports.router = router