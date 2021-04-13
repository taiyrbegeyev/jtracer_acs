## MongoDB

There are two different MongoDB server editions: Community and Enterprise. Since MongoDB Community edition is free to use and open source, we will be using it along the journey. Since we try to minimize external cloud services usage, we will set up our deployment locally as part of the Digital Ocean Infrastructure.

We followed the official Digital Ocean's [tutorial](https://www.mongodb.com/digital-ocean) to make MongoDB up and running on our droplet.

### Installing MongoDB on Droplet Server for Ubuntu - Community Edition

<ol>
  <li>Import MongoDB</li>

    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

  <li>Create a list file for MongoDB</li>

Since our Digital Ocean droplet runs on Ubuntu 20.04 LTS:

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

  <li>Reload the local package database</li>

    sudo apt-get update

  <li>Install MongoDB</li>

    sudo apt-get install -y mongodb-org

</ol>

### Running MongoDB on Ubuntu - Community Edition

<ol>
  <li>Start MongoDB</li>

    sudo systemctl start mongod

  <li>Verify if MongoDB is successfully installed.</li>

    sudo systemctl status mongod

  <li>Stop MongoDB</li>

    sudo systemctl stop mongod

  <li>Restart MongoDB</li>

    sudo systemctl restart mongod

  <li>Starting MongoDB</li>

    mongo

</ol>

Read more about how to set Up MongoDB Authentication and Firewall Configuration:

- https://www.mongodb.com/digital-ocean

```
mongo -u USERNAME -p --authenticationDatabase admin
```

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

````

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
````
