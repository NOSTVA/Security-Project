const express = require('express')
const rsaRouter = require('./routes/rsaRouter')


const app = express()
app.use(express.json())
app.use(express.static('./public'))

app.use('/RSA', rsaRouter)






app.listen(3000, () => console.log('server started'))