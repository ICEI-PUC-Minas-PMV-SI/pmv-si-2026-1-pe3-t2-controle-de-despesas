# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.0.1 A documentação dos requisitos deve ser detalhada para traduzir as necessidades dos usuários:

Como estudantes, autônomos e gestores familiares, em funcionalidades técnicas que combatam a desorganização financeira e o endividamento. 
Para isso, é essencial identificar os requisitos funcionais, que descreverão as ações que o sistema deve executar, como o registro de receitas e despesas mensais, a categorização automática de gastos e a geração de visões claras sobre o saldo disponível. Esta seção servirá como o alicerce para que o desenvolvimento atinja o objetivo de oferecer uma ferramenta simples e eficiente de acompanhamento orçamentário, conforme as lacunas identificadas por autores como Krieger (2025).

Requisitos Funcionais (RF):

Estes requisitos descrevem as funcionalidades que permitirão ao usuário gerenciar suas finanças:

| ID | Requisito | Descrição |
|---|---|---|
| RF01 | Registro de Transações | "O sistema deve permitir que o usuário insira receitas (ganhos) e despesas (gastos), informando valor, data e descrição." |
| RF02 | Categorização de Gastos | "O sistema deve permitir a classificação das despesas em categorias (ex: alimentação, transporte, lazer) para análise detalhada." |
| RF03| Cálculo de Saldo | O sistema deve calcular automaticamente o saldo disponível subtraindo o total de despesas do total de receitas. |
| RF04 | Visualização de Orçamento | O sistema deve apresentar um painel (dashboard) com o resumo financeiro mensal do usuário de forma clara. |
| RF05 | Gestão de Perfil | O sistema deve permitir que o usuário crie uma conta e gerencie seus dados pessoais com segurança. |

## 3.0.2 Complementarmente, devem ser estabelecidos os requisitos não funcionais, que definem os atributos de qualidade e restrições do sistema, garantindo a eficácia da solução no dia a dia do público-alvo:
Seguindo as diretrizes de Girdhar et al. (2024), a documentação deve priorizar requisitos de usabilidade, assegurando uma interface intuitiva que mantenha o usuário motivado, além de requisitos de segurança para a proteção dos dados sensíveis de movimentação bancária e pessoal. Ao detalhar esses requisitos conforme as seções propostas, o projeto estabelecerá um referencial técnico sólido que guiará desde a arquitetura da informação até os testes de aceitação finais, garantindo que o sistema não seja apenas mais uma ferramenta automatizada, mas uma solução real para a tomada de decisões financeiras conscientes.

Requisitos Não Funcionais (RNF):

Estes requisitos garantem que a experiência do usuário seja satisfatória e segura, conforme citado em sua justificativa:

ID | Requisito | Descrição |
|---|---|---|
RNF01 | Usabilidade | "A interface deve ser intuitiva e fácil de usar, permitindo que usuários com pouco conhecimento tecnológico operem o sistema sem dificuldades." |
RNF02 | Segurança | Os dados financeiros e as senhas dos usuários devem ser criptografados para garantir a privacidade das informações. |
RNF03 | Disponibilidade | O sistema deve ser acessível via web ou dispositivos móveis em 99% do tempo (disponibilidade 24/7). |
RNF04 | Desempenho | O sistema deve processar e exibir os cálculos de saldo e gráficos em um tempo de resposta inferior a 2 segundos. |


## 3.1 Objetivos deste documento

### 3.1.1 Necessidades do Projeto SCCA
O projeto SCCA deve atender à necessidade da Coordenação do Curso de Sistemas de Informação da PUC Minas de centralizar e automatizar o gerenciamento de cursos extracurriculares. Atualmente, a falta de uma ferramenta integrada dificulta o controle de novas ofertas, a validação de carga horária e o acompanhamento do histórico de cursos realizados. O sistema deve permitir que a coordenação cadastre novos cursos de aperfeiçoamento, gerencie as ementas e monitore o fluxo de inscrições, garantindo que as atividades propostas estejam alinhadas às diretrizes de educação financeira e técnica mencionadas no referencial teórico do curso.

