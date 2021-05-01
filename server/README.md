## Docker

Docker is one of the prerequisites to make the application up and running. Make sure to install on your machine. We used the following guide to install Docker on our Digital Ocean droplet:

- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

Create a file `.env` with the following variables:

```
API_PORT=

MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
APP_USER=
APP_PWD=
DB_NAME=
JTRACER_ROOT_EMAIL=
JTRACER_ROOT_PWD=
JTRACER_ROOT_FIRST_NAME=
JTRACER_ROOT_LAST_NAME=
MONGO_HOSTNAME=
MONGO_PORT=
API_CONTAINER_NAME
DB_CONTAINER_NAME=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_LIFE=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_LIFE=
EMAIL_TOKEN_SECRET=
EMAIL_TOKEN_LIFE=

MAILGUN_API_KEY=
DOMAIN_NAME=
```

In order to run all components of the system run:

```
$ docker-compose up -d

```

It will run the ReactJS, Express.js, and MongoDB containers in the background.

Create a username and password for the `jtracer_mongodb` MongoDB container:

```
$ docker exec -it jtracer_mongodb mongo -u root -p --authenticationDatabase admin

$ use admin

$ db.createUser(
  {
    user: "ENTER_YOUR_USERNAME",
    pwd: "ENTER_YOUR_PWD",
    roles: [
      { role: "readWrite", db: "jtracer" }
    ]
  }
)

$ exit

```

Assign `ENTER_YOUR_USERNAME` and `ENTER_YOUR_PWD` to the `APP_USER` and `APP_PWD` env variables accordingly.

- https://offhourscoding.com/secure-mongodb-with-docker/
- https://medium.com/swlh/dockerizing-a-mongo-database-ac8f8219a019

## Linter and Formatter

We use [ESLint](https://eslint.org) to enforce a set of style, formatting, and coding standards for our codebase.

We follow [Airbnb's ESLint config](https://www.npmjs.com/package/eslint-config-airbnb-typescript) with TypeScript support. For more details, refer to the [Airbnb's official JavaScript Style Guide](https://github.com/airbnb/javascript).

[Prettier](https://prettier.io) is a code formatting tool. ESLint can format code as well, but its primary purpose is to detect when we are not adhering to the necessary coding conventions.

- [How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript)

- [How to use Prettier with ESLint and TypeScript in VSCode](https://khalilstemmler.com/blogs/tooling/prettier)

## Documentation

We use [TSDoc](https://tsdoc.org) to standardize the doc comments used in our codebase. It is a specification of how to comment our TypeScript code to help create API documentation and metadata.

We use [eslint-plugin-tsdoc](https://www.npmjs.com/package/eslint-plugin-tsdoc) plugin to provide a rule for validating that TypeScript doc comments conform to the TSDoc specification.

## Git Hooks

We use git hooks to ensure tests are run, code is formatted, and etc., before even pull requests are created. The article followed is [here](https://khalilstemmler.com/blogs/tooling/enforcing-husky-precommit-hooks/).

We manage hooks using a package called [husky](https://www.npmjs.com/package/husky). Essentially, before commiting code, make sure that you run the following command in the `src/server` directory:

```

npm run format && npm run lint

```

or, otherwise, run:

```

npm run server:format-and-lint

```

in the root.

### How to skip execution

```

git commit --no-verify -m 'demo commit message'

```

or

```

git commit -n -m 'demo commit message'

```

## Security

### Embrace of Linter Security Rules

We employ security ESLint plugin such as [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security) to make code security checks based on a number of known vulnerabilities, such as unsafe RegEx, unsafe use of eval(), and non-literal filenames being used when accessing the file system within an application.

You can check all the rules [here](https://github.com/nodesecurity/eslint-plugin-security#rules).

- [Embrace linter security rules](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/lintrules.md)

```

```

```

```
