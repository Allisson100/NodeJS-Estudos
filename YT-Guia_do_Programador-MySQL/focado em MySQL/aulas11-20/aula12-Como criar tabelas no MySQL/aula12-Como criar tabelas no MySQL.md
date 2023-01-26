Como acessar o MySQL no terminal:

    mysql -h localhost -u root -p

-h significa em qual servidor você quer se conectar que no nosso caso é o servidor local onde instalei o mysql.
-u significa qual o usuário que no nosso caso é o root.
-p é pra colocar a senha que eu defini lá na hora que estava instalando o mysql

Mostrar banco de dados que existem no MySQL:

    show databases;

Criar banco de dados:
     
    create database nome_do_banco_de_dados;

Para acessar um banco de dados específico:

    use nome_do_banco;

Para saber quais tabelas existem naquele banco de dados utilizamos:

    show tables;

Para criar tabelas utilizamos, por exemplo:

    create table usuarios(
        nome varchar(50),
        email varchar(100),
        idade int
    );

E para ver a estrutura dessa tabela utilizamos:

    describe nome_da_tabela;

