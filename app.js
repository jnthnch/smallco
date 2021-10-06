const express = require('express')
const cookieParser = require('cookie-parser')
const { port } = require('./config');
const routes = require('./routes')

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
