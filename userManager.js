const database = require("./database")

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

userManager.createUser = async function(username, password, email, description="") {
    const cookie = userManager.generateNewCookie()

    let e = await database.run("INSERT INTO users (username, cookie, password, email, description) VALUES (?,?,?,?,?)", [username, password, cookie, email, description])
    if (e) return e
}

userManager.getUserIdByUsername = async function(username) {
    let row, e = await database.get("SELECT id FROM users WHERE username = ?", [username])
    if (e) return null, e

    return row.id
}

/*userManager.updateRow = async function(id, row, value) {

}*/


module.exports = userManager