const express = require("express");

const pool = require("../config");
const router = express.Router();

const { isLoggedIn } = require("../middlewares");
// Get comment
router.get('/:blogId/comments', function (req, res, next) {
});

// Create new comment
router.post('/comment', isLoggedIn, async function (req, res, next) {
    console.log(req.body)
    const content = req.body.content
    const room_id = req.body.room_id
    const rate = req.body.rate
    const login_id = req.user.login_id

    const [customer] = await pool.query('select cus_id from login where login_id = ?', [login_id])
    const cus_id = customer[0].cus_id
    console.log("room_id")
    console.log(room_id)

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await conn.query('insert into comments(content, cus_id, room_id, rate) values (?, ?, ?, ?)', [content, cus_id, room_id, rate])
        conn.commit()
        res.status(201).send("comment done!")
    } catch (err) {
        console.log(err)
        conn.rollback()
        res.status(400).send("comment fail!")
    } finally {
        conn.release()
    }

});

// Update comment
router.put('/comments/:commentId', function (req, res, next) {
    return
});

// Delete comment
router.delete('/comments/:commentId', function (req, res, next) {
    return
});

// update like comment
router.put('/comments/addlike/:commentId', async function (req, res, next) {
    const [like] = await pool.query('select c.like from comments c where comment_id = ?', [req.params.commentId])
    // console.log(like[0].like ++)
    let newLike = like[0].like + 1
    console.log(newLike)


    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await pool.query('update comments set comments.like = ? where comment_id = ?', [newLike, req.params.commentId])

    } catch (err) {
        console.log(err)
        conn.rollback()
    } finally {
        conn.release()
        res.send("complate")
    }


});


exports.router = router