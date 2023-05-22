const express = require("express");

const pool = require("../config");



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
       'SELECT DISTINCT  room_id, min(unvalible_room.count) as ucount FROM  roomdetail  join unvalible_room using(room_id) WHERE people >= ?  and date between ? and ? group by room_id order by room_id', [people, begin, end ]
    );
 
    const [room_all, field1] = await pool.query('SELECT room_id, count as ucount FROM roomdetail WHERE people >= ?', people)

  
    var a = room_un;
var b = room_all;
var union = [...new Set([...a, ...b])];
// console.log(union);



   var arr = []
  //  console.log(room_all)
  //  console.log(room_un)
  
  const uniqueRoomIds = [...new Set(union.map(item => item.room_id))];
  console.log(uniqueRoomIds)
  
  const result = uniqueRoomIds.reduce((acc, roomId) => {
    const filteredData = union.filter(item => item.room_id === roomId);
    console.log(1)
    console.log(filteredData)
    const minUcount = Math.min(...filteredData.map(item => item.ucount));
    acc.push({ room_id: roomId, min_ucount: minUcount });
    return acc;
  }, []);
 
  // console.log(result);
  result.sort((a, b) => a.room_id - b.room_id);
console.log(result);

   const rateArr = []

 
 
      console.log(arr)

      for(let i = 0; i < result.length; i++){
         if(result[i].min_ucount == 0){
            roomblank[i] = 0
            rateArr[i] = 0
    
         }
         else{
           const[roomBlank] = await pool.query('SELECT * FROM roomdetail join services using(service_id) join images using (room_id) WHERE people >= ? and main = 1', people)
           const [commentRate] = await pool.query('SELECT sum(rate) as Sumrate, count(rate) as countRate FROM comments  WHERE room_id = ?', result[i].room_id)
           roomblank[i] = roomBlank[i]
           rateArr[i] = Number(Math.floor(commentRate[0].Sumrate * 5 / (5 * commentRate[0].countRate)))

      
         }
      }
      console.log(rateArr)
     
      var blank = [0]
      var difference1 = roomblank.filter(x => blank.indexOf(x) === -1)
      var difference2 = rateArr.filter(x => blank.indexOf(x) === -1)
      console.log(difference2)
      return res.send({
        roomShow: difference1,
        rateArr: difference2
      });
 

    

  } catch (err) {
    return next(err)
  }
});


router.get('/showRoom', async function(req, res, next){

  console.log(req.user)
  // const login_id = req.user.login_id
  try{

    const[roomShow, feild1] = await pool.query('SELECT *  FROM roomdetail join services using(service_id) join images using (room_id) WHERE main = 1')
    const[CountRoom] = await pool.query('SELECT count(room_id) as roomCount FROM roomdetail ')

    const [TopRoom] = await pool.query('SELECT *, sum(rate) as `Sumrate`, count(rate) as `countRate`, room_id, round(sum(rate) / count(rate), 1) AS result FROM comments join roomdetail using(room_id) join images using(room_id) where main = 1 group by room_id  order by result desc LIMIT 4')
    console.log(1)
    console.log(TopRoom)

    console.log(CountRoom[0].roomCount)

    const roomCount = CountRoom[0].roomCount
    const rateArr = [0]

    for(let i = 0; i < roomCount; i++){
      const [commentRate] = await pool.query('SELECT sum(rate) as Sumrate, count(rate) as countRate FROM comments  WHERE room_id = ?', i+1)
      // console.log(commentRate[0].Sumrate * 5 / (5 * commentRate[0].countRate) )
      console.log(commentRate)
      rateArr[i] = Number(Math.floor(commentRate[0].Sumrate * 5 / (5 * commentRate[0].countRate)))
    }




    

    console.log(rateArr)
  
    // const [row_room, columns_room] = await pool.query(`SELECT * FROM  roomdetail r join services s using (service_id) where r.room_id = ?`, [req.params.id])
    // const [images, fields] = await pool.query(`select file_path from images where room_id = ?`, [req.params.id])
    // res.json(roomShow)
    return res.send({
      roomShow: roomShow,
      rateArr: rateArr,
      TopRoom : TopRoom
    });
  }catch(err){
    console.log(err)
  }
})









exports.router = router;
