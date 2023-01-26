# Parâmetros

Quando quisermos criar um parâmetro devemos colocar /:nome_do_parametro , exemplo:

    app.get("/ola/:nome", function (req, res) {
        res.send("Ola")
    })

Podemos ter outras funções com esses parametros, por exemplo:

    app.get("/ola/:cargo/:nome", function (req, res) {
        res.send(req.params);
    })

No caso desse código se você passar seu cargo e nome lá na url, ele vai meio que fazer uma tabelinha no site mostrando seu cargo e nome que você digitou.

O req ele é responsável por receber dados de uma requisição.

Vale ressaltar que você só pode envir o send uma vez, exemplo:

    app.get("/ola/:cargo/:nome", function (req, res) {
        res.send("Olá " + req.params.nome);
        res.send("Seu cargo e: " + req.params.cargo);
        res.send("Sua cor favorita e: " + req.params.cor);
    })

O código acima irá retornar um erro lá no terminal porque eu estou utilizando varios send.

Para resolver isso é só concatenar todos os send em um só:

    app.get("/ola/:cargo/:nome/:cor", function (req, res) {
        res.send("Olá " + req.params.nome + "</br>Seu cargo e: " + req.params.cargo + "</br>Sua cor favorita e: " + req.params.cor);
    })




