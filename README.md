![KoallabLogoDark](https://github.com/UOA-CS732-SE750-Students-2023/project-group-khaki-koalas/assets/47189647/15c358d8-abd6-4f53-8664-fd95020f9626)


Koallab is a collaboration tools, targeted at university students, that allows them to keep track of their projects and groups much better. Key features include:
- A group page where you can see what other projects and assignments your group is working on, with it's progress, so you can schedule your meetings and delegate current tasks accordingly
- A project page where you can see all the tasks for that project, move them around to mark them as either to-do, in progress or completed. Additional you can share your resources here as well, that will be accessible to the whole group.

## Required downloads
To run this on your device, you will require to have:
- Node: Refer to the official website: https://nodejs.org/
- MongoDB: Download the server program for Mongodb: https://www.mongodb.com/try/download/community. Download the Monodb client: https://www.mongodb.com/try/download/compass


## Configure the environment

### Install Nodejs

Refer to the official website: https://nodejs.org/

### Download Mongodb

Download the server program for Mongodb: https://www.mongodb.com/try/download/community

Download the Monodb client: https://www.mongodb.com/try/download/compass

### Start Mongodb

Go to the directory of the downloaded Mongodb and enter the bin subdirectory, then execute the following command:
```sh
./mongod --dbpath ./db
```

the "./db" is your database file "./db" is the path to save your database file, if it doesn't exist, you need to create it.

### Initialize the project

Download the source code of khakikoalas_backend and execute the following command to initialize the environment:
```sh
npm install
```
## Starting the application
To install all the dependencies, navigate to the project directory and use
```sh
npm install
```

Before running the front-end application, the backend needs to be started, to do so, change directory to backend and use:
```sh
cd backend
npm install
npm start
```

To run the vite backed front-end, open a new terminal window, and change directory to Koallab and use:
```sh
cd koallab
npm install
npm run dev
```

## Navigating the web app
Due to time constraint issues, the logic for the application remains incomplete, however, you may use these following paths in the browser if you run into a problem:
```sh
Homepage: '/'
Projects Page: '/project'
Groups Page: '/group'
User Profile: '/userProfile'
Login: '/login'
Signup: '/signup'
```
For login, you may use the following credentials:
```sh
Email: syan408@aucklanduni.ac.nz
Password: 123
```
