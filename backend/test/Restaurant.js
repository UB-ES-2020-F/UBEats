//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const dotenv = require('dotenv')
dotenv.config() // Configure dotenv at the beginning of the project

const {pool} = require('../database/index.js')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
const { readR } = require('../services/restaurants.js');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Restaurants', () => {

  // TEST THE DELETE RESTAURANT
  describe('DELETE /api/restaurant', () => {
    var email;

    beforeEach( async () => {
      var query = "INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/gnroijng.jpg') RETURNING *"
      var insertedRest = await pool.query(query)
      emailUser = insertedRest.rows[0].email
      //console.log(emailUser)
    })
    afterEach( async () => {
      var query = "DELETE FROM users WHERE email = 'rst@gmail.com'"
      var deletedRest = await pool.query(query)
    })

    it('Delete a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email: emailUser
      }
      //console.log(user.email)

      chai.request(app)
        .delete('/api/restaurant')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Delete a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'kjnpobrtnrptonbprotenub@gmail.com'
      }
      
      chai.request(app)
        .delete('/api/restaurant')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("User kjnpobrtnrptonbprotenub@gmail.com not found")
          done();
        });
    });
  })

  // TEST THE GET FEEDBACK OF RESTAURANT
  describe('GET /api/restaurant/feedback', () => {
    let user = {
      email : 'rrr@gmail.com'
    }

    it('Feedback of a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .get('/api/restaurant/feedback')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('feedback');
          //console.log(res.body.feedback)
          res.body.feedback.should.be.an('array').to.have.lengthOf.above(0);
          done();
        });
    });

    it('Feedback of a restaurant. Invalid email. Should return 404', (done) => {

      let userM = {
        email : 'kjnpobrtnrptonbprotenub@gmail.com'
      }

      chai.request(app)
        .get('/api/restaurant/feedback')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Feedback not found")
          done();
        });
    });
  })

  // TEST THE GET TYPES OF RESTAURANT
  describe('GET /api/restaurant/types', () => {

    it('Types of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com'
      }

      chai.request(app)
        .get('/api/restaurant/types')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('types');
          res.body.types.should.be.an('array').to.have.lengthOf.above(0);
          done();
        });
    });

    it('Types of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pwoikejnfcpowbnvc@gmail.com'
      }
      chai.request(app)
        .get('/api/restaurant/types')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Types not found")
          done();
        });
    });
  })

  // TEST THE GET MENU OF RESTAURANT
  describe('GET /api/restaurant/menu', () => {
    let user = {
      email : 'rrr@gmail.com'
    }

    it('Menu of a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .get('/api/restaurant/menu')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('menu');
          res.body.menu.should.be.an('array').to.have.lengthOf.above(0);
          done();
        });
    });

    it('Menu of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'ojuenroinr@gmail.com'
      }
      chai.request(app)
        .get('/api/restaurant/menu')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Menu not found")
          done();
        });
    });
  })

  // TEST READ ATTRIBUTES OF RESTAURANT
  describe('GET /api/restaurant/read', () => {

    it('Attributes of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com'
      }

      chai.request(app)
        .get('/api/restaurant/read')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('restaurant')
          res.body.restaurant.should.have.property('email');
          res.body.restaurant.should.have.property('name');
          res.body.restaurant.should.have.property('CIF');
          res.body.restaurant.should.have.property('street');
          res.body.restaurant.should.have.property('pass');
          res.body.restaurant.should.have.property('phone');
          res.body.restaurant.should.have.property('tipo');
          res.body.restaurant.should.have.property('url');
          res.body.restaurant.should.have.property('avaliability');
          res.body.restaurant.should.have.property('visible');
          res.body.restaurant.should.have.property('iban');
          res.body.restaurant.should.have.property('allergens');
          done();
        });
    });

    it('Attributes of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com'
      }
      chai.request(app)
        .get('/api/restaurant/read')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Restaurant not found")
          done();
        });
    });
  })

  // TEST POST AVALIABILITY OF RESTAURANT
  describe('POST /api/restaurant/setAvaliability', () => {

    afterEach( async () => {
      await pool.query("UPDATE restaurants SET avaliability='verde' WHERE email='rrr@gmail.com'")
    })

    it('Set Avaliability of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        avaliability : 'rojo'
      }
      
      chai.request(app)
        .post('/api/restaurant/setAvaliability')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('avaliability');
          res.body.avaliability.should.have.property('email');
          done();
        });
    });

    it('Set Avaliability of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        avaliability : 'rojo'
      }
      chai.request(app)
        .post('/api/restaurant/setAvaliability')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Avaliability not updated")
          done();
        });
    });
  })

  // TEST POST VISIBLE OF RESTAURANT
  describe('POST /api/restaurant/setVisible', () => {

    afterEach( async () => {
      await pool.query("UPDATE restaurants SET visible='inactive' WHERE email='rrr@gmail.com'")
    })

    it('Set Visible of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        visible: 'visible'
      }

      chai.request(app)
        .post('/api/restaurant/setVisible')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('visible');
          res.body.visible.should.have.property('email');
          done();
        });
    });

    it('Set Visible of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        visible: 'inactive'
      }
      chai.request(app)
        .post('/api/restaurant/setVisible')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Visible not updated")
          done();
        });
    });
  })

  // TEST POST IBAN OF RESTAURANT
  describe('POST /api/restaurant/setIban', () => {

    afterEach( async () => {
      await pool.query("UPDATE restaurants SET iban='ES8021000000000000001234' WHERE email='rrr@gmail.com'")
    })

    it('Set Iban of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        iban: 'ES1100009999888877776666'
      }

      chai.request(app)
        .post('/api/restaurant/setIban')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('iban');
          res.body.iban.should.have.property('email');
          done();
        });
    });

    it('Set Iban of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        iban: 'ES1100009999888877776666'
      }
      chai.request(app)
        .post('/api/restaurant/setIban')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Iban not updated")
          done();
        });
    });
  })

  // TEST POST ALLERGENS LINK OF RESTAURANT
  describe('POST /api/restaurant/setAllergens', () => {

    afterEach( async () => {
      await pool.query("UPDATE restaurants SET allergens='' WHERE email='rrr@gmail.com'")
    })

    it('Set Allergens of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        allergens: 'http://www.restaurante.com/list-of-allergens.pdf'
      }

      chai.request(app)
        .post('/api/restaurant/setAllergens')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('allergens');
          res.body.allergens.should.have.property('email');
          done();
        });
    });

    it('Set Allergens of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        allergens: 'http://www.restaurante.com/list-of-allergens.pdf'
      }
      chai.request(app)
        .post('/api/restaurant/setAllergens')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Allergens not updated")
          done();
        });
    });
  })

  // TEST DELETE A TYPE OF A RESTAURANT
  describe('DELETE /api/restaurant/type', () => {

    beforeEach(async () => {
      await pool.query("INSERT INTO type_restaurants VALUES (2,'rrr@gmail.com')")
    });

    afterEach(async () => {
      await pool.query("DELETE FROM type_restaurants WHERE type_id='2' AND rest_id='rrr@gmail.com'")
    });
    

    it('Delete a type of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        type_id: 2
      }

      chai.request(app)
        .delete('/api/restaurant/type')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('delType');
          res.body.delType.should.have.property('type_id');
          res.body.delType.should.have.property('rest_id');
          done();
        });
    });

    it('Delete a type of a restaurant. Invalid email. Should return 404', (done) => {

      let userM = {
        email : 'rrgbergrbbr@gmail.com',
        type_id: 1
      }

      chai.request(app)
        .delete('/api/restaurant/type')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Type not deleted")
          done();
        });
    });
  })

  // TEST POST A TYPE OF A RESTAURANT
  describe('POST /api/restaurant/type', () => {

    afterEach(async () => {
      await pool.query("DELETE FROM type_restaurants WHERE type_id='2' AND rest_id='rrr@gmail.com'")
    });

    it('Insert a type of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        type_id: 2
      }

      chai.request(app)
        .post('/api/restaurant/type')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('insType');
          res.body.insType.should.have.property('type_id');
          res.body.insType.should.have.property('rest_id');
          done();
        });
    });

    it('Insert a type of a restaurant. Invalid email. Should return 404', (done) => {

      let userM = {
        email : 'rrgbergrtrtrbbr@gmail.com',
        type_id: 1
      }

      chai.request(app)
        .post('/api/restaurant/type')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Type not added")
          done();
        });
    });
  })
})