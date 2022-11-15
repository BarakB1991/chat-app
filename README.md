# Chat Room App
Fullstack web application Built with HarperDB, React, Express, SocketIO, JS.

clone repository.

## Installation guide

### Setting up the DB
create harperDB account and create a free instance
go to settings and copy your domain and password.

place this code in .env in root folder of repo:
````
HARPERDB_PW="YOUR-PASS-FROM-HARPERDB"
HARPERDB_URL="YOUR-DOMAIN"
````

back at the HarperDB website, click on the instance you created
click browse
click on the plus button to the schemas
create a schema named `realtime_chat_app`
then click on plus button next to tables
name: `messages` hash attr.: `id`

that's it. you have the database running and waiting to recieve messages and store them. 

### installing dependencies

run this in root directory of repo:
```bash
npm i
npm start
```

Have fun
