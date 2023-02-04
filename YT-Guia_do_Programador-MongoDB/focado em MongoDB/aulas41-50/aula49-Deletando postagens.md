# Deletando postagens

Vamos deletar de outra maneira agora no Mongo. Vamos adicionar um novo botão no arquivo postagem.handlebars.

    <a href="/admin/postagens/deletar/{{_id}}"><button class="btn btn-danger mt-3">Deletar postagem</button></a>

Agora vamos criar uma nova rota:

    router.get("/postagens/deletar/:id", (req, res) => {
        Postagem.remove({_id: req.params.id}).then(() => {
            res.redirect("/admin/postagens")
        })
    })

Essa não é uma forma tão segura de deletar por conta de se utilizar o router.get e não o router.post, mas como estou aprendendo vou utilizá-la.