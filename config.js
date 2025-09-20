require('dotenv').config();

module.exports = {
    HEROKU_URL: process.env.HEROKU_URL || "nothing"
};