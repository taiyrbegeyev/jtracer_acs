#!/bin/bash
cd ..

docker-compose down
docker-compose build --no-cache client
docker-compose up -d
