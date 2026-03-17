# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.0.1 A documentação dos requisitos deve ser detalhada para atender às necessidades dos usuários:

Como estudantes, autônomos e responsáveis familiares, em ferramentas técnicas que ajudem a combater a desorganização financeira e a dívida. 
Para isso, é fundamental determinar os requisitos funcionais, que especificarão as tarefas que o sistema deve realizar, como registrar receitas e despesas mensais, classificar automaticamente os gastos e fornecer visões claras do saldo disponível. Esta seção funcionará como a base para que o desenvolvimento alcance a meta de proporcionar uma ferramenta prática e eficaz para o acompanhamento orçamentário, de acordo com as lacunas apontadas por autores como Krieger (2025).

Requisitos Funcionais (RF):

Esses requisitos especificam as funcionalidades que possibilitarão ao usuário administrar suas finanças:

| ID | Requisito | Descrição |
|---|---|---|
| RF-01 | Registro de Transações | "O sistema deve permitir que o usuário registre receitas (ganhos) e despesas (gastos), informando o valor, a data e a descrição." |
| RF-02 | Categorização de Gastos | "Para uma análise mais detalhada, o sistema deve permitir a categorização das despesas em grupos como alimentação, transporte e lazer." |
| RF-03| Cálculo de Saldo | O sistema deve determinar automaticamente o saldo disponível, subtraindo o montante total de despesas do montante total de receitas. |
| RF-04 | Visualização de Orçamento | O sistema deve apresentar um painel (dashboard) com o resumo financeiro mensal do usuário de forma clara. |
| RF-05 | Gestão de Perfil | O sistema deve permitir que o usuário crie uma conta e gerencie seus dados pessoais com segurança. |

## 3.0.2 Complementarmente, devem ser estabelecidos os requisitos não funcionais, que definem os atributos de qualidade e restrições do sistema, garantindo a eficácia da solução no dia a dia do público-alvo:
De acordo com as diretrizes de Girdhar et al. (2024), a documentação deve dar prioridade aos requisitos de usabilidade, garantindo uma interface intuitiva que mantenha o usuário engajado, bem como aos requisitos de segurança para proteger os dados sensíveis de movimentação bancária e pessoal. Ao especificar esses requisitos de acordo com as seções sugeridas, o projeto criará um referencial técnico robusto que orientará desde a estrutura da informação até os testes de aceitação finais. Isso garantirá que o sistema não seja apenas uma ferramenta automatizada, mas uma solução eficaz para a tomada de decisões financeiras informadas.

Requisitos Não Funcionais (RNF):

Estes requisitos garantem que a experiência do usuário seja satisfatória e segura, conforme citado em sua justificativa:

ID | Requisito | Descrição |
|---|---|---|
RNF-01 | Usabilidade | "A interface precisa ser intuitiva e de fácil utilização, possibilitando que usuários com pouca familiaridade tecnológica consigam operar o sistema sem problemas." |
RNF-02 | Segurança | Para assegurar a privacidade das informações, é necessário criptografar os dados financeiros e as senhas dos usuários. |
RNF-03 | Disponibilidade | O sistema precisa estar disponível 24 horas por dia, 7 dias por semana, com uma taxa de acessibilidade de 99% (disponibilidade contínua). |
RNF-04 | Desempenho | O sistema precisa calcular e mostrar os saldos e gráficos em menos de 2 segundos. |


## 3.1 Objetivos deste documento

### 3.1.1 Necessidades do Projeto SCCA

O projeto SCCA deve atender à demanda da Coordenação do Curso de Sistemas de Informação da PUC Minas por uma centralização e automação no gerenciamento de atividades extracurriculares. Hoje em dia, a ausência de uma ferramenta unificada torna mais difícil o gerenciamento de novas ofertas, a verificação da carga horária e o monitoramento do histórico de cursos realizados. O sistema deve possibilitar que a coordenação registre novos cursos de aperfeiçoamento, administre as ementas e acompanhe o fluxo de inscrições, assegurando que as atividades planejadas estejam em conformidade com as diretrizes de educação financeira e técnica citadas no referencial teórico do curso.

Além de gerenciar a administração, o sistema deve fornecer uma interface amigável para que os estudantes possam visualizar as oportunidades de aprimoramento de maneira clara e eficiente. A especificação deve incluir a criação de relatórios que ajudem a coordenação a tomar decisões estratégicas sobre quais áreas precisam de mais cursos, como gestão financeira ou tecnologias emergentes. Dessa forma, o SCCA atuará como um facilitador da organização acadêmica, eliminando procedimentos manuais e disponibilizando um repositório seguro de dados para aprimorar continuamente a formação oferecida pela PUC Minas.

