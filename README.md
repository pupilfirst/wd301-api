# wd301-api

API server for WD301

## steps to run locally

```sh
npm install
npm start
```

## Running in production

- Install `pm2`

```sh
npm install pm2 -g
```

- Make sure the database exists

```sh
cd wd301-api
NODE_ENV=production npx sequelize-cli db:create
```

- Run the application

```sh
cd wd301-api
NODE_ENV=production pm2 start "npx sequelize-cli db:migrate && npm start" --name wd301-api
```

- You can get the logs for the application by running

```sh
pm2 logs
```
