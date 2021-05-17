#!/bin/bash
cd ..
if [ ! -f .env ]; then
  echo 'Error finding an .env file'
  exit 1
fi

export $(cat .env | xargs)

docker container stop $API_CONTAINER_NAME
docker container stop $DB_CONTAINER_NAME
docker container stop $CLIENT_CONTAINER_NAME
docker rm $API_CONTAINER_NAME
docker rm $DB_CONTAINER_NAME
docker rm $CLIENT_CONTAINER_NAME
docker image rm jtracer_acs_$API_CONTAINER_NAME
docker image rm mongo
docker image rm jtracer_acs_$CLIENT_CONTAINER_NAME
docker system prune
rm -rf ~/data/db
