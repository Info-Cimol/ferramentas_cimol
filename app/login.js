const express = require("express");
const router = express.Router();
const db = require("./db").pool;

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "GET"
    })
    db.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM pessoa', (error, result) => {
                console.log(result)
            }
        )
    })
})

router.post('/', (req, res, next) => {
    res.status(200).send({
        message: "POST"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: "DELETE"
    })
})

module.exports = router;