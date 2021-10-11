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
const db = require('../databaseConnection');
const router = express.Router();
const axios = require('axios');

const jwt = require('jsonwebtoken')

const SECRET_FOR_JWT = process.env.SECRET_FOR_JWT

router.use(function (req, res, next) {
    next()
})

router.route('/')
    .get(async function (req, res) {
        if (req.cookies) {
            if (!req.cookies.jwt) {
                // redirect to login
                return res.sendFile(path.resolve(__dirname, '../public/login.html'))
            } else {
                try {
                    const tokenFromClient = req.cookies.jwt
                    const decoded = await jwt.verify(tokenFromClient, SECRET_FOR_JWT)

                    return res.status(200).sendFile(path.resolve(__dirname, '../public/welcome.html'));
                } catch {
                    return res.sendFile(path.resolve(__dirname, '../public/login.html'))
                }
            }
        } else {
            return res.sendFile(path.resolve(__dirname, '../public/login.html'))
        }
    })

router.route('/login')
    .get(async function(req, res, next) {
        try {
            const tokenFromClient = req.cookies.jwt
            await jwt.verify(tokenFromClient, SECRET_FOR_JWT)

            return res.status(200).redirect('/welcome')
        } catch {

            return res.sendFile(path.resolve(__dirname, '../public/login.html'))
        }
    })
    .post(function (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        let url = `http://localhost:5000/users?username=${username}`;

        axios.get(url)
            .then(response => {
                let user = response.data[0];
                let dbPassword = user.password;

                if (password === dbPassword) {
                    console.log('password === dbPassword!!!');
                } else {
                    return res.status(401).json({ message: 'username or password is wrong' })
                    // return res.redirect('/error');
                }

                let safeUser = {
                    id: user.id,
                    username: user.username
                }

                if (user === undefined) {
                    return res.status(401).json({ message: 'username or password is wrong' })
                    // create token
                } else {
                    let tokenToClient = jwt.sign(safeUser, SECRET_FOR_JWT, { expiresIn: 60 * 400 })
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
                return res.status(401).json({ message: 'username or password is wrong' })
            })
    })

router.route('/logout')
    .post(function (req, res, next) {
        console.log('/logout HITTTT')
        res.clearCookie('jwt').redirect('/login');
    })

router.route('/error')
    .get(function (req, res, next) {
        return res.status(403).sendFile(path.resolve(__dirname, '../public/error.html'));
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

router.route('/picks')
    .post(async (req, res, next) => {
        console.log('[req]', req.body)
    })

module.exports = router
