# Arquivos estáticos

Como integrar arquivos estáticos a aplicação express. 

Arquivos estáticos são arquivos CSS, arquivos JavaScript, etc.

Vamos usar o Bootstrap que é um framework html.

Para baixar o bootstrap é só ir no link: www.https://getbootstrap.com/

Agora precisamos configurá-lo no arquivo js. Pra isso criamos uma constante path e requisitamos o módulo path que serve para trabalhar com diretórios, manipular pastas.

E nas configurações digitamos:

    app.use(express.static(path.join(__dirname, 'public')));

Com esse código estamos falando para o express que a pasta que está guardando todos os nossos arquivos estáticos é  pasta public.

__dirname serve para o código pegar o caminho absoluto para a pasta public.

Agora no arquivo main.handlebars vamos carregar os arquivos css do bootstrap:

    <link rel="stylesheet" href="/css/bootstrap.css">

Fazendo isso o express já entende que o arquivo css está na pasta public.

E para linkar o javascript do bootstrap tem que pegar o código lá na página do bootstrap e além disso linkar os arquivos que queremos utilizar, que no meu caso ficou o seguinte:

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <script src="/js/bootstrap.js"></script>

===============================================

Com o Handlebars conseguimos dividir o nosso template em varias partes e para isso precisamos criar uma pasta dentro da pasta views que se chama partials.

Lá no site do bootstrap eu peguei um código dentro da parte de componentes chamado navbar e colei ele no arquivo _navbar.handlebars.

Dentro do arquivo main.handlebars podemos chamar essa navbar ficando:

    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="/css/bootstrap.css">

        <title>Blog NodeJS</title>
    </head>
    <body>
        {{>_navbar}}
        {{{body}}}
    </body>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <script src="/js/bootstrap.js"></script>
    </html>

Quando colocamos o sinal de > dentro das chaves no handlebars ele automaticamnete entende que eu qeuro pegar um arquivos dentro da pasta partials.



