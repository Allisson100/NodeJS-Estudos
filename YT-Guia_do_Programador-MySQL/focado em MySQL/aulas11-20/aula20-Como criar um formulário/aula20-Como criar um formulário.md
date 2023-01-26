# Como criar um formulário

Criamos um formulário com o handlebars porém sem a estrutura HTML:

    <form action="">
        <p>Titulo: </p>
        <input type="text" name="titulo">

        <p>Conteúdo</p>
        <textarea name="conteudo" id="" cols="30" rows="10"></textarea>

        <button type="submit">Cadastrar postagem</button>
    </form>

Isso porque aquele arquivo main, que definimos como layout principal, já fornece toda a estrutura HTMl para nós.

