docker build -t hoangdntdc/devops-demo-backend .

docker run -d --restart=always --name=devops-backend -p 8080:3000 hoangdntdc/devops-demo-backend