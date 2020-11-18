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
describe('Users', () => {

    /*
    * Test the /POST login route
    */
  describe('/POST LOGIN', () => {
    it('it should Log In. Returning 200', (done) => {
      let user = {
        email : 'rrr@gmail.com',
        password : '12344',
      }
      chai.request(app)
        .post('/api/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('user')
            res.body.user.should.have.property(`email`)
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('CIF')
            res.body.user.should.have.property('street')
            res.body.user.should.have.property('phone')
            res.body.user.should.have.property('tipo')
            res.body.user.should.have.property('url')
            res.body.user.should.not.have.property('pass')
            done();
          });
    });

    it('it should not log in. Email not found', (done) => {
        let user = {
          email : 'rrrss@gmail.com',
          password : '12344',
        }
        chai.request(app)
          .post('/api/login')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(user)
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message')
              res.body.message.should.be.eql(`User with email:${user.email} not found. Please enter a valid account.`)
              done();
            });
      });

      it('it should not log in. User/pass invalid', (done) => {
        let user = {
          email : 'rrr@gmail.com',
          password : '1234',
        }
        chai.request(app)
          .post('/api/login')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(user)
          .end((err, res) => {
              res.should.have.status(403);
              res.body.should.have.property('message')
              res.body.message.should.be.eql(`Invalid user/password. Please enter a valid account`)
              done();
            });
      });

      it('it should not log in. User not found', (done) => {
        let user = {
          password : '12344',
        }
        chai.request(app)
          .post('/api/login')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(user)
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message')
              done();
            });
      });
  

});

/*
    * Test the /POST register route
    */
   describe('/POST REGISTER', () => {
    
    // Before the test registration we delete the row
    beforeEach( async ()=>{
        var sqlUsers = "DELETE FROM users WHERE email = 'raulito84@gmail.com'"
        var sqlCustomers = "DELETE FROM customers WHERE email = 'raulito84@gmail.com'"
        var deletedUsers = await pool.query(sqlUsers)
        var deletedCustomers = await pool.query(sqlCustomers)
    })
    
    // After the test registration we delete the row
    afterEach( async() => {
        var sqlUsers = "DELETE FROM users WHERE email = 'raulito84@gmail.com'"
        var sqlCustomers = "DELETE FROM customers WHERE email = 'raulito84@gmail.com'"
        var deletedUsers = await pool.query(sqlUsers)
        var deletedCustomers = await pool.query(sqlCustomers)
    })

    it('it should register a new user', (done) => {
        
      let user = {
        name : 'Raul',
        email : 'raulito84@gmail.com',
        password : '797832',
        type : 'customer',
        CIF : '55455093R',
        street : 'Calle de las ventas destruidas, 45, Madrid',
        phone : '432521545',
        url: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
      }
      chai.request(app)
        .post('/api/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('user')
            res.body.user.should.have.property(`email`)
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('CIF')
            res.body.user.should.have.property('street')
            res.body.user.should.have.property('phone')
            res.body.user.should.have.property('tipo')
            res.body.user.should.not.have.property('pass')
            res.body.user.should.have.property('url')
            done();
          });
    });

    it('it should not register a new user as it does not contain email', (done) => {
        
        let user = {
          name : 'Raul',
          password : '797832',
          type : 'customer',
          CIF : '55455093R',
          street : 'Calle de las ventas destruidas, 45, Madrid',
          phone : '432521545',
          url: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
        }
        chai.request(app)
          .post('/api/register')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(user)
          .end((err, res) => {
              res.should.have.status(400);
              res.error.text.should.be.eql('All field must be filled in order to create the user')
              done();
            });
      });


    
   
          // Before the test registration we delete the row
    before( async ()=>{
        var sqlUsers = "INSERT INTO users VALUES ('raulito84@gmail.com','Raul','55455093R','Calle de las ventas destruidas, 45, Madrid','797832','432521545','customer','images.com/nfown.jpg') RETURNING *"
        var deletedUsers = await pool.query(sqlUsers)
    })
    // After the test registration we delete the row
    after( async() => {
        var sqlUsers = "DELETE FROM users WHERE email = 'raulito84@gmail.com'"
        var deletedUsers = await pool.query(sqlUsers)
    })
        it('it should register a new user', (done) => {
        
            let user = {
              name : 'Raul',
              email : 'raulito84@gmail.com',
              password : '797832',
              type : 'customer',
              CIF : '55455093R',
              street : 'Calle de las ventas destruidas, 45, Madrid',
              phone : '432521545',
              url: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            }
          chai.request(app) // Register raulito84@gmail.com but its already registered!
              .post('/api/register')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('user')
                  res.body.user.should.have.property(`email`)
                  res.body.user.should.have.property('name')
                  res.body.user.should.have.property('CIF')
                  res.body.user.should.have.property('street')
                  res.body.user.should.have.property('phone')
                  res.body.user.should.have.property('tipo')
                  res.body.user.specifics.should.have.property('email')
                  res.body.user.specifics.should.have.property('card')
                  res.body.user.should.not.have.property('pass')
                  res.body.user.should.have.property('url')
                  done()
                });
          });
          
        it('it should register a new restaurant user', (done) => {

            let user = {
              name : 'Raul',
              email : 'raulito84@gmail.com',
              password : '123456',
              type : 'restaurant',
              CIF : '55455093R',
              street : 'Calle de las ventas destruidas, 45, Madrid',
              phone : '432521545',
              url: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            }
            chai.request(app)
              .post('/api/register')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('user')
                  res.body.user.should.have.property(`email`)
                  res.body.user.should.have.property('name')
                  res.body.user.should.have.property('CIF')
                  res.body.user.should.have.property('street')
                  res.body.user.should.have.property('phone')
                  res.body.user.should.have.property('tipo')
                  res.body.user.should.have.property('specifics')
                  res.body.user.specifics.should.have.property('email')
                  res.body.user.specifics.should.have.property('avaliability')
                  res.body.user.specifics.should.have.property('visible')
                  res.body.user.specifics.should.have.property('iban')
                  res.body.user.should.not.have.property('pass')
                  res.body.user.should.have.property('url')
                  done();
                });
        });
      
        it('it should register a new delivery user', (done) => {
      
          let user = {
            name : 'Raul',
            email : 'raulito84@gmail.com',
            password : '123456',
            type : 'deliveryman',
            CIF : '55455093R',
            street : 'Calle de las ventas destruidas, 45, Madrid',
            phone : '432521545',
            url: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
          }
          chai.request(app)
            .post('/api/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('user')
                  res.body.user.should.have.property(`email`)
                  res.body.user.should.have.property('name')
                  res.body.user.should.have.property('CIF')
                  res.body.user.should.have.property('street')
                  res.body.user.should.have.property('phone')
                  res.body.user.should.have.property('tipo')
                  res.body.user.should.have.property('specifics')
                  res.body.user.specifics.should.have.property('email')
                  res.body.user.specifics.should.have.property('avaliability')
                  res.body.user.specifics.should.have.property('visible')
                  res.body.user.specifics.should.have.property('iban')
                  res.body.user.should.not.have.property('pass')
                  res.body.user.should.have.property('url')
                done();
              });
        });
});
});