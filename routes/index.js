// endpoint is /
// check for cookie
// if no cookie, send them to login page

// else if cookie exists, check for jwt. If jwt isnt good, send login page

// create registration endpoint
// create username and password
// create jwt and send back in cookie
// route them to homepage after registration

// after signout, clear out cookie and redirect to login page


const express = require('express');
const path = require('path');
const db = require('../db');
const router = express.Router();

const jwt = require('jsonwebtoken')

const SECRET_FOR_JWT = 'SECRET FOR JWT'

router.use(function (req, res, next) {
    next()
})

router.get('/', async (req, res) => {
    if (req.cookies) {
        // console.log('[req.cookies]:', req.cookies)
        if (!req.cookies.jwt) {
            // redirect to login
            return res.sendFile(path.resolve(__dirname, '../public/login.html'))
        } else {
                // validate jwt
            try {
                const tokenFromClient = req.cookies.jwt
                const decoded = await jwt.verify(tokenFromClient, SECRET_FOR_JWT)

                return res.status(200).sendFile(path.resolve(__dirname, '../public/welcome.html'));

            } catch {
                // console.log('jwt is bad')
                return res.sendFile(path.resolve(__dirname, '../public/login.html'))
            }
        }
    }

})

router.get('/login', async (req, res, next) => {
    // return res.sendFile(path.resolve(__dirname, '../public/login.html'))
    try {
        const tokenFromClient = req.cookies.jwt
        const decoded = await jwt.verify(tokenFromClient, SECRET_FOR_JWT)

        // return res.status(200).sendFile(path.resolve(__dirname, '../public/welcome.html'));
        return res.status(200).redirect('/welcome')
    } catch {

        // console.log('jwt is bad')
        return res.sendFile(path.resolve(__dirname, '../public/login.html'))
    }
})

//          login: check if user and password are valid. 
            // If valid, create cookie and send back to user, redirect to /welcome
            // if invalid, redirect back to /login

router.post('/login', (req, res, next) => {
    db.query(
        "SELECT * FROM users WHERE username=$1 AND password=$2 LIMIT 1",
        [req.body.username, req.body.password]
    )
        .then(foundUser => {
            let user = foundUser.rows[0]
            
            console.log("[foundUser]: ", user)
            if (user === undefined) {
                return res.status(401).json({ message: 'username or password is wrong'})
                // create token
            } else {
                let tokenToClient = jwt.sign(user, SECRET_FOR_JWT, { expiresIn: 60 * 400 })
                console.log('[token to client]:', tokenToClient)
                res.cookie('jwt', tokenToClient)
                res.cookie('username', user.username)
                
                // res.send({ redirect_path: "/welcome" });
                return res.redirect('/welcome')

                // return res.json({ jwt: tokenToClient})
            }
        })
        .catch(e => {
            console.log('error querying username: ', e)
            return res.status(500).json({ message: 'error with internal query'})
        })
})

router.route("/logout")
    .post(function (req, res, next) {
        console.log('/logout HITTTT')
        res.clearCookie('jwt').redirect('/login');
    })

router.route('/welcome')
    .get(async function (req, res, next) {

        if (!req.cookies.jwt) {
            // redirect to login
            return res.redirect('/login')
        } else {
            // validate jwt
            try {
                const tokenFromClient = req.cookies.jwt
                const decoded = await jwt.verify(tokenFromClient, SECRET_FOR_JWT)

                return res.status(200).sendFile(path.resolve(__dirname, '../public/welcome.html'));
            } catch {
                // console.log('jwt is bad')
                // return res.sendFile(path.resolve(__dirname, '../public/login.html'))
                return res.redirect('/login')
            }
        }
    })
    .post(function (req, res, next) {
        users.push({
            name: req.body.name,
            id: ++id
        })
        return res.json({
            message: "Created user",
            users: users
        })
    })

module.exports = router
