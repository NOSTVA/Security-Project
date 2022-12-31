const express = require('express')
const rsaRouter = require('./routes/rsaRouter')
const desRouter = require('./routes/desRouter')


const app = express()
app.use(express.json())
app.use(express.static('./public'))

app.use('/RSA', rsaRouter)
app.use('/DES', desRouter)




app.listen(3000, () => console.log('server started'))