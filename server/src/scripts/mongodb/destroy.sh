#!/bin/bash
cd ../../..
if [ ! -f .env ]; then
  echo 'Error finding an .env file'
  exit 1
fi

export $(cat .env | xargs)

docker container stop $API_CONTAINER_NAME
docker container stop $DB_CONTAINER_NAME
docker rm $API_CONTAINER_NAME
docker rm $DB_CONTAINER_NAME
docker image rm server_$API_CONTAINER_NAME
docker image rm mongo
docker system prune
rm -rf ~/data/db
