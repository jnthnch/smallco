const dotenv = require('dotenv');

dotenv.config()

module.exports = {
    bcryptPassword: process.env.BCRYPT_PASSWORD,
    port: process.env.PORT
};