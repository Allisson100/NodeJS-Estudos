# Configurando o Passport

Passport é um middleware de autenticação específico para o express, com ele você consegue fazer diversos tipos de autenticação.

Quando você entra em um site e tem a parte de se cadastrar com a conta google ou com o facebook, uma das meneiras é utlizar esse middleware Passport, mas no nosso caso vamos utilizar a maneira local do passport, pois ela utiliza o nosso próprio banco de dados para autenticar o usuário.

Para instala-lo vamos na página do projeto pelo cmd e digitamos:

    npm install --save passport

Além disso precisamos passar a estratégia e para isso digitamos no cmd:

    npm install --save passport-local

Para começar vamos cria ruma pasta com o nome config e dentro dela vamos criar um arquivo chamado auth.js.

Nesse arquivo vamos estruturar todo o sistema de autenticação.

Então no arquivo auth.js digitamos:

const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Model de Usuário
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");


module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) => {

        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: "Está conta não existe!"});
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {

                if(batem) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Senha incorreta"});
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {

        done(null, usuario.id);

    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, usuario) => {
            done(err, user)
        })
    })
}

-------------------------------------------
    passport.serializeUser((usuario, done) => {

        done(null, usuario.id);

    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, usuario) => {
            done(err, user)
        })
    })

Essas duas funções servem para salvar os dados do usuário da sessão.

Agora vamos no app.js chamar o arquivo que configuramos o passport:

    const passport = require("passport");
    require("./config/auth")(passport);

Agora no arquivo app.js logo abaixo da sessão, muito importante que esteja abaixo da sessão digitamos:

    // Sessão 
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use(flash());



