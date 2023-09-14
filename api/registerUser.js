const express = require("express")
const bodyParser = require("body-parser")
const requestErrorHandler = require("../util/requestErrorHandler")

const router = express.Router()

/*
ERROR CODES:
1001 - Invalid username length
*/
router.post("/registerUser", bodyParser.json(), (req, res) => {
    const username = req.body["username"]
    if (!username || typeof(username) != "string") {
        res.json({success: false, errorCode: 1000, errorMessage: "Field 'username' must be a string"})
        return
    }

    const password = req.body["password"]
    if (!password || typeof(password) != "string") {
        res.json({success: false, errorCode: 1000, errorMessage: "Field 'password' must be a string"})
        return
    }

    const email = req.body["email"]
    if (!email || typeof(email) != "string") {
        res.json({success: false, errorCode: 1000, errorMessage: "Field 'email' must be a string"})
        return
    }


    if (username.length < 5 || username.length > 32) {
        res.json({success: false, errorCode: 1001, errorMessage: "Username must be at least 5 and at most 32 characters long"})
        return
    }

    if (!username.match(/^[a-zA-Z0-9_]+$/) || !username.match(/[a-zA-Z]/)) {
        res.json({success: false, errorCode: 1001, errorMessage: "Username must contain only letters, numbers and underscore. At least one letter is required"})
        return
    }


    

    res.json({success: true})
}, requestErrorHandler)

module.exports = router