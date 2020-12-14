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

  // TEST THE GET ALL ENDPOINT
  describe('/GET RESTAURANTS', () => {

    beforeEach( async () => {
      var query = "INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *"
      await pool.query(query)
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailUser = insertedRest.rows[0].email
      //console.log(emailUser)

      var query2 = "INSERT INTO users VALUES ('rst2@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *"
      await pool.query(query2)
      var insertedRest2 = await pool.query("INSERT INTO restaurants VALUES ('rst2@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst2.com/allergens.pdf') RETURNING *")
      emailUser2 = insertedRest2.rows[0].email
      //console.log(emailUser2)

      var types = await pool.query("INSERT INTO types VALUES (DEFAULT,'vegetariano','comida vegetariana que por tanto incluye huevo y queso'),(DEFAULT,'vegano','comida mas restrictiva, no hay nada de origen animal') RETURNING *")
      tid1 = types.rows[0].type_id
      tid2 = types.rows[1].type_id
      var query2 = `INSERT INTO type_restaurants VALUES (${tid1},'rst@gmail.com'),(${tid2},'rst@gmail.com'),(${tid1},'rst2@gmail.com'),(${tid2},'rst2@gmail.com') RETURNING *`
      await pool.query(query2)
    })

    afterEach( async () => {
      var query = "DELETE FROM users WHERE email = 'rst@gmail.com' OR email = 'rst2@gmail.com'"
      var deletedRest = await pool.query(query)

      var query2 = `DELETE FROM types WHERE type_id=${tid1} OR type_id=${tid2}`
      await pool.query(query2)
    })

    it('Get all existing restaurants. Should return 200', (done) => {
      chai.request(app)
        .get('/api/restaurants')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rest');
            //console.log(res.body.rest)
            res.body.rest.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });
    });
  });

