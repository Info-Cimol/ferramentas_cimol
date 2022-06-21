//controller
//routes
//models
const express = require("express");
const app = express();
const bp = require("body-parser")
const cors = require("cors");

app.use(cors())

app.use(bp.json())
app.use(bp.text({ type: "application/json" }))
app.use(bp.urlencoded({ extended: false }))

const login = require("./login");
const loginVerify = require("./loginVerify")

app.use("/api/login", login)
app.use("/api/login/verify", loginVerify)

module.exports = app;