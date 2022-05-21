const express = require("express");
const router = express.Router();
const db = require("./db").pool;
const bcrypt = require("bcrypt")

router.post('/', (req, res, next) => {
    let password = req.body.password;
    let email = req.body.email;
    db.query(`SELECT nome,
        (SELECT COUNT(pessoa_id_pessoa) FROM aluno a WHERE a.pessoa_id_pessoa=p.id_pessoa) AS aluno, 
        (SELECT COUNT(pessoa_id_pessoa) FROM professor pf WHERE pf.pessoa_id_pessoa=p.id_pessoa) AS professor, 
        (SELECT COUNT(pessoa_id_pessoa) FROM administrador adm WHERE adm.pessoa_id_pessoa=p.id_pessoa) AS administrador,
        (SELECT senha FROM usuario user WHERE user.pessoa_id_pessoa=p.id_pessoa) AS senha
        FROM pessoa p JOIN usuario u ON u.pessoa_id_pessoa = p.id_pessoa 
        WHERE p.email = ?`, email,
    (error, result) => {
        const hashedPass = result[0].senha;
        if (bcrypt.compareSync(password, hashedPass)){
            return res.status(201).send("LOGADO!");
        }
        //return res.status(201).send( {"result": result[0].senha} );
    })

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