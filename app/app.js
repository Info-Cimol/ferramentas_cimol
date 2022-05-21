//controller
//routes
//models
const express = require("express");
const app = express();
const bp = require("body-parser")

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const login = require("./login");

app.use("/login", login)

module.exports = app;