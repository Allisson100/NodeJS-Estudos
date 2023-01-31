# Resumo

### MongoDB

MongoDb é um banco de dados de código aberto, gratuito, de alta performace, sem esquemas e orientado à documentos.

No MySQL utilizamos o esquema de tabelas. Já no MongoDB não existem tabelas, cada dado é salvo como um documento e é salvo na seguinte estrutura, exemplo:

    {
        name: "al",
        age: 18,
        status: "D",
        groups: ["politics", "news"]
    }

Ou seja, o MongoDb utiliza a estrutura de objetos do JavaScript, o famoso JASON.

Se por exemplo eu quiser salvar uma estrutura de usuários, ele salva e organiza tudo em uma Collection.

Uma Collection é o conjunto de documentos do mesmo tipo.

### Mongoose

Mongoose é um biblioteca de Modelagem de Dados de Objeto (ou ODM, do inglês: Object Data Modeling) para MongoDB e Node.js. Ele gerencia o relacionamento entre dados, fornece a validação de esquemas e é usado como tradutor entre objetos no código e a representação desses objetos no MongoDB.


*Mapeamento de objetos entre o Node e o MongoDB, gerenciado por meio do Mongoose*

      NodeJS  =======================>     mongoose
        /\                                    ||
        ||                                    ||
    Object Mapping                            ||
        ||                                    ||
        \/                                    \/
      MongoDB  <=======================   Mongo Driver


O MongoDB é um banco de dados de documentos NoSQL que não possui esquemas. Isso significa que ele guarda documentos JSON e que a estrutura deles pode variar, já que não há a estrutura rígida igual a dos bancos SQL. Essa é uma das vantagens de se usar NoSQL, pois acelera o desenvolvimento de aplicações e reduz a complexidade das implementações.

Abaixo vemos um exemplo de como os dados são armazenados dentro do MongoDB x bancos de dados SQL:

*Documentos do NoSQL x tabelas relacionais do SQL*

Mongo:

    {
      "Id":1,
      "FirstName": "Ada",
      "LastName": "Lovelace",
      "Email": "ada.lovelace@gmail.com",
      "Phone": [{
          "Home": "+1 123456-7890"
      },
      {
          "Work": "+1 111125-8900"
      }]
    }

-------------------------------------

    {
      "Id":2,
      "FirstName": "Grace",
      "LastName": "Hopper",
      "Email": "grace.hopper@gmail.com",
    }

-------------------------------------

    {
      "Id":3,
      "FirstName": "Kathy",
      "LastName": "Sierra",
      "Email": "kathy.sierra@gmail.com",
    }


SQL:

    Person:

    Id   FirstName   LastName            email
    1      Ada       Lovelace     ada.lovelace@gmail.com
    2     Grace       Hopper      grace.hopper@gmail.com
    3     Kathy       Sierra      kathy.sierra@gmail.com

-------------------------------------

    Phone_Number:

    PersonId   PhoneId      PhoneNumber     Type
       1          1       +1 123456-7890    Home
       1          2       +1 111125-8900    Work
      

Terminologia:

Coleções ("Collections"):

- As coleções (ou 'Collections', em inglês) no MongoDB são equivalentes às tabelas dos bancos de dados relacionais, podendo guardar múltiplos documentos JSON.

Documentos ("Documents"):

- Os documentos (ou 'Documents', em inglês) equivalem aos registros ou às linhas de dados no SQL. Enquanto uma linha em um banco SQL pode referenciar dados em outras tabelas, os documentos do MongoDB normalmente combinam isso dentro de um único documento.

Campos ("Fields"):

- Os campos (ou 'Fields', em inglês) ou atributos são similares a colunas em uma tabela SQL.

Esquema ("Schema"):

- Embora o MongoDB não possua esquemas, o SQL define esquemas por meio da definição de uma tabela. Um "esquema" no Mongoose é uma estrutura de dados de documento (ou a forma de um documento), que é aplicada por meio da camada da aplicação.

Modelos ("Models"):

- Os modelos (ou 'Models', em inglês) são construtores de ordem superior, que utilizam um esquema e instanciam um documento, equivalente aos registros de um banco de dados relacional.

### Instalação do MongoDB

Antes de começarmos, vamos configurar o Mongo. Você pode escolher uma das seguintes opções:

