# Cyberguards User Microservice

## Environment variable configurations

1. rename your .env copy file to .env

## Running in Docker Compose:

1. Uncomment the first DB_HOST variable if you are running this service using Docker Compose:

```
# ###
# # Use this DB_HOST for running in Docker Compose environment
# ###
# DB_HOST=host.docker.internal
```

2. Comment the second DB_HOST variable

```
# ###
# # Use this DB_HOST for running locally in non-docker environment
# ###
# DB_HOST=localhost
```

3. Make sure your compose.yaml file is within the same directory level as this project and other services folder e.g.:

```
root project folder
  - /cyberguards-frontend
  - /cyberguards-be-cases
  - ...
  - compose.yaml
```

4. Make sure before running the command below, you are in the same directory level as compose.yaml shown above

```
docker compose up -d --build
```

## Running in non-Docker Compose environment:

1. Uncomment the second DB_HOST variable if you are running this service using 'npm run dev':

```
# ###
# # Use this DB_HOST for running locally in non-docker environment
# ###
# DB_HOST=localhost
```

2. Comment the first DB_HOST variable

```
# ###
# # Use this DB_HOST for running in Docker Compose environment
# ###
# DB_HOST=host.docker.internal
```

3. Make sure you are in the cyberguards-be-cases directory
4. Install node_module dependencies by running the command:

```
npm install
```

5. Make sure you are in the cyberguards-be-cases directory
6. Run the application

```
npm run dev
```

## Running Integration Tests using Docker Compose:

1. Make sure in your .env file, you are using the first DB_HOST variable:

```
# ###
# # Use this DB_HOST for running in Docker Compose environment
# ###
# DB_HOST=host.docker.internal
```

2. Start your Docker Desktop app
3. Make sure you are in the cyberguards-be-cases directory
4. To run the tests, run the following command:

```
npm run docker:up
```

5. To stop running the tests, run the following command:

```
npm run docker:down
```
