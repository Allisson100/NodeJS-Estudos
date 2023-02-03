# Formulário de login

Vamos criar um nova rota:

    router.get("/login", (req, res) => {
        res.render("usuarios/login")
    })

E dentro da pasta views/usuarios vamos criar o arquivo login.handlebars e nele digitamos:

    <h4>Login:</h4>

    <div class="card">
        <div class="card-body">
            <form action="" method="post">
                <label for="email">Email:</label>
                <input type="email" name="email" class="form-control" required>

                <label for="senha">Senha:</label>
                <input type="password" class="form-control" name="senha" required><br>

                <button class="btn btn-success" type="submit">Entrar</button>
            </form>
        </div>
    </div>



