# Expense Tracker

This application contains 2 main repos, front end and backend in 2 seperate folders names "frontend" and "backend"

## Manual Installation

Navigate into frontend folder to install dependancies

```bash
  cd ./client
  npm install
```

Navigate into backend folder to install dependancies

```bash
  cd ../server
  npm install
```

## Manual Running the appllication

Open 2 terminal tabs in the both client and server folder

inside the backend folder, run;

```bash
npm start
```

inside the frontend folder, run;

```bash
npm run dev
```

## Deployment

### Running the application using docker-compose
navigate to the root folder of the application

Run;

```
docker-compose up
```

## Environment variables 

```bash
MONGO_URL=''
PORT=
JWT_SECRET=""
```