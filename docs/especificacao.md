# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

A documentação dos requisitos deve ser detalhada para atender às necessidades dos usuários:
Para atender ao seu público, que busca praticidade e clareza e traduzir as dificuldades financeiras dos usuários de forma simples e direta, como o registro facil e rápido de gastos, ter uma separação automática por categorias (como lazer, contas, alimentação entre outros) e a exibição de um saldo atualizado para que na ocorra o endividamento. 
Além disso, o software precisa ser visualmente de simples interação e seguro, garantindo que mesmo quem não tem intimidade com planilhas ou com a tecnologia consiga acompanhar seu orçamento e tomar decisões melhores sobre o uso do seu dinheiro no dia a dia.

## 3.1 Objetivos deste documento:

O objetivo deste documento é detalhar o guia de elaboraçao do sistema, transformando as necessidades, as dificuldades e do que os usuários precisam em regras práticas para os desenvolvedores. 
Ele busca garantir que o software seja fácil de usar, permitindo que diferentes tipos de pessoa consiga anotar seus gastos rapidamente, podendo visualizar o saldo automático e entender para onde seu dinheiro está indo através de gráficos simples. 
Em resumo, este documento serve para assegurar que a ferramenta final seja facil e eficiente, ajudando o usuário a organizar sua vida financeira e evitar dívidas de forma descomplicada.

## 3.2 Escopo do produto
 
Este trabalho consiste no desenvolvimento de um sistema de gestão financeira pessoal focado em simplificar o controle de gastos e despesas para pessoas que enfrentam dificuldades com métodos tradicionais. 
O software oferecerá funções essenciais, como o registro rápido e facil de transações, a categorização automática do que são as despesas e a exibição de um saldo atualizado em tempo real.
O objetivo central é transformar dados complexos em informações visuais claras, como gráficos e relatórios simples, permitindo que as pessoas monitorem sua saúde financeira sem a necessidade de conhecimentos avançados em tecnologia ou contabilidade.

Além das funcionalidades práticas, tem como prioridade a criação de uma interface intuitiva e segura, garantindo que a interação seja facil e que os dados particulares dos usuários estejam protegidos. 
O projeto vem a ser uma ferramenta de apoio à organização e tomada de decisões, buscando reduzir o endividamento e promover a educação financeira através de um feedback constante sobre o orçamento. Assim, o trabalho entrega uma solução digital completa e acessível, voltada especificamente para quem busca praticidade e eficiência no gerenciamento do próprio dinheiro no dia a dia.

### 3.2.1 Missão do produto

Simplificar a vida financeira das pessoas, oferecendo uma ferramenta digital facil que transforme a tarefa de anotar gastos em um hábito rápido e natural. 
Com objetivo de dar ao usuário o controle sobre o seu dinheiro, substituindo anotações confusas por gráficos claros e cálculos automáticos que mostram exatamente quanto ele já gastou e quento pode gastar. 
Ao focar na facilidade de uso e na segurança, o sistema busca ser de grande ajuda contra às dívidas e tambem um incentivo para que as pessoas tomem decisões financeiras mais inteligentes e seguras, garantindo tranquilidade no presente e conforto no futuro.

### 3.2.2 Limites do produto
O CDD (Controle de despesas) será de uso individual, não pode ser usado por múltiplos usuários simultâneos ou de uso empresarial.   O CDD não terá integração com bancos, APIs financeiras ou outras organizações externas, sendo obrigatório informar o registro manualmente das informações.  O CDD não realizara pagamentos ou operações reais, sendo apenas informativo. O CDD não terá segurança avançada, como autenticação de múltiplos fatores ou criptografia avançada.  O CDD terá funcionalidades básicas de visualização de saldo, não incluindo análises financeiras de alto nível ou inteligência artificial.

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
| RF01 | Usuário realiza cadastro |	O usuário deve conseguir se cadastra na plataforma. |
| RF02 |	Usuário realiza login | O usuário deve conseguir efetuar login/logout na plataforma. |
| RF03	| Usuário gerencia conta | O usuário gerencia seu perfil dentro da plataforma. |
| RF04	| Usuário recupera senha |	O usuário deve conseguir alterar a senha da sua conta. |
| RF05 |	Usuário cadastra despesa	| O usuário deve conseguir cadastrar e excluir categorias de despesa. |
| RF06	| Usuário cadastra receita	| O usuário deve conseguir cadastrar e excluir categorias de receita. |
| RF07 |	Usuário edita despesa |	O usuário deve conseguir gerenciar suas despesas. |
| RF08 |	Usuário edita receita |	O usuário deve conseguir gerenciar sua receita. |
| RF09 |	Usuário registra despesa	| O usuário consegue cadastrar uma despesa. |
| RF10 | Usuário registra receita	| O usuário consegue cadastrar uma receita. |
| RF11 |	Usuário visualiza histórico	| O usuário consegue vizualizar o seu histórico de despesas e receitas. |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | Após efetuar o login, o carregamento dos dados devem acontecer em menos de 2 segundos para o usuário |
| RNF2 | As senhas e dados financeiros dos usuários devem ser armazenadas de forma criptografadas |
| RNF3 |	O sistema deve solicitar o cadastro de uma nova senha, a cada 6 meses de uso na plataforma, e fazer a verificação da senha para evitar repetição. |
| RNF4 |	A disponibilidade do sistema deve ser de no mínimo 99,0%, no dia, semana, mês e ano.
|	RNF5 | O software deve ser responsivo a computadores (resolução mínima de 1366 X 768) e celulares (resolução mmínima de 360 X640).
|	RNF6 | O software, deve possuir botão para alterar o modo de exibição de tela, claro ou escuro.
|	RNF7 | O sistema deve armazenar os dados históricos de clientes, por no mínimo 5 anos.
|	RNF8 | O software deve possuir na tela inicial, um campo com perguntas frequentes, um suporte com as prinicipais informações para o usuário.
|	RNF9 | O código do sistema, deve estar comentado, facilitando a manutenção e atualização.
|	RNF10 | O sistema deve ser compatível com o navegador, Google Chrome, versões 145 e 146.
|	RNF11 | O sistema deve possuir calendário, onde o usuário poderá adicionar lembretes de contas futuras.


### 3.3.3 Usuários 

| Ator | Descrição |
|---|---|
| Visitante | Pessoa interessada em utilizar a solução, mas que ainda não possui cadastro ativo. Pode realizar o processo de criação de conta e autenticação inicial para passar a utilizar o sistema. |
| Usuário Cadastrado | Ator primário do sistema. Corresponde à pessoa que utiliza a aplicação para registrar receitas e despesas, categorizar gastos, acompanhar saldo, consultar histórico financeiro, visualizar indicadores em painel e gerenciar os próprios dados de perfil. Enquadram-se nesse ator perfis como estudantes, trabalhadores assalariados, autônomos e responsáveis pela administração financeira familiar. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![Diagrama de Casos de Uso do Sistema 1](https://github.com/user-attachments/assets/85abf023-d2a7-4ecb-b62b-f4b8ef86c18a)



 
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
