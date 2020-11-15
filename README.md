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