- Faça o download da versão correta do MongoDB para o seu sistema operacional a partir do site do MongoDB e siga as instruções de instalação.

- Crie uma inscrição gratuita para disponibilizar uma sandbox de seu banco de dados.

- Instale o MongoDB usando o Docker, se preferir..

### Instalação do NPM

Vamos até a pasta onde está nosso projeto e inicializá-lo.

    npm init -y

Agora, vamos instalar o Mongoose e a biblioteca de validação com os seguintes comandos:

    npm install mongoose validator
  
O comando acima fará a instalação da versão mais recente dessas bibliotecas.

### Conexão com o banco de dados 

Crie um arquivo ./src/database.js na raiz do seu projeto.

Agora, vamos adicionar uma classe e um método simples que faça a conexão com o banco de dados.

O endereço de conexão vai variar de acordo com a instalação que você fez.

    let mongoose = require('mongoose');

    const server = '127.0.0.1:27017'; // COLOQUE O NOME DO SEU SERVIDOR DO BANCO DE DADOS
    const database = 'fcc-Mail';      // COLOQUE O NOME DO SEU BANCO DE DADOS

    class Database {
      constructor() {
        this._connect()
      }
      
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
          .then(() => {
            console.log('Database connection successful')
          })
          .catch(err => {
            console.error('Database connection error')
          })
      }
    }

    module.exports = new Database()

A chamada require('mongoose') retorna um objeto do tipo "Singleton". Isso significa que a primeira vez que o chamar, ele criará uma instância da classe do Mongoose e o retornará. Em chamadas subsequentes, ele retornará a mesma instância que foi criada da primeira vez. Isso acontece devido ao modo como o modulo de importação/exportação funciona no ES6.

                                                        ________________________________
                          ---- Load Module -------->    |                                |
      require('mongoose')                               |       ES6 MODULE LOADER        |
                          <--- Return Module -------    |________________________________|  
                                                          ||                          /\
                                                    Fetch Module                Return Module
                                                          ||                          || 
                                                          \/                          ||
          Fetch       <------- Not Cached ---------- Is Cached -- Found in Cache --> CACHE
      Mongoose Package                                                                /\
            ||                                                                        ||
            ||                                                                        || 
            ||                                                                        ||  
            ---------------- Cache output from module.exports --------------------------

                       *Fluxo de trabalho do módulo import/require*

De modo similar, transformamos nossa classe "Database" em um singleton retornando uma instância da classe no formato de uma declaração module.exports, pois só precisaremos de uma única conexão com nosso banco de dados.

O ES6 faz a criação de padrões singleton (ou de instância única) de modo bem fácil devido a maneira como o carregador do módulo (em inglês, module loader) funciona, criando o cache das respostas de arquivos importados anteriormente.

*Singleton:*

- Singleton é um padrão de projeto de software. Este padrão garante a existência de apenas uma instância de uma classe, mantendo um ponto global de acesso ao seu objeto. Nota linguística: O termo vem do significado em inglês para um conjunto que contenha apenas um elemento.

### Esquema x Modelos no Mongoose

Um modelo Mongoose é um "wrapper" ou "empacotador" de esquemas Mongoose. Um esquema Mongoose define a estrutura do documento, os valores padrões, validadores, entre outros. O modelo Mongoose, por sua vez, fornece uma interface com o banco de dados para a criação, busca, atualização, deleção de registros, e assim por diante.

Criar um modelo Mongoose consiste primariamente em três partes:

1. Fazer a referência ao Mongoose

    let mongoose = require('mongoose')

Essa referência será a mesma que foi retornada quando conectamos com o banco de dados, o que significa que as definições de esquema e modelo não precisarão ser explícitas novamente para se conectar ao banco. 

2. Definir o esquema

O esquema define as propriedades do documento através de um objeto, onde o nome da chave corresponde ao nome da propriedade na coleção.

    let emailSchema = new mongoose.Schema({
      email: String
    })

Aqui, definimos a propriedade chamada email com o esquema no tipo String, que, internamente, mapeia um validador interno, que será disparado quando o modelo for salvo. Caso o valor do dado salvo não seja no formato string, ele falhará.

Os seguintes tipos de esquemas são permitidos:

- Array
- Boolean (ou booleano, em português)
- Buffer
- Date (ou formato de data, em português)
- Mixed (um tipo genérico/flexível de dados)
- Number (ou numérico, em português)
- ObjectId
- String

