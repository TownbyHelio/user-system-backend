const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const PORT = 1001



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