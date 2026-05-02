# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

A documentação dos requisitos deve ser detalhada para atender às necessidades dos usuários:
Para atender ao seu público, que busca praticidade e clareza e traduzir as dificuldades financeiras dos usuários de forma simples e direta, como o registro fácil e rápido de gastos, ter uma separação automática por categorias (como lazer, contas, alimentação, entre outros) e a exibição de um saldo atualizado para que não ocorra o endividamento. 
Além disso, o software precisa ser visualmente de simples interação e seguro, garantindo que mesmo quem não tem intimidade com planilhas ou com a tecnologia consiga acompanhar seu orçamento e tomar decisões melhores sobre o uso do seu dinheiro no dia a dia.

## 3.1 Objetivos deste documento:

O objetivo deste documento é detalhar o guia de elaboração do sistema, transformando as necessidades, as dificuldades e do que os usuários precisam em regras práticas para os desenvolvedores. 
Ele busca garantir que o software seja fácil de usar, permitindo que diferentes tipos de pessoas consigam anotar seus gastos rapidamente, podendo visualizar o saldo automático e entender para onde seu dinheiro está indo através de gráficos simples. 
Em resumo, este documento serve para assegurar que a ferramenta final seja fácil e eficiente, ajudando o usuário a organizar sua vida financeira e evitar dívidas de forma descomplicada.

## 3.2 Escopo do produto
 
Este trabalho consiste no desenvolvimento de um sistema de gestão financeira pessoal focado em simplificar o controle de gastos e despesas para pessoas que enfrentam dificuldades com métodos tradicionais. 
O software oferecerá funções essenciais, como o registro rápido e fácil de transações, a categorização automática do que são as despesas e a exibição de um saldo atualizado em tempo real.
O objetivo central é transformar dados complexos em informações visuais claras, como gráficos e relatórios simples, permitindo que as pessoas monitorem sua saúde financeira sem a necessidade de conhecimentos avançados em tecnologia ou contabilidade.

Além das funcionalidades práticas, tem como prioridade a criação de uma interface intuitiva e segura, garantindo que a interação seja fácil e que os dados particulares dos usuários estejam protegidos. 
O projeto vem a ser uma ferramenta de apoio à organização e tomada de decisões, buscando reduzir o endividamento e promover a educação financeira através de um feedback constante sobre o orçamento. Assim, o trabalho entrega uma solução digital completa e acessível, voltada especificamente para quem busca praticidade e eficiência no gerenciamento do próprio dinheiro no dia a dia.

### 3.2.1 Missão do produto

Simplificar a vida financeira das pessoas, oferecendo uma ferramenta digital fácil que transforme a tarefa de anotar gastos em um hábito rápido e natural. 
Com o objetivo de dar ao usuário o controle sobre o seu dinheiro, substituindo anotações confusas por gráficos claros e cálculos automáticos que mostram exatamente quanto ele já gastou e quanto pode gastar. 
Ao focar na facilidade de uso e na segurança, o sistema busca ser de grande ajuda contra as dívidas e também um incentivo para que as pessoas tomem decisões financeiras mais inteligentes e seguras, garantindo tranquilidade no presente e conforto no futuro.

