# Módulos

Com os módulo podemos divir um código JS em diversos outros arquivos.

Para conseguirmos chamar uma função JavaScript em outro arquivo, devemos transformar essa função em uma variável e exportar ela com o comando module.exports = nome_da_variavel. Lembrando que devemos retirar o nome da função, pois atribuimos uma variável à ela. Nesse caso estamos transformando esse arquivo em um módulo.

Exemplo:

    var soma = function(a , b) {
        return a + b;
    }

    module.exports = soma;


Quando quisermos utilizar esse módulo em outro arquivo devemos utilizar a função require().
A função require() é uma função específica do Node e serve para importar um módulo para outro arquivo. Lembrando que no arquivo que queremos importar o módulo, devemos igualar ele a uma função.

Exemplo:

    var somaFunc = require("./soma");

Ou seja, a variável somaFunc está recebendo toda a função do outro arquivo soma.js.

