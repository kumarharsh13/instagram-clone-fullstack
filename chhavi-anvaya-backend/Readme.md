# Chhavi-Anvaya-backend

## Setup Connection
- Refer ``` .env.sample ``` file and create ``` .env ``` file in root folder.
- Now Copy the content from ``` .env.sample ``` to ``` .env ``` 
- Create a database name ``` chhavi_anvaya ```
- In ``` .env ``` file update the ``` PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE, PG_URI and JWT_SECRET ``` as per your configuration. 
- Now run ``` npx sequelize-cli init ``` to initialize Sequelize.
- Now run ``` npx sequelize-cli db:migrate ``` to run migration.
- Now check your database you will find all the respective tables got created. 