## 3.2 Escopo do produto

O produto a ser desenvolvido é um sistema digital de gestão financeira pessoal, projetado para auxiliar os usuários no registro e monitoramento de sua saúde financeira. O principal objetivo do produto é facilitar a entrada de dados e gerar visões analíticas que auxiliem na tomada de decisões embasadas sobre a utilização do capital..
 
### 3.2.1 Funcionalidades e Características Principais

* Módulo de Lançamentos: Tela para o registro ágil de receitas (entradas) e despesas (saídas), possibilitando a inclusão de valores, datas e descrições.

* Categorização Inteligente: sistema de organização de despesas em categorias personalizáveis (por exemplo, alimentação, educação, lazer), com o objetivo de identificar onde o orçamento está sendo mais afetado.

* Painel de Indicadores: Representação gráfica do saldo atual, comparação entre receitas e despesas do mês em curso e previsão de gastos recorrentes.

* Histórico e Filtros: Repositório de dados que possibilita ao usuário verificar transações anteriores em períodos determinados (mensais/anual).

* Interface Responsiva: Design voltado para a usabilidade (de acordo com Girdhar et al., 2024), assegurando que alunos e profissionais possam acessar o sistema de forma simples, tanto em computadores quanto em dispositivos móveis.

### 3.2.2 Limites e Exclusões

* Para assegurar a viabilidade do projeto e manter um controle de despesas simples e eficaz, os seguintes itens estão excluídos deste escopo::

* Integração automática por meio de API com contas bancárias reais (as informações precisam ser inseridas manualmente ou importadas a partir de um arquivo padrão).

* Módulo de aplicações em mercado financeiro tradicional ou digital.

* Assessoria financeira automatizada fundamentada em inteligência artificial para investimentos de risco.

* Efetuar o pagamento de contas diretamente pelo sistema (que é de controle, não de transação bancária).
  
### 3.2.1 Nome do produto e seus componentes principais

O produto foi desenvolvido como uma solução tecnológica unificada para reduzir a desorganização financeira e o endividamento, operando por meio de uma plataforma web e móvel que enfatiza a "transparência e aprimoramento" na administração do capital pessoal. O sistema vai além de ser apenas um repositório de dados; ele funciona como uma ferramenta que auxilia na tomada de decisões informadas, convertendo registros isolados em uma visão clara do orçamento do usuário.
É composto pelos seguintes componentes fundamentais:

* Módulo de Lançamentos e Fluxo de Caixa: encarregado de registrar entradas (receitas) e saídas (despesas). Este componente é responsável pelo gerenciamento do histórico de transações e possibilita a inserção de dados de forma manual ou automatizada, com o objetivo de atender à carência de ferramentas mencionada por Krieger (2025).

* Motor de Categorização e Análise: elemento lógico responsável por classificar os gastos de acordo com sua natureza (essenciais, lazer, fixos, variáveis). Ele emprega os conceitos de interfaces intuitivas ressaltados por Girdhar et al. (2024) para incentivar o usuário por meio de uma visualização transparente de como o dinheiro está sendo alocado.

* Dashboard de Indicadores Financeiros: Um painel visual que reúne o saldo disponível e emite alertas preventivos. Esse elemento é fundamental para a "autoavaliação" citada por Silveira et al. (2008), possibilitando que o usuário detecte prontamente os riscos de inadimplência antes que a inclusão em sistemas de proteção ao crédito aconteça.

* Módulo de Educação e Planejamento: Com foco no planejamento de gastos futuros e objetivos de poupança, esse módulo incorpora os conceitos de educação financeira oferecidos pela PUC Minas para promover práticas de gestão financeira consistentes, especialmente entre os jovens e universitários.

### 3.2.2 Missão do produto

Gestão de Informações e Composição do Sistema Financeiro:

* O sistema deve administrar de forma centralizada os dados referentes à oferta de categorias de despesas e fontes de receita, atuando como o núcleo para a organização do capital do usuário. A estrutura do sistema deve possibilitar o registro minucioso das transações financeiras, em que cada entrada está vinculada a metadados específicos, como data, valor, descrição e categoria de despesa (fixa ou variável). 
Essa estrutura de gerenciamento é essencial para enfrentar o "consumismo desenfreado" mencionado na justificativa do projeto, pois possibilita que o sistema processe dados brutos e os converta em informações valiosas para a autoavaliação financeira. Isso assegura que usuários, desde estudantes universitários até trabalhadores autônomos, disponham de um repositório confiável para acompanhar sua margem de economia..