### 3.2.2 Limites do produto
O CDD (Controle de despesas) será de uso individual, não pode ser usado por múltiplos usuários simultâneos ou de uso empresarial.   O CDD não terá integração com bancos, APIs financeiras ou outras organizações externas, sendo obrigatório informar o registro manualmente das informações.  O CDD não realizará pagamentos ou operações reais, sendo apenas informativo. O CDD não terá segurança avançada, como autenticação de múltiplos fatores ou criptografia avançada.  O CDD terá funcionalidades básicas de visualização de saldo, não incluindo análises financeiras de alto nível ou inteligência artificial.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no cadastro dos dados financeiros |	Essencial |
|2 | Facilidade na visualização do saldo | Essencial | 
|3 | Organização por categorias de gastos | Essencial |
|4	| Relatório básico	de gastos | Recomendável | 
|5	| Interface simples de ser visualizada	| Recomendável |
|6 | Sugestões para redução de gastos | Desejável |

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF01 | Visitante realiza cadastro | O visitante deve conseguir criar uma conta na plataforma, informando nome, e-mail e senha. |
| RF02 |	Usuário realiza login | O usuário deve conseguir autenticar-se na plataforma com e-mail e senha. |
| RF03 |	Usuário realiza logout | O usuário deve conseguir encerrar sua sessão na plataforma. |
| RF04	| Usuário gerencia conta | O usuário deve conseguir visualizar e editar os dados do seu perfil, como nome e e-mail. |
| RF05	| Usuário altera senha |	O usuário deve conseguir alterar a senha da sua conta. |
| RF06 |	Usuário recupera senha | O usuário deve conseguir recuperar a sua senha de acesso à plataforma. |
| RF07 |	Usuário gerencia despesas	| O usuário deve conseguir registrar, editar, excluir e consultar suas despesas, associando cada uma a uma categoria (ex.: lazer, alimentação, contas). |
| RF08 |	Usuário gerencia receitas	| O usuário deve conseguir registrar, editar, excluir e consultar suas receitas (ex.: salário, renda extra). |
| RF09 |	Usuário visualiza relatório	| O usuário deve conseguir visualizar e selecionar filtros do seu painel financeiro. |
| RF10|	Usuário visualiza histórico	| O usuário consegue visualizar o seu histórico de despesas e receitas. |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF01 | O sistema deve carregar os dados iniciais em até 2 segundos após o login, em condições normais de operação. |
| RNF02 |	A política de segurança do sistema deve exigir a troca de senha a cada 6 meses e impedir a reutilização de senha. |
| RNF03 |	A disponibilidade do sistema deve ser de no mínimo 99,0% ao mês.
|	RNF04 | O software deve ser responsivo a computadores (resolução mínima de 1366x768) e celulares (resolução mínima de 360x640).
|	RNF05 | O sistema deve armazenar os dados históricos de clientes por no mínimo 5 anos.
|	RNF06 | O código do sistema deve estar comentado, facilitando a manutenção e atualização.
|	RNF07 | O sistema deve ser compatível com o navegador Google Chrome, versão 145.x ou superior.



### 3.3.3 Usuários 

| Ator | Descrição |
|---|---|
| Visitante | Pessoa interessada em utilizar a solução, mas que ainda não possui cadastro ativo. Pode realizar o processo de criação de conta e autenticação inicial para passar a utilizar o sistema. |
| Usuário Cadastrado | Ator primário do sistema. Corresponde à pessoa que utiliza a aplicação para registrar receitas e despesas, categorizar gastos, acompanhar saldo, consultar histórico financeiro, visualizar indicadores em painel e gerenciar os próprios dados de perfil. Enquadram-se nesse ator perfis como estudantes, trabalhadores assalariados, autônomos e responsáveis pela administração financeira familiar. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, separamos quem ainda não entrou no sistema (Visitante) de quem já utiliza a ferramenta no dia a dia (Usuário Cadastrado).

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="574" height="583" alt="Diagrama 1" src="https://github.com/user-attachments/assets/53da6597-040e-43b0-b7c9-a45c169281e0" />

### 3.4.2 Descrições de Casos de Uso

#### Atores
* Visitante: Ator que ainda não possui acesso e interage apenas com as funções de criação de conta.

* Usuário Cadastrado: Ator principal que gerencia sua vida financeira.

#### Principais Fluxos:

* UC01 - Manter Conta (RF01, RF04, RF05, RF06): Inclui o cadastro inicial do visitante, a edição do perfil pelo usuário e os fluxos de segurança (alterar e recuperar senha).

* UC02 - Autenticação (RF02, RF03): Processo de Login e Logout para garantir que os dados financeiros estejam protegidos por sessão.

* UC03 - Gerenciar Despesas (RF07, RF08): O usuário registra seus gastos. Aqui entra a categorização automática mencionada no escopo, onde cada despesa é vinculada a um tipo (Lazer, Alimentação, etc.).

* UC04 - Gerenciar Receitas (RF09, RF10): Registro de entradas financeiras (salários, rendas extras) para compor o saldo.

* UC05 - Consultar Painel Financeiro (RF11): O sistema consolida as despesas e receitas para exibir o Saldo Atualizado em tempo real e o histórico, atendendo ao objetivo de evitar o endividamento.
  
### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. Aqui resume visualmente os fluxos do sistema de finanças pessoais, estruturado conforme os atores do sistema que são Visitante e Usuário Cadastrado.

#### Figura 2: Diagrama de Classes do Sistema.
 
<img width="705" height="652" alt="Diagrama 2" src="https://github.com/user-attachments/assets/d45d09b8-ee5a-41c0-9bf0-81b1a9da9092" />

### 3.4.4 Descrições das Classes 

| # | Tipo | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Classe: |	Representa os objetos principais do software |
| 2	| Atributos |	São as informações que o sistema precisa armazenar |
| 3 |	Métodos:|	São as funcionalidades descritas nos requisitos funcionais (RF01 a RF11) |
| 4	|	Relacionamento |	Define como uma classe "conversa" com a outra. A relação entre Despesa e Categoria atende ao requisito de "separação automática por categorias" |
| ... |	... |	... |
