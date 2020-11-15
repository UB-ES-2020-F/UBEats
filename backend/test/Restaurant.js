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
describe('Restaurants', () => {

  // TEST THE DELETE RESTAURANT
  describe('DELETE /api/restaurant', () => {
    var email;

    beforeEach( async () => {
      var query = "INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant') RETURNING *"
      var insertedRest = await pool.query(query)
      emailUser = insertedRest.rows[0].email
    })
    afterEach( async () => {
      var query = "DELETE FROM users WHERE email = 'rst@gmail.com'"
      var deletedRest = await pool.query(query)
    })

    it('Delete a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email: emailUser
      }

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
          res.body.message.should.equal("User not found to delete.")
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
          res.body.message.should.equal("Feedback not found.")
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
          res.body.message.should.equal("Types not found.")
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
          res.body.message.should.equal("Menu not found.")
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
          res.body.should.have.property('email');
          res.body.should.have.property('name');
          res.body.should.have.property('CIF');
          res.body.should.have.property('street');
          res.body.should.have.property('pass');
          res.body.should.have.property('phone');
          res.body.should.have.property('tipo');
          res.body.should.have.property('avaliability');
          res.body.should.have.property('visible');
          res.body.should.have.property('iban');
          res.body.should.have.property('allergens');
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
          res.body.message.should.equal("Restaurant not found.")
          done();
        });
    });
  })

  // TEST PATCH AVALIABILITY OF RESTAURANT
  describe('PATCH /api/restaurant/setAvaliability', () => {

    it('Set Avaliability of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        avaliability : 'rojo'
      }

      chai.request(app)
        .patch('/api/restaurant/setAvaliability')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('avaliability');
          done();
        });
    });

    it('Set Avaliability of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        avaliability : 'rojo'
      }
      chai.request(app)
        .patch('/api/restaurant/setAvaliability')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Avaliability not updated.")
          done();
        });
    });
  })

  // TEST PATCH VISIBLE OF RESTAURANT
  describe('PATCH /api/restaurant/setVisible', () => {

    it('Set Visible of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        visible: 'inactive'
      }

      chai.request(app)
        .patch('/api/restaurant/setVisible')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('visible');
          done();
        });
    });

    it('Set Visible of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        visible: 'inactive'
      }
      chai.request(app)
        .patch('/api/restaurant/setVisible')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Visible not updated.")
          done();
        });
    });
  })

  // TEST PATCH IBAN OF RESTAURANT
  describe('PATCH /api/restaurant/setIban', () => {

    it('Set Iban of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        iban: 'ES1100009999888877776666'
      }

      chai.request(app)
        .patch('/api/restaurant/setIban')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('iban');
          done();
        });
    });

    it('Set Iban of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        iban: 'ES1100009999888877776666'
      }
      chai.request(app)
        .patch('/api/restaurant/setIban')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("iban not updated.")
          done();
        });
    });
  })

  // TEST PATCH ALLERGENS LINK OF RESTAURANT
  describe('PATCH /api/restaurant/setAllergens', () => {

    it('Set Allergens of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email : 'rrr@gmail.com',
        allergens: 'http://www.restaurante.com/list-of-allergens.pdf'
      }

      chai.request(app)
        .patch('/api/restaurant/setAllergens')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('allergens');
          done();
        });
    });

    it('Set Allergens of a restaurant. Invalid email. Should return 404', (done) => {
      let userM = {
        email : 'pk2mwefonw@gmail.com',
        allergens: 'http://www.restaurante.com/list-of-allergens.pdf'
      }
      chai.request(app)
        .patch('/api/restaurant/setAllergens')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("allergens not updated.")
          done();
        });
    });
  })

  // TEST POST TYPES LINK OF RESTAURANT
  describe('POST /api/restaurant/types', () => {

    it('Set Types of a restaurant. All OK. Should return 200', (done) => {

      let type1 = {
        type_id : 1,
        name :  'vegetariano',
        description : 'comida ecologica responsable con el medio ambiente y el maltrato animal'
      }

      let type2 = {
        type_id : 2,
        name :  'omnivoro',
        description : 'contiene toda clase de ingredientes de origen carnico y vegetal'
      }
      let user = {
        email : 'rrr@gmail.com',
        types: [type1.type_id,type2.type_id]
      }

      chai.request(app)
        .post('/api/restaurant/types')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('types');
          done();
        });
    });

    it('Set Types of a restaurant. Invalid email. Should return 404', (done) => {

      let type1 = {
        type_id : 1,
        name :  'vegetariano',
        description : 'comida ecologica responsable con el medio ambiente y el maltrato animal'
      }

      let type2 = {
        type_id : 2,
        name :  'omnivoro',
        description : 'contiene toda clase de ingredientes de origen carnico y vegetal'
      }
      let userM = {
        email : 'rrrojuwbnwregpfourb@gmail.com',
        types: [type1.type_id,type2.type_id]
      }

      chai.request(app)
        .post('/api/restaurant/types')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(userM)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("types not updated.")
          done();
        });
    });
  })
})