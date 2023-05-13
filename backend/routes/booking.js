const express = require("express");
const { isLoggedIn } = require("../middlewares");
const pool = require("../config")
const router = express.Router();

// Get comment
router.get('/booking', isLoggedIn, async function(req, res, next){

    console.log(req.query.room[0])
    console.log(req.user)

    const roomId = req.query.room.split(' ')[0]
    const begin = req.query.room.split(' ')[1]
    const end = req.query.room.split(' ')[2]
    console.log(begin)
    try{
        const[room, fields] = await pool.query(`SELECT * FROM roomdetail join image using(room_img_id) WHERE room_id = ?`, [roomId])
        const [countDays, feild1] = await pool.query('SELECT DATEDIFF( ? , ?) AS counts', [end, begin])
        const [dateNow, feilds] = await pool.query(`SELECT NOW() as 'date' `)
        console.log(countDays[0].counts)
        console.log(dateNow[0].date)
      
        res.status(200).json({room : JSON.stringify(room), countDays : JSON.stringify(countDays[0].counts), dateNow : JSON.stringify(dateNow[0].date)})
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
    




    // console.log(room)
    
   
});

// Create new comment
router.post('/:blogId/comments', function(req, res, next){
    return
});

// Update comment
router.put('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.delete('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.put('/comments/addlike/:commentId', function(req, res, next){
    return
});


exports.router = router