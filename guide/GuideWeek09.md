## Bước 1: Tạo docker network

```
docker network create devops
```

## Bước 2: Run docker container MySQL với hostname

Create db volume to store data:

```
docker volume create --driver local devops-db-volume
```


MacOS / Linux:

```
docker run -d --name devops-db -p 3306:3306 \
    --hostname db.devops.tdc.edu.vn \
    --network devops \
    -v devops-db-volume:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD="root12345" \
    -e MYSQL_USER="admin" \
    -e MYSQL_PASSWORD="admin" \
    -e MYSQL_DATABASE="tdc-devops" \
    mysql:8.0
```

Windows CMD:

```
docker run -d --name devops-db -p 3306:3306 ^
    --hostname db.devops.tdc.edu.vn ^
    --network devops ^
    -v devops-db-volume:/var/lib/mysql ^
    -e MYSQL_ROOT_PASSWORD="root12345" ^
    -e MYSQL_USER="admin" ^
    -e MYSQL_PASSWORD="admin" ^
    -e MYSQL_DATABASE="tdc-devops" ^
    mysql:8.0
```

Windows Powershell:

```
docker run -d --name devops-db -p 3306:3306 `
    --hostname db.devops.tdc.edu.vn `
    --network devops `
    -v devops-db-volume:/var/lib/mysql `
    -e MYSQL_ROOT_PASSWORD="root12345" `
    -e MYSQL_USER="admin" `
    -e MYSQL_PASSWORD="admin" `
    -e MYSQL_DATABASE="tdc-devops" `
    mysql:8.0
```

Create db table and insert data as GuideWeek08.md

## Bước 3: Run docker container backend connect vào DB thông qua hostname

#### Run docker với lệnh sau:

MacOS / Linux:

```
docker run -d --name devops-backend -p 8080:3000 \
    --network devops \
    -e PORT="3000" \
    -e DB_HOST="db.devops.tdc.edu.vn" \
    -e DB_PORT="3306" \
    -e DB_USER="admin" \
    -e DB_PASS="admin" \
    -e DB_NAME="tdc-devops" \
    hoangdntdc/devops-demo-backend:1.1
```

Windows CMD:

```
docker run -d --name devops-backend -p 8080:3000 ^
    --network devops ^
    -e PORT="3000" ^
    -e DB_HOST="db.devops.tdc.edu.vn" ^
    -e DB_PORT="3306" ^
    -e DB_USER="admin" ^
    -e DB_PASS="admin" ^
    -e DB_NAME="tdc-devops" ^
    hoangdntdc/devops-demo-backend:1.1
```

Windows Powershell:

```
docker run -d --name devops-backend -p 8080:3000 `
    --network devops `
    -e PORT="3000" `
    -e DB_HOST="db.devops.tdc.edu.vn" `
    -e DB_PORT="3306" `
    -e DB_USER="admin" `
    -e DB_PASS="admin" `
    -e DB_NAME="tdc-devops" `
    hoangdntdc/devops-demo-backend:1.1
```


