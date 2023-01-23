# Rotas

    var express = require("express");
    var app = express();

O módulo que solicitei "express", ele retorna uma função para dentro da variável "var express" que eu criei, que é a função que cria o express.

A variável app "var app", está recebdno a função express(), que vem do módulo "require("express"), e essa função ela cria uma instancia, ou seja, ela cria uma cópia inteira do framework para dentro da variável app. Isso significa que qualquer coisa que eu queira utilizar do express agora eu vou utilizar a partir dessa variável app, então a variável app é a principal do sistema.

Para evitar algum tipo de erro como por exemplo reeescrever a variável app em alguma parte do código, podemos trocar a variável por uma constante ficando da seguinte forma:

    const express = require("express");
    const app = express();

Para abrir um servidor com express:

    app.listen(8081);

Lembrando que essa função tem que ser a última do código, pois tudo que estiver abaixo dela não irá funcionar.

Função de callback é uma função que é executada sempre que algum evento acontece.

    const express = require("express");
    const app = express();

    app.listen(8081, function(){
        console.log("Servidor rodando na url http://localhost:8081");
    });

Quando Node executa a função listen, ele dispara uma função dizendo no console log que o servidor está rodando.

Quando rodamos essa aplicação acontece um erro Cannot GEt /. Esse erro acontece porque nossa aplicação ainda não tem nenhuma rota difinida.

Uma rota é basicamente uma caminho para a minha aplicação, exemplo:

    const express = require("express");
    const app = express();

    app.get("/", function(req, res) {
        res.send("Seja bem-vindo ao meu app!!");
    })

    app.get("/sobre", function(req, res) {
        res.send("Minha pagina sobre");
    })

    app.get("/blog", function(req, res) {
        res.send("Ben-vindo ao meu blog");
    })

    app.listen(8081, function(){
        console.log("Servidor rodando na url http://localhost:8081");
    });

Essas são as rotas de um menu de site por exemplo.

Lembrando que com as rotas são possíveis fazer diversas coisas, não somente exibir uma mensagem simples como eu fiz.




