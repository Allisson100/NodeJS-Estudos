A partir dessa pasta vou só fazer anotações, pois acho que ficará de melhor entendimento.

# Como enviar dados do formulário

Primeiro temos que definir dois atributos no fórmulario, que são os atributos action e method.

O method é basicamente a forma como o meu formulário vai ser enviado para o backend.

Dentro do HTML existem duas formas de envio, o envio por GET e o envio por POST.

O método GET ele envia os dados pela url, porém ele não é tão seguro, imagina enviar a senha de uma pessoa pela url por exemplo.

Já o método POST não envia os dados pela url.

================================

Agora vou criar uma rota para receber os dados do formulário.

   app.get('/add', function(req, res) {
        res.send('FORMULÁRIO RECEBIDO!!')
    })

E temos que colocar lá no action do formulário o /add.

    <form action="/add" method="POST">
        <p>Titulo: </p>
        <input type="text" name="titulo">

        <p>Conteúdo</p>
        <textarea name="conteudo" id="" cols="30" rows="10"></textarea>

        <button type="submit">Cadastrar postagem</button>
    </form>


Quando trabalhamos com o method='POST', temos que alterar o tipo da rota, ficando:

    app.post('/add', function(req, res) {
        res.send('FORMULÁRIO RECEBIDO!!')
    })

