const express = require("express");

const pool = require("../config");
const router = express.Router();

// Get comment
router.get('/:blogId/comments', function (req, res, next) {
});

// Create new comment
router.post('/:blogId/comments', function (req, res, next) {
    return
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