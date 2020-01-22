# Comanda-Pay

Comanda-Pay é uma aplicação que conta com 3 estruturas principais que fazem toda regra de negócio de pagamento de comanda em bares, restaurantes e etc.

 - **app-init** - aqui a aplicação faz verificação se o totem cadastrado na base está disponível para operar, faz testes de conexão, verifica se existe comanda que precisa ser destravada
 - **app-barcode**  - inicia-se numa tela onde faz uma verificação se a impressora esta corretamente configurada, senão cai em uma exceção informando qual erro. O cliente passa a comanda no leitor de código de barra e o código é interpretado pela aplicação gerando para o usuário a lista de produtos consumidos, assim como valor de cada produto com respectivas quantidades e o valor total a pagar. Ao clicar em pagar o mesmo é direcionado para seleção do tipo de pagamento (débito, crédito ou vale-refeição). Depois disso ele pode inserir ou não o CPF na nota e então direcionado para o pagamento.
 - **app-survey-v1** - o cliente tem acesso a um questionário (customizável) onde responde perguntas pré-cadastradas em um painel administrativo que também registra todos os comentários e opniões registradas por aqui.

Uma aplicação desenvolvida com Angular 6 e esta é a versão 1.0.0