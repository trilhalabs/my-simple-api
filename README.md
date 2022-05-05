# 🚀 My Simple Api

Demonstração básica da implementação de uma API usando Docker, AWS ECS e Infra-as-a-Code (AWS Cloudformation).
*Simple API to demonstrate basics Docker, AWS ECS functions and Infra-as-a-code (AWS Cloudformation).*

`Action`  | `Responsable`  | `Date`
------------- | ------------- | -------------
Initial version  | Alexandre Sueiro  | 2022-04-08
Adjusting infrastructure setup  | Alexandre Sueiro  | 2022-04-22

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
Diretório contendo os scripts cloudformation usados no projeto. Eles foram criados separadamente para facilitar a didática e entendimento e estão na sequência que devem ser executados
*Directory containing the cloudformation scripts used in the project. They were created separately to facilitate didactics and understanding and are in the sequence that they must be performed.*

- **00-trilhalabs-setup-vpc.yaml**: cria uma VPC, subnets, internet gateway, e outros. Ambiente de desenvolvimento e produção. / *it creates a VPC, subnets, internet gateway, and others. Development and production environment.*

- **01-trilhalabs-setup-security-groups.yaml**: cria os grupos seguros associados a VPC. / *it creates the security groups associated with the VPC.*

- **02-trilhalabs-setup-ec2-ecs.yaml**: cria o cluster ECS contendo as instâncias para rodar o docker container. / *it creates the ECS cluster containing the instances to run the docker container.*

***

Sequence Diagram

```flow
st=>start: Github
st2=>start: Setup infra
op=>operation: clone the project > git@github.com:trilhalabs/my-simple-api.git
op2=>operation: Open the directory > /cf-scripts
op3=>operation: Execute the setup scripts
cond=>condition: Success?
e=>end: Next configurations (working)

st->op->st2->op2->op3->cond
cond(yes)->e
cond(no)->op3
```

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

#### Creating a VPC

- 1 VPC
- 2 public subnets (default dev) Min 1 - Max 3
- 2 AZs (default dev) Min 1 - Max 3
- 1 internet gateway
- 1 default route table for public subnet
- 1 to 3 private subnets if prod environment (based on NumberOfAZs)
- 1 default route table for public and private subnet (prod only)
- Min 1 - Max 3 Natgateway if prod environment ＄*

**＄** o simbolo indica que provavelmente haverá cobranças devido a infra montada / **＄** the symbol represents that there will probably be charges due to the infra criated.

- **Principais comandos / Main commands**

  - **aws cloudformation validate-template** => verifica se a estrutura do arquivos está bem formatada / checks if the file structure is well formatted

  - **aws cloudformation create-stack** => criar a stackde execução no servição AWS Cloudformation / create the execution stack in the AWS Cloudformation service

  - **aws cloudformation update-stack** => atualiza a stack se for necessário nova execução / update the stack if new execution is needed

  - **aws cloudformation delete-stack** => remove a stack / delete the stack

⚙ Command

```shell
cd cf-scripts/

#VPC padrao para DEV / Default VPC for DEV 
aws-vault exec admlab -- aws cloudformation validate-template --template-body file://00-trilhalabs-setup-vpc.yaml
aws-vault exec admlab -- aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name trilhalabs-myapi-vpc --template-body file://00-trilhalabs-setup-.yaml

#=======DEV - Executando stack com parametros para 3 subnets em dev" / Running stack with parameters for 3 subnets in dev"
aws-vault exec admlab -- aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name trilhalabs-myapi-vpc--template-body file://00-trilhalabs-setup-vpc.yaml --parameters ParameterKey=NumberOfAZs,ParameterValue=3

#=======PROD ＄- Executando stack para ambiente producao / Running stack for production environment
aws-vault exec admlab -- aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name trilhalabs-myapi-prod-vpc --template-body file://00-trilhalabs-setup-vpc.yaml --parameters ParameterKey=EnvType,ParameterValue=prod ParameterKey=NumberOfAZs,ParameterValue=3

```

#### Creating Security Groups

- **Criando grupos de segurança e associando a VPC gerada** / **Creating security groups and binding the generated VPC**

  - Abra o arquivo *01-trilhalabs-setup-security-groups.yaml* e veja as referências usadas para associar a VPC criada anteriormente. É usado o *Export Value* gerando em *Outputs* na Stack do Cloudformation / Open the *01-trilhalabs-setup-security-groups.yaml* file and see the references used to associate the VPC created earlier. *Export Value* is used generating in *Outputs* in the Cloudformation Stack.

    - VpcId:
        Fn::ImportValue: !Sub ${EnvironmentName}-${EnvType}-VPC

⚙ Command