Os tipos "Mixed" e "ObjectId" são definidos em require('mongoose').Schema.Types.

3. Exportar um modelo

Precisamos chamar o construtor de modelos na instância do Mongoose e passá-lo para a sua coleção, assim como sua referência na definição do esquema.

    module.exports = mongoose.model('Email', emailSchema)
  
Vamos combinar o código acima no arquivo ./src/models/email.js para definir o conteúdo de um modelo básico de e-mail:

    let mongoose = require('mongoose')

    let emailSchema = new mongoose.Schema({
      email: String
    })

    module.exports = mongoose.model('Email', emailSchema)

A definição de um esquema deve ser simples, mas sua complexidade normalmente é baseada na aplicação dos requerimentos. Esquemas podem ser reutilizados e podem conter diversos esquemas derivados (no inglês, "child-schemas"). No exemplo acima, o valor da propriedade "email" é de um tipo simples. No entanto, poderia ser do tipo objeto com propriedades adicionais acopladas.

Podemos criar uma instância de um modelo que criamos acima e populá-la usando a seguinte sintaxe:

    let EmailModel = require('./email')

    let msg = new EmailModel({
      email: 'ada.lovelace@gmail.com'
    })

Vamos aprimorar o esquema "email" para fazer com que o valor de email inserido seja de propriedade única, seja um campo obrigatório e tenha seus valores convertidos para caracteres minúsculos antes de ser salvo. Podemos também adicionar uma função de validação que garanta que o endereço de e-mail seja válido. Vamos referenciar e usar a biblioteca validadora que instalamos anteriormente.

    let mongoose = require('mongoose')
    let validator = require('validator')

    let emailSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        }
      }
    })

    module.exports = mongoose.model('Email', emailSchema)

### Operações básicas

O Mongoose tem uma API flexível e fornece várias formas de concluir uma tarefa. lembre-se de que a maior parte das operações pode ser feita de mais de uma maneira sintaticamente ou por meio da arquitetura da aplicação.

### Criando registros

Vamos criar uma instância de um modelo de e-mail e salvá-la no banco:

    let EmailModel = require('./email')

    let msg = new EmailModel({
      email: 'ADA.LOVELACE@GMAIL.COM'
    })

    msg.save()
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })

O resultado é o retorno de um documento apontando o sucesso da transação:

    { 
      _id: 5a78fe3e2f44ba8f85a2409a,
      email: 'ada.lovelace@gmail.com',
      __v: 0 
    }

Os seguintes campos são retornados (campos internos são em forma de prefixo e seguidos de uma linha sublinhada (ou "underscore", no inglês)):

1. O campo _id é gerado automaticamente pelo Mongo e é a chave primária da sua coleção. Seu valor é único de forma a facilitar a identificação do documento.

2. O valor email é retornado. Perceba que ele está em minúsculas pois especificamos o lowercase:true nos atributos do esquema.

Se tentar repetir a mesma operação que fizemos acima, você receberá uma mensagem de erro, pois também especificamos que este campo deverá ser único.

### Buscando o registro

Vamos tentar recuperar um registro que salvamos anteriormente em nosso banco de dados. A classe do nosso modelo expõe vários métodos estáticos e de instância para realizar operações no banco de dados. Vamos agora tentar encontrar o registro que criamos anteriormente usando o método de busca e passar o e-mail como parâmetro. 

    EmailModel
      .find({
        email: 'ada.lovelace@gmail.com'   // nossa busca
      })
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })

O documento retornado será similar ao que vimos quando criamos o registro em si:

    { 
      _id: 5a78fe3e2f44ba8f85a2409a,
      email: 'ada.lovelace@gmail.com',
      __v: 0 
    }

### Atualizando o registro

Agora, vamos modificar o registro acima mudando o endereço de e-mail e adicionando outro campo, tudo em uma única operação. Por questões de performance, o Mongoose não vai retornar o documento atualizado e, então, precisaremos passar um parâmetro adicional pedindo-o:

    EmailModel
      .findOneAndUpdate(
        {
          email: 'ada.lovelace@gmail.com'  // nossa busca
        }, 
        {
          email: 'theoutlander@live.com'   // campo a ser atualizado
        },
        {
          new: true,                       // retorne o doc atualizado
          runValidators: true              // valide antes de atualizar
        })
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })

