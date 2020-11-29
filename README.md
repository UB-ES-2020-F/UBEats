# UBEats

![Website](https://img.shields.io/website?logo=Heroku&logoColor=%23430098&style=flat&url=https%3A%2F%2Fub-gei-es-ubeats-clone.herokuapp.com%2F)
![Travis (.org) branch](https://img.shields.io/travis/UB-ES-2020/UBEats/main)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/UB-ES-2020/UBEats?label=Version%20release)
![GitHub](https://img.shields.io/github/license/UB-ES-2020/UBEats)
---

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Endpoints](#endpoints-documentation)
* [Code analysis](#code-analysis)

---
---
## General info

The purpose of this project is focused on learning, in this particular project the main goal is to recreate [Ubereats website](https://ubereats.com/) from scratch.

[UBeats clone page](https://ub-gei-es-ubeats-clone.herokuapp.com/)

---
---
## Technologies

* [NodeJS](https://nodejs.org/en/): As a foundation on which to grow the project.

### Frontend
* [ReactJS](https://reactjs.org/): Main JavaScript library for building user interfaces. 
* [React Bootstrap](https://react-bootstrap.github.io/): Frontend main framework
* [Bootstrap](https://getbootstrap.com/): Frontend main framework as a support for React Bootstrap

### Backend
* [Express](https://expressjs.com/): Minimal and flexible Node.js we application framework that provides a robust set of feature for web and mobile applications.
* [PostgreSQL](https://node-postgres.com/): Database and node.js modules for interfacing with a PostgreSQL database

### Testing 

* [Chai](https://www.chaijs.com/): BDD/TDD assertion library for node for javascript testing framework.
* [Mocha](https://mochajs.org/): JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.

### Code analysis tools
* [ESLint](https://eslint.org/): Linter for javascript.
* [NodeJS built-in profiler](https://nodejs.org/en/docs/guides/simple-profiling/): V8 profiling engine built-in nodejs.

### CI/CD

* [TravisCI](https://travis-ci.org/): Used with Github to implement Continous Integration

### Deployment 
* [Heroku](https://www.heroku.com/): Platform where the website will be running (not profitable)

---
---
## Setup
First of all, clone the project into your computer using `git clone https://github.com/UB-ES-2020/UBEats.git`.

Once is downloaded, the dependecies must be downloaded accordingly ( for front-end and back-end). To do so 

`
cd Ubeats/frontend && npm i 
`

`
cd Ubeats/backend && npm i
`

Make sure the database schema is actualized

`
psql -v ON_ERROR_STOP=ON -f setup_database.sql -U ${your postgre user}
`

and that you have a properly configured .env file in your backend folder.

`
PORT=3000
DB_USER=${your postgresql user}
DB_PWD=${your postgresql password}
DB_HOST="localhost"
DB_DATABASE="ubereats"
DB_PORT=5432
`

Next step is to build the frontend project via `cd Ubeats/frontend && npm run build`. 

Finally to start the project just `npm start` inside _backend_ folder.

---
--- 
## Endpoints documentation

_All URIs are relative to_

* *http://localhost/api/* 

* *https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/*



Docs         | Description
------------ | ------------- 
[Users](docs/endpoints/Users.md) | User information management |
[Restaurants](docs/endpoints/Restaurants.md) | Restaurant relative information |
[Items](docs/endpoints/Items.md)| CRUD information for Items belonging to Restaurants|

---
---

## Code analysis
### Static
Use the javascript linter to detect bugs, undefines, unused variables, etc.

`
npx eslint ./
`

### Dynamic
To profile the application start it with this command instead of the typical npm start:

`
node --prof index.js
`

Then you should generate traffic so the profiler can get statistics. Generate all the traffic you can. More traffic == more statistics.

`
curl -X GET http://localhost:3000/api/items
`

Once you are satisfied with the traffic, stop the execution of the application. It should have created a file with the name isolate-0x*-v8.log. To examine this log you must first translate to a readable format.

`
node --prof-process isolate-0x*-v8.log > profiling.log
`

Now you can read the file.

