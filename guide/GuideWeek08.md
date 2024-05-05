# Kết nối Database

## Bước 1: Run docker container MySQL

MacOS / Linux:

```
docker run -d --name devops-db -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD="root12345" \
    -e MYSQL_USER="admin" \
    -e MYSQL_PASSWORD="admin" \
    -e MYSQL_DATABASE="tdc-devops" \
    mysql:8.0
```

Windows CMD:

```
docker run -d --name devops-db -p 3306:3306 ^
    -e MYSQL_ROOT_PASSWORD="root12345" ^
    -e MYSQL_USER="admin" ^
    -e MYSQL_PASSWORD="admin" ^
    -e MYSQL_DATABASE="tdc-devops" ^
    mysql:8.0
```

Windows Powershell:

```
docker run -d --name devops-db -p 3306:3306 `
    -e MYSQL_ROOT_PASSWORD="root12345" `
    -e MYSQL_USER="admin" `
    -e MYSQL_PASSWORD="admin" `
    -e MYSQL_DATABASE="tdc-devops" `
    mysql:8.0
```

## Bước 2: Khởi tạo DB MySQL

### Kết nối vào database với thông tin sau

- Host: 127.0.0.1
- Port: 3306 (Port được chỉ định ở -p khi run docker devops-db ở trên)
- User: admin
- Pass: admin
- Database: tdc-devops

Có thể dùng lệnh docker sau để vào shell của container devops-db:
```
docker exec -it devops-db sh
```

Kết quả sẽ vào được command line của máy devops-db như sau:

sh-4.4#


Kết nối database bằng mysql client trên máy container:
```
mysql -u admin -p
```

Kết quả là vào mysql server console:

mysql>

### Tạo Table banners

Thực hiện câu lệnh SQL:

```
USE `tdc-devops`;
```

Thực hiện câu lệnh SQL:

```
CREATE TABLE banners (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, image VARCHAR(512)); 
```

### Insert dữ liệu

Thực hiện câu lệnh SQL:

```
INSERT INTO banners (title, description, image) VALUES 
('Makeup <br />Kit 1', 'Description for Makeup Kit 1', '/images/banner-img.png'),
('Makeup <br />Kit 2', 'Description for Makeup Kit 2', '/images/img-1.png'),
('Makeup <br />Kit 3', 'Description for Makeup Kit 3', '/images/banner-img.png');
```

## Bước 3: Kết nối CSDL từ project Backend

### Vào thư mục backend

Mở CMD / Terminal từ project root thực hiện lệnh sau:

```
cd ./backend
```

### Cài đặt thư viện mysql2

```
npm install mysql2
```

### Import thư viện vào code để sử dụng 

Trong app.js

```
const db = require('mysql2');
```

### Tạo kết nối đến DB

```
const connection = db.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: 'admin',
  database: 'tdc-devops'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!")
});
```

### Chỉnh sửa phương thức api GET /banners để lấy dữ liệu từ DB 

```
app.get('/banners', (req, res) => {
    connection.query('SELECT * FROM banners', (err, rows) => {
        if (err) throw err;
        // Mapping dữ liệu trả về từ DB table => Response model
        const banners = rows.map(row => {
            return {
                title: row.title,
                description: row.description,
                image: row.image
            };
        });
        res.send(banners);
    });
});
```

### Kết quả

File hoàn chỉnh sau khi chỉnh sửa có nội dung

```
const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const app = express();
const db = require('mysql2');
const port = process.env.PORT || 3000;

const CORS_WHITELIST = [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:3006",
];

const corsOptions = {
    // origin: "*", // Accept all origins => Development
    origin: CORS_WHITELIST, // Accept origins in whitelist => Production
    optionsSuccessStatus: 200
};

const connection = db.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: 'admin',
  database: 'tdc-devops'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!")
});

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to my API"
    });
});

app.get('/health', (req, res) => {
    res.send({
        status: "OK",
        message: "And how are you?"
    });
});

app.get('/banners', (req, res) => {
    connection.query('SELECT * FROM banners', (err, rows) => {
        if (err) throw err;
        // Mapping dữ liệu trả về từ DB table => Response model
        const banners = rows.map(row => {
            return {
                title: row.title,
                description: row.description,
                image: row.image
            };
        });
        res.send(banners);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
```

## Bước 4: Dùng biến môi trường để cấu hình động thông tin kết nối DB

### Tham số hóa cấu hình từ biến môi trường

Tạo các tham số từ biến môi trường

```
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '3306';
const dbUser = process.env.DB_USER || 'admin';
const dbPass = process.env.DB_PASS || 'admin';
const dbName = process.env.DB_NAME || 'tdc-devops';
```

Thay thế tham số vào lệnh tạo kết nối

```
const connection = db.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName
});
```

## Bước 5: Chạy docker container backend connect vào DB

### Vào thư mục backend

Mở CMD / Terminal từ project root thực hiện lệnh sau:

```
cd ./backend
```

### Build và Push docker

```
docker build -t hoangdntdc/devops-demo-backend .

docker login -u hoangdntdc

docker push hoangdntdc/devops-demo-backend:latest

docker image tag hoangdntdc/devops-demo-backend hoangdntdc/devops-demo-backend:1.1

docker push hoangdntdc/devops-demo-backend:1.1
```

### Lấy thông tin IP của docker container devops-db

Để lấy thông tin ip của 1 docker container dùng lệnh sau:

```
docker inspect devops-db
```

Tìm từ khóa IPAddress trong phần Networks

### Run docker container backend connect vào DB

Giả sử IP của máy devops-db là 172.17.0.2

#### Run docker với lệnh sau:

MacOS / Linux:

```
docker run -d --name devops-backend -p 8080:3000 \
    -e PORT="3000" \
    -e DB_HOST="172.17.0.2" \
    -e DB_PORT="3306" \
    -e DB_USER="admin" \
    -e DB_PASS="admin" \
    -e DB_NAME="tdc-devops" \
    hoangdntdc/devops-demo-backend:1.1
```

Windows CMD:

```
docker run -d --name devops-backend -p 8080:3000 ^
    -e PORT="3000" ^
    -e DB_HOST="172.17.0.2" ^
    -e DB_PORT="3306" ^
    -e DB_USER="admin" ^
    -e DB_PASS="admin" ^
    -e DB_NAME="tdc-devops" ^
    hoangdntdc/devops-demo-backend:1.1
```

Windows Powershell:

```
docker run -d --name devops-backend -p 8080:3000 `
    -e PORT="3000" `
    -e DB_HOST="172.17.0.2" `
    -e DB_PORT="3306" `
    -e DB_USER="admin" `
    -e DB_PASS="admin" `
    -e DB_NAME="tdc-devops" `
    hoangdntdc/devops-demo-backend:1.1
```