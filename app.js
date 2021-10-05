const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')

const routes = require('./routes')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
