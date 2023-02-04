# Como configurar sessões

Vamos precisar instalar mais dois módulos:

    npm install --save express-session

    npm install --save connect-flash

Vamos carregá-los agora no projeto através das constantes;

    const session = require('express-session');
    const flash = require('connect-flash');

E para configurá-los:

    // Sessão 
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash());
    
Agora vamos configurar os middleware:

    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            next()
        })

A parte do código res.locals.success_msg = req.flash("success_msg"); e a parte res.locals.error_msg = req.flash("error_msg"); servem como variáveis globais e elas estão ai para mostrar ao usuário se o formulário dele foi enviado com sucesso ou não.

Lembrando que tem que ter o next(), pois como é um middleware a página vai ficar carregando infinitamente.





