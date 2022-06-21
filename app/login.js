const express = require("express");
const router = express.Router();
const db = require("./db").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST AO FAZER LOGIN
router.post('/', async (req, res, next) => {
    let password = req.body.password;
    let email = req.body.email;

    // RETORNA NOME, ID, ALUNO (INT), PROFESSOR (INT), ADMINISTRADOR (INT)
    db.query("SELECT nome, id_pessoa, (SELECT COUNT(pessoa_id_pessoa) FROM aluno a WHERE a.pessoa_id_pessoa=p.id_pessoa) AS aluno, (SELECT COUNT(pessoa_id_pessoa) FROM professor pf WHERE pf.pessoa_id_pessoa=p.id_pessoa) AS professor, (SELECT COUNT(pessoa_id_pessoa) FROM administrador adm WHERE adm.pessoa_id_pessoa=p.id_pessoa) AS administrador, (SELECT senha FROM usuario WHERE u.pessoa_id_pessoa=p.id_pessoa) AS senha FROM pessoa p JOIN usuario u ON u.pessoa_id_pessoa = p.id_pessoa WHERE p.email = ?", email,
        (error, result) => {
            if (result && result.length > 0) {
                const hashedPass = result[0].senha;
                bcrypt.compare(password, hashedPass, (err,resp) => {
                    if (err) { return res.status(401).send({"mensagem": err}); }
                    if (resp){
                        const token = jwt.sign({
                            id: result[0].id_pessoa,
                            email: email,
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        })
                        db.query("UPDATE usuario SET token=?", token)
                        return res.status(201).send({"token": token, "message": "Conectado!"})
                    }
                    return res.status(401).send({"mensagem": "Credenciais incorretas."})
                })
            }else{
                return res.status(401).send({"mensagem": "Credenciais incorretas."})
            }
        }
    )
})

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "GET"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: "DELETE"
    })
})

module.exports = router;

/*

    bcrypt.hash(password, 10, (errorBcrypt,hash) => {
        if (errorBcrypt){ return res.status(500).send({error: errorBcrypt}) }
    })

    --  |  login  |  --    
    Quando a pessoa fizer o login realizar esta consulta
    retorna
    
    nome       |  aluno  |  professor  |  administrador
    Flavio Ott |  0      |  0          |  1

    SELECT nome, 
        (SELECT COUNT(pessoa_id_pessoa) FROM aluno a WHERE a.pessoa_id_pessoa=p.id_pessoa) AS aluno, 
        (SELECT COUNT(pessoa_id_pessoa) FROM professor pf WHERE pf.pessoa_id_pessoa=p.id_pessoa) AS professor,
        (SELECT COUNT(pessoa_id_pessoa) FROM administrador adm WHERE adm.pessoa_id_pessoa=p.id_pessoa) AS administrador
    FROM pessoa p JOIN usuario u ON u.pessoa_id_pessoa = p.id_pessoa WHERE u.senha = "1234";
*/