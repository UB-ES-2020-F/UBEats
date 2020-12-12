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
describe('Orders', () => {

  // TEST THE GET ENDPOINT
  describe('/GET ORDERS', () => {
    var users, restaurant, deliveryman, customer, category, items, order, order_items

    beforeEach( async () => {
      //Necesito restaurante, deliveryman, customer, category, dos items
      users = await pool.query(`INSERT INTO "users" VALUES
      ('rest1@gmail.com','Rrr','33333330E','calle perdida alejada de todo, numero 30, barcelona','12344','609773493','restaurant'),
      ('deliv1@gmail.com','Rub','33343330E','calle perdida alejada de todo, numero 35, barcelona','1234666','60985996','deliveryman'),
      ('cust1@gmail.com','Carla','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','customer') RETURNING *`)
      restaurant = await pool.query(`INSERT INTO restaurants VALUES ('rest1@gmail.com','verde','inactive','ES8021000000000000001234','') RETURNING *`)
      deliveryman = await pool.query(`INSERT INTO deliverymans VALUES ('deliv1@gmail.com','rojo','visible','ES8021000000000000001235') RETURNING *`)
      customer = await pool.query(`INSERT INTO customers VALUES ('cust1@gmail.com','12124545898923231023149') RETURNING *`)
      category = await pool.query(`INSERT INTO categories VALUES (DEFAULT,'New items','rest1@gmail.com') RETURNING *`)
      //console.log(category.rows[0].cat_id)
      items = await pool.query(`INSERT INTO items VALUES (DEFAULT,'espaguetis tartufo','Espaguetis con salsa tartufata hecha a base de setas y trufa negra',10.00,'1','rest1@gmail.com','',${category.rows[0].cat_id}),(DEFAULT,'pulpo con patatas','pulpo a la brasa acompañado de patatas fritas pochadas',20.00,'1','rest1@gmail.com','',${category.rows[0].cat_id}) RETURNING *`)
      order = await pool.query(`INSERT INTO orders VALUES (DEFAULT,'rest1@gmail.com','deliv1@gmail.com','cust1@gmail.com','esperando',CURRENT_TIMESTAMP(0)) RETURNING *`)
      order_items = await pool.query(`INSERT INTO order_items VALUES (${order.rows[0].order_id},${items.rows[0].item_id},2),(${order.rows[0].order_id},${items.rows[1].item_id},1) RETURNING *`)
    })

    afterEach( async () => {
      await pool.query(`DELETE FROM users WHERE email='rest1@gmail.com' OR email='deliv1@gmail.com' OR email='cust1@gmail.com'`)
    })

    it('Get an order by ID. Should return 200', (done) => {
      chai.request(app)
        .get('/api/orders/'.concat(order.rows[0].order_id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('order');
            //console.log(res.body.order)
            done();
          });
    });

    it('Get an order by ID. Non-existing order_id. Should return 404', (done) => {
      chai.request(app)
        .get('/api/orders/111000111')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  // TEST THE DELETE ENDPOINT
  describe('/DELETE ORDERS', () => {
    var users, restaurant, deliveryman, customer, category, items, order, order_items

    beforeEach( async () => {
      //Necesito restaurante, deliveryman, customer, category, dos items
      users = await pool.query(`INSERT INTO "users" VALUES
      ('rest1@gmail.com','Rrr','33333330E','calle perdida alejada de todo, numero 30, barcelona','12344','609773493','restaurant'),
      ('deliv1@gmail.com','Rub','33343330E','calle perdida alejada de todo, numero 35, barcelona','1234666','60985996','deliveryman'),
      ('cust1@gmail.com','Carla','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','customer') RETURNING *`)
      restaurant = await pool.query(`INSERT INTO restaurants VALUES ('rest1@gmail.com','verde','inactive','ES8021000000000000001234','') RETURNING *`)
      deliveryman = await pool.query(`INSERT INTO deliverymans VALUES ('deliv1@gmail.com','rojo','visible','ES8021000000000000001235') RETURNING *`)
      customer = await pool.query(`INSERT INTO customers VALUES ('cust1@gmail.com','12124545898923231023149') RETURNING *`)
      category = await pool.query(`INSERT INTO categories VALUES (DEFAULT,'New items','rest1@gmail.com') RETURNING *`)
      //console.log(category.rows[0].cat_id)
      items = await pool.query(`INSERT INTO items VALUES (DEFAULT,'espaguetis tartufo','Espaguetis con salsa tartufata hecha a base de setas y trufa negra',10.00,'1','rest1@gmail.com','',${category.rows[0].cat_id}),(DEFAULT,'pulpo con patatas','pulpo a la brasa acompañado de patatas fritas pochadas',20.00,'1','rest1@gmail.com','',${category.rows[0].cat_id}) RETURNING *`)
      order = await pool.query(`INSERT INTO orders VALUES (DEFAULT,'rest1@gmail.com','deliv1@gmail.com','cust1@gmail.com','esperando',CURRENT_TIMESTAMP(0)) RETURNING *`)
      order_items = await pool.query(`INSERT INTO order_items VALUES (${order.rows[0].order_id},${items.rows[0].item_id},2),(${order.rows[0].order_id},${items.rows[1].item_id},1) RETURNING *`)
    })

    afterEach( async () => {
      await pool.query(`DELETE FROM users WHERE email='rest1@gmail.com' OR email='deliv1@gmail.com' OR email='cust1@gmail.com'`)
    })

    it('Delete an order by ID. Should return 200', (done) => {
      chai.request(app)
        .delete('/api/orders/'.concat(order.rows[0].order_id))
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('order');
            //console.log(res.body.order)
            done();
          });
    });

    it('Delete an order by ID. Non-existing order_id. Should return 404', (done) => {
      chai.request(app)
        .delete('/api/orders/111000111')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  // TEST THE POST ENDPOINT
  describe('/POST ORDERS', () => {
    var users, restaurant, deliveryman, customer, category, itemsQ//, order, order_items
    var item_id1, item_id2

    beforeEach( async () => {
      //Necesito restaurante, deliveryman, customer, category, dos items
      users = await pool.query(`INSERT INTO "users" VALUES
      ('rest1@gmail.com','Rrr','33333330E','calle perdida alejada de todo, numero 30, barcelona','12344','609773493','restaurant'),
      ('deliv1@gmail.com','Rub','33343330E','calle perdida alejada de todo, numero 35, barcelona','1234666','60985996','deliveryman'),
      ('cust1@gmail.com','Carla','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','customer') RETURNING *`)
      restaurant = await pool.query(`INSERT INTO restaurants VALUES ('rest1@gmail.com','verde','inactive','ES8021000000000000001234','') RETURNING *`)
      deliveryman = await pool.query(`INSERT INTO deliverymans VALUES ('deliv1@gmail.com','rojo','visible','ES8021000000000000001235') RETURNING *`)
      customer = await pool.query(`INSERT INTO customers VALUES ('cust1@gmail.com','12124545898923231023149') RETURNING *`)
      category = await pool.query(`INSERT INTO categories VALUES (DEFAULT,'New items','rest1@gmail.com') RETURNING *`)
      //console.log(category.rows[0].cat_id)
      itemsQ = await pool.query(`INSERT INTO items VALUES (DEFAULT,'espaguetis tartufo','Espaguetis con salsa tartufata hecha a base de setas y trufa negra',10.00,'1','rest1@gmail.com','',${category.rows[0].cat_id}),(DEFAULT,'pulpo con patatas','pulpo a la brasa acompañado de patatas fritas pochadas',20.00,'1','rest1@gmail.com','',${category.rows[0].cat_id}) RETURNING *`)
      //order = await pool.query(`INSERT INTO orders VALUES (DEFAULT,'rest1@gmail.com','deliv1@gmail.com','cust1@gmail.com','esperando',CURRENT_TIMESTAMP(0)) RETURNING *`)
      //order_items = await pool.query(`INSERT INTO order_items VALUES (${order.rows[0].order_id},${items.rows[0].item_id},2),(${order.rows[0].order_id},${items.rows[1].item_id},1) RETURNING *`)
      item_id1 = itemsQ.rows[0].item_id
      item_id2 = itemsQ.rows[1].item_id
      //console.log(item_id1)
      //console.log(item_id2)
    })

    afterEach( async () => {
      await pool.query(`DELETE FROM users WHERE email='rest1@gmail.com' OR email='deliv1@gmail.com' OR email='cust1@gmail.com'`)
    })

    it('Post an order. Should return 200', (done) => {
      let order = {
        rest_id : 'rest1@gmail.com',
        deliv_id : 'deliv1@gmail.com',
        cust_id : 'cust1@gmail.com',
        items : [{item_id : item_id1, cantidad : 2},{item_id : item_id2, cantidad : 1}]
      }
      //console.log(order)

      chai.request(app)
        .post('/api/orders')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(order)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('order');
            //console.log(res.body.order)
            done();
          });
    });

    it('Post an order. Invalid quantity of item. Should return 403', (done) => {
      let order = {
        rest_id : 'rest1@gmail.com',
        deliv_id : 'deliv1@gmail.com',
        cust_id : 'cust1@gmail.com',
        items : [{item_id : item_id1, cantidad : 0},{item_id : item_id2, cantidad : 1}]
      }

      chai.request(app)
        .post('/api/orders')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(order)
        .end((err, res) => {
            res.should.have.status(403);
            done();
          });
    });
  });
})