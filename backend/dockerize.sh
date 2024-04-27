docker build -t hoangdntdc/devops-demo-backend .

docker run -d --restart=always --name=devops-backend -p 8080:3000 hoangdntdc/devops-demo-backend

docker login -u hoangdntdc

docker push hoangdntdc/devops-demo-backend:latest

docker image tag hoangdntdc/devops-demo-backend hoangdntdc/devops-demo-backend:1.0

docker push hoangdntdc/devops-demo-backend:1.0

# List running containers
docker ps

# List all containers
docker ps -a

# Lifecycle container
docker stop devops-backend

docker start devops-backend

docker rm -f devops-backend

# Clean up disk
docker image prune -a

# Show log of a container
docker logs devops-backend

# Run MySQL server
docker run --name devops-db -e MYSQL_ROOT_PASSWORD="root12345" -e MYSQL_USER="admin" -e MYSQL_PASSWORD="admin" -e MYSQL_DATABASE="tdc-devops" -p 3306:3306 -d mysql:8.0


# 1. Dựng database docker mysql trên máy local (dev)
# 2. Tạo Table banner + khởi tạo dữ liệu các banner cho ứng dụng
# 3. Project backend kết nối CSDL (Nhóm research library nodejs để thao tác dữ liệu với MySQL Server)
# 4. Query table banner để trả dữ liệu về qua API /banners
# 5. Tạo docker image backend kết nối DB docker container
# Hint:
# - Biến môi trường cho project backend để dùng CONNECTION STRING kết nối MySQL
# - Chạy container devops-db trên máy local, lấy IP của container
# - Chạy container devops-demo-backend trên máy local, với biến môi trường DB_CONNECTION tạo bới IP của container devops-db