```shell
cd cf-scripts/

#Security Groups
aws-vault exec admlab -- aws cloudformation validate-template --template-body file://01-trilhalabs-setup-security-groups.yaml
aws-vault exec admlab -- aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name trilhalabs-setup-security-groups-dev --template-body file://01-trilhalabs-setup-security-groups.yaml

#Caso queira associar a VPC de  / If you want to associate the product VPC
aws-vault exec admlab -- aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name trilhalabs-setup-security-groups-prod --template-body file://01-trilhalabs-setup-security-groups.yaml  --parameters ParameterKey=EnvType,ParameterValue=prod ParameterKey=VpcID,ParameterValue=vpc-xxx

```

***

#### 🔑 Creating Identity Access Management (IAM - Role)

> Criação de *Roles* para permitir instancias EC2 existentes no *Cluster*, acessarem o *ECS - Elastic Conatiner Service*. As *roles* são usadas pelo agente do container rodando nos *nodes* EC2
>> Allows EC2 instances in an ECS cluster to access ECS. Used primarily by the container agent running on the EC2 box(es)

##### EC2InstanceRole  

- open AWS mgm console
- go to service IAM
- click on *Roles* in left navigation bar
- click "*create Role*"
- click on service "*Elastic Container Service*"
- click "*EC2 Role for Elastic Container Service*"
- click "*next*" , "*next Permissions*", "*next Name, review, and create*"
- provide "*ecsInstanceRole*" as Role name
- click on "*create*"

##### ECSRole  

> Allows ECS to create and manage AWS resources on your behalf

- open AWS mgm console
- go to service IAM
- click on *Roles* in left navigation bar
- click "*create Role*"
- click on service "*Elastic Container Service*"
- click "*Elastic Container Service*"
- click "*next*" , "*next Permissions*", "*next Name, review, and create*"
- provide "*ecsRole*" as Role name
- click on "*create role*"

##### ECSTaskExecutionRole

> Allows ECS tasks to call AWS services on your behalf.

- open AWS mgm console
- go to service IAM
- click on *Roles* in left navigation bar
- click "*create Role*"
- click on service "*Elastic Container Service*"
- click "*Elastic Container Service Task*"
- click "*next*" , "*next Permissions*", "*next Name, review, and create*"
- provide "*ecsTaskExecutionRole*" as Role name
- click on "*create*"

##### ECSAutoscalingRole

> Allows Auto Scaling to access and update ECS services

- open AWS mgm console
- go to service IAM
- click on *Roles* in left navigation bar
- click "*create Role*"
- click on service "*Elastic Container Service*"
- click "*Elastic Container Service Autoscale*"
- click "*next*" , "*next Permissions*", "*next Name, review, and create*"
- provide "*ecsAutoscalingRole*" as Role name
- click on "*create*"

#### Creating ECS Cluster: EC2

> Instancia EC2 (Node) para cluster ECS / ECS cluster launchtype EC2 (Node).

- Atente para substituir "ssh-key" por sua própria chave de segurança no comando de execução da stack / *Be careful to replace "ssh-key" with your own security key in the stack execution command*

⚙ Command

```shell
cd cf-scripts/

aws-vault exec admlab -- aws cloudformation validate-template --template-body file://02-trilhalabs-setup-ec2-ecs.yaml

aws-vault exec admlab -- aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name trilhalabs-myapi-ecs-ec2 --template-body file://02-trilhalabs-setuters ParameterKey=KeyName,ParameterValue=<ssh-key>

#caso precise atualizar a stack, exemplo do update / if you need to update the stack, example of update command
aws-vault exec admlab -- aws cloudformation update-stack --stack-name trilhalabs-myapi-ecs-ec2 --template-body file://02-trilhalabs-setup-ec2-ecs.yaml --parameters PameterValue=<ssh-key>

```

***

## 📘 Capitulo 3: ... / Chapter 3: ...

***

## 📘 Capitulo 4: Limpeza dos ambientes / Chapter 4: Cleaning of enviroments

🧹 Comandos para limpeza dos ambientes e evitar eventuais cobranças ($) desnecessárias/ Commands for cleaning environments and avoid unnecessary charges ($)

```shell
#Delete Stacks
#DEV
aws-vault exec admlab -- aws cloudformation delete-stack --stack-name trilhalabs-myapi-ecs-ec2
aws-vault exec admlab -- aws cloudformation delete-stack --stack-name trilhalabs-myapi-sg
aws-vault exec admlab -- aws cloudformation delete-stack --stack-name trilhalabs-myapi-vpc


#PROD
aws-vault exec admlab -- aws cloudformation delete-stack --stack-name trilhalabs-myapi-prod-ecs-ec2
aws-vault exec admlab -- aws cloudformation delete-stack --stack-name trilhalabs-myapi-prod-sg
aws-vault exec admlab -- aws cloudformation delete-stack --stack-name trilhalabs-myapi-prod-vpc

```
