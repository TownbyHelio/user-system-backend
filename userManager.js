const database = require("./database")
const emailConfirmations = require("./emailConfirmations")

const userManager = {}

userManager.generateNewCookie = function() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let cookie = ""

    for (let i = 0; i < 128; i++) {
        const n = Math.floor(Math.random() * chars.length)
        cookie += chars.charAt(n)
    }
    
    return cookie
}

userManager.createUser = function(username, password, email) {
    const cookie = userManager.generateNewCookie()
    return database.run("INSERT INTO users (username, cookie, password, email) VALUES (?,?,?,?)", [username, cookie, password, email])
}

/*userManager.getUserIdByUsername = async function(username) {
    let [user, e] = await database.get("SELECT id FROM users WHERE username = ?", [username])
    return [user.id, e]
}*/

userManager.getUserById = function(id) {
    return userManager.getUser("id", id)
}

userManager.getUserByUsername = function(username) {
    return userManager.getUser("username", username)
}

userManager.getUser = function(column, value) {
    return database.get(`SELECT * FROM users WHERE ${column} = ?`, [value])
}


module.exports = userManager