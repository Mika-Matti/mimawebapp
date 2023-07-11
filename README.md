## DATABASE

### Create database

- An example database creation script is included in the sql folder found in the root repository.

### Adding admin user into the users table

In order to add users to the database(most importantly the admin user for updating the website) you could write a small program that connects to
your database and makes an insert to the users table with given user information as well as handles the hashing
of the password. The server uses "bcrypt" for hashing so you could use the same library and hash the password in your user-adder-program in the following way:

```
const user_password = bcrypt.hashSync(password, 10);
```

Before the password and other user info is inserted to the database.

## SERVER

### Initialize server

- Run `npm install` in repo root folder.
- Create .env.production and .env.test files to the root of the repository for
  server to use. It should contain values for all the process.env variables used in
  /server/src/config.ts file.
- Before running the server, you should set NODE_ENV to the enviroment you are running
  the server in. For development: `set NODE_ENV=test` and for production: `set NODE_ENV=production`.

### Running server

The commands for the server are found in the root directory's package.json, but
here are the main commands that are used most:

- build and run: `npm start`
- run unit tests: `npm test`

## CLIENT

### Initialize client

- Create .env.production and .env files to the client folder for
  client to use. It should contain value VUE_APP_BASE_URL, for example
  in development .env file this could be `VUE_APP_BASE_URL=http://localhost:3000`, if
  server is running in port 3000.

### Running client

- Navigate from the repository root folder to the client subfolder: `cd client`
- Run `npm install` in the client folder
- Build and run development build: `npm run serve`
- Build production build: `npm run build`
- Run unit tests: `npm run test:unit`
