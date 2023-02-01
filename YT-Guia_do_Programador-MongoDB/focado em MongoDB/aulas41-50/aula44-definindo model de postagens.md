# definindo model de postagens

Vamos criar um novo model na pasta models com o nome Postagem.js e vamos definir a seguinte estrutura:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Postagem = new Schema({
        titulo: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        conteudo: {
            type: String,
            required: true
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'categorias',
            required: true
        },
        data: {
            type: Date,
            default: Date.now()
        }
    })

    mongoose.model('postagens', Postagem);

A melhor forma de fazer um relacionamento entre 'tabelas'(Postagem e Categroias), é dizer que o type da categoria da postagem é Schema.Types.ObjectID, ou seja, ele vai armazenar o id de um objeto. Também tem que passar uma referencia e vamos passar o valor de categorias, pois é o nome que eu dei para o model de Categoria.

Lembrando que após a criaçõ do model devemos chaamr o mongoose.model e dizem qual é o nome da collection que vai ser criada no banco de dados e qual vai ser a bse que no nosso caso é 'postagens', Postagem.



