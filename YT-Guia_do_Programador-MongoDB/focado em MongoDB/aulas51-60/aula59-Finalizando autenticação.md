# Finalizando autenticação

Vamos criar uma nova rota do tipo post no arquivo usuario.js. precisamos carregar o passaport nesse arquivo também.

    const passport = require("passport");

Rota:

    router.post("/login", (req, res, next) => {

        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/usuarios/login",
            failureFlash: true
        })(req, res, next)
    })

Agora dentro do formulário de login que está na pasta views/usuarios e é chamado login.handlebars precisamos mudar o action para mandar para a rota correta:

    <h4>Login:</h4>

    <div class="card">
        <div class="card-body">
            <form action="/usuarios/login" method="post">
                <label for="email">Email:</label>
                <input type="email" name="email" class="form-control" required>

                <label for="senha">Senha:</label>
                <input type="password" class="form-control" name="senha" required><br>

                <button class="btn btn-success" type="submit">Entrar</button>
            </form>
        </div>
    </div>

Esquecemos de adicionar um campo no arquivo auth.js, então agora fica:

    const localStrategy = require("passport-local").Strategy;
    const mongoose = require("mongoose");
    const bcrypt = require("bcryptjs");

    //Model de Usuário
    require("../models/Usuario");
    const Usuario = mongoose.model("usuarios");


    module.exports = function(passport){

        passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {

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

Tivemos que adicionar o passwordField: 'senha', isso porque a configuração do passport só entende em inglês e como nossos camos estão em português tivemos que adiconar esse campo deizendo que o password é a senha. Provavelmente se a gente tivesse programado em inglês o site, osistema já reconheceria esse campo automaticamente sem precisar colocar o passwordFiel.

Vamos precisar agora adiconar uma outra variável global lá no middleware, pois a mensagem de erro não está funcioando quando o usuário tenta fazer login com o email ou senha incorreta.

Então dentro do app.js digitamos:

 //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            next()
        })

Agora criamos a variavel, mas precisamos exibi-la na página. Então Lá no arquivo main.handlebars digitamos:

    <body>
        {{>_navbar}}
        <div class="container mt-4">
            {{#if error}}
                <div class="alert alert-danger">{{error}}</div>
            {{else}}

            {{/if}}
            {{>_msg}}
            {{{body}}}
        </div>
    </body>




