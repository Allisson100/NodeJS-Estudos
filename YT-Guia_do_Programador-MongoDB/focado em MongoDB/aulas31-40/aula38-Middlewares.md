# Middlewares

                        Middleware

Request     ===>        Application     ===>        Response

O middleware é uma pequena parte da nossa aplicação que vai ficar intermediando a comunicação cliente - servidor.

Então toda requisição que acontecer entre cliente e servidor o middleware vai ficar lá "observando".

Com o middleware você consegue manipular essas requisições antes delas chegarem ao destino.

======================================

Como criar um middlwear:

    // Middleware
        app.use((req, res, next) => {
            console.log("OI EU SOU UM MIDDLEWARE!!");
            next();
        })

Ele tem um outro parâmetro além do req e res que é o next. E não se esqueça de colocar o next() no final, pois se não a página fica carregando infinitamente. 