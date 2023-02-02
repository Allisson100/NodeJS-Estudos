# Registro de usuários

Primeiro vamos criar um novo grupo de rotas dentro da pasta routes que vai se chamar usuario.js.

E dentro do arquivo digitamos:

    const express = require('express');
    const router = express.Router();
    const mongoose = requuire('mongoose');
    require("../models/Usuario");
    const Usuario = mongoose.model("usuarios");
    



    module.exports = router

Agora vamos criar uma rota:

    router.get("/registro", (req, res) => {
        res.render("usuarios/registro");
    })

Agora dentro da pasta views vou criar uma nova pasta chamada usuarios e dentro dessa pasta vou criar um arquivo chamado registro.handlebars.

Agora dentro do arquivo app.js vamos chamar essa rota:

    const usuarios = require("./routes/usuario");

    ...

    app.use("/usuarios", usuarios);

Agora o grupo de rotas já foi criado.

Agora vamos criar o fromulário de cadastro dentro do arquivo registro.handlebars:

    <h3>Crie sua conta hoje:</h3>
    <div class="card">
        <div class="card-body">
            <form action="" method="post">
                <label for="nome">Nome:</label>
                <input type="text" name="nome" class="form-control" required>

                <label for="email">Email:</label>
                <input type="email" name="email" class="form-control" required>

                <label for="senha">Senha:</label>
                <input type="password" name="senha" class="form-control" required>

                <label for="senha2">Repita a sua senha:</label>
                <input type="password" name="senha2" class="form-control" required>

                <button type="submit" class="btn btn-success mt-3">Criar conta</button>
            </form>
        </div>
    </div>

Agora vamos fazer a validação do formulário no back-end.

Dentro do arquivo usuario.js vamos criar uma nova rota:

    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
    require("../models/Usuario");
    const Usuario = mongoose.model("usuarios");

    router.get("/registro", (req, res) => {
        res.render("usuarios/registro");
    })
    
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
            //Proxima aula!
        }

    })


    module.exports = router

Agora precisamos mostrar os erros na página de registro:

    {{#each erros}}
        <div class="alert alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}




