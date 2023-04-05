"# project-group-khaki-koalas" 
## Khaki Koalas Back-end

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

### Start the project

You can start debugging directly in VSCode by clicking on "Debug" and selecting "Nodejs". You can also start the project directly with the following command:
```sh
npm run start
```

## Project description

This project is started from /bin/www and will create an HTTP server to provide services on port 3000.

When the project is started, it will automatically initialize the database structure and add the initial basic data automatically to facilitate R&D and debugging.

It should be noted that the database must be started first before starting this project, otherwise it will not be able to complete the database initialization.

This project can be executed repeatedly, and the database will only be initialized once. If you need to reinitialize the database, please delete the database that already exists now, and then restart the project. When the project starts, if the database is detected not to exist, the database will be initialized automatically.

In this project, all routing configurations are placed in the directory routes, each business can have its own route, it is recommended to put the same type of routes together.

In this project, all the business logic is put in the directory business, each business can have its own business logic file, it is recommended to put the same type of business logic together.

In addition, some basic functions and functions are stored in the bin directory, so if you need to add new functions that may be used globally, it is recommended to put them in this path. Some of the basic functions are already provided in base.js.

initmodel.js is a file dedicated to initialize the data model, please do not modify this file unless you need to adjust the database model.

initdb.js is a file dedicated to initialize the database basic data, if you need to add your own basic data, you can add it in this file.

Finally, all the static resource files are stored under the public path, with images dedicated to storing images. If you want to store more types of files, please create a directory under this path.