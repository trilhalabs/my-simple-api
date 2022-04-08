# My Simple Api

Simple API to demonstrate basics Docker and AWS ECS functions.

Based on [wisdom image](https://hub.docker.com/r/pauloclouddev/wisdom-img)

## What Does it Do?

This container starts a webserver on port 80, and it has three endpoints:

- `/` route that shows a simple `It Works.`
- `/greeting` route that shows a simple `Hello friend!`
- `/wisdom` route that shows a random quote (feed from a list of quotes).

## Usage

To start this container, map local port 80 into the container.

## Command

```shell
# build the image
sudo docker build -t <your-dockerhub-name>/<your-docker-repo-name> .

# test the container locally
sudo docker run <your-dockerhub-name>/<your-docker-repo-name> .

# push it to your Docker repository
sudo docker push <your-dockerhub-name>/<your-docker-repo-name> 
```
