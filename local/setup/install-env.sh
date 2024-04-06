#!/bin/sh

# installs NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# export nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# download and install Node.js
nvm install 20
# install pm2
npm install pm2@latest -g
# run backend
cd /vagrant/backend
pm2 start app.js

sudo apt update
sudo apt install -y nginx
sudo cp /vagrant/default /etc/nginx/sites-enabled/default
sudo nginx -s reload
