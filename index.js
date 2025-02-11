const dontenv=require("dotenv").config();
const express = require('express')
const authrouters =require('./src/routes/authRoutes')
const siterouters=require('./src/routes/siteRoutes')
const orderrouters=require('./src/routes/orderRoutes')
const mdroutes=require('./src/routes/mdRoutes')
const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use('/api/useraccess',authrouters)
app.use('/api/siteaccess',siterouters)
// app.use('/api/orders',orderrouters)
app.use('/api/master-detail',mdroutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      