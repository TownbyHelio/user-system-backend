const express = require("express")
const bodyParser = require("body-parser")
const requestErrorHandler = require("../util/requestErrorHandler")

const router = express.Router()

router.post("/registerUser", bodyParser.json(), (req, res) => {
    res.json({success: true})
}, requestErrorHandler)

module.exports = router