const express = require('express')
const cors = require('cors')
const database = require('./database')

const app = express()

app.use(express.json())

app.use(require('./routes/todoRoute'))

app.listen(3000, () => console.log('Server running'))