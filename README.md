# Recuperção de senha
**RF****Requisitos funcionais**
-O usuário deve poder recuperar sua senha informando seu e-mail;
-O usuário deve receber um email com instruções com recuração de senha;
-O usuário deve poder resetar sua senha

**RNF****Requisitos não funcionais**
-Utilizar mailtrap para testar envios em ambiente de dev.
-Utilizar amazon SES para envios em produção;
-O envio de e-mails deve acontecer em segundo plano

**RN****Regra de negocio**
-O link enviado por email para resetar senha deve expirar em 2h;
-O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil
**RF****Requisitos funcionais**
- O usuario deve poder utilizar seu nome, email e senha

**RN****Regra de negocio**
- O usuario não pode alterar seu email para um email ja utilizado;
- Para atualizar sua senha o usuario deve informar a senha antiga;
- Para atualizar a senha o usuário precisa confirmar a senha;

# Painel do prestador
**RF****Requisitos funcionais**
- o usuario deve poder listar seus agendamentos de um dia especifico
- o prestador deve receber uma notificação sempre que houver um novo agendamentop
- o prestador deve poder visulizar as notificações não lidas

**RNF****Requisitos não funcionais**
- os agendamentos do prestador no dia devem ser armazenados em cache;
- as notificações do prestador devem ser armazenadas no MongoDB; (banco não relacional)
- as notificações do prestador devem ser enviadas em tempo real utilizando socket.io
- 

**RN****Regra de negocio**
-A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de serviços
**RF****Requisitos funcionais**
- O usuario deve poder listar todos prestadores de serviços cadastrados;
- o usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
- O usuario deve poder listar horários disponiveis de um dia especifico de um prestador
- o usuario deve poder realizar um novo agendamento com um prestador

**RNF****Requisitos não funcionais**
- A listagem de prestadores deve ser armazenada em cache;


**RN****Regra de negocio**
- cada agendamentos deve durar 1h extamanete
- os agendamentos devem estar entre 8h Às 18h (Primeiro as 8h, ultimo as 17h)
- o usuário não pode agendar em um horario ja ocupado
- o usuario não pode agendar em um horario que ja passou
- o usuario nao pode agendar serviços consigo mesmo;