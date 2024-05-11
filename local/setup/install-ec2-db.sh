#!/bin/sh

## Serving backend via Docker
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Run docker container DB
docker volume create --driver local devops-db-volume

docker run -d --name devops-db -p 3306:3306 \
    -v devops-db-volume:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD="root12345" \
    -e MYSQL_USER="admin" \
    -e MYSQL_PASSWORD="admin" \
    -e MYSQL_DATABASE="tdc-devops" \
    mysql:8.0
