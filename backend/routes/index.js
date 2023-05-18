const express = require("express");

const pool = require("../config");
const { func } = require("joi");


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
   console.log(room_all)
   console.log(room_un)
   
   for(let j = 0; j < room_all.length; j++){
    if(room_un[j] == undefined){
      arr[j] = room_all[j]
    }
    else{
      arr[j] = room_un[j]
    }
    
   }

 
   
    if(room_un == ''){
      console.log('folk')
      const[room, feild1] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE people >= ? and main = 1', people)
         return res.json(room);
    }

    else{
      console.log(arr)

      for(let i = 0; i < arr.length; i++){
         if(arr[i].ucount == 0){
            roomblank[i] = 0
    
         }
         else{
           const[roomBlank] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE people >= ? and main = 1', people)
           roomblank[i] = roomBlank[i]
      
         }
      }
     
      var blank = [0]
      var difference = roomblank.filter(x => blank.indexOf(x) === -1)
      console.log(difference)
      return res.json(difference)
    }


    

  } catch (err) {
    return next(err)
  }
});


router.get('/showRoom', async function(req, res, next){
  try{
    const[roomShow, feild1] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE main = 1')
    // const [row_room, columns_room] = await pool.query(`SELECT * FROM  roomdetail r join services s using (service_id) where r.room_id = ?`, [req.params.id])
    // const [images, fields] = await pool.query(`select file_path from images where room_id = ?`, [req.params.id])
    res.json(roomShow)
  }catch(err){
    console.log(err)
  }
})









exports.router = router;
