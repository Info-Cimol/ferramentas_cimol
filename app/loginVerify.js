const express = require("express");
const router = express.Router();
const db = require("./db").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//VERIFICAÇÃO DE TOKEN
router.post('/', (req, res, next) => {
    db.query("SELECT * FROM usuario WHERE token=?", req.body.token,
    async (error,result) => {
        if (result.length == 1){
            let token = result[0].token;
            if (token){
                let verif = await jwt.verify(token,process.env.JWT_KEY)
                if (verif.iat < verif.exp){
                    return res.status(201).json([{"message":"token verificado", "token": token}])
                }else{
                    return res.status(401).json([{"message":"token expirado"}])
                }
            }else{
                return res.status(401).json([{"message":"token invalido"}])
            }
        }else{
            return res.status(401).json([{"message":"token invalido"}])
        }
    })
})

module.exports = router;