#!/bin/bash
docker run --name mongo \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME="root" \
    -e MONGO_INITDB_ROOT_PASSWORD="root" \
    -d prismagraphql/mongo-single-replica:5.0.3