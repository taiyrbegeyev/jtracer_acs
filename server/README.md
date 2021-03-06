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

## API

All the API endpoints have the common prefix `/api/v1`.
Here is a list of all available endpoints:

Authentication

- POST `/api/v1/auth/login`
- POST `/api/v1/auth/logout`
- POST `/api/v1/auth/register`
- GET `/api/v1/auth/verify/emailToken`
- POST `/api/v1/auth/refreshToken`

Events

- GET `/api/v1/events`
- POST `/api/v1/events`
- PATCH `/api/v1/events/:eventId`
- DELETE `/api/v1/events/:eventId`

Moderators

- GET `/api/v1/moderator`
- GET `/api/v1/moderators`
- POST `/api/v1/moderators`
- POST `/api/v1/moderators/resendInvitationLink`
- PATCH `/api/v1/moderators/:moderatorId`
- DELETE `/api/v1/moderators/:moderatorId`

Check-ins

- GET `api/v1/events/:eventId/checkIns`
- GET `api/v1/checkIns`
- POST `api/v1/checkIns`
- GET `api/v1/checkIns/trace`
