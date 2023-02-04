# Cadastrando categorias no banco de dados

Criamos uma nova rota chamada '/categorias/novas' e chamamos o mangoose no arquivo admin.js, pois queremos registrar as novas categorias no banco de dados, além de criar alguns outros códigos:

    const mongoose = require('mongoose');
    require ('../models/Categoria');
    const Categoria = mongoose.model('categorias');

    router.post('/categorias/novas', (req, res) => {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save.then(() => {
            console.log("Categoria salva com sucesso");
        }).catch((err) => {
            console.log("Erro ao salvar categoria: " + err);
        })
    })

Esse código é o suficiente para salvar no banco de dados as categorias.

Lembrando que o slug é a url para chegar na categoria que você quer.






