const sqlite = require("sqlite3").verbose()

const database = {}

database.connect = function() {
    return new Promise((resolve, reject) => {
        console.log("[DB] Opening db connection...")
        database.db = new sqlite.Database("./main.js", (error) => {
            if (error) {
                console.log("[DB] Error trying to open db connection")
                console.log(error)
                reject()
            }
            else {
                console.log("[DB] Successfully opened db connection!")
                resolve()
            }
        })
    })
}

database.setupDatabase = function() {
    console.log("[DB]  Setting up db...")
    database.db.exec("CREATE DATABASE IF NOT EXISTS main")

}

module.exports = database