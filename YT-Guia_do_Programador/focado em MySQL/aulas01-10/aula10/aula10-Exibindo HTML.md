# Exibindo HTML

Para mandar um arquivo HTML em alguma rota devemos utilizar o res.sendFile():

    app.get("/", function(req, res) {
        res.sendFile();
    })

Agora devemos colocar o arquivo HTML na função, mas para não termos problema devemos utilizar o __dirname, pois com isso ele vai retornar o diretório padrão da aplicação que no nosso caso seria:

    __dirname vai retonar => C:\Users\Francisco\Desktop\Github\NodeJS-Estudos\YT-Guia_do_Programador\aulas01-10\aula10

E após isso adicone o o nome do arquivo ficando como código final:

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/index.html");
    })







