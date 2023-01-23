const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hello");
})

app.get("/sobre", function(req, res) {
    res.send("Minha pagina sobre");
})

app.get("/blog", function(req, res) {
    res.send("Ben-vindo ao meu blog");
})

app.get("/ola/:cargo/:nome/:cor", function (req, res) {
    res.send("Olá " + req.params.nome + "</br>Seu cargo e: " + req.params.cargo + "</br>Sua cor favorita e: " + req.params.cor);
})


app.listen(8081, function() {console.log("Servidor rodando na url http://localhost:8081");});