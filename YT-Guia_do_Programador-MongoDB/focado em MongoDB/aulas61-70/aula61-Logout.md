# Logout

Para fazer o logout do usuário vamos no arquivo usuario.js e criar uma nova rota:

    router.get("/logout", (req, res) => {

        req.logout();
        req.flash("success_msg", "Deslogado com sucesso!");
        res.redirect("/");
    })


Com isso automaticamente o passport vai fazer o logout para você.

Agora no arquivo _navbar.handlebars vamos criar o botão de logout e colocar a rota la no href:

        {{#if user}}
        <li class="nav-item">
          <a class="nav-link active" href="/usuarios/logout">Logout</a>
        </li>
        {{else}}
        <li class="nav-item">
          <a class="nav-link active" href="/usuarios/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/usuarios/registro">Resgistro</a>
        </li>
        {{/if}}

