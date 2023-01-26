# O que são sessões e cookies

### Cookies 

Basicamente, um Cookie é um arquivo de texto mutio simples, cuja composição depende diretamente do conteúdo do endereço Web visitado. Por exemplo, a maioria dos sites armazenam informações básicas, como endereços IP e preferências sobre idiomas, cores, etc. Contudo, em portais como o Gmail e Hotmail, nomes de usuários e senhas de email também fazem parte dos Cookies.

### Sessões 

- Sessões geralmente dependem de cookies, mas os dados são guardados no servidor. Funciona assim:

- Uma sessão é iniciada mo servidor, que envia um cookie ao browser com um ID único daquela sessão.

- Qualquer dado associado à sessão é armazenado no servidor, associado a esse ID.

- Em toda requisição, o browser envia de volta o cookie com oo ID da sessão, o que permite ao servidor dar acesso aos dados associados àquele ID.

- Portanto, usar sessões é um pouco mais seguro que guardar dados diretamente em cookies, já que se álguem tiver acesso o cookie não tem acesso direto aos dados (isso sem falar que não cabem muitos dados no cookies).

