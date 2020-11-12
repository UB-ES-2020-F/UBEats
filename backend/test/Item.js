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
      chai.request(app)
        .get('/api/items/1')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('item')
            res.body.item.should.have.property('item_id')
            res.body.item.should.have.property('title')
            res.body.item.should.have.property('desc')
            res.body.item.should.have.property('price')
            res.body.item.should.have.property('visible')
            res.body.item.should.have.property('rest_id')
            done();
          });
    });

    it('Get a known non existing item. Should return 404', (done) => {
      chai.request(app)
        .get('/api/items/75456123')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message')
            done();
          });
    });

  })

  // TEST THE POST ENDPOINT
  
  // TEST THE DELETE ENDPOINT
  

  // TEST THE PUT ENDPOINT


})