* Além de administrar registros, o sistema deve controlar a elaboração de orçamentos e planejamentos mensais, possibilitando que o usuário defina objetivos de economia e limites de despesas por categoria. Ao combinar a gestão de informações de saldo com ferramentas de análise visual, o software automatiza a detecção de gastos recorrentes e pontos críticos no orçamento que, anteriormente, poderiam ser ignorados em registros manuais. Esse controle sistemático atende à demanda por educação financeira enfatizada pela PUC Minas, proporcionando ao público-alvo uma interface intuitiva que simplifica a tomada de decisões informadas e favorece a estabilidade financeira a longo prazo por meio de uma gestão digitalizada eficaz..

### 3.2.3 Limites do produto
O CDD será de uso individual, não pode ser usado por múltiplos usuários simultâneos ou de uso empresarial.   O CDD não terá integração com bancos, APIs financeiras ou outras organizações externas, sendo obrigatório informar o registro manualmente das informações.  O CDD não realizara pagamentos ou operações reais, sendo apenas informativo. O CDD não terá segurança avançada, como autenticação de múltiplos fatores ou criptografia avançada.  O CDD terá funcionalidades básicas de visualização de saldo, não incluindo análises financeiras de alto nível ou inteligência artificial.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no cadastro dos dados financeiros |	Essencial |
|2 | Facilidade na visualizaçâo do saldo | Essencial | 
|3 | Organização por categorias de gastos | Essencial |
|4	| Relatório básico	de gastos | Recomendável | 
|5	| Interface simples de ser visualizada	| Recomendável |
|6 | Sugestões para redução de gastos | Desejável |

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF01 | Criar cadastro |	O sistema deve permitir que um novo usuário crie uma conta informando e-mail e senha. |
| RF02 |	Requisitos mínimos da senha	| A senha deve conter no mínimo 8 caracteres incluindo 1 número e 1 letra. |
| RF03	| Validação de e-mail único |	Durante o cadastro, o sistema deve verificar se o e-mail já está cadastrado e impedir duplicatas. |
| RF04	| E-mail inexistente |	O sistema deve solicitar um cadastro |
| RF05 |	Login no sistema	| O sistema deve permitir que o usuário faça login utilizando e-mail e senha. |
| RF06	| Recuperação de senha |	O sistema deve permitir que o usuário solicite recuperação de senha informando o seu e-mail. |
| RF07 |	Expiração de código de recuperação	| O código encaminhado ao e-mail deve ficar válido de 15-30 minutos. |
| RF08 |	Validação do código de recuperação	| O sistema deve validar o codigo e permitir a redefinição de senha apenas se o código for válido e não expirado. |
| RF09 |	Logout manual	| O sistema deve permitir o usuário encerrar a sua sessão manualmente. |
| RF10 |	Expiração automática de sessão	| O sistema deve encerrar a sessão do usuário após um período de inatividade. |
| RF11 |	Controle de sessão única	| O sistema deve permitir apenas uma sessão ativa por usuário (logout em outros dispositivos automático ao logar). |
| RF12 |	Cadastro de categoria de transação	| O sistema deve permitir que o usuário cadastre, edite e exclua categorias de despesas e receitas. |
| RF13 |	Registro de receita	| O sistema deve permitir que o usuário cadastre uma receita, informando valor, data, categoria e descrição. |
| RF14 |	Resgitro de despesa	| O sistema deve permitir que o usuário cadastre uma despesa, informando, valor, data, categoria e descrição. |
| RF15 | Edição de transação	| O sistema deve permitir que o usuário edite uma transação já registrada, seja ela receita ou despesa. |
| RF16 |	Exclusão de transação	| O sistema deve permitir que o usuário exclua uma transação já registrada, seja ela receita ou despesa. |
| RF17 |	Vizualização do saldo	| O sistema deve permitir que o usuário verifique o seu saldo atual geral (receita - despesa). |
| RF18 |	Listagem de transações	| O sistema deve listar todas as transações (receitas e despesas) com filtros por períodos (mês/ano) e categoria. |
| RF19 |	Resumo mensal	| O sistema deve mostrar um resumo mensal com: total de receitas, total de despesas e saldo. |
| RF20 |	Exibir histórico	| O sistema deve permirtir que o usuário veja o seu histórico em ordem cronológica. |
### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | Após efetuar o login, o carregamento dos dados como: saldo, gráficos e resumos, devem ser apresentados em menos de 2 segundos para o usuário |
| RNF2 | As senhas e dados financeiros dos usuários devem ser armazenadas de forma criptografadas |
| RNF3 |	O sistema deve solicitar o cadastro de uma nova senha, a cada 6 meses de uso na plataforma, e fazer a verificação da senha para evitar repetição. |
| RNF4 |	A disponibilidade do sistema deve ser de no mínimo 99,0%, no dia, semana, mês e ano.
|	RNF5 | O software deve ser responsivo e intuitivo, adaptável a computadores, tablets e celulares e de fácil utilização.
|	RNF6 | O software, deve possuir botão para alterar o modo de exibição de tela, claro ou escuro.
|	RNF7 | O sistema deve armazenar os dados históricos de clientes, por no mínimo 5 anos.
|	RNF8 | O software deve possuir na tela inicial, um campo com perguntas frequentes, um suporte com as prinicipais informações para o usuário.
|	RNF9 | O código do sistema, deve estar comentado, facilitando a manutenção e atualização.
|	RNF10 | O sistema deve ser compatível com os principais navegadores, Mozilla Firefox e Google Chrome.
|	RNF10 | O sistema deve possuir calendário, onde o usuário poderá adicionar lembretes de contas futuras.


