# Formulário de categorias

Criei novas rotas para a área de categorias:

    router.get('/categorias', (req, res) => {
        res.render("admin/categorias")
    })

    router.get('/categorias/add', (req, res) => {
        res.render("admin/addcategorias")
    })

E também novos arquivos na pasta views/admin chamado addcategorias.handlebars e categorias.handlebars.

====================================

Na página categorias.handlebars criamos um html simples e criamos também uma tag *a* levando o usuário para uma nova rota ao clicar no botão:

    <h2>Lista de categorias: </h2>
    <hr>
    <a href="/admin/categorias/add"><button class="btn btn-success">Nova categoria</button></a>

====================================

Dentro do arquivo addcategorias.handlebars vamos criar o formulário:

    <h3>Nova Categoria:</h3>
    <div class="card">
        <div class="card-body">
            <form action="/admin/categorias/nova" method="POST">
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome" placeholder="Nome da categoria" class="form-control">

                <label for="slug">Slug: </label>
                <input type="text" name="slug" id="slug" placeholder="Slug da categoria" class="form-control">
                <br>

                <button type="submit" class="btn btn-success">Criar categoria</button>
            </form>
        </div>
    </div>

Lembrando que estamos criando estilos css com as classes do bootstrap.

