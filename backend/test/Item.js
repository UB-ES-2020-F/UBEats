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

  // TEST DE GET ENDPOINT
  describe('/GET ITEM', () => {
    var id = 1
    var rest = "rrr@gmail"

    let db_values = [
      "my_title",
      "my_description",
      3.1415,
      '0',
    ]

    beforeEach( async () => {
      // get an existing restaurant from ddbb
      var result = await pool.query('SELECT * FROM restaurants')
      rest = result.rows[0].email

      db_values.push(rest)

      var query = format("INSERT INTO items VALUES (DEFAULT, %L) RETURNING *", db_values)
      //console.log(query)
      var result = await pool.query(query)
      id = result.rows[0].item_id
    })

    afterEach( async () => {
      var result = await pool.query('DELETE FROM items WHERE item_id = $1 RETURNING *', [id])

      db_values.pop()
    })

    it('Get a known existing item. Should return 200', (done) => {
      chai.request(app)
        .get('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('item')
            res.body.item.should.have.property('item_id')
            res.body.item.should.have.property('title')
            res.body.item.should.have.property('desc')
            res.body.item.should.have.property('price')
            res.body.item.should.have.property('visible')
            res.body.item.should.have.property('rest_id')
            done();
          });
    });

    it('Get a known non existing item. Should return 404', (done) => {
      chai.request(app)
      //after the insert, id must be the largest item_id on the ddbb
      //and therefore, id+1 is non existent
        .get('/api/items/'.concat(id+1))
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
            res.body.items.should.be.an('array').to.have.lengthOf.above(0);
            done();
          });

    });
  });

  // TEST THE GET ALL FOR A RESTAURANT
  describe('/GET RESTAURANT ITEMS', () => {
    var rest = "rrr@gmail.com"

    beforeEach( async () => {
      // get an existing restaurant from ddbb
      var result = await pool.query('SELECT * FROM restaurants')
      rest = result.rows[0].email
    })


    it('Get all items for a specific restaurant. Should return 200', (done) => {
      chai.request(app)
        .get('/api/restaurant/'.concat(rest, '/items'))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('items');
            res.body.items.should.be.an('array').to.have.lengthOf.above(-1);
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
      let item = {
        title: 'qwertyuiop',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: 3.141592,
        rest_id: 'rrr@gmail.com',
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('item')
          res.body.item.should.have.property('title')
          res.body.item.should.have.property('desc')
          res.body.item.should.have.property('price')
          res.body.item.should.have.property('visible')
          res.body.item.should.have.property('rest_id')
          done();
        });
    });

    it('Create a new item. Malformed body. Should return 403', (done) => {
      let item = {
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: 3.141592,
        rest_id: 'rrr@gmail.com',
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
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
      let item = {
        title: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: 3.141592,
        rest_id: 'rrr@gmail.com',
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
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
      let item = {
        title: 'eofuhvb',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: -3.1415,
      }

      chai.request(app)
        .post('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
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
      var query = "INSERT INTO items VALUES (DEFAULT, 'qwertyuiop', 'qwefr qerivg', 3.141592, '0', 'rrr@gmail.com') RETURNING *"
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
          done();
        });
    });

    //it('Delete an item. Malformed body. Should return 403', (done) => {
      //let item = {}
//
      //chai.request(app)
        //.delete('/api/items')
        //.set('content-type', 'application/x-www-form-urlencoded')
        //.send(item)
        //.end((err, res) => {
          //res.should.have.status(403);
          //res.body.should.have.property('message');
          //res.body.message.should.equal("Item ID not specified")
          //done();
        //});
    //});


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
      var query = "INSERT INTO items VALUES (DEFAULT, 'qwertyuiop', 'qwefr qerivg', 3.141592, '0', 'rrr@gmail.com') RETURNING *"
      var insertedItems = await pool.query(query)
      id = insertedItems.rows[0].item_id
      saved_title = insertedItems.rows[0].title
    })

    afterEach( async () => {
      var query = `DELETE FROM items WHERE item_id = ${id}`
      var deletedItems = await pool.query(query)
    })


    //beforeEach( async () => {
      //var items = await pool.query('SELECT * FROM items')
      //id = items.rows[0].item_id
      //saved_title = items.rows[0].title
    //})

    //afterEach( async () => {
      //await pool.query(`UPDATE items SET title = '${saved_title}' WHERE item_id = ${id}`)
    //})

    it('Update an item. All OK. Should return 200', (done) => {
      let item = {
        title: 'wefvweochi2echrg',
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
          done();
        });
    });

    /*
    it('Update an item. Invalid parameters. Should return 403', (done) => {
      let item = {
        title: 'wefvweochi2echrg',
      }

      chai.request(app)
        .put('/api/items/'.concat(id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal("Item ID not specified")
          done();
        });

    });*/

    it('Update an item. Invalid parameters. Should return 403', (done) => {
      let item = {
        title: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: 3.141592,
        rest_id: 'rrr@gmail.com',
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

