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

- Add environment variables to `.env` file (Refer `.env.sample` file)

```sh
DATABASE_URL="postgres://postgres:postgres@localhost:5432/wd301_db"
PORT=8081
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

- Stopping the application

```sh
pm2 stop wd301-api
```

- You can get the logs for the application by running

```sh
pm2 logs
```

## HTTPS support

You can use Nginx or any other reverse proxy to terminate any SSL connections.
