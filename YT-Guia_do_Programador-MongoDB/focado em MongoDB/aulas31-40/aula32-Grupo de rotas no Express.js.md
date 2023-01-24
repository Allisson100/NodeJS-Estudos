# Grupo de rotas no Express.js

Se manter várias rotas em um arquivo que já tem outros códigos não é bom, pois é dificil dar manutenção e não é uma boa prática, então devemos criar uma pasta somente para as rotas.

    const router = express.Router();

Nós usamos aquela constante para crair rotas em arquivos separados.

E precisamos exporta-lo no final do arquivo:


    const express = require('express');
    const router = express.Router();

    module.exports = router;


