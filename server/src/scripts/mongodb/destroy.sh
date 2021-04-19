#!/bin/bash
cd ../../..
if [ ! -f .env ]; then
  echo 'Error finding an .env file'
  exit 1
fi

export $(cat .env | xargs)

docker container stop $CONTAINER_NAME
docker rm $CONTAINER_NAME
docker system prune
rm -rf ~/data/db
