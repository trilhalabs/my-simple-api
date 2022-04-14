# 🚀 My Simple Api

Simple API to demonstrate basics Docker and AWS ECS functions.

Based on [wisdom image](https://hub.docker.com/r/pauloclouddev/wisdom-img)

## 🎯 What Does it Do?

This container starts a webserver on port 80, and it has three endpoints:

- `/` route that shows a simple `It Works.`
- `/greeting` route that shows a simple `Hello friend!`
- `/wisdom` route that shows a random quote (feed from a list of quotes).

***

## 🛠 Usage

To start this container, map local port 80 into the container.

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
***

### 📌 Testing locally

- Depends on run the image

```shell

http://localhost
http://localhost/greeting
http://localhost/wisdom

#stopping the container
docker stop my-simple-api

```

***

### 🔑 Creating Identity Access Management (IAM - Role)

#### EC2InstanceRole  

> Allows EC2 instances in an ECS cluster to access ECS.
> Used primarily by the container agent running on the EC2 box(es)

- open AWS mgm console
- go to service IAM
- click on _Roles_ in left navigation bar
- click "_create Role_"
- click on service "_Elastic Container Service_"
- scroll down a bit to section "_Select your use case_"
- click "_EC2 Role for Elastic Container Service_"
- click "_next Permissions_" , "_next Tags_", "_next Review"_
- provide "_ecsInstanceRole_" as Role name
- click on "_create_"

#### ECSRole  

> Allows ECS to create and manage AWS resources on your behalf

- open AWS mgm console
- go to service IAM
- click on _Roles_ in left navigation bar
- click "_create Role_"
- click on service "_Elastic Container Service_"
- scroll down a bit to section "_Select your use case_"
- click "_EC2 Role for Elastic Container Service_"
- click "_next Permissions_" , "_next Tags_", "_next Review"_
- provide "_ecsRole_" as Role name
- click on "_create_"

#### ECSTaskExecutionRole

> Allows ECS tasks to call AWS services on your behalf.

- open AWS mgm console
- go to service IAM
- click on _Roles_ in left navigation bar
- click "_create Role_"
- click on service "_Elastic Container Service_"
- scroll down a bit to section "_Select your use case_"
- click "_EC2 Role for Elastic Container Service_"
- click "_next Permissions_" , "_next Tags_", "_next Review"_
- provide "_ecsTaskExecutionRole_" as Role name
- click on "_create_"

#### ECSAutoscalingRole

> Allows Auto Scaling to access and update ECS services

- open AWS mgm console
- go to service IAM
- click on _Roles_ in left navigation bar
- click "_create Role_"
- click on service "_Elastic Container Service_"
- scroll down a bit to section "_Select your use case_"
- click "_EC2 Role for Elastic Container Service_"
- click "_next Permissions_" , "_next Tags_", "_next Review"_
- provide "_ecsAutoscalingRole_" as Role name
- click on "_create_"

***

### 🛠 Creating core infrastructure setup

- VPC
- 2 subnets in 2 different AZs
- Internet Gateway
- according routing tables

⚙ Command:  

```bash
aws cloudformation create-stack --capabilities CAPABILITY_IAM --stack-name ecs-core-infrastructure --template-body file://./core-infrastructure-setup.yml
```

***
