const express = require('express')
const cors = require('cors')
const database = require('./database')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

app.use(require('./routes/todoRoute'))
app.use(require('./routes/userRoute'))

app.listen(3000, () => console.log('Server running'))