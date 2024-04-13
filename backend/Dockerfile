FROM node:20

RUN npm install pm2@latest -g

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to run your application
CMD ["node", "app.js"]