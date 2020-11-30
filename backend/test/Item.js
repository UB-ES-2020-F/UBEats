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
describe('Items', () => {

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

  var item_id = 1;

  var saved_items_table;

  before( async () => {
    // save and clean the table
    var query = format('DELETE FROM items RETURNING *')
    var result = await pool.query(query)

    saved_items_table = result.rows

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
  })

  after( async () => {
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
    for(var i = 0; i < saved_items_table.length; ++i)
    {
      var query2 = format('INSERT INTO items VALUES(%L) RETURNING *', Object.values(saved_items_table[i]))
      var result2 = await pool.query(query2)
    }
  })

  beforeEach( async () => {
    //Insert a new item
    query = format('INSERT INTO items VALUES(DEFAULT, %L) RETURNING *', Object.values(item))
    result = await pool.query(query)
    item_id = result.rows[0].item_id
  })

  afterEach( async() => {
    //Delete item
    var query = format('DELETE FROM items WHERE item_id = %s', item_id)
    var result = await pool.query(query)
  })

  // TEST DE GET ENDPOINT
  describe('/GET ITEM', () => {
    it('Get a known existing item. Should return 200', (done) => {
      chai.request(app)
        .get('/api/items/'.concat(item_id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('item')
            res.body.item.should.have.property('item_id')
            res.body.item.should.have.property('title')
            res.body.item.title.should.equal(item.title)
            res.body.item.should.have.property('desc')
            res.body.item.should.have.property('price')
            res.body.item.should.have.property('visible')
            res.body.item.should.have.property('rest_id')
            res.body.item.should.have.property('url')
            res.body.item.should.have.property('cat_id')
            res.body.item.should.have.property('category')
            done();
          });
    });

    it('Get a known non existing item. Should return 404', (done) => {
      chai.request(app)
      //after the insert, id must be the largest item_id on the ddbb
      //and therefore, id+1 is non existent
        .get('/api/items/'.concat(item_id+1))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message')
            done();
          });
    });

  })

  // TEST THE GET ALL ENDPOINT
  describe('/GET ITEMS', () => {
     it('Get all existing items. Should return 200', (done) => {
      chai.request(app)
        .get('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('items');
            res.body.items.should.be.an('array').to.have.lengthOf(1);
            done();
          });
    });
  });

  // TEST THE GET ALL FOR A RESTAURANT
  describe('/GET RESTAURANT ITEMS', () => {
    it('Get all items for a specific restaurant. Should return 200', (done) => {
      chai.request(app)
        .get('/api/restaurant/'.concat(item.rest_id, '/items'))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('items');
            res.body.items.should.be.an('array').to.have.lengthOf(1);
            done();
          });
    });

    it('Get all items for a non existing restaurant. Should return 200 and an empty list', (done) => {
      chai.request(app)
        .get('/api/restaurant/qpmzuywbwi@inventado.com/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('items');
            res.body.items.should.be.an('array').to.have.lengthOf(0);
            done();
          });
    });
  });

  // TEST THE POST ENDPOINT
  describe('POST /api/items', () => {
    beforeEach( async () => {
      var query = "DELETE FROM items WHERE title = 'plato numero 3'"
      var deletedItems = await pool.query(query)
    })
    afterEach( async () => {
      var query = "DELETE FROM items WHERE title = 'plato numero 3'"
      var deletedItems = await pool.query(query)
    })

    it('Create a new item. All OK. Should return 200', (done) => {
      let item2 = {
        title: 'plato numero 3',
        desc: 'Todavia no nos hemos decidido por un nombre',
        price: 3.141592,
        rest_id: item.rest_id,
        url: 'www.images.com/ofnforn.jpg',
        cat_id: item.cat_id,
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item2)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('item')
          res.body.item.should.have.property('title')
          res.body.item.should.have.property('desc')
          res.body.item.should.have.property('price')
          res.body.item.should.have.property('visible')
          res.body.item.should.have.property('rest_id')
          res.body.item.should.have.property('url')
          res.body.item.should.have.property('cat_id')
          done();
        });
    });

    it('Create a new item. Malformed body. Should return 403', (done) => {
      let item2 = {
        desc: 'Chuleta de cerdo con especias de noseque',
        price: 3.141592,
        rest_id: item.rest_id,
        url: 'images.com/nfvosnf.jpg',
        cat_id: item.cat_id,
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          res.body.message.should.equal("Could not create item")
          res.body.should.have.property('error')
          res.body.error.should.equal("No title provided for item\n")
          done();
        });
    });

    it('Create a new item. Invalid params. Should return 403', (done) => {
      let item2 = {
        title: 'tortilla de patatas del mercadona',
        desc: 'Con cebolla o sin cebolla, esa es la cuestion',
        price: 3.141592,
        rest_id: item.rest_id,
        url: 'www.images.com/ofnforn.jpg',
        cat_id: item.cat_id,
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          res.body.message.should.equal("Could not create item")
          res.body.should.have.property('error')
          res.body.error.should.equal("Title exceeds the limit of 30 chars\n")
          done();
        });
    });

    it('Create a new item. Invalid params. Should return 403', (done) => {
      let item2 = {
        title: 'Entrecot vegetariano',
        desc: 'Carne pero sin carne',
        price: -3.1415,
        url: 'images.com/nfvosnf.jpg',
        cat_id: item.cat_id,
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          res.body.message.should.equal("Could not create item")
          res.body.should.have.property('error')
          res.body.error.should.equal("Item price is a negative number\nNo restaurant provided for item\n")
          done();
        });
    });
  });
  
  // TEST THE DELETE ENDPOINT
  describe('DELETE /api/items', () => {
    var id;

    var item2 = {
      title: "Sopa de sobre",
      desc: "Gallina negra",
      price: 3.141592,
      visible: '0',
      rest_id: restaurant.email,
      url: '',
      cat_id: item.cat_id
    }

    beforeEach( async () => {
      item2.rest_id = item.rest_id
      item2.cat_id = item.cat_id
      var query = format('INSERT INTO items VALUES(DEFAULT, %L) RETURNING *', Object.values(item2))
      //console.log(query)

      var insertedItems = await pool.query(query)
      id = insertedItems.rows[0].item_id
    })

    afterEach( async () => {
      var query = `DELETE FROM items WHERE item_id = ${id}`
      var deletedItems = await pool.query(query)
    })


    it('Delete an item. All OK. Should return 200', (done) => {
      chai.request(app)
        .delete('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('item');
          res.body.item.should.have.property('title')
          res.body.item.should.have.property('desc')
          res.body.item.should.have.property('price')
          res.body.item.should.have.property('visible')
          res.body.item.should.have.property('rest_id')
          res.body.item.should.have.property('url')
          res.body.item.should.have.property('cat_id')
          done();
        });
    });

    it('Delete a non existing item. Should return 404', (done) => {

      chai.request(app)
        .delete('/api/items/'.concat(id+1))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal(`Item ${id+1} not found`)
          done();
        });
    });

  });

  // TEST THE PUT ENDPOINT
  describe('PUT /api/items', () => {
    var id;
    var saved_title;

    var item2 = {
      title: "Sardinas en lata",
      desc: "La lata se venda aparte",
      price: 3.141592,
      visible: '0',
      rest_id: restaurant.email,
      url: 'imges_of_cats.com',
      cat_id: item.cat_id
    }

    beforeEach( async () => {
      item2.rest_id = restaurant.email
      item2.cat_id = item.cat_id
      var query = format("INSERT INTO items VALUES (DEFAULT, %L) RETURNING *", Object.values(item2))
      var insertedItems = await pool.query(query)
      id = insertedItems.rows[0].item_id
      saved_title = insertedItems.rows[0].title
    })

    afterEach( async () => {
      var query = `DELETE FROM items WHERE item_id = ${id}`
      var deletedItems = await pool.query(query)
    })

    it('Update an item. All OK. Should return 200', (done) => {
      let item = {
        title: 'Lagarto muerto',
        url: 'more_images_of_kitties.com/1.jpg',
      }

      chai.request(app)
        .put('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('item');
          res.body.item.should.have.property('title')
          res.body.item.title.should.equal('Lagarto muerto')
          res.body.item.should.have.property('desc')
          res.body.item.should.have.property('price')
          res.body.item.should.have.property('visible')
          res.body.item.should.have.property('rest_id')
          res.body.item.should.have.property('url')
          res.body.item.url.should.equal('more_images_of_kitties.com/1.jpg')
          res.body.item.should.have.property('cat_id')
          done();
        });
    });

    it('Update an item. Invalid parameters. Should return 403', (done) => {
      let item = {
        title: 'Lagarto vivo y el resto es relleno que necesito para hacer que la string exceda 30 chars',
        desc: 'Un caiman que me he encontrado por casa',
        price: 3.141592,
        rest_id: 'rrr@gmail.com',
        url: 'www.images.com/ofnforn.jpg',
        cat_id: 4
      }

      chai.request(app)
        .put('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          res.body.message.should.equal("Could not update item")
          res.body.should.have.property('error')
          res.body.error.should.equal("Title exceeds the limit of 30 chars\n")
          done();
        });
    });

    it('Update an item. Invalid parameters. Should return 403', (done) => {
      let item = {
        title: 'Hamburguesa sorpresa',
        desc: 'Ni nosotros sabemos lo que lleva',
        price: -3.1415,
      }

      chai.request(app)
        .put('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          res.body.message.should.equal("Could not update item")
          res.body.should.have.property('error')
          res.body.error.should.equal("Item price is a negative number\n")
          done();
        });
    });

    it('Update a non existent item. Should return 404', (done) => {
      let item = {
        title: 'Kit de pizza',
        desc: 'Un kit para montarte tu propia pizza. No incluye los ingredientes',
        price: 3.1415,
      }

      chai.request(app)
        .put('/api/items/'.concat(id+1))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          res.body.message.should.equal(`Item ${id+1} not found`)
          done();
        });
    });

    it('Update an item. Body is empty. Should return 404', (done) => {
      let item = {
        item_id: id
      }

      chai.request(app)
        .put('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message')
          res.body.message.should.equal("Could not update item")
          res.body.should.have.property('error')
          res.body.error.should.equal("body is empty")
          done();
        });
    });

  });

})

