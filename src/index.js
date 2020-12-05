var path = require("path")
const fs = require("fs")
const express = require("express")
const WebSocket = require("ws")
const cors = require('cors')
const fileUpload = require("express-fileupload")
const throttle = require('express-throttle-bandwidth')
const chalk = require('chalk')
const Table = require('cli-table')

/**
 * Ext Routes
 */
var filesRoute = require('./routes/files')

// ...

const throttleValue = 0//100000 // bps // if bps is <= 0 it does not throttle.
const port = 8888
const wsPort = 8830
const fsDir = "public"
const firmware = process.env.FIRMWARE || "marlin"
let currentID = 0
let sensorInterval = null
let tempInterval = null
let waitInterval = null
let feedrate = 100

const app = express()
const wss = new WebSocket.Server({ port: wsPort })

/**
 * MIDDLEWARES
 */
app.use(cors())
app.use(express.static(fsDir))
app.use(throttle(throttleValue))
app.use(fileUpload({ preserveExtension: true, debug: false }))

app.use((req, res, next) => {
    // console.log('Time: ', Date.now())
    const table = new Table();
    table.push(
        ['Method', chalk`{black.bgWhite ${req.method}}`],
        ['URL', req.originalUrl],
        ['Query params', JSON.stringify(req.query)]
        //req.params
    );
    console.log(table.toString())
    next()
})

/**
 * ROUTES
 */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/login", function (req, res) {
    // res.send("")
    // return
})

app.use('/files', filesRoute(fsDir))

app.all("/updatefw", function (req, res) { res.send("ok") })

app.listen(process.env.PORT || port, () => {
    console.log(chalk`{white.bgBlack ESP}{black.bgWhite 3D} Mocking Server listening at {cyan http://localhost:${process.env.PORT || port}}`)
    console.log(chalk`Firmware : {cyan.bold ${firmware}}`)
})

wss.on("connection", ws => {
    console.log("WS : New connection")
    ws.send(`currentID:${currentID}`)
    wss.clients.forEach(
        client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`activeID:${currentID}`)
            }
        })
    currentID++
    ws.on("message", (message) => console.log("WS : received: %s", message))
})