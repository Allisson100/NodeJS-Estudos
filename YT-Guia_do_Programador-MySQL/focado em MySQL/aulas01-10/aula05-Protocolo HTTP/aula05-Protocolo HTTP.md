# Protocolo HTTP

Vamos supor que eu quero fazer uma pesquisa no Google para um determinado trabalho. Assim que acessar o Google, eu vou pedir para o servidor do Google para que me envie arquivos, que seria arquivos HTML, CSS, imagens, etc., ou seja, arquivos para compor a vizualização que aparece para mim quando eu acesso um site. E essa comunicação que acontece com o cliente (que nesse caso sou eu) e o servidor (que nesse caso é o servidor do Google) é realizada através de um protocolo chamado http.

É através do protocolo http que você consegue se comunicar com servidores de sites por exemplo. Consegue pedir dados, enviar dados e receber dados. Então para criar aplicações Web, a gente precisa utilizar o protocolo http.

O Node tem um módulo http que já vem como padrão nele, porém esse módulo é bastante limitado, mas existe Frameworks que pode nos ajudar nessa parte. 

Lembrando que precisamos abrir um servidor http para conseguir se comunicar com o cliente, para abrir ele devemos chamar a variável que no nosso caso é a variável http e chamar a função createServer(). e devemos chamar também a função listen(). que serve para informar em qual porta de rede você quer abrir o seu servidor.

Exemplo de como utilizar o módulo padrão:

    var http = require('http');

    http.createServer().listen(8081);

Quando digitamos na barra de pesquisa localhost:numero_da_porta, o site vai ficar carregando lá infinitamente, isso porque não falamos para fazer nada quando o usuário entrasse no nosso site.

Caso quisermos exibir uma mensagem quando o usuário entrar no meu site por exemplo. Podemos passar dentro da função createServer uma outra função chamada função de callback que recebe dois parametros (req,res) req de requisição e res de resposta. 

    http.createServer(function (req,res) {
        res.end("Olá")
    }).listen(8081);

A função end() serve para enviar uma mensagem, mas se você tentar acessar novamente o servidor, ele vai continuar carregando infinitamente, isso porque o Node não carrega as modificações em tempo real (lembrando que é possível fazer isso com o Node utilizando o Nodemon, mas eu vou estudar futuramente, então devemos encerrar o servidor e reiniciá-lo.



