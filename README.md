# 🚀 My Simple Api

Demonstração básica da implementação de uma API usando Docker, AWS ECS e Infra-as-a-Code (AWS Cloudformation).
*Simple API to demonstrate basics Docker, AWS ECS functions and Infra-as-a-code (AWS Cloudformation).*

`Action`  | `Responsable`  | `Date`
------------- | ------------- | -------------
Initial version  | Alexandre Sueiro  | 2022-04-08
Adjusting infrastructure setup  | Alexandre Sueiro  | 2022-04-22
Segregating IaaS code for another project (my-simple-api-iaas)  | Alexandre Sueiro  | 2022-05-25

## 📢 Informação / *Information*

> Busquei ser democrático e descrever toda a documentação, tanto na minha língua mãe, o português do Brasil, quanto numa lingua mundial, o Inglês. Então, espero que me perdoem por eventuais erros de tradução, e agradeço profundamente por feedbacks construtivos e evolutivos.
>> *I tried to be democratic and describe all the documentation, both in my mother tongue, Brazilian Portuguese, and in a world language, English. So, I hope you forgive me for any translation errors, and I thank you deeply for constructive and evolving feedback.*

## 🎯 Qual o objetivo / *What Does it Do?*

> O objetivo é o aprendizado constante, aplicando na prática os exemplos.
> Neste documento será visto conteúdo que poderia ser desconsiderado, como a representação do fluxo mais abaix, porém a ideia é gerar informações "bacanas" que poderão ser úteis em outros momentos também. Aprendizado constante... Aproveite!
>> *The objective is constant learning, applying the examples in practice. In this document itself, there will be content that could not be applied, such as the representation of the flow below, but the idea is to generate "cool" information that may be useful at other times as well. Constant learning... Enjoy!*

## A Estrutura do projeto

### Conteúdo / *Content*

**Dockerfile**
O container inicia um webserver simples na porta 80, com 3 endpoints:
*This container starts a webserver on port 80, and it has three endpoints:*

- `/` route that shows a simple `It Works.`
- `/greeting` route that shows a simple `Hello friend!`
- `/wisdom` route that shows a random quote (feed from a list of quotes).

Inspirado em / *Inspired by* [wisdom image](https://hub.docker.com/r/pauloclouddev/wisdom-img)

**/cf-scripts**
A infra como códido (IaaC) foi transferida para um projeto específico (my-simple-api-iass)
*Infra as a Code was tranferred to a specific project (my-simple-api-iaas)*

***

### 💻 Exemplo de terminais para execução dos comandos locais / *Example of terminals for executing local commands*

- [Gitbash](https://git-scm.com/downloads)
- [MobaXterm](https://mobaxterm.mobatek.net/download.html)

***

## 📘 Capitulo 1: Ambiente Local / Chapter 1: Local enviroment

### 🛠 Usage

Puxando o projeto do GITHUB, usando chave de segurança / *Cloning the project using security key*

⚙ Command

```shell
eval $(ssh-agent -s)
ssh-add ~/.ssh/your-rsa-key
git clone git@github.com:trilhalabs/my-simple-api.git

cd my-simple-api/
ls -la

#something like that
total 55
drwxr-xr-x 1 xxxxx 197609     0 Apr 29 06:19 .
drwxr-xr-x 1 xxxxx 197609     0 Apr 29 06:18 ..
drwxr-xr-x 1 xxxxx 197609     0 Apr 29 06:19 .git
-rw-r--r-- 1 xxxxx 197609  1714 Apr 29 06:19 .gitignore
-rw-r--r-- 1 xxxxx 197609   160 Apr 29 06:19 Dockerfile
-rw-r--r-- 1 xxxxx 197609  3588 Apr 29 06:19 README.md
-rw-r--r-- 1 xxxxx 197609   537 Apr 29 06:19 app.js
drwxr-xr-x 1 xxxxx 197609     0 Apr 29 06:19 cfn
-rw-r--r-- 1 xxxxx 197609 32807 Apr 29 06:19 package-lock.json
-rw-r--r-- 1 xxxxx 197609   373 Apr 29 06:19 package.json

```

Teste a imagem e salve em seu dockerhub. Inicie o container localmente na porta 80. / *Test the docker image and save in dockerhub. To start this container, map local port 80 into the container.*

⚙ Command

```shell
# build the image
sudo docker build -t <your-dockerhub-name>/<your-docker-repo-name> .

# test the container locally
sudo docker run <your-dockerhub-name>/<your-docker-repo-name>
sudo docker run -d -p 80:80 --name my-simple-api <your-dockerhub-name>/my-simple-api

# push it to your Docker repository
sudo docker push <your-dockerhub-name>/<your-docker-repo-name> 
```

📌 Testing locally

```shell

http://localhost
http://localhost/greeting
http://localhost/wisdom

#stopping the container
docker stop my-simple-api

```

***

## 📘 Capitulo 2: Infraestrutura na Cloud / Chapter 2: Cloud infrastructure

### ☁ Criando infraestrutura como código / Creating infrastructure-as-a-code

Por premissa, estou partindo que você **já possua uma conta na AWS e ao menos um usuário com chaves de acesso via linha de comando** (Access Key e Secret Access Key).

Para executar os comandos de integração com a AWS, usei o [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) e para gerenciar as chaves de acesso, utilizei o [aws-vault](https://github.com/99designs/aws-vault).
Basicamente, simulo a criação de 2 ambientes diferentes, que dependendo dos parâmetros pode ser DEV ou PROD (＄). Por padrão, o ambiente gerado, simula DEV.
Caso não queira utilizar o **aws-vault** para gerenciar as chaves de sessão, execute os comandos abaixo sem utilizar a primeira parte **"aws-vault exec admlab --"**

*As a premise, I'm assuming you **already have an AWS account and at least one user with command-line access keys** (Access Key and Secret Access Key).*
*To run AWS integration commands, I used [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and to manage the secrets, I used  [aws-vault](https://github.com/99designs/aws-vault).*
*Basically, I simulate the creation of 2 different environments, which depending on the parameters can be DEV or PROD (＄). By default, the generated environment simulates DEV.*
*If you don't want to use **aws-vault** to manage session keys, run the commands below without using the first part **"aws-vault exec admlab --"***

***

## 📘 Capitulo 3: ... / Chapter 3

***

## 📘 Capitulo 4: Limpeza dos ambientes / Chapter 4: Cleaning of enviroments

🧹 Comandos para limpeza dos ambientes e evitar eventuais cobranças ($) desnecessárias/ Commands for cleaning environments and avoid unnecessary charges ($)

```shell
#commands
```
