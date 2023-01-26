# Grupo de rotas no Express.js

Se manter várias rotas em um arquivo que já tem outros códigos não é bom, pois é dificil dar manutenção e não é uma boa prática, então devemos criar uma pasta somente para as rotas.

    const router = express.Router();

Nós usamos aquela constante para crair rotas em arquivos separados.

E precisamos exporta-lo no final do arquivo:


    const express = require('express');
    const router = express.Router();

    module.exports = router;

====================================

Se abrirmos o app.js com nodemon e tentarmos acessar alguma rota ele vai dar um erro, pois não falamos pro app.js que existe rotas no arquivo admin.js.

Para resolver isso basta criar uma constante requisitando o a página admin.js e la na configurações de rotas pede para usar um prefixo '/admin' para dizer que aquelas rotas pertencem ao ADM:

    const admin = require('./routes/admin');

    //Rotas
        app.use('/admin', admin);
    
O código completo até agora ficou:

app.js:

    //Carregando módulos
        const express = require('express');
        const handlebars = require('express-handlebars');
        const bodyParser = require('body-parser');
        const app = express();
        const admin = require('./routes/admin');
        //const mongoose = require('mongoose');

    // Configurações
        // Body Parser
            app.use(express.urlencoded({extended:true}));
            app.use(express.json());
        // Handlebars
            app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');
        // Mongoose
            // Em breve
        //
    //Rotas
        app.use('/admin', admin);
    //Outros
    const PORT = 8081;
    app.listen(PORT, () => {
        console.log("Servidor rodando!");
    });


admin.js:

    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send("Página principal do painel ADM")
    })

    router.get('/posts', (req, res) => {
        res.send("Página de posts!")
    })

    router.get('/categorias', (req, res) => {
        res.send("Páginas de categorias")
    })

    module.exports = router;


