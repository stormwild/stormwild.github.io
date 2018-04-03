---
title: Docker Notes
permalink: docker-notes
excerpt: Notes on Docker
---

Docker Run commands

```
docker run -d --name web -p 8080:8080 namespace/imagename
```

`-d` means run in the background

```
docker run -it --name temp ubuntu:lastest /bin/bash
```

Allows shell access to the container

Container exits 

```
Ctrl+P Q

# stops all running containers
docker stop $(docker ps -aq)
```

Docker run is a client command that communicates with the docker daemon.

```
docker run -d -it

# removes images from docker host
docker rmi

docker ps
docker stop
docker rm
```

Docker 1.12

## Swarm

True Native clustering

A cluster = a swarm

Docker engines in a swarm run in swarm mode

Swarm mode is optional

Manager Nodes

Worker Nodes

High Availability - recommended 3 or 5
Only one leader
Odd number

Reliable networks

The Raft Consensus Algorithm

Distributed consesus

More manager nodes greater than 5 makes consensus take longer

Cannot do services without swarm

docker service create --name web-fe --replicas 5

Task 
- atomic unit of work assigned to worker nodes
- ~container

### Buiding a Swarm

```
docker swarm init --advertise-addr 172.31.12.161:2377 --listen-addr 172.31.12.161:2377
```

2377 swarm port

overlay network

docker service update --replicas 10 psight1

docker node ls

Adding new nodes to the swarm does not automatically rebalance tasks

docker node ps nodeip

## Rolling Updates

docker service update --image nigel/tu-demo:v2 --update-parallelism 2 --update-delay 10s servicename

docker service ps

## Stack and DABs Distributed Application Bundles

Stack file that defines dependencies




























