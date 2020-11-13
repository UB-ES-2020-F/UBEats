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
describe('Items', () => {

  // TEST DE GET ENDPOINT
  describe('/GET ITEM', () => {
    it('Get a known existing item. Should return 200', (done) => {
      chai.request(app)
        .get('/api/items/1')
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
        .get('/api/items/3489543')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message')
            done();
          });
    });

  })

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

    it('Delete an item. All OK. Should return 200', (done) => {
      let item = {
        item_id: id
      }

      chai.request(app)
        .delete('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
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

    it('Delete an item. Malformed body. Should return 403', (done) => {
      let item = {}

      chai.request(app)
        .delete('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal("Item ID not specified")
          done();
        });
    });


    it('Delete a non existing item. Should return 404', (done) => {
      let item = {
        item_id: 23897432
      }

      chai.request(app)
        .delete('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.equal("Item 23897432 not found")
          done();
        });
    });

  });

  // TEST THE PUT ENDPOINT
  describe('PUT /api/items', () => {
    var id;
    var saved_title;

    beforeEach( async () => {
      var items = await pool.query('SELECT * FROM items')
      id = items.rows[0].item_id
      saved_title = items.rows[0].title
    })

    afterEach( async () => {
      await pool.query(`UPDATE items SET title = '${saved_title}' WHERE item_id = ${id}`)
    })

    it('Update an item. All OK. Should return 200', (done) => {
      let item = {
        item_id: id,
        title: 'wefvweochi2echrg',
      }

      chai.request(app)
        .put('/api/items')
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

    it('Update an item. Invalid parameters. Should return 403', (done) => {
      let item = {
        title: 'wefvweochi2echrg',
      }

      chai.request(app)
        .put('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message');
          res.body.message.should.equal("Item ID not specified")
          done();
        });

    });

    it('Update an item. Invalid parameters. Should return 403', (done) => {
      let item = {
        item_id: id,
        title: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: 3.141592,
        rest_id: 'rrr@gmail.com',
      }

      chai.request(app)
        .put('/api/items')
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
        item_id: id,
        title: 'eofuhvb',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: -3.1415,
      }

      chai.request(app)
        .put('/api/items')
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
        item_id: 7865345,
        title: 'eofuhvb',
        desc: 'qiur qejhfrg hqeoi qhfiqe he',
        price: 3.1415,
      }

      chai.request(app)
        .put('/api/items')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
          res.body.message.should.equal("Item 7865345 not found")
          done();
        });
    });

    it('Update an item. Body is empty. Should return 404', (done) => {
      let item = {
        item_id: id
      }

      chai.request(app)
        .put('/api/items')
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

