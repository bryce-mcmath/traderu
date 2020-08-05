# ![TraderU](https://github.com/bryce-mcmath/traderu/blob/master/docs/img/logo.png?raw=true)

> Stock and cryptocurrency trading simulator

<!-- Badges -->

![Build Status](https://codebuild.us-east-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidkc4a2Q5UFVuTTNNRkVwTERVWnZEbGhkK0g2ZmhVdHN0cWxIS3owaDJ0TndQRHNRUmlLM2VYalhxQzFJTXkxSkFVb2JUdklHNk91aFN2ZjZQLzhTbmswPSIsIml2UGFyYW1ldGVyU3BlYyI6Im85a3kvRDF2V0JjU28vcG4iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![codecov](https://codecov.io/gh/bryce-mcmath/traderu/branch/development/graph/badge.svg)](https://codecov.io/gh/bryce-mcmath/traderu)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**NOTE: To be used on mobile and tablet only, we have not yet added support for desktop**

TraderU is a progressive web app (PWA) made to simulate stock and cryptocurrency trading. It utilizes several publicly available APIs to do so, most notably [AlphaVantage.](https://www.alphavantage.co/documentation/) It's a full stack application designed using a mobile-first approach, deployed with an AWS Pipeline to a live site [here.](http://traderu.io)

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Built with](#built-with)
- [Contributing](#contributing)
- [Meta](#meta)
- [Known issues / bugs](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)
  - [In the works](#in-the-works)
  - [Planned](#planned)
- [Acknowledgements](#acknowledgements)

## Usage

<!-- Gifs -->

### Demo:

![Demo](https://github.com/bryce-mcmath/traderu/blob/development/docs/demo.gif?raw=true)

The above gif demonstrates our basic app flow. For more screenshots and other documentation, navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Using Docker

If you have docker and docker-compose installed, clone this repo and run docker-compose up from the root. 

This will set up the front-end application at localhost:8000, the backend api on localhost:8080, and adminer for browsing the database on localhost:3000.

To log into adminer, set system to PostgreSQL, server to db, username to user, password to password, and database to db1.

The database will initialize with 3 cryptocurrencies, 3 stocks, and 3 users with sample portfolios. Sample users have email addresses
test1@gmail.com, test2@gmail.com, test3@gmail.com, and the password for each account is password.

This will setup hot-reloading for the server and client directories so you can get developing right away.

### Local installation

### Prerequisites

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/). You'll also want the Vue CLI tool, which you can install after you install Node like this:

```sh
npm i -g @vue/cli
```

### Installing and Running

Clone this repository to your local machine and then create a .env following the .env.example file

#### Install Dependencies

In the root directory:

```sh
npm i
```

```sh
npm run lerna-install
```

### Available Root Commands

#### Compiles and minifies both server and client for production

```sh
npm run build
```

#### Start the compiled JS server

```sh
npm run start
```

#### Hot TypeScript server reload for development

```sh
npm run dev
```

#### Run unit and integration tests in both the client and server

```sh
npm run test
```

#### Generate new docs for both the client and server

```sh
npm run jsdoc
```

**NOTE: Our client side JSDoc comments are almost not existent, but our server should generate semi-decent ones. Browse to /docs/jsdoc/server/ and open up index.html in your browser to see the outputted documentation**

### Other available Commands

There are more commands than is necessary to list here, refer to package.json files to view them.

## Built with

- [Vue](https://vuejs.org/) - Front-end framework, used the full suite (Vuex, Vue-Router, Vuetify etc.)
- [D3.js](https://d3js.org/) - JS Data Visualization framework - our graphs and charts and gauges are built with this
- [Lerna](https://www.lerna.js.org) - How we're able to run many subdirectory commands with a single root command
- [TypeScript](https://typescriptlang.org) - Javascript superset to add type checking (Strict mode only used in server)
- [axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Sass](https://sass-lang.com/) - CSS pre-compiler to make styling way easier
- [JSON Web Tokens](https://jwt.io/) - For industry standard authentication
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
- [Postman Team](https://www.postman.com/) - For testing and debugging out routes
- [Jest](https://jestjs.io) - Testing library we used for unit and integration tests
- [Cypress](https://cypress.io) - End-to-end testing framework we had time to add a few E2E tests with
- [AWS](https://aws.amazon.com) - Used to deploy our app. The flow works like this: Reach a milestone stable version of development -> merge to master -> Github Hook triggers AWS CodeBuild -> CodeBuild runs install, build, and test stages (see buildspec.yml - Lerna made this very easy) -> If successful, CodeDeploy sends zipped output files to an AWS S3 bucket -> Contents is served with an AWS EC2 instance via AWS Elastic Beanstalk

## Contributing

1. Fork it (<https://github.com/bryce-mcmath/traderu/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR and follow the template

**NOTE: We have a preferred commit message template in docs/commit_templates.md if you'd like to use that as well. For tiny changes, don't worry about it**

## Meta

Jon Langlois - [jlangy](https://github.com/jlangy) - jonathan-langlois@live.ca

Wilson Wong – [wilwong89](https://github.com/wilwong89) – wilwong89@gmail.com

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – bryce.j.mcmath@gmail.com

## Known issues / bugs

- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/bryce-mcmath/traderu/issues)_

## Feature roadmap

### In the works

- After demo day we'll get back to work on it. Well after the day after demo day. We need to catch up on sleep the day after.

### Planned

- General robustness, more consistent patterns and clean up
- Use GZip with requests that recieve text-based JSON payload
- Market close and open
- Order duration algorithm, enable option
- Limit orders, and associated algorithm, enable option
- Portfolio settings toggles are permanently changed on save
- Limit on number of accounts per user
- Push notifications
- An simple algorithm to generate trade suggestions, so we have something to notify users of
- Desktop design
- Set E2E tests to run and exit without developer input
- More data, more and better data visualizations

In no particular order other than the first one is first

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

For making powerful services inexpensive for students:

- AlphaVantage
- ElephantSQL
- AWS

For being Vue gurus:

- Gary Jipp
- LinusBorg on the Vue forums
