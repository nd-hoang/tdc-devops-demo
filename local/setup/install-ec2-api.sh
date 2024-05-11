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

# Run docker container API
sudo docker run -d --name devops-backend -p 0.0.0.0:80:3000 \
    -e PORT="3000" \
    -e DB_HOST="172.31.9.24" \
    -e DB_PORT="3306" \
    -e DB_USER="admin" \
    -e DB_PASS="admin" \
    -e DB_NAME="tdc-devops" \
    hoangdntdc/devops-demo-backend:1.1