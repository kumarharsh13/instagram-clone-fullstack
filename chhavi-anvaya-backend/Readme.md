# Chhavi-Anvaya-backend

## Setup Connection for running backend

- Refer `.env.sample` file and create `.env` file in root folder.
- Now Copy the content from `.env.sample` to `.env`
- Install PostgreSQLin your local.
- After successfull installation, create a database name `chhavi_anvaya`
- In `.env` file update the `PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE, PG_URI and JWT_SECRET` as per your configuration.
- Make sure you are using correct port number.
- Now run `npm install` to install all the required packages.
- Now run `npx sequelize-cli init` to initialize Sequelize.
- Now run `npx sequelize-cli db:migrate` to run migration.
- Now check your database you will find all the respective tables got created.
- Once the migrations got created in Posgres run `npx sequelize-cli db:seed:all` command to seed/add the default data required.
- Now run `npm start` the backend service will start running on the port specified, you will be able to see the port details on the console.
