### Install the dependencies

Next, From the project folder, Install the dependencies:

    npm i

### Start the server

    npm start

This will launch the node server on port 9000.

### Register

To register new user, Go to http://localhost:9000/api/users route, In the body of the requst you need to give name, email and password fields and send post request.Then it will validate the user data, if everything ok then it will send response back with user details and in the headers tab it will send jsonwebtoken.

### Login

To login existing user, Go to http://localhost:9000/api/auth route, In the body of the requst you need to give email and password fields and send post request.Then it will validate the user data, if everything ok then it will send response back with user details and in the headers tab it will send jsonwebtoken.

### Create task

In order to create task you need to register or login first. After successful registration or login, Now you can go to the http://localhost:9000/api/todos route, In headers tab put jsonwebtoken you received while registering or login and then in body of the request give title field to create task, it will send response back with newly created task.

### Update task

In order to update task you can go to the http://localhost:9000/api/todos/taskId route, In headers tab put jsonwebtoken you received while registering or login and then in body of the request give title, completed field to update task, it will send response back with updated task. Remember in taskId place you need to give valid mongoid.

### Delete task

In order to delete task you can go to the http://localhost:9000/api/todos/taskId route, In headers tab put jsonwebtoken you received while registering or login. it will send response back with deleted task. Remember in taskId place you need to give valid mongoid.

### Get current user tasks

In order to get tasks of current user you can go to the http://localhost:9000/api/todos/mine route, In headers tab put jsonwebtoken you received while registering or login. it will send response back with all tasks of cutrrent user.

### Get All Tasks

In order to get all users tasks, You should be an admin user. to make user as admin
go to the mongodb tasks database inside that database go to user collection and set isAdmin property to true for one of user. after that login again and put jsonwebtoken in headers tab and get request to http://localhost:9000/api/todos, now you get all tasks of all users.
