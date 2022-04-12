const express = require("express")
const app = express()
const xa = require("./build/index")

function clbc(hit, unique,deviceType,country,regionName,timezone){
console.log(hit, unique,deviceType,country,regionName,timezone)
}

app.use(xa({cb : clbc}))



app.listen(5000)