#!/bin/bash
cd ../../..
if [ ! -f .env ]; then
  echo 'Error finding an .env file'
  exit 1
fi

export $(cat .env | xargs)

docker exec -i $DB_CONTAINER_NAME mongo -u $MONGO_INITDB_ROOT_USERNAME --authenticationDatabase admin -p $MONGO_INITDB_ROOT_PASSWORD <<EOF

use admin;

db.createUser(
  {
    user: "$APP_USER",
    pwd: "$APP_PWD",
    roles: [
      { role: "readWrite", db: "$DB_NAME" }
    ]
  }
);

exit
EOF

npm install -g typescript

NODE_PATH=./src npx ts-node-dev src/scripts/mongodb/create_root_user.ts
