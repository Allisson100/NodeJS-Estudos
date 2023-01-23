# Como instalar o MongoDB

Acessar o site:

    https://www.mongodb.com/

Vai na aba Products/ Comunity Server, escolha o seu sistema operacional e clique em download.

No instalador clique tudo em next e escolhe a versão completa.

Configurar para abrir na linha de comando:

Entar no Disco Local (C:), entre na pasta arquivos de programa, depois acesse a pasta MongoDB, entre na pasta Server, depois enter na pasta da versão do MongoDb que no meu caso é a 6.0, depois entre na pasta bin.

Agora copia o endereço da página, e vamos ter que registrar esse diretório lá no path do windowns.

O path do windown é um utilitário que linka executáveis/binários ao nosso CMD.

Então para isso, abra o menu inicir e procure por Meu Computador, clica com botão direito nele e vá em propriedades.

Depois clique em Configurações Avançadas do Sistema, depois clique em Variáveis de Ambiente, depois selecione Path e clica em editar. Depois disso clique em novo e cole o diretório lá.

Ai é só ir clicando nos Ok até sair da página.

=============================================

Devemos agora criar uma pasta no Disco Local (C:) como o nome de data, tudo minúsculo desse jeito que escrevi.

O mongo pede para criar essa pasta, pois é lá que ele vai salvar todos os registros, documentos que eu criar com o MongoDB. E dentro da pasta data criar um psta com o nome db.

=============================================

Abra um cmd a parte apenas para abrir o servidor dele e nunca feche esse servidor, enquanto estiver desenvolvendo com MongoDB, deixe o servidor aberto em um CMD a parte. Caso feche o CMD o servidor do mongo vai ser desligado.

==============================================

Esse passo a passo é para versões antigas no MongoDB, eu instalei a versão 6.0, porém não tem suporte para o CMD, então instalei a versão 5.0, e nesse caso não precisa criar a pasta data.

==============================================

O comando:

    show collections;

Mostra as coleções criadas.






