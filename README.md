# Employees-Company-Server

### Deploy

- Build productive image
`docker build -f ./deploy/Dockerfile -t employee .`

- Run image docker compose
`docker-compose -f ./deploy/docker-compose.yml up -d`

- Create service docker swarm
`docker stack deploy -c ./deploy/stack.yml app`

- Network
`docker network create --driver overlay proxy`