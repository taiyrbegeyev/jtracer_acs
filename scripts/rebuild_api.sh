#!/bin/bash
cd ..

docker-compose down
docker-compose build --no-cache api
docker-compose up -d
