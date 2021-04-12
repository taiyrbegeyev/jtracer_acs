## Linter and Formatter

We use [ESLint](https://eslint.org) to enforce a set of style, formatting, and coding standards for our codebase.

We follow [Airbnb's ESLint config](https://www.npmjs.com/package/eslint-config-airbnb-typescript) with TypeScript support. For more details, refer to the [Airbnb's official JavaScript Style Guide](https://github.com/airbnb/javascript).

[Prettier](https://prettier.io) is a code formatting tool. ESLint can format code as well, but its primary purpose is to detect when we are not adhering to the necessary coding conventions.

- [How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript)

- [How to use Prettier with ESLint and TypeScript in VSCode](https://khalilstemmler.com/blogs/tooling/prettier)

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
