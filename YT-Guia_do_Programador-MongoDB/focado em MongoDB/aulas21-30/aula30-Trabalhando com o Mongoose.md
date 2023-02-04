# Trabalhando com o Mongoose

Como definir um model diretamente do mongoose.

Quando queremos definir um model dentro do mongoose é legal ter como padrão usar o sufixo Schema.

Exemplo:

    // Model - Usuários

    const UsuarioSchema = mongoose.Schema({

        nome: {
            type: String,
            require: true
        },

        sobrenome: {
            type: String,
            require: true
        },

        email: {
            type: String,
            require: true
        },

        idade: {
            type: Number,
            require: true
        },

        pais: {
            type: String
        }

    })

O Mongo ele usa os tipos do campo como o JavaScript, que no caso pode ser String para texto, Number para número, Date para datas, etc.
O require serve para definir se aquele campo vai ser de preenchimneto obrigatório.

Após definir o model devemos digitar:

    mongoose.model('nome_da_collection', nome_do_model_que_definimos)

E no nosso caso fica:

    mongoose.model('usuarios', UsuarioSchema);  

=======================================

### Como inserir um novo usuário dentro da collection usuarios

    new UsuarioSchema ({
        nome: "Allisson",
        sobrenome: "Matheus",
        email: "teste@email.com",
        idade: 22,
        pais: "Brasil"
    })

Com o código acima já é suficiente para criar um novo usuário.

Para salvar o usuário devemos digitar .save() no final de new UsuarioSchema, e utilizamos then e catch para saber se deu algum tipo de erro.

    new UsuarioSchema ({
        nome: "Allisson",
        sobrenome: "Matheus",
        email: "teste@email.com",
        idade: 22,
        pais: "Brasil"
    }).save().then(() => {
        console.log("Usuário criado com sucesso!!!");
    }).catch((erro) => {
        console.log("Houve um erro ao registrar o usuário: " + erro);
    })

O código acima irá retornar um erro, para arrumá-lo devemos criar uma constante para referenciar o model, ficando da seguinte forma:

    //Collection
        mongoose.model('usuarios', UsuarioSchema);

        const Allisson = mongoose.model('usuarios')

        new Allisson ({
            nome: "Allisson",
            sobrenome: "Matheus",
            email: "teste@email.com",
            idade: 22,
            pais: "Brasil"
        }).save().then(() => {
            console.log("Usuário criado com sucesso!!!");
        }).catch((erro) => {
            console.log("Houve um erro ao registrar o usuário: " + erro);
        })

====================================

Para acessar o banco de dados que criamos, devemos ir no terminal e digitar:

    show databases;
    use nome_do_banco;
    show collection; (podemos usar uma analogia aqui com show tables do MySQL);

E para ver todos os usuarios cadastrados na collection usuarios devemos digitar:

    db.usuarios.find()