// TEST THE GET ALL BY USER ENDPOINT
  describe('/GET RESTAURANTS by user', () => {

    beforeEach( async () => {
      var queryRestaurants = "INSERT INTO users VALUES ('firstrestaurant@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg'), ('secondrestaurant@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg'),('thirdrestaurant@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *"
      var queryCustomers = "INSERT INTO users VALUES ('firstcustomer@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','customer','images.com/perfil.jpg'), ('secondcustomer@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','customer','images.com/perfil.jpg'),('thirdcustomer@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','customer','images.com/perfil.jpg') RETURNING *"
      await pool.query(queryRestaurants)
      await pool.query(queryCustomers)

      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('firstrestaurant@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf'), ('secondrestaurant@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf'), ('thirdrestaurant@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      var insertedCust = await pool.query("INSERT INTO customers VALUES ('firstcustomer@gmail.com','12124545898923231023149'), ('secondcustomer@gmail.com','12124545898923231023149'), ('thirdcustomer@gmail.com','12124545898923231023149') RETURNING *")
      
      // Favourites
      await pool.query("INSERT INTO favourites VALUES ('firstcustomer@gmail.com', 'firstrestaurant@gmail.com'), ('firstcustomer@gmail.com', 'thirdrestaurant@gmail.com'), ('secondcustomer@gmail.com', 'firstrestaurant@gmail.com'), ('thirdcustomer@gmail.com','firstrestaurant@gmail.com'), ('thirdcustomer@gmail.com', 'secondrestaurant@gmail.com'), ('thirdcustomer@gmail.com', 'thirdrestaurant@gmail.com') RETURNING *")

     emailUser = insertedRest.rows[0].email
    })
    
    afterEach( async () => {
      var queryRest = "DELETE FROM users WHERE email = 'firstrestaurant@gmail.com' or email = 'secondrestaurant@gmail.com' or email = 'thirdrestaurant@gmail.com'"
      var queryCust = "DELETE FROM users WHERE email = 'firstcustomer@gmail.com' or email = 'secondcustomer@gmail.com' or email = 'thirdcustomer@gmail.com'"
      await pool.query(queryRest)
      await pool.query(queryCust)

    })

    it('Get all existing restaurants by user. Should return 200', (done) => {
      chai.request(app)
        .get('/api/restaurants/user/'.concat(emailUser))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            //console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.property('rest');
            // console.log(res.body.rest)
            //res.body.rest.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });
    });

    it('Get all existing restaurants by user. Gets error as email is not specified Should return 403', (done) => {
      chai.request(app)
        .get('/api/restaurants/user/'.concat(emailUser))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('rest');
            //console.log(res.body.rest)
            res.body.rest.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });
    });
  });

  // TEST READ AN EXISTING RESTAURANT BY EMAIL
  describe('GET /api/restaurants', () => {

    beforeEach( async () => {
      var query = "INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *"
      await pool.query(query)
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailUser = insertedRest.rows[0].email
      //console.log(emailUser)

      var types = await pool.query("INSERT INTO types VALUES (DEFAULT,'vegetariano','comida vegetariana que por tanto incluye huevo y queso'),(DEFAULT,'vegano','comida mas restrictiva, no hay nada de origen animal') RETURNING *")
      tid1 = types.rows[0].type_id
      tid2 = types.rows[1].type_id
      var query2 = `INSERT INTO type_restaurants VALUES (${tid1},'rst@gmail.com'),(${tid2},'rst@gmail.com') RETURNING *`
      await pool.query(query2)
    })
    afterEach( async () => {
      var query = "DELETE FROM users WHERE email = 'rst@gmail.com'"
      await pool.query(query)

      var query2 = `DELETE FROM types WHERE type_id=${tid1} OR type_id=${tid2}`
      await pool.query(query2)
    })

    it('Get a restaurant by email. All OK. Should return 200', (done) => {

      chai.request(app)
        .get('/api/restaurants/'.concat(emailUser))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('restaurant')
          //console.log(res.body.restaurant)
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
          res.body.restaurant.should.have.property('types');
          res.body.restaurant.types.should.be.an('array').to.have.lengthOf.above(0);
          done();
        });
    });

    it('Get a restaurant by email. Invalid email. Should return 404', (done) => {
      chai.request(app)
        .get('/api/restaurants/'.concat(emailUser).concat('x'))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST THE DELETE RESTAURANT
  describe('DELETE /api/restaurants', () => {

    beforeEach( async () => {
      var query = "INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *"
      await pool.query(query)
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailUser = insertedRest.rows[0].email
      //console.log(emailUser)
    })
    afterEach( async () => {
      var query = "DELETE FROM users WHERE email = 'rst@gmail.com'"
      var deletedRest = await pool.query(query)
    })

    it('Delete a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .delete('/api/restaurants/'.concat(emailUser))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Delete a restaurant. Invalid email. Should return 404', (done) => {
      
      chai.request(app)
        .delete('/api/restaurants/'.concat(emailUser).concat('x'))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST THE PUT ENDPOINT
  describe('UPDATE /api/restaurants', () => {

    beforeEach( async () => {
      var query = "INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *"
      await pool.query(query)
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailUser = insertedRest.rows[0].email
      //console.log(emailUser)
    })
    afterEach( async () => {
      var query = "DELETE FROM users WHERE email = 'rst@gmail.com'"
      var deletedRest = await pool.query(query)
    })

    it('Update a restaurant. All OK. Should return 200', (done) => {

      let user = {
        iban: 'ES7021000022293894885934'
      }

      chai.request(app)
        .put('/api/restaurants/'.concat(emailUser))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('restaurant')
          res.body.restaurant.should.have.property('iban')
          res.body.restaurant.iban.should.equal('ES7021000022293894885934')
          done();
        });
    });

    it('Update a restaurant. Invalid IBAN. Should return 403', (done) => {
      
      let user = {
        iban: 'ES500022'
      }

      chai.request(app)
        .put('/api/restaurants/'.concat(emailUser))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST THE GET FEEDBACK OF RESTAURANT
  describe('GET /api/restaurants/feedback', () => {
    
    beforeEach( async () => {
      await pool.query("INSERT INTO users VALUES ('customer_test@gmail.com', 'Raul', '44444445S','calle arago 30. barcelona','1234','696696687','customer','images.com/perfil.jpg') RETURNING *")
      await pool.query("INSERT INTO customers VALUES ('customer_test@gmail.com', '11111111111111112222333') RETURNING *")
      await pool.query("INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil2.jpg') RETURNING *")
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailRest = insertedRest.rows[0].email
      //console.log(emailRest)

      await pool.query("INSERT INTO feedbacks VALUES ('rst@gmail.com','customer_test@gmail.com',8,'comida de calidad a precio economico',CURRENT_TIMESTAMP(0)) RETURNING *")
    })
    afterEach( async () => {
      await pool.query("DELETE FROM users WHERE email = 'rst@gmail.com' OR email = 'customer_test@gmail.com'")
    })

    it('Feedback of a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .get('/api/restaurants/feedback/'.concat(emailRest))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('feedback');
          //console.log(res.body.feedback)
          res.body.feedback.should.be.an('array').to.have.lengthOf.above(0);
          done();
        });
    });

    it('Feedback of a restaurant. Invalid email. Should return 404', (done) => {

      chai.request(app)
        .get('/api/restaurants/feedback'.concat(emailRest).concat('x'))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST THE GET MENU OF RESTAURANT
  describe('GET /api/restaurants/menu', () => {
    var cat_id;
    var item_id;
    var type_id1;
    var type_id2;

    beforeEach( async () => {
      await pool.query("INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *")
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailRest = insertedRest.rows[0].email

      var category = await pool.query("INSERT INTO categories VALUES (DEFAULT,'New items','rst@gmail.com') RETURNING *")
      cat_id = category.rows[0].cat_id

      var insertedItem = await pool.query(`INSERT INTO items VALUES (DEFAULT,'espaguetis tartufo','Espaguetis con salsa tartufata hecha a base de setas y trufa negra',10.95,'1','rst@gmail.com','',${cat_id}) RETURNING *`)
      item_id = insertedItem.rows[0].item_id

      var types = await pool.query("INSERT INTO types VALUES (DEFAULT,'vegetariano','comida vegetariana que por tanto incluye huevo y queso'),(DEFAULT,'vegano','comida mas restrictiva, no hay nada de origen animal') RETURNING *")
      type_id1 = types.rows[0].type_id
      type_id2 = types.rows[1].type_id

      var query = `INSERT INTO type_items VALUES (${type_id1},${item_id}),(${type_id2},${item_id}) RETURNING *`
      await pool.query(query)
    })
    afterEach( async () => {
      await pool.query("DELETE FROM users WHERE email = 'rst@gmail.com'")
      await pool.query(`DELETE FROM types WHERE type_id=${type_id1} OR type_id=${type_id2}`)
    })

    it('Menu of a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .get('/api/restaurants/menu/'.concat(emailRest))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('menu');
          //console.log(res.body.menu)
          done();
        });
    });

    it('Menu of a restaurant. Invalid email. Should return 404', (done) => {

      chai.request(app)
        .get('/api/restaurants/menu/'.concat(emailRest).concat('x'))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST THE GET TYPES OF RESTAURANT
  describe('GET /api/restaurants/types', () => {
    var tid1;
    var tid2;

    beforeEach( async () => {
      await pool.query("INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *")
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailRest = insertedRest.rows[0].email

      var types = await pool.query("INSERT INTO types VALUES (DEFAULT,'vegetariano','comida vegetariana que por tanto incluye huevo y queso'),(DEFAULT,'vegano','comida mas restrictiva, no hay nada de origen animal') RETURNING *")
      tid1 = types.rows[0].type_id
      tid2 = types.rows[1].type_id
      var query = `INSERT INTO type_restaurants VALUES (${tid1},'rst@gmail.com'),(${tid2},'rst@gmail.com') RETURNING *`
      await pool.query(query)
    })
    afterEach( async () => {
      await pool.query("DELETE FROM users WHERE email = 'rst@gmail.com'")
      var query2 = `DELETE FROM types WHERE type_id=${tid1} OR type_id=${tid2}`
      await pool.query(query2)
    })

    it('Types of a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .get('/api/restaurants/types/'.concat(emailRest))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('types');
          //console.log(res.body.types)
          res.body.types.should.be.an('array').to.have.lengthOf.above(0);
          done();
        });
    });

    it('Types of a restaurant. Invalid email. Should return 404', (done) => {

      chai.request(app)
        .get('/api/restaurants/types/'.concat(emailRest).concat('x'))

        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST POST A TYPE OF A RESTAURANT
  describe('POST /api/restaurants/types', () => {
    var tid1;
    var tid2;

    beforeEach( async () => {
      await pool.query("INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *")
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailRest = insertedRest.rows[0].email

      var types = await pool.query("INSERT INTO types VALUES (DEFAULT,'vegetariano','comida vegetariana que por tanto incluye huevo y queso'),(DEFAULT,'vegano','comida mas restrictiva, no hay nada de origen animal') RETURNING *")
      tid1 = types.rows[0].type_id
      tid2 = types.rows[1].type_id
    })
    afterEach( async () => {
      await pool.query("DELETE FROM users WHERE email = 'rst@gmail.com'")
      var query2 = `DELETE FROM types WHERE type_id=${tid1} OR type_id=${tid2}`
      await pool.query(query2)
    })

    it('Insert a type of a restaurant. All OK. Should return 200', (done) => {

      let user = {
        email: emailRest,
        type_id: tid1
      }

      chai.request(app)
        .post('/api/restaurants/types')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('insType');
          //console.log(res.body.insType)
          res.body.insType.should.have.property('type_id');
          res.body.insType.should.have.property('rest_id');
          done();
        });
    });

    it('Insert a type of a restaurant. Invalid email. Should return 404', (done) => {

      let user = {
        email : emailRest.concat('x'),
        type_id: tid2
      }

      chai.request(app)
        .post('/api/restaurants/types')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })

  // TEST DELETE A TYPE OF A RESTAURANT
  describe('DELETE /api/restaurants/types', () => {
    var tid1;
    var tid2;

    beforeEach( async () => {
      await pool.query("INSERT INTO users VALUES ('rst@gmail.com', 'roberto', '44444444E','calle arago 35. barcelona','1234','696696686','restaurant','images.com/perfil.jpg') RETURNING *")
      var insertedRest = await pool.query("INSERT INTO restaurants VALUES ('rst@gmail.com','verde','inactive','ES8721000022293894885934','restaurante-rst.com/allergens.pdf') RETURNING *")
      emailRest = insertedRest.rows[0].email

      var types = await pool.query("INSERT INTO types VALUES (DEFAULT,'vegetariano','comida vegetariana que por tanto incluye huevo y queso'),(DEFAULT,'vegano','comida mas restrictiva, no hay nada de origen animal') RETURNING *")
      tid1 = types.rows[0].type_id
      tid2 = types.rows[1].type_id

      var query = `INSERT INTO type_restaurants VALUES (${tid1},'rst@gmail.com'),(${tid2},'rst@gmail.com') RETURNING *`
      await pool.query(query)
    })
    afterEach( async () => {
      await pool.query("DELETE FROM users WHERE email = 'rst@gmail.com'")
      var query2 = `DELETE FROM types WHERE type_id=${tid1} OR type_id=${tid2}`
      await pool.query(query2)
    })

    it('Delete a type of a restaurant. All OK. Should return 200', (done) => {

      chai.request(app)
        .delete('/api/restaurants/types/'.concat(emailRest).concat('/').concat(tid1))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('delType');
          //console.log(res.body.delType)
          res.body.delType.should.have.property('type_id');
          res.body.delType.should.have.property('rest_id');
          done();
        });
    });

    it('Delete a type of a restaurant. Invalid email. Should return 404', (done) => {

      chai.request(app)
      .delete('/api/restaurants/types/'.concat(emailRest).concat('x/').concat(tid1))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          done();
        });
    });
  })
})
