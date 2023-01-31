# Introdução ao MongoDB

MongoDb é um banco de dados de código aberto, gratuito, de alta performace, sem esquemas e orientado à documentos.

No MySQL utilizamos o esquema de tabelas. Já no MongoDB não existe tabelas, cada dado é salvo como um documento e é salvo na seguinte estrutura, exemplo:

    {
        name: "al",
        age: 18,
        status: "D",
        groups: ["politics", "news"]
    }

Ou seja, o MongoDb utiliza a estrutura de objetos do JavaScript, o famoso JASON.

Se pro exemplo eu quiser salvar uma estrutura de usuários, ele salva e organiza tudo em uma Collection.

Uma Collection é o conjunto de documentos do mesmo tipo
