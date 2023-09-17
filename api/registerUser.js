const express = require("express")
const bodyParser = require("body-parser")
const requestErrorHandler = require("../util/requestErrorHandler")
const userManager = require("../userManager")
const emailConfirmations = require("../emailConfirmations")

const router = express.Router()

/*
ERROR CODES:
1000 - Invalid argument type 'username'
1001 - Invalid argument type 'password'
1002 - Invalid argument type 'email'

1010 - Invalid username length
1011 - Invalid username characters

1012 - Invalid password length
1013 - Invalid password characters

1014 - Invalid email

1015 - Error creating user
1016 - Error trying to find user in database
1017 - Error creating confirmation in database
*/
router.post("/registerUser", bodyParser.json(), async (req, res) => {
    const username = req.body["username"]
    //console.log(req.body)
    if (typeof(username) != "string") {
        res.json({success: false, errorCode: 1000, errorMessage: `Field 'username' must be a string (got '${typeof(username)}' instead)`})
        return
    }

    const password = req.body["password"]
    if (typeof(password) != "string") {
        res.json({success: false, errorCode: 1001, errorMessage: `Field 'password' must be a string (got '${typeof(password)}' instead)`})
        return
    }

    const email = req.body["email"]
    if (typeof(email) != "string") {
        res.json({success: false, errorCode: 1002, errorMessage: `Field 'email' must be a string (got '${typeof(email)}' instead)`})
        return
    }



    if (username.length < 5 || username.length > 32) {
        res.json({success: false, errorCode: 1010, errorMessage: "Username must be at least 5 and at most 32 characters long"})
        return
    }

    if (!username.match(/^[a-zA-Z0-9_]+$/g) || !username.match(/[a-zA-Z]/)) {
        res.json({success: false, errorCode: 1011, errorMessage: "Username must contain only letters, numbers and underscore. At least one letter is required"})
        return
    }



    if (password.length < 6 || password.length > 32) {
        res.json({success: false, errorCode: 1012, errorMessage: "Password must be at least 6 and at most 32 characters long"})
        return
    }

    if (!password.match(/^[a-zA-Z0-9_#?!@$%&*-]+$/g)) {
        res.json({success: false, errorCode: 1013, errorMessage: "Password must contain only letters, numbers and any of the following characters: _, #, ?, !, @, $, %, &, *, -"})
        return
    }



    //^[a-zA-Z.]+@[a-zA-Z]+\.[a-zA-Z]+$
    if (!email.match(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/g)) {
        res.json({success: false, errorCode: 1014, errorMessage: "Invalid email"})
        return
    }



    {
        let e = await userManager.createUser(username, password, email)
        if (e) {
            res.json({success: false, errorCode: 1015, errorMessage: "An error occurred when trying to create user in the database"})
            return
        }
    }

    let user
    {
        let [u, e] = await userManager.getUserByUsername(username)
        if (!u || e) {
            res.json({success: false, errorCode: 1016, errorMessage: "User was created, but an error occurred when trying to get user information in the database (try getting it through /api/getUser)"})
            return
        }
        user = u
    }

    {
        let [code, e] = await emailConfirmations.newConfirmation(email)
        if (!code || e) {
            res.json({success: false, errorCode: 1017, errorMessage: "User was created, but an error occurred when trying to register the email confirmation"})
            console.log(e)
            return
        }
    }

    res.json({success: true, id: user.id, cookie: user.cookie})
}, requestErrorHandler)

module.exports = router