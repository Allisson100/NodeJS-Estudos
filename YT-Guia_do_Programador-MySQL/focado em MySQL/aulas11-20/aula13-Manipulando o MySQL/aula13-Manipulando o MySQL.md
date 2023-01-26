# Manipulando o MySQL

Para inserir dados na tabela utilizamos o comando:

    insert into nome_da_tabela (aqui você insere os campo que você quer inserir dados) values (aqui você define o valor para cada campo);

ficando:

    insert into usuarios (nome, email, idade) values (
        "Victor Lima", *tipo texto por isso as aspas*
        "email@teste.com",
        8 *tipo inteiro por isso não precisa das aspas*
    );

Para você ver todos os dados da tabela utilizamos:

    select * from nome_da_tabela;

Sempre que quisermos especificar uma consulta com MySQL, devemos utilizar a palavra chave where, exemplo:

    select * from usuarios where idade = 8;



