const express = require("express")
const fs = require("fs")

const database = require("./database")
const userManager = require("./userManager")
const emailConfirmations = require("./emailConfirmations")

const app = express()
const PORT = 1001


async function handleError(e) {
    console.log(e)
    await database.close()
    process.exit()
}


const f = async () => {
    let e = await database.connect()
    if (e) await handleError(e)

    e = await database.setupDatabase()
    if (e) await handleError(e)


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