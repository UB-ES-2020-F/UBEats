//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let HelloWorld = require('../controllers/HelloWorld')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('HelloWorld', () => {
    beforeEach((done) => { //Before each test we empty the database
        HelloWorld.developers = [
            {name : 'Hector', age : 23, language : ['French', 'Spanish']},
            {name : 'Samu', age : 21, language : ['Catalan', 'English']},
            {name : 'Dani', age : 20, language : ['French','Catalan','Spanish']},
            {name : 'Oriol', age : 21, language : ['French','English','Spanish']},
            {name : 'Albert', age : 22, language : ['English', 'Spanish']},
            {name : 'Ruben', age : 22, language : ['Catalan', 'Spanish']},]
        done();
    });
  /*
  * Test the /GET route
  */
  describe('/GET helloworld', () => {
      it('it should GET all 6 the developers', (done) => {
        chai.request(app)
            .get('/api/helloworld')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(6);
              done();
            });
      });
      it('it should GET only the developer Hector', (done) => {
        chai.request(app)
            .get('/api/helloworld?name=Hector')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                  res.body[0].name.should.be.eql('Hector')
              done();
            });
      });
      it('it should GET only developers with age 22', (done) => {
        chai.request(app)
            .get('/api/helloworld?age=22')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(2);
              done();
            });
      });

  });
    /*
    * Test the /POST route
    */
  describe('/POST helloworld', () => {
    it('it should POST a new developer', (done) => {
      let dev = {
        name : 'Juan',
        age : 13,
        language : "Spanish"
      }
      chai.request(app)
          .post('/api/helloworld')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(dev)
          .end((err, res) => {
                res.should.have.status(201);
            done();
          });
    });
    it('it should return an error! Body is empty', (done) => {
      chai.request(app)
          .post('/api/helloworld', {})
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });
  });

});