O documento retornado terá o campo email atualizado:

    { 
      _id: 5a78fe3e2f44ba8f85a2409a,
      email: 'theoutlander@live.com',
      __v: 0 
    }

### Apagando o registro

Para essa operação, usaremos a chamada findOneAndRemove para apagar o registro. O retorno é o documento original que foi removido:

    EmailModel
      .findOneAndRemove({
        email: 'theoutlander@live.com'
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error(err)
      })

### Auxiliares (ou "Helpers", no inglês)

Vimos algumas das funcionalidades básicas conhecidas, como operações CRUD (Create, Read, Update, Delete), mas o Mongoose também fornece a possibilidade de configurar diversos outros tipos de métodos e propriedades auxiliares. Esses podem ser usados para simplificar futuramente o trabalho com os dados.

Vamos criar um esquema para um usuário no ./src/models/user.js com os campos firstName e lastName:

    let mongoose = require('mongoose')

    let userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String
    })

    module.exports = mongoose.model('User', userSchema)

### Propriedade virtual (Virtual Property)

Uma propriedade virtual não é persistida no banco de dados. Podemos adicioná-la ao nosso esquema como uma propriedade auxiliar para obter e definir valores.

Vamos criar uma propriedade virtual chamada fullName, que pode ser usada para definir os valores de firstName e lastName, além de recuperá-los como um valor combinado quando lidos:

    userSchema.virtual('fullName').get(function() {
      return this.firstName + ' ' + this.lastName
    })

    userSchema.virtual('fullName').set(function(name) {
      let str = name.split(' ')
      
      this.firstName = str[0]
      this.lastName = str[1]
    })

Callbacks ou "retornos de chamada" para obter e definir valores devem usar as palavras-chave da função, pois precisamos acessar o modelo através da palavra-chave this. Usar "fat arrow functions" (ou funções de setas grossas, em português) mudará a referência de this.

Agora, podemos definir firstName  e lastName através da atribuição de fullName:

    let model = new UserModel()

    model.fullName = 'Thomas Anderson'

    console.log(model.toJSON())  // Mostra os campos do modelo como JSON
    console.log()
    console.log(model.fullName)  // Mostra o nome completo

O resultado da execução do código acima é esse:

    { _id: 5a7a4248550ebb9fafd898cf,
      firstName: 'Thomas',
      lastName: 'Anderson' }
      
    Thomas Anderson

### Métodos instanciados

Podemos criar métodos auxiliares personalizados no nosso esquema e acessá-los através de uma instancia de método. Esses métodos terão acessos ao objeto do modelo e podem ser usados de modo bastante criativo. Por exemplo, poderíamos criar um métodos para encontrar todas as pessoas que tenham o mesmo nome da instância atual.

Nesse exemplo, vamos criar uma função que retorne as iniciais do usuário em questão. Vamos adicionar o método auxiliar personalizado chamado getInitials  ao esquema:

    userSchema.methods.getInitials = function() {
      return this.firstName[0] + this.lastName[0]
    }

Esse método estará acessível através da instância do modelo:

    let model = new UserModel({
      firstName: 'Thomas',
      lastName: 'Anderson'
    })

    let initials = model.getInitials()

    console.log(initials) // O resultado será: TA

### Métodos estáticos

Similar aos métodos instanciados, podemos criar também métodos estáticos no nosso esquema. Vamos criar um método para trazer todos os usuários que temos em nosso banco de dados:

    userSchema.statics.getUsers = function() {
      return new Promise((resolve, reject) => {
        this.find((err, docs) => {
          if(err) {
            console.error(err)
            return reject(err)
          }
          
          resolve(docs)
        })
      })
    }

Quando chamamos getUsers da classe Model, ele retornará todos os usuários de nosso banco de dados:

    UserModel.getUsers()
      .then(docs => {
        console.log(docs)
      })
      .catch(err => {
        console.error(err)
      })

Adicionar um método instanciado e um estático é uma ótima abordagem para implementar uma interface de interação de banco de dados em coleções e registros.

### Middleware

Middleware são funções executadas em estágios específicos de um "pipeline" (ou caminho, no português). O Mongoose tem suporte para middleware nas seguintes operações:

- Agregação
- Documento
- Modelo
- Busca (ou query, em inglês)

