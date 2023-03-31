(https://tse1.mm.bing.net/th?id=OIP.Tf4BFI6846neirVSebC0vAHaEi&pid=Api&P=0)

# NodeJS for test

#### 1. Project Description

- CRUD using nodeJS & expressJS stands for Create, Read, Update, and Delete. These are the four basic operations in data management on a database system. Create is used to add new data, Read is used to retrieve data, Update is used to modify data, and Delete is used to remove data.

- Node.js and Express are chosen because of their fast and responsive performance due to the use of asynchronous programming model, as well as their good scalability for web application development.

#### 2. Instructions for running the application

- Install dependencies by running npm install.
  Create a database in MySQL with the name "testNodeJS".
  Connect the database to the application by modifying the configuration file in the config/dbPool.js folder.
  Run the application using the command npm start / nodemon app.js.

* | Method | application using Postman or Insomnia |
  | ------ | ------------------------------------- |
  | GET    | http://localhost:4000/                |
  | POST   | http://localhost:4000/add             |
  | GET    | http://localhost:4000/tasks/:id       |
  | PATCH  | http://localhost:4000/tasks/:id       |
  | DELETE | http://localhost:4000/tasks/:id       |
