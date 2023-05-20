const express = require("express");

const pool = require("../config");
const { func } = require("joi");
const { isLoggedIn } = require("../middlewares");


router = express.Router();



router.get("/",async function (req, res, next) {
  // console.log(req.query.begin)
  // console.log(req.query.end)
  // console.log(req.query.people)
  const begin = req.query.begin 
  const end = req.query.end
  const people = req.query.people 
  var roomblank = []
  try {

    // const [rows, fields] = await pool.query(
    //    'SELECT * FROM  roomdetail r join images i on (r.room_img_id = i.img_id) join services s on (r.service_id = s.service_id) '
   
    // );
    const [room_un, fields] = await pool.query(
       'SELECT DISTINCT  room_id, min(unvalible_room.count) as ucount FROM  roomdetail  join unvalible_room using(room_id) WHERE people >= ?  and date between ? and ? group by room_id', [people, begin, end ]
    );
    const [room_all, field1] = await pool.query('SELECT room_id, count as ucount FROM roomdetail WHERE people >= ?', people)


   var arr = []
  //  console.log(room_all)
  //  console.log(room_un)
   
   for(let j = 0; j < room_all.length; j++){
    if(room_un[j] == undefined){
      arr[j] = room_all[j]
    }
    else{
      arr[j] = room_un[j]
    }
    
   }
   const rateArr = []

 
 
      console.log(arr)

      for(let i = 0; i < arr.length; i++){
         if(arr[i].ucount == 0){
            roomblank[i] = 0
            rateArr[i] = 0
    
         }
         else{
           const[roomBlank] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE people >= ? and main = 1', people)
           const [commentRate] = await pool.query('SELECT sum(rate) as Sumrate, count(rate) as countRate FROM comments  WHERE room_id = ?', arr[i].room_id)
           roomblank[i] = roomBlank[i]
           rateArr[i] = Number(commentRate[0].Sumrate * 5 / (5 * commentRate[0].countRate))

      
         }
      }
     
      var blank = [0]
      var difference1 = roomblank.filter(x => blank.indexOf(x) === -1)
      var difference2 = rateArr.filter(x => blank.indexOf(x) === -1)
      // console.log(difference)
      return res.send({
        roomShow: difference1,
        rateArr: difference2
      });
 

    

  } catch (err) {
    return next(err)
  }
});


router.get('/showRoom', isLoggedIn, async function(req, res, next){

  console.log(req.user)
  const login_id = req.user.login_id
  try{

    const[roomShow, feild1] = await pool.query('SELECT *  FROM roomdetail join services using(service_id) join images using (room_id) WHERE main = 1')
    const[CountRoom] = await pool.query('SELECT count(room_id) as roomCount FROM roomdetail ')

    console.log(CountRoom[0].roomCount)

    const roomCount = CountRoom[0].roomCount
    const rateArr = [0]

    for(let i = 0; i < roomCount; i++){
      const [commentRate] = await pool.query('SELECT sum(rate) as Sumrate, count(rate) as countRate FROM comments  WHERE room_id = ?', i+1)
      // console.log(commentRate[0].Sumrate * 5 / (5 * commentRate[0].countRate) )
      console.log(commentRate)
      rateArr[i] = Number(commentRate[0].Sumrate * 5 / (5 * commentRate[0].countRate))
    }




    

    console.log(rateArr)
  
    // const [row_room, columns_room] = await pool.query(`SELECT * FROM  roomdetail r join services s using (service_id) where r.room_id = ?`, [req.params.id])
    // const [images, fields] = await pool.query(`select file_path from images where room_id = ?`, [req.params.id])
    // res.json(roomShow)
    return res.send({
      roomShow: roomShow,
      rateArr: rateArr
    });
  }catch(err){
    console.log(err)
  }
})









exports.router = router;
