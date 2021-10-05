const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.get("/users", (req, res, next) => {
    db.query("SELECT * FROM users")
        .then(result => {
            return res.json(result.rows)
        })
        .catch(error => {
            console.log("error", error)
        })
})



module.exports = router;