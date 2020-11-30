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
describe('Extra items', () => {
  let user = {
    email: 'fulanito@imap.server.com',
    name: 'Fulanito',
    CIF: '55455093R',
    street: 'C/ de la piruleta, 123',
    pass: 'supercontrasena',
    phone: '123456789',
    type: 'restaurant',
    url: 'https://pornhub.com/643wh&e',
  }

  var restaurant = {
    email: 'fulanito@imap.server.com',
    avaliability: 'amarillo',
    visible: 'invisible',
    iban: '111222333444555666777888',
    allergens: 'gluten',
  }

  let category = {
    category: 'Mi supercategoria',
    rest_id: 'fulanito@imap.server.com',
  }

  var item = {
    title: 'Pan seca del dia anterior',
    desc: 'pues eso, una barra de pan seca del dia anterior, ¿qué te esperabas?',
    price: 3.1415,
    visible: '1',
    rest_id: 'fulanito@imap.server.com',
    url: 'https://imgur.com/71g134913',
    cat_id: 1,
  }

  var extra_item = {
    name: "Cola-Coca Light",
    desc: "Cola-Coca sin azúcares añadidos",
    price: "2.789",
    mandatory: '1',
    item_id: 1,
  }

  var extra_item_id;

  var saved_extra_items_table;

  before( async () => {
    // save and clean the extra_items table
    var result = await pool.query('DELETE FROM extra_items RETURNING *')
    saved_extra_items_table = result.rows

    //Insert a new user
    var query = format('INSERT INTO users VALUES(%L) RETURNING *', Object.values(user))
    var result = await pool.query(query)
    restaurant.email = result.rows[0].email

    //Insert a new restaurant
    query = format('INSERT INTO restaurants VALUES(%L) RETURNING *', Object.values(restaurant))
    result = await pool.query(query)
    item.rest_id = result.rows[0].email
    category.rest_id = result.rows[0].email

    //Insert a new category
    query = format('INSERT INTO categories VALUES(DEFAULT, %L) RETURNING *', Object.values(category))
    result = await pool.query(query)
    item.cat_id = result.rows[0].cat_id

    //Insert a new item
    query = format('INSERT INTO items VALUES(DEFAULT, %L) RETURNING *', Object.values(item))
    result = await pool.query(query)
    extra_item.item_id = result.rows[0].item_id

    
  })

  after( async () => {
    //Delete item
    query = format('DELETE FROM items WHERE item_id = %L', extra_item.item_id)
    result = await pool.query(query)

    //Delete category
    query = format('DELETE FROM categories WHERE cat_id = %s', item.cat_id)
    result = await pool.query(query)

    //Delete restaurant
    query = format('DELETE FROM restaurants WHERE email = %L', item.rest_id)
    result = await pool.query(query)

    //Delete user
    query = format('DELETE FROM users WHERE email = %L', item.rest_id)
    result = await pool.query(query)

    // restore the table
    for(var i = 0; i < saved_extra_items_table.length; ++i)
    {
      var query2 = format('INSERT INTO extra_items VALUES(%L) RETURNING *', Object.values(saved_extra_items_table[i]))
      var result2 = await pool.query(query2)
    }
  })

  beforeEach( async () => {
    //Insert a new extra_item
    query = format('INSERT INTO extra_items VALUES(DEFAULT, %L) RETURNING *', Object.values(extra_item))
    result = await pool.query(query)
    extra_item_id = result.rows[0].extraitem_id
  })

  afterEach( async () => {
    //Delete extra item
    query = format('DELETE FROM extra_items WHERE extraitem_id = %L', extra_item_id)
    result = await pool.query(query)
  })

  // TEST THE GET ALL EXTRAS FOR ITEM ENDPOINT
  describe('/GET ALL EXTRAS FOR ITEM', () => {
    it('Get all extra items for a known existing item. Should return 200', (done) => {
      chai.request(app)
        .get(`/api/items/${extra_item.item_id}/extras`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('extras')
            res.body.extras.should.be.an('array').to.have.lengthOf(1);
            res.body.extras[0].should.have.property('extraitem_id')
            res.body.extras[0].should.have.property('name')
            res.body.extras[0].name.should.equal(extra_item.name)
            res.body.extras[0].should.have.property('desc')
            res.body.extras[0].should.have.property('price')
            res.body.extras[0].should.have.property('item_id')
            done();
          });
    })

    it('Get all extra items for a known non existing item. Should return 404', (done) => {
        chai.request(app)
          .get(`/api/items/${extra_item.item_id+1}/extras`)
          .set('content-type', 'application/x-www-form-urlencoded')
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message')
              done();
            });
    })
  })

  // TEST THE GET EXTRA ITEM FOR ITEM ENDPOINT
  describe('/GET EXTRA ITEM FOR ITEM', () => {
    it('Get one known extra item for a known existing item. Should return 200', (done) => {
      chai.request(app)
        .get(`/api/items/${extra_item.item_id}/extras/${extra_item_id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('extra')
          res.body.extra.should.have.property('name').equal(extra_item.name)
          done();
        });
    })

    it('Get one known existing extra item for a known non existing item. Should return 404', (done) => {
      chai.request(app)
        .get(`/api/items/${extra_item.item_id+1}/extras/${extra_item_id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          done();
        });
    })

    it('Get one known non existing extra item for a known existing item. Should return 404', (done) => {
      chai.request(app)
        .get(`/api/items/${extra_item.item_id}/extras/${extra_item_id+1}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          done();
        });

    })
  })

  // TEST THE POST EXTRA ITEM ENDPOINT
  describe('/POST EXTRA ITEM FOR ITEM', () => {

    var extra_item_id2;

    var extra_item2 = Object.assign({}, extra_item)
    extra_item2.price = -2.789
    extra_item2.mandatory = '2'

    beforeEach( async () => {
      extra_item.name = "Ispep Light"
    })

    afterEach( async () => {
      extra_item.name = "Pepsi Light"

      var result = await pool.query('DELETE FROM extra_items WHERE extraitem_id = $1 RETURNING *', [extra_item_id2])
    })

    it('Post a new extra item. Body is OK. Should return 200', (done) => {
      chai.request(app)
        .post(`/api/items/${extra_item.item_id}/extras`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('extra')
          res.body.extra.should.have.property('name').equal(extra_item.name)
          res.body.extra.should.have.property('desc').equal(extra_item.desc)
          res.body.extra.should.have.property('price').equal(parseFloat(extra_item.price))
          res.body.extra.should.have.property('item_id').equal(extra_item.item_id)
          extra_item_id2 = res.body.extra.extraitem_id
          done();
        });
    })

    it('Post a new extra item. Body is not OK. Should return 403', (done) => {
      chai.request(app)
        .post(`/api/items/${extra_item.item_id}/extras`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          done();
        });
    })

    it('Post a new extra item. Item ID does not exists. Should return 404', (done) => {
      chai.request(app)
        .post(`/api/items/${extra_item.item_id+1}/extras`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          done();
        });
    })

    it('Post a bad body to an item id that does not exist. Should return 404', (done) => {
      chai.request(app)
        .post(`/api/items/${extra_item.item_id+1}/extras`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          done();
        });
    })
  })

  //TEST THE PUT ENDPOINT
  describe('/PUT EXTRA ITEM FOR ITEM', () => {

    var extra_item2 = Object.assign({}, extra_item)
    extra_item2.name = "Ispep Light"
    extra_item2.price = 3.1415
    extra_item2.mandatory = '1'
    var extra_item2_id;

    var extra_item3 = Object.assign({}, extra_item2)
    extra_item3.price = -3

    beforeEach( async () => {
      const query = format('INSERT INTO extra_items VALUES(DEFAULT, %L) RETURNING *', Object.values(extra_item2))
      const result = await pool.query(query)
      extra_item2_id = result.rows[0].extraitem_id
    })

    afterEach( async () => {
      var result = await pool.query('DELETE FROM extra_items WHERE extraitem_id = $1 RETURNING *', [extra_item2_id])
    })

    it('Update a known existing extra item for a known existing item. The body is OK. Should return 200', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id}/extras/${extra_item2_id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('extra')
          res.body.extra.should.have.property('name').equal(extra_item2.name)
          res.body.extra.should.have.property('desc').equal(extra_item2.desc)
          res.body.extra.should.have.property('price').equal(parseFloat(extra_item2.price))
          res.body.extra.should.have.property('item_id').equal(extra_item2.item_id)
          done();
        });
    })

    it('Update a known existing extra item for a known existing item. The body is NOT OK. Should return 403', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id}/extras/${extra_item2_id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item3)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          done();
        });
    })


    it('Update a known non existing extra item for a known existing item. The body is OK. Should return 404', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id}/extras/${extra_item2_id+1}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          done();
        });
    })

    it('Update a known non existing extra item for a known non existing item. The body is OK. Should return 403', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id+1}/extras/${extra_item2_id+1}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          done();
        });
    })


  })

  //TEST THE DELETE ENDPOINT
  describe('/DELETE EXTRA ITEM FOR ITEM', () => {
    var extra_item2 = Object.assign({}, extra_item)
    var extra_item2_id;

    beforeEach( async () => {
      const query = format('INSERT INTO extra_items VALUES(DEFAULT, %L) RETURNING *', Object.values(extra_item2))
      const result = await pool.query(query)
      extra_item2_id = result.rows[0].extraitem_id
    })

    afterEach( async () => {
      const result = await pool.query(`DELETE FROM extra_items WHERE extraitem_id = ${extra_item2_id}`)
    })

    it('Delette a known existing item. Should return 200', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id}/extras/${extra_item2_id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('extra')
          res.body.extra.should.have.property('name').equal(extra_item2.name)
          res.body.extra.should.have.property('desc').equal(extra_item2.desc)
          res.body.extra.should.have.property('price').equal(parseFloat(extra_item2.price))
          res.body.extra.should.have.property('item_id').equal(extra_item2.item_id)
          done();
        });
    })

    it('Delette a known non existing extra for a known existing item. Should return 404', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id}/extras/${extra_item2_id+1}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          done();
        });
    })

    it('Delette a known non existing extra for a known non existing item. Should return 403', (done) => {
      chai.request(app)
        .put(`/api/items/${extra_item2.item_id+1}/extras/${extra_item2_id+1}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(extra_item2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          done();
        });
    })

  })
})

