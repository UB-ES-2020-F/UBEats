//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const dotenv = require('dotenv')
dotenv.config() // Configure dotenv at the beginning of the project

const {pool} = require('../database/index.js')
const format = require('pg-format')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Search', () => {

  let user = {
    email: 'fulanit2o@imap.server.com',
    name: 'AquiSeCome',
    CIF: '554550934R',
    street: 'C/ de la piruleta, 123',
    pass: 'supercontrasena',
    phone: '123456789',
    type: 'restaurant',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }

  var restaurant = {
    email: user.email,
    avaliability: 'amarillo',
    visible: 'invisible',
    iban: '111222333444555666777888',
    allergens: 'gluten',
  }

  describe('/GET REST BY NAME SUBSTR', () => {

    beforeEach(async () => {
      //add user
      var query = format('INSERT INTO users VALUES(%L) RETURNING *', Object.values(user))
      var result = await pool.query(query)

      //add restaurant
      query = format('INSERT INTO restaurants VALUES(%L) RETURNING *', Object.values(restaurant))
      result = await pool.query(query)
    })

    afterEach(async () => {
      //remove restaurant
      var query = format('DELETE FROM restaurants WHERE email = %L', user.email)
      var result = await pool.query(query)

      //remove user
      query = format('DELETE FROM users WHERE email = %L', user.email)
      result = await pool.query(query)
    })

    it('Get a known existing restaurant. Should return 200', (done) => {
      chai.request(app)
        .get('/api/search/restaurants/SeC')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rests');
            res.body.rests.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });
    })

    it('Get a known existing restaurant. Exact match. Should return 200', (done) => {
      chai.request(app)
        .get('/api/search/restaurants/AquiSeCome')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rests');
            res.body.rests.should.be.an('array').to.have.lengthOf(1);
            done();
          });
    })

    it('Get a known existing restaurant. Match first letters. Should return 200', (done) => {
      chai.request(app)
        .get('/api/search/restaurants/AquiS')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rests');
            res.body.rests.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });
    })

    it('Get a known existing restaurant. Match last letters. Should return 200', (done) => {
      chai.request(app)
        .get('/api/search/restaurants/eCome')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rests');
            res.body.rests.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });
    })


    it('Get a known non existing restaurant. Should return 200 and an empty list', (done) => {
      chai.request(app)
        .get('/api/search/restaurants/XkQPld')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rests');
            res.body.rests.should.be.an('array').to.have.lengthOf(0);
            done();
          });
    })
  })

})
