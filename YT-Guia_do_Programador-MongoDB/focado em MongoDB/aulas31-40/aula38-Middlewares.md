# Middlewares

                        Middleware

Request     ===>        Application     ===>        Response

O middleware é uma pequena parte da nossa aplicação que vai ficar intermediando a comunicação cliente - servidor.

Então todo requisição que acontecer entre cilente e servidor o middleware vai ficar lá "observando".

Com o middleware você consegeu manipular essas requisições antes delas cheagarem ao destino.

======================================

Como criar um middlwear:

    // Middleware
        app.use((req, res, next) => {
            console.log("OI EU SOU UM MIDDLEWARE!!");
            next();
        })

Ele tem um outro parametro além do req e res que é o next. E não se esqueça de colocar o next() no final, pois se não a página fica carregando infinitamente. 