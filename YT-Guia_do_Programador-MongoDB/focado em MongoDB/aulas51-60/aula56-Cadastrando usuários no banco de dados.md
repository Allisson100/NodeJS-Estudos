# Cadastrando usuários no banco de dados

Vamos registrar um usuario dentro do banco de dados. Para isso vamos mexer no arquivo usuario.js la no else antes de registrar o usuario. Precisamos verificar se o usuario que está tentando se cadastrar, está utilizando ou não um email que já existe no banco de dados. E para isso digitamos:

    router.post("/registro", (req, res) => {

        var erros = [];

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({texto: "Nome inválido"});
        }

        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
            erros.push({texto: "Email inválido"});
        }

        if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
            erros.push({texto: "Senha inválida"});
        }

        if(req.body.senha.length < 4) {
            erros.push({texto: "Senha muito curta"});
        }

        if(req.body.senha != req.body.senha2) {
            erros.push({texto: "As senhas são diferentes, tente novamente!"});
        }

        if(erros.length > 0) {

            res.render("usuarios/registro", {erros: erros});

        }else { 
            Usuario.findOne({email: req.body.email}).then((usuario) => {
                if(usuario) {
                    req.flash("error_msg", "Já existe uma conta com esse email no noso sistema");
                    res.redirect("/usuarios/registro");
                }else {
                    
                }
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno");
                res.redirect("/");
            })
        }

    })

Temos que fazer uma alteração no programa de usuarios, pois nossa senha está como type: String e vamos supor que um hacker invada o sistema e roube as senhas, elas vão estar legiveis por conta do type: String. Então precisamos criptografar as senhas do usuario ou "hashear" a senha.

Lebrando que um hash é quando você codifica uma mensagem. E hash é difenrete de criptografia, pois criptografia é reversível, já o hash não é reversível.

Para isso vamos usar uma biblioteca chamada bcryptjs.

Para instala-lo vamos na pasta do projeto pelo cmd e digitamos:

    npm install --save bcryptjs

Após instala-lo vamos importar no arquivo usuario.js

    const bcrypt = require("bcryptjs");

Ficamos como rota final o seguinte:

    router.post("/registro", (req, res) => {

        var erros = [];

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({texto: "Nome inválido"});
        }

        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
            erros.push({texto: "Email inválido"});
        }

        if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
            erros.push({texto: "Senha inválida"});
        }

        if(req.body.senha.length < 4) {
            erros.push({texto: "Senha muito curta"});
        }

        if(req.body.senha != req.body.senha2) {
            erros.push({texto: "As senhas são diferentes, tente novamente!"});
        }

        if(erros.length > 0) {

            res.render("usuarios/registro", {erros: erros});

        }else { 
            Usuario.findOne({email: req.body.email}).then((usuario) => {
                if(usuario) {
                    req.flash("error_msg", "Já existe uma conta com esse email no noso sistema");
                    res.redirect("/usuarios/registro");
                }else {

                    const novoUsuario = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha
                    })

                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if(erro) {
                                req.flash("error_msg", "Houve um erro durante o salvamento do usuário"); 
                                res.redirect("/");
                            }

                            novoUsuario.senha = hash

                            novoUsuario.save().then(() => {
                                req.flash("sucess_msg", "Usuário cadastrado com sucesso");
                                res.redirect("/");
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!");
                                res.redirect("/usuarios/registro");
                            })
                        })
                    })

                }
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno");
                res.redirect("/");
            })
        }
    })



