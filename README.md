# Introduction
Create an end-to-end web application that allows the user to read, create and delete a to-do list of duties of any kind. This project is for frontend.

If you are interested in backend project, please refer to the [Github Repo](https://github.com/llkevin13579/ts-code-test-backend).

# Prerequisites
(1) [Node.js](https://nodejs.org/en)(Version>=16) installed on your operating system.

(2) [Backend service](https://github.com/llkevin13579/ts-code-test-backend) and database are ready.

# Install Dependencies
```
npm install
```
Or
```
yarn
```

# Running Service Locally

Running with hot reload:
```
npm run start:dev
```

Running other environment locally:

Update the database config in ``.env.qa`` or ``.env.preprod`` and then run the following command:
```
npm run build
npm run start:qa / npm run start:preprod
```
> Due to the security issue, it's not recommended to run production in local. If you want to run production service, please refer to the next section of the document.

The website will host on http://localhost:3000

# Running Service In the Server
It's better to run with Docker container for non-local environment.

## Build Docker Image
```
docker build -f Dockerfile.ENV_NAME -t ts-code-test-frontend:latest .
```

## Run Docker Container
``` 
docker run --rm \
    --name ts-code-test-frontend \
    -p 3000:3000 \
    -d \
    ts-code-test-frontend:latest
```

Alternatively, we could also host frontend project in Object Storage Service for cloud service after building service, such as AWS S3.

# Unit Test
If you want to run unit test with [jest](https://jestjs.io/) and [@testing-library/react](https://www.npmjs.com/package/@testing-library/react), please run the following command:

```
npm run test
```

Running with coverage report. 

The result will generate to ``/coverage`` folder and then you could check the report in ``/coverage/lcov-report/index.html``
```
npm run test:cov
```

