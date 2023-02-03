
## Description

Built on top of NestJS https://nestjs.com/

## Installing The App

```bash
$ npm install
```

 ## Running The App

 First, create a `.env` file from the `.env.example` file  

Then, set the values of the environment variables :  

`APP_PORT` the application port  
`MONGODB_URL` : MongoDB connection string  
`IQAIR_API_KEY` : Your IQAIR API key, get it from https://www.iqair.com/fr/dashboard/api  

#### With Docker

Set `MONGODB_URL` to `mongodb://db:27017/yassir` (yassir can be replaced with any name)

```bash
$ MONGODB_URL=mongodb://db:27017/yassir
```

Set `MONGODB_EXTERNAL_PORT` to a port number that works for you,  

you can set it to `27018` if you have mongodb in your machine already running on port `27017`, for example  

```bash
$ MONGODB_EXTERNAL_PORT=27018
```

To run the application just run the command  

```bash
$ docker-compose up
```

You application will start running on watch mode and the url is `http://localhost:APP_PORT`

#### Without Docker

You can use the one of the following commands

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger Api Documentation 

You can find the Swagger API documentation on the url `{base_url}/api-documentation`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lint

```bash
$ npm run lint
```
