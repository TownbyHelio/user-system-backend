const express = require("express")
const bodyParser = require("body-parser")
const requestErrorHandler = require("../util/requestErrorHandler")
const userManager = require("../userManager")
const emailConfirmations = require("../emailConfirmations")

const router = express.Router()

/*
ERROR CODES:

*/
router.post("/confirmEmail", bodyParser.json(), (req, res) => {

}, requestErrorHandler)

module.exports = router