### 3.3.3 Usuários 

| Ator | Descrição |
|---|---|
| Visitante | Pessoa interessada em utilizar a solução, mas que ainda não possui cadastro ativo. Pode realizar o processo de criação de conta e autenticação inicial para passar a utilizar o sistema. |
| Usuário Cadastrado | Ator primário do sistema. Corresponde à pessoa que utiliza a aplicação para registrar receitas e despesas, categorizar gastos, acompanhar saldo, consultar histórico financeiro, visualizar indicadores em painel e gerenciar os próprios dados de perfil. Enquadram-se nesse ator perfis como estudantes, trabalhadores assalariados, autônomos e responsáveis pela administração financeira familiar. |
| Administrador do Sistema | Usuário responsável pela administração técnica e operacional da plataforma. Possui acesso privilegiado para gerenciar contas de usuários, manter parâmetros gerais do sistema, acompanhar o funcionamento da aplicação e apoiar a integridade, a disponibilidade e a segurança das informações financeiras armazenadas. Não utiliza o sistema para registrar despesas pessoais, mas para garantir seu correto funcionamento e suporte aos demais usuários. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](https://github.com/user-attachments/assets/41f6b731-b44e-43aa-911f-423ad6198f47)
 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

#### Gerenciar Professor (CSU01)

Sumário: A Secretária realiza a gestão (inclusão, remoção, alteração e consulta) dos dados sobre professores.

Ator Primário: Secretária.

Ator Secundário: Coordenador.

Pré-condições: A Secretária deve ser validada pelo Sistema.

Fluxo Principal:

1) 	A Secretária requisita manutenção de professores.
2) 	O Sistema apresenta as operações que podem ser realizadas: inclusão de um novo professor, alteração de um professor, a exclusão de um professor e a consulta de dados de um professor.
3) 	A Secretária seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) 	Se a Secretária desejar continuar com a gestão de professores, o caso de uso retorna ao passo 2; caso contrário o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a)	A Secretária requisita a inclusão de um professor. <br>
b)	O Sistema apresenta uma janela solicitando o CPF do professor a ser cadastrado. <br>
c)	A Secretária fornece o dado solicitado. <br>
d)	O Sistema verifica se o professor já está cadastrado. Se sim, o Sistema reporta o fato e volta ao início; caso contrário, apresenta um formulário em branco para que os detalhes do professor (Código, Nome, Endereço, CEP, Estado, Cidade, Bairro, Telefone, Identidade, Sexo, Fax, CPF, Data do Cadastro e Observação) sejam incluídos. <br>
e)	A Secretária fornece os detalhes do novo professor. <br>
f)	O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui o novo professor e a grade listando os professores cadastrados é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a)	A Secretária seleciona um professor e requisita ao Sistema que o remova. <br>
b)	Se o professor pode ser removido, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a)	A Secretária altera um ou mais dos detalhes do professor e requisita sua atualização. <br>
b)	O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados na lista de professores, caso contrário, o erro é reportado. <br>
 
Fluxo Alternativo (3): Consulta

a)	A Secretária opta por pesquisar pelo nome ou código e solicita a consulta sobre a lista de professores. <br>
b)	O Sistema apresenta uma lista professores. <br>
c)	A Secretária seleciona o professor. <br>
d)	O Sistema apresenta os detalhes do professor no formulário de professores. <br>

Pós-condições: Um professor foi inserido ou removido, seus dados foram alterados ou apresentados na tela.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Aluno |	Cadastro de informações relativas aos alunos. |
| 2	| Curso |	Cadastro geral de cursos de aperfeiçoamento. |
| 3 |	Matrícula |	Cadastro de Matrículas de alunos nos cursos. |
| 4 |	Turma |	Cadastro de turmas.
| 5	|	Professor |	Cadastro geral de professores que ministram as disciplinas. |
| ... |	... |	... |
