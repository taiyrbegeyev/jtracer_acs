#!/bin/bash
cd ..
docker-compose up -d mongo
docker-compose up -d api
cd server/src/scripts/mongodb
./init.sh
cd ../../../
docker-compose up -d client
