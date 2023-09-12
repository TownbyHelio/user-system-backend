const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const database = require("./database")

const app = express()
const PORT = 1001




fs.readdirSync("./api").forEach((f) => {
    const r = require("./api/"+f)
    app.use("/api", r)
})

app.listen(PORT, () => {
    console.log(`Server is open. Port: ${PORT}`)
})

process.on("exit", () => {
    console.log(`Server is closed.`)
})

for (const e of ["SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException", "SIGTERM"]) {
    process.on(e, () => {
        process.exit()
    })
}