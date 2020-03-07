# TraderU

> Stock and cryptocurrency trading simulator

**NOTE: 🚧 Under construction! 🚧 It's nearly final project week at Lighthouse Labs so we've just started chipping away at it.**

<!-- Badges -->

[![Build Status](https://travis-ci.com/bryce-mcmath/traderu.svg?branch=master)](https://travis-ci.com/bryce-mcmath/traderu)
[![code coverage](https://img.shields.io/codecov/c/github/bryce-mcmath/traderu/master.svg)](https://codecov.io/gh/bryce-mcmath/traderu/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

TraderU is a responsive fullstack application made to simulate stock and cryptocurrency trading. It uses multiple publicly available stock and cryptocurrency APIs.

To learn more and see it in action, read further. Or visit it [live](https://traderu.io)

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Deployment](#deployment)
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

![Demo](https://github.com/bryce-mcmath/traderu/blob/master/docs/demo.gif?raw=true)

The above gif demonstrates basic usage. For more screenshots and other documentation, navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

Clone this repository to your local machine, and in both the client and server directories:

#### Install Dependencies

```sh
npm install
```

### Available Client Commands

#### Compiles and hot-reloads for development

```sh
npm run serve
```

#### Compiles and minifies for production

```sh
npm run build
```

#### Run your unit tests

```sh
npm run test:unit
```

#### Run your end-to-end tests

```sh
npm run test:e2e
```

#### Lints and fixes files

```sh
npm run lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Available Server Commands

#### Hot reload for development

```sh
npm run dev
```

#### Start the server

```sh
npm run start
```

## Deployment

After forking the project and setting up the cloud database and .env file as per the above steps, add your forked repo to Travis CI [here.](https://travis-ci.com/getting_started) After that, setup a Heroku instance following the guide [here,](https://devcenter.heroku.com/articles/getting-started-with-nodejs) add your environment variables with the Heroku dashboard, and add your api-key and app name to the .travis.yml file.

Congrats! Now everytime you push to master, you'll automatically check that installing and building works and then deploy if it does.

## Built with

- [Vue](https://vuejs.org/) - Front-end framework
- [TypeScript](https://typescriptlang.org) - Javascript superset to add type checking
- [axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Sass](https://sass-lang.com/) - CSS pre-compiler to make styling easier
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
- [Jest]()
- [Cypress]()
- [D3.js]()
- []()

## Contributing

1. Fork it (<https://github.com/bryce-mcmath/foodzebra/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR

## Meta

Jon Langlois - [jlangy](https://github.com/jlangy) - jonathan-langlois@live.ca

Wilson Wong – [wilwong89](https://github.com/wilwong89) – wilwong89@gmail.com

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – bryce.j.mcmath@gmail.com

## Known issues / bugs

- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/bryce-mcmath/foodzebra/issues)_

## Feature roadmap

### In the works

- Some
- features

### Planned

- Some loftier
- features

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

- We only had two weeks to do this and we used some tools we were interested in but not yet familiar with
- It was probably a blast
- I'm probably very tired again

## ![TraderU](https://github.com/bryce-mcmath/traderu/blob/master/docs/traderu.png?raw=true)
