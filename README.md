# JTracer ACS

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="assets/logos/logo_transparent.png" alt="Logo" width="160" height="160">
  </a>

  <!-- <h3 align="center">JTracer ACS</h3> -->

  <!-- <p align="center">
    The earlier we can reach people who might have been exposed to COVID-19, the faster we may avoid the transmission of the virus.
    <br />
    <a href="https://github.com/taiyrbegeyev/jtracer_acs/blob/develop/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/taiyrbegeyev/jtracer_acs/blob/develop/README.md">View Demo</a>
    ·
    <a href="https://github.com/taiyrbegeyev/jtracer_acs/issues">Report Bug</a>
    ·
    <a href="https://github.com/taiyrbegeyev/jtracer_acs/issues">Request Feature</a>
  </p> -->
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img width="1440" alt="JTracer ACS" src="https://user-images.githubusercontent.com/44882080/118392369-b02c0c80-b639-11eb-9ead-c1b0baa41477.png">

Complementary Access Management System for JTracer - a contact-tracing application that provides a safe and easy way to record interactions in public spaces by scanning QR codes. The purpose is of the access management system is to help the response team to identify and notify people who may have been exposed to the virus. The earlier we can reach people who might have been exposed to COVID-19, the faster we may avoid the transmission of the virus. The access management system provides features such as the generation and management of QR codes, reconstruction of infection chains, and many more.

### Built With

- Client application

  - [React](https://reactjs.org)
  - [Redux](https://redux.js.org)
  - [Material-UI](https://material-ui.com)

- Server application

  - [Express.js](https://expressjs.com)
  - [MongoDB](https://www.mongodb.com)

<!-- GETTING STARTED -->

## Getting Started

### Docker

Docker is one of the prerequisites to make the application up and running. Make sure to install on your machine. Follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04) to install Docker on your Linux machine.

### Docker Compose

It will run the client(ReactJS), server(Express.js), and database(MongoDB) containers in the background. Follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04) to install Docker Compose on your Linux machine.

### Node.js and npm

Install Node.js and npm

### TypeScript

`npm install -g typescript`

### Environmental Variables

Create a file `.env` in the root direcotry with the following variables:

```
API_PORT=8000
API_CONTAINER_NAME=api
DB_CONTAINER_NAME=jtracer_mongodb
MONGO_HOSTNAME=mongo
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root_password
DB_NAME=jtracer
CLIENT_CONTAINER_NAME=client
```

and another `.env` file in the `server` directory:

```
API_PORT=8000

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root_password
APP_USER=jtracer_user
APP_PWD=fne4njg7
DB_NAME=jtracer
JTRACER_ROOT_EMAIL=admin@jacobs-university.de
JTRACER_ROOT_PWD=Qwerty12345
JTRACER_ROOT_FIRST_NAME=Admin
JTRACER_ROOT_LAST_NAME=Admin
MONGO_HOSTNAME=mongo
MONGO_PORT=27017
API_CONTAINER_NAME=api
DB_CONTAINER_NAME=jtracer_mongodb

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_LIFE=600
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_LIFE=86400

MAILGUN_API_KEY=

ENCRYPTION_KEY=
SIGNING_KEY=
```

Obviously, feel free to change any of these variables according to your preferences.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/taiyrbegeyev/jtracer_acs.git
   ```
2. Run the setup script
   ```sh
   cd scripts
   ./setup.sh
   ```

<!-- USAGE EXAMPLES -->

## Usage

### JTracer

Execute `yarn start` in the `jtracer` directory to run the app in a development mode. The app is not containerized since JTracer was not a part of the scope. So, you will have to run it manually.

### JTracer ACS

- The client application is exposed at http://localhost:1337
- The server application is exposed at http://localhost:API_PORT

In case you want to run the `client` and `server` apps in a development mode, then you will have to change the configurations in the `server/.env` file. `MONGO_HOSTNAME` should be set to `127.0.0.1` in order to be accessed from the localhost.

### How to access the MongoDB Database?

Execute the following command to access the MongoDB as an admin:

```
docker exec -it DB_CONTAINER_NAME mongo -u MONGO_INITDB_ROOT_USERNAME --authenticationDatabase admin -p MONGO_INITDB_ROOT_PASSWORD
```

Execute the following command to access the MongoDB as a user:

```
docker exec -it DB_CONTAINER_NAME mongo -u APP_USER --authenticationDatabase admin  -p APP_PWD
```

## Contact

Taiyr Begeyev - taiyrbegeyev@gmail.com

Project Link: [https://github.com/taiyrbegeyev/jtracer_acs](https://github.com/taiyrbegeyev/jtracer_acs)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: assets/images/screenshot.png
