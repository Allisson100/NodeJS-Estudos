# Handlebars

Handlebars é um template engine, ele da muitas funcionalidades ao HTML, como por exemplo estruturas de repetição, etc.

Para instalá-lo basta ir no terminal e digitar:

    npm install --save express-handlebars

Para chama-lo temos que criar uma constantes chamando ele pelo express:

    const handlebars = require("express-handlebars");

Precisamos agora configurar ele, pois existem diversos templates engines por ai.

    //Config
    //Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

Basicamente essas duas linhas decódigo servem para falar para o express que queremos usar o handlebars como template engine.

Precisamos criar uma pasta na raiz do projeto com o nome views, dentro da pasta views tem que criar outra pasta com o nome layouts e dentro dessa pasta layouts criar um arquivo chamado main.handlebars.

O 'main' que está no código é o template padrão da aplicação.

Dentro do arquivo main.handlebars, vamos criar uma estrutura html comum:

    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Postagens Node.JS</title>
    </head>
    <body>
        {{body}}
    </body>
    </html>

Futuramente vamos estudar o porque do body estar entre chaves.
