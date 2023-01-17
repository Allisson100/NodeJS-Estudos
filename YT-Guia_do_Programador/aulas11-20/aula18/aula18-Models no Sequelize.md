# Models no Sequelize

Para criar um model no sequelize basta digitar:

    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('test', 'root', 'Alison20', {
    host: "localhost",
    dialect: 'mysql'
    });

    const Postagem =  sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
    })

    Postagem.sync({force: true})

Na const Postagens chamei uma função para criar uma tabela chamada postagens(lembrando que eu já me conectei com o banco de dados test), depoi eu defini quais serão os nomes das colunas e qual o tipo delas, que no nosso caso foi uma coluna chamada titulo do tipo varchar e outra chamada conteudo do tipo text.

E por fim para gerar esse model no mysql basta chamar o objeto Postagem com a função .sync(), essa função vai sincronizar o model com o mysql e colocamos um parametro force: true, porque com isso vou ter certeza que a tabela vai ser gerada.

O createdAt que cria na tabela serve para armazenar o dia que o registro foi criado e o updatedAt mostra em que data o resgistro foi atualizado.

E o Id que cria naa mais é que o identificador de algum dado na tabela.

Assim que criar a tabela, apagar o código que cria a tabela que nesse caso é  Postagem.sync({force: true}), pois se não ele vai ficar criando várias tabelas.

### Criar novo registro no banco de dados

Para criar um registro dentro da tabela devemos:

    Postagem.create({
        titulo: "Harry Potter",
        conteudo: "Melhor filme de todos"
    })

Basta chamar a const Postagem com a função .create e depois passar o conteúdo de cada campo.

Outro exemplo agora na tabela usuário:

    Usuario.create({
        nome: "Allisson",
        sobrenome: "Matheus",
        idade: 22,
        email: "teste@hotmail.com"
    })