Além da gestão administrativa, o sistema precisa oferecer uma interface intuitiva para que os alunos possam visualizar as oportunidades de aperfeiçoamento de forma clara e ágil. A especificação deve prever a geração de relatórios que auxiliem a coordenação na tomada de decisões estratégicas sobre quais áreas demandam mais cursos (como gestão financeira ou tecnologias emergentes). Assim, o SCCA funcionará como um facilitador da organização acadêmica, eliminando processos manuais e fornecendo um repositório confiável de dados para a melhoria contínua da formação oferecida pela PUC Minas.

## 3.2 Escopo do produto
 O produto a ser desenvolvido consiste em um sistema informatizado de gestão financeira pessoal, projetado para auxiliar usuários no registro e monitoramento de sua saúde financeira. O foco central do produto é a simplificação do processo de entrada de dados e a geração de visões analíticas que facilitem a tomada de decisão consciente sobre o uso do capital.
 
### 3.2.1Funcionalidades e Características Principais
* Módulo de Lançamentos: Interface para registro rápido de receitas (entradas) e despesas (saídas), permitindo a inserção de valores, datas e descritivos.

* Categorização Inteligente: Sistema de classificação de gastos em categorias personalizáveis (ex: alimentação, educação, lazer), visando identificar onde o orçamento está sendo mais comprometido.

* Painel de Indicadores (Dashboard): Visualização gráfica do saldo atual, comparação entre receitas e despesas do mês vigente e projeção de gastos recorrentes.

* Histórico e Filtros: Repositório de dados que permite ao usuário consultar movimentações passadas por períodos específicos (mensal/anual).

* Interface Responsiva: Design focado na usabilidade (conforme Girdhar et al., 2024), garantindo que estudantes e trabalhadores acessem o sistema com facilidade tanto em computadores quanto em dispositivos móveis.

### 3.2.2 Limites e Exclusões (Fora do Escopo)
* Para garantir a viabilidade do projeto e o foco no controle de gastos simples e eficiente, os seguintes itens não fazem parte deste escopo:

* Integração automática via API com contas bancárias reais (os dados devem ser inseridos manualmente ou via importação de arquivo padrão).

* Módulo de investimentos em bolsa de valores ou criptoativos.

* Consultoria financeira automatizada baseada em inteligência artificial para aplicações de risco.

* Pagamento de contas diretamente pelo sistema (o sistema é de controle, não de transação bancária).
  
### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado SCCA – Sistema de Cadastro de Cursos de Aperfeiçoamento. Ele terá somente um componente (módulo) com os devidos elementos necessários à gestão de cursos.

### 3.2.2 Missão do produto
Gerenciar informações sobre a oferta de cursos de aperfeiçoamento, gerenciar a composição das turmas, alunos, professores e matrículas. 

### 3.2.3 Limites do produto
O SCCA não fornece nenhuma forma de avaliação de alunos, pagamento de parcelas do curso, pagamento a professore e agendamentos. O SCCA não contempla o atendimento a vários cursos de Sistemas de Informação de outras unidades da PUC Minas.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no cadastro de dados |	Essencial |
|2 | Facilidade na recuperação de informações | Essencial | 
|3 | Segurança no cadastro de matrículas | Essencial | 
|4	| Melhoria na comunicação com os alunos	| Recomendável | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF1 | Gerenciar Curso de Aperfeiçoamento |	Processamento de Inclusão, Alteração, Exclusão e Consulta de Cursos de Aperfeiçoamento |
| RF2 |	Gerenciar Professor	| Processamento de Inclusão, Alteração, Exclusão e Consulta de professores |
| RF3	| Gerenciar Matrícula |	Processamento de Inclusão, Alteração, Exclusão e Consulta de Matrículas de alunos em Cursos de Aperfeiçoamento |
| ... |	...	| ... |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | O ambiente operacional a ser utilizado é o Windows XP. |
| RNF2 | O sistema deverá executar em um computador configurado com uma impressora de tecnologia laser ou de jato de tinta, a ser usada para impressão dos relatórios. |
| RNF3 |	Segurança	O produto deve restringir o acesso por meio de senhas individuais para o usuário. |
| ... |	... |	... |

### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Coordenador |	Usuário gerente do sistema responsável pelo cadastro e manutenção de cursos de aperfeiçoamento. Possui acesso geral ao sistema. |
| Secretaria |	Usuário responsável por registros de alunos, professores, turmas e gerência de matrículas. |
| ... |	... |	... |

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
