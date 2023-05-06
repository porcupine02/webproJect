const express = require("express")
var cors = require('cors')
// const path = require("path")

const app = express();
const{logger} = require('./middlewares')
app.use(logger)
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const detailRouter = require('./routes/detail')
const commentRouter = require('./routes/comment')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const bookingRouter = require('./routes/booking')

app.use(indexRouter.router)
app.use(detailRouter.router)
app.use(commentRouter.router)
app.use(adminRouter.router)
app.use(userRouter.router)
app.use(bookingRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})