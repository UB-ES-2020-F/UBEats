//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const dotenv = require('dotenv')
dotenv.config() // Configure dotenv at the beginning of the project

const {pool} = require('../database/index.js')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Items', () => {

  // TEST DE GET ENDPOINT
  describe('/GET ITEM', () => {
    it('Get a known existing item. Should return 200', (done) => {
      let item = {
        item_id:        // existing id
      }
      chai.request(app)
        .get('/api/item')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('item')
            res.body.item.should.have.property('item_id')
            res.body.item.should.have.property('title')
            res.body.item.should.have.property('description')
            res.body.item.should.have.property('price')
            res.body.item.should.have.property('visible')
            res.body.item.should.have.property('rest_id')
            done();
          });
    });

    it('Get a known non existing item. Should return 404', (done) => {
      let item = {
        item_id:       // Non existing id
      }
      chai.request(app)
        .get('/api/item')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message')
            done();
          });
    });

    it('Malformed body request', (done) => {
      let item = {
        something_else: 4
      }
      chai.request(app)
        .get('/api/item')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('message')
            done();
          });

    });

    it('Empty body request', (done) => {
      let item = {}
        chai.request(app)
        .get('/api/item')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('message')
            done();
          });
    });

  })

  // TEST THE POST ENDPOINT
  
  // TEST THE DELETE ENDPOINT
  

  // TEST THE PUT ENDPOINT




