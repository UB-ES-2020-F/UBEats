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
    email: 'jfbnmdlhfgb',
    name: 'Oneqvqhbewfb',
    CIF: '55455093R',
    street: 'rgeqohugrehonij',
    pass: 'qwerpui',
    phone: '123456789',
    type: 'restaurant',
    url: 'iuwbeiqevqepiv',
  }

  var restaurant = {
    email: 'cergouihn',
    avaliability: 'amarillo',
    visible: 'invisible',
    iban: 'aaabbbcccdddeeefffggghhh',
    allergens: 'rgheuiuognrce',
  }

  let category = {
    category: 'rhijgrwejmhi',
    rest_id: 'cergouihn',
  }

  var item = {
    title: 'wreijgohn',
    desc: 'rugrgfwn',
    price: 3.1415,
    visible: '1',
    rest_id: 'cergouihn',
    url: 'wrguiohenhigfec',
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
      var query = "DELETE FROM items WHERE title = 'qwertyuiop'"
      var deletedItems = await pool.query(query)
    })
    afterEach( async () => {
      var query = "DELETE FROM items WHERE title = 'qwertyuiop'"
      var deletedItems = await pool.query(query)
    })

    it('Create a new item. All OK. Should return 200', (done) => {
      let item2 = {
        title: 'qwertyuiop',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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
        title: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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
        title: 'eofuhvb',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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

    beforeEach( async () => {
      var query = "INSERT INTO items VALUES (DEFAULT, 'qwertyuiop', 'qwefr qerivg', 3.141592, '0', 'rrr@gmail.com', '', 4) RETURNING *"
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

    beforeEach( async () => {
      var query = `INSERT INTO items VALUES (DEFAULT, 'qwertyuiop', 'qwefr qerivg', 3.141592, '0', 'rrr@gmail.com', 'images_of_cats.com', ${item.cat_id}) RETURNING *`
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
        title: 'wefvweochi2echrg',
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
          res.body.item.title.should.equal('wefvweochi2echrg')
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
        title: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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
        title: 'eofuhvb',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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
        title: 'eofuhvb',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
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