Por exemplo, o modelo tem funções pre e post, que aceitam dois parâmetros:

1. Tipo do evento ("init", "validate", "save", "remove")

2. Uma "callback", que é executada com o this referenciando a instância do modelo

*Exemplo de middleware(também conhecido como chamadas pre e post)*

USer Model --------> Pre-Server ----------->  Save ------------>  Post-Save
                     Middleware                ||                 Middleware
                         ||                    ||                      ||
                         ||                    ||                      ||
                         ||                    ||                      ||
                         ||                    ||                      ||
                         \/                    \/                      \/
                      Generate               Write to            Send Email when
                    Password Hash            Database             user acount is
                                                                     created

Vamos executar um exemplo de adição de dois campos, chamados createdAt e updatedAt, no nosso esquema:

    let mongoose = require('mongoose')

    let userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      createdAt: Date,
      updatedAt: Date
    })

    module.exports = mongoose.model('User', userSchema)

Quando model.save() é chamado, é executado um evento de pre(‘save’, …) e post(‘save’, …). Para o segundo parâmetro, você pode passar a função que é chamada quando o evento é disparado. Essas funções recebem um parâmetro para a próxima função na cadeia de middleware.

Vamos adicionar um "hook" (ou gancho, no português) de "pre-save" (algo como "salvamento prévio", na tradução)  para definir os valores de createdAt e updatedAt:

    userSchema.pre('save', function (next) {
      let now = Date.now()
      
      this.updatedAt = now
      // Define o valor para createdAt apenas se ele for nulo
      if (!this.createdAt) {
        this.createdAt = now
      }
      
      // Chama a próxima função na cadeia de pre-save
      next()    
    })

Agora, vamos criar e salvar nosso modelo:

    let UserModel = require('./user')

    let model = new UserModel({
      fullName: 'Thomas Anderson'
    }

    msg.save()
      .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })

Você deverá ver os valores para createdAt  e updatedAt quando o registro for criado e exibido:

    { _id: 5a7bbbeebc3b49cb919da675,
      firstName: 'Thomas',
      lastName: 'Anderson',
      updatedAt: 2018-02-08T02:54:38.888Z,
      createdAt: 2018-02-08T02:54:38.888Z,
      __v: 0 }

### Plug-ins

Suponha que você queira acompanhar quando um registro foi criado ou quando foi atualizado pela última vez em cada coleção do nosso banco de dados. Ao invés de repetir o processo acima, você pode criar um plug-in e aplicar em cada esquema:

Vamos criar um arquivo em ./src/model/plugins/timestamp.js e replicar a funcionalidade acima de modo a se tornar um módulo reutilizável:

    module.exports = function timestamp(schema) {

      // Adiciona os dois campos ao esquema
      schema.add({ 
        createdAt: Date,
        updatedAt: Date
      })

      //Cria o pre-save hook
      schema.pre('save', function (next) {
        let now = Date.now()
      
        this.updatedAt = now
        // Define o valor para createdAt apenas se ele for nulo
        if (!this.createdAt) {
          this.createdAt = now
        }
      // Chama a próxima função na cadeia de pre-save
      next()    
      })
    }

Para usar esse plug-in, simplesmente o passamos para nossos esquemas que deveriam utilizar essa funcionalidade:

    let timestampPlugin = require('./plugins/timestamp')

    emailSchema.plugin(timestampPlugin)
    userSchema.plugin(timestampPlugin)

### Criando pesquisas

O Mongoose tem uma API muito rica, que lida com diversos tipos de operações complexas que provém do MongoDB. Considere uma busca onde podemos criar incrementalmente os componentes de pesquisa.

Nesse exemplo, nós vamos:

1. Encontrar todos os usuários
2. Pular os primeiros 100 registros
3. Limitar o resultado a 10 registros
4. Ordenar os resultados pelo campo firstName
5. Selecionar firstName
6. Executar a busca

    UserModel.find()                   // encontra todos os usuários
            .skip(100)                // pula os primeiros 100 registos
            .limit(10)                // limita a 10 itens
            .sort({firstName: 1}      // ordena firstName de forma ascendente
            .select({firstName: true} // seleciona firstName apenas
            .exec()                   // executa a busca
            .then(docs => {
                console.log(docs)
              })
            .catch(err => {
                console.error(err)
              })


                  