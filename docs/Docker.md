# Docker

## Build Database Container

```sh
cd docker/mongo
docker compose up -d
```

## Mongo Terminal

```sh
# Start mongo CLI
mongosh
# Select  Database
use < Database Name >
# Authenticate
db.auth(< Username >, < Password >)
```

```sh
# List Databases
show dbs
# List Collections
show collections
```
