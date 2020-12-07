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
describe('Orders', () => {

  // TEST THE GET ENDPOINT
  describe('/GET ORDERS', () => {

    beforeEach( async () => {
      var order_id
    })

    afterEach( async () => {
      
    })

    it('Get an order by ID. Should return 200', (done) => {
      chai.request(app)
        .get('/api/orders/'.concat(order_id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('order');
            console.log(res.body.order)
            done();
          });
    });
  });
})