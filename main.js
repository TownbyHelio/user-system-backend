const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const database = require("./database")

const app = express()
const PORT = 1001


const f = async () => {
    await database.connect()
    await database.setupDatabase()

    fs.readdirSync("./api").forEach((f) => {
        const r = require("./api/"+f)
        app.use("/api", r)
    })

    app.listen(PORT, () => {
        console.log(`Server is open. Port: ${PORT}`)
    })

    process.on("exit", () => {
        database.close()
        console.log(`Server is closed.`)
    })

    for (const e of ["SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM"]) {
        process.on(e, () => {
            process.exit()
        })
    }
}

f()