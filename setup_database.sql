DROP DATABASE IF EXISTS ubereats;
CREATE DATABASE ubereats;
\connect ubereats;
CREATE TYPE tipo_user AS ENUM ('restaurant','deliveryman','customer');
CREATE TABLE "users" (
"email" VARCHAR(50) NOT NULL,
"name" VARCHAR(50) NOT NULL,
"CIF" VARCHAR(20) NOT NULL,
"street" VARCHAR(200) NOT NULL,
"pass" VARCHAR(50) NOT NULL,
"phone" VARCHAR(20) NOT NULL,
"tipo"  tipo_user NOT NULL,
"url" VARCHAR(200) NOT NULL,
Constraint "user_pkey" Primary Key ("email")
);
CREATE TYPE avaliability_rest AS ENUM ('verde','amarillo','naranja','rojo');
CREATE TYPE visible_rest AS ENUM ('inactive','invisible','visible');
CREATE TABLE "restaurants" (
"email" VARCHAR(50) NOT NULL,
"avaliability" avaliability_rest NOT NULL,
"visible" visible_rest NOT NULL,
"iban" VARCHAR(24) NOT NULL,
"allergens" VARCHAR(200),
Constraint "restaurant_pkey" Primary Key ("email"),
Constraint "restaurant_fkey_user" Foreign Key ("email") References "users"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TYPE avaliability_deliv AS ENUM ('verde','rojo');
CREATE TYPE visible_deliv AS ENUM ('inactive','invisible','visible');
CREATE TABLE "deliverymans" (
"email" VARCHAR(50) NOT NULL,
"avaliability" avaliability_deliv NOT NULL,
"visible" visible_deliv NOT NULL,
"iban" VARCHAR(24) NOT NULL,
Constraint "deliveryman_pkey" Primary Key ("email"),
Constraint "deliveryman_fkey_user" Foreign Key ("email") References "users"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "customers" (
"email" VARCHAR(50) NOT NULL,
"card" VARCHAR(23) NOT NULL,
Constraint "customer_pkey" Primary Key ("email"),
Constraint "customer_fkey_user" Foreign Key ("email") References "users"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TYPE status_orders AS ENUM ('esperando','preparando','preparado','enviado','entregado');
CREATE TABLE "orders" (
"order_id" SERIAL NOT NULL UNIQUE,
"rest_id" VARCHAR(50) NOT NULL,
"deliv_id" VARCHAR(50) NOT NULL,
"cust_id" VARCHAR(50) NOT NULL,
"status" status_orders NOT NULL,
"timestamp" TIMESTAMPTZ NOT NULL,
Constraint "order_pkey" Primary Key ("order_id"),
Constraint "order_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "order_fkey_deliv" Foreign Key ("deliv_id") References "deliverymans"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "order_fkey_cust" Foreign Key ("cust_id") References "customers"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "categories" (
"cat_id" SERIAL NOT NULL UNIQUE,
"name" VARCHAR(50) NOT NULL,
Constraint "categories_pkey" Primary Key ("cat_id")
);
CREATE TABLE "items" (
"item_id" SERIAL NOT NULL UNIQUE,
"title" VARCHAR(30) NOT NULL,
"desc" VARCHAR(200) NOT NULL,
"price" float NOT NULL,
"visible" BIT,
"rest_id" VARCHAR(50) NOT NULL,
"url" VARCHAR(200) NOT NULL,
"cat_id" INT NOT NULL,
Constraint "item_pkey" Primary Key ("item_id"),
Constraint "item_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "item_fkey_cat" Foreign Key ("cat_id") References "categories"("cat_id") ON DELETE CASCADE
);
CREATE TABLE "order_items" (
"order_id" INT NOT NULL,
"item_id" INT NOT NULL,
"cantidad" INT NOT NULL,
Constraint "orderitems_pkey" Primary Key ("order_id", "item_id"),
Constraint "orderitems_fkey_order" Foreign Key ("order_id") References "orders"("order_id") ON DELETE CASCADE,
Constraint "orderitems_fkey_item" Foreign Key ("item_id") References "items"("item_id") ON DELETE CASCADE
);
CREATE TABLE "feedbacks" (
"rest_id" VARCHAR(50) NOT NULL,
"cust_id" VARCHAR(50) NOT NULL,
"rating" INT,
"explanation" VARCHAR(200) NOT NULL,
"timestamp" TIMESTAMPTZ NOT NULL,
Constraint "feedback_pkey" Primary Key ("rest_id", "cust_id"),
Constraint "feedback_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "feedback_fkey_cust" Foreign Key ("cust_id") References "customers"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "favourites" (
"cust_id" VARCHAR(50) NOT NULL,
"rest_id" VARCHAR(50) NOT NULL,
Constraint "favourites_pkey" Primary Key ("cust_id","rest_id"),
Constraint "favourites_fkey_cust" Foreign Key ("cust_id") References "customers"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "favourites_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "reports" (
"rep_id" SERIAL NOT NULL UNIQUE,
"order_id" INT NOT NULL,
"description" VARCHAR(200) NOT NULL,
"timestamp" TIMESTAMPTZ NOT NULL,
Constraint "reports_pkey" Primary Key ("rep_id"),
Constraint "reports_fkey_order" Foreign Key ("order_id") References "orders"("order_id") ON DELETE CASCADE
);
CREATE TABLE "types" (
"type_id" SERIAL NOT NULL UNIQUE,
"name" VARCHAR(20),
"description" VARCHAR(100),
Constraint "types_pkey" Primary Key ("type_id")
);
CREATE TABLE "type_restaurants" (
"type_id" INT NOT NULL,
"rest_id" VARCHAR(50) NOT NULL,
Constraint "typerestaurants_pkey" Primary Key ("type_id","rest_id"),
Constraint "typerestaurants_fkey_type" Foreign Key ("type_id") References "types"("type_id") ON DELETE CASCADE,
Constraint "typerestaurants_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "type_items" (
"type_id" INT NOT NULL,
"item_id" INT NOT NULL,
Constraint "typeitems_pkey" Primary Key ("type_id","item_id"),
Constraint "typeitems_fkey_type" Foreign Key ("type_id") References "types"("type_id") ON DELETE CASCADE,
Constraint "typeitems_fkey_item" Foreign Key ("item_id") References "items"("item_id") ON DELETE CASCADE
);
CREATE TABLE "extra_items" (
"extraitem_id" SERIAL NOT NULL UNIQUE,
"name" VARCHAR(30) NOT NULL,
"desc" VARCHAR(200) NOT NULL,
"price" float NOT NULL,
"mandatory" BIT,
"item_id" INT NOT NULL,
Constraint "extraitem_pkey" Primary Key ("extraitem_id"),
Constraint "extraitem_fkey_item" Foreign Key ("item_id") References "items"("item_id") ON DELETE CASCADE
);
CREATE TABLE "order_extraitems" (
"order_id" INT NOT NULL,
"extraitem_id" INT NOT NULL,
"cantidad" INT NOT NULL,
Constraint "orderextraitems_pkey" Primary Key ("order_id", "extraitem_id"),
Constraint "orderextraitems_fkey_order" Foreign Key ("order_id") References "orders"("order_id") ON DELETE CASCADE,
Constraint "orderextraitems_fkey_extraitem" Foreign Key ("extraitem_id") References "extra_items"("extraitem_id") ON DELETE CASCADE
);
--Mock data to test all the tables. Two mock data in each table. Insert two restaurants, two customers and two deliverymans
INSERT INTO "users" VALUES
('rrr@gmail.com','Rrr','33333330E','calle perdida alejada de todo, numero 30, barcelona','12344','609773493','restaurant',''),
('r2@gmail.com','Carlos','33333430E','Gran Via, numero 30, Barcelona','1234','609773495','restaurant',''),
('rub@gmail.com','Rub','33343330E','calle perdida alejada de todo, numero 35, barcelona','1234666','60985996','deliveryman',''),
('r3@gmail.com','David','33343330V','Av Diagonal, num 2, barcelona','12345','61985996','deliveryman',''),
('ran@gmail.com','Ran','44444092R','calle arago, numero 40, Barcelona','123456789gjh','608375886','customer',''),
('r4@gmail.com','Carla','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','customer','');
INSERT INTO restaurants VALUES('rrr@gmail.com','verde','inactive','ES8021000000000000001234',''),
('r2@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
INSERT INTO deliverymans VALUES('rub@gmail.com','rojo','visible','ES8021000000000000001235'),
('r3@gmail.com','verde','visible','ES8021000000000000001236');
INSERT INTO customers VALUES('ran@gmail.com','12345678912345670921345'),
('r4@gmail.com','12124545898923231023149');
--Insert two mock orders that later we are going to rate and make feedback
INSERT INTO orders VALUES (DEFAULT,'rrr@gmail.com','r3@gmail.com','r4@gmail.com','esperando',CURRENT_TIMESTAMP(0)),
(DEFAULT,'r2@gmail.com','r3@gmail.com','r4@gmail.com','preparando',CURRENT_TIMESTAMP(0));
--Insert the four categories
INSERT INTO categories VALUES (DEFAULT,'Picked for you'),(DEFAULT,'Classics'),(DEFAULT,'Recently ordered'),(DEFAULT,'New items');
--Two items, in different restaurants
INSERT INTO items VALUES (DEFAULT,'espaguetis tartufo','Espaguetis con salsa tartufata hecha a base de setas y trufa negra',10.95,'1','rrr@gmail.com','',4),
(DEFAULT,'pulpo con patatas','pulpo a la brasa acompañado de patatas fritas pochadas',18.99,'1','r2@gmail.com','',4);
--Here we have the order_id, the item_id, and the amount
INSERT INTO order_items VALUES (1,1,2),(2,2,4);
--Two feedbacks about the 2 orders
INSERT INTO feedbacks VALUES ('rrr@gmail.com','ran@gmail.com',8,'comida de calidad a precio economico',CURRENT_TIMESTAMP(0)),
('rrr@gmail.com','r4@gmail.com',5,'Muy caro y no es para tirar cohetes',CURRENT_TIMESTAMP(0));
--The favourite restaurants of one customer
INSERT INTO favourites VALUES ('r4@gmail.com','rrr@gmail.com'),('r4@gmail.com','r2@gmail.com');
--Two mock reports where we supposed that happened a mistake in each one
INSERT INTO reports VALUES (DEFAULT,1,'el pedido tenia la bebida mal',CURRENT_TIMESTAMP(0)),
(DEFAULT,2,'tardo mucho en entregarse y llego frio',CURRENT_TIMESTAMP(0));
INSERT INTO types VALUES (DEFAULT,'vegetariano','comida ecologica responsable con el medio ambiente y el maltrato animal'),
(DEFAULT,'omnivoro','contiene toda clase de ingredientes de origen carnico y vegetal');
--Labels of the restaurants that they have chosen
INSERT INTO type_restaurants VALUES (1,'rrr@gmail.com'),(2,'r2@gmail.com');
--Labels of the items of the restaurant that the owner of the item has chosen
INSERT INTO type_items VALUES (1,1),(2,2);
--Añadimos un refresco y un extra al plato espagueti tartufo, siendo el refresco obligatorio y el queso opcional
INSERT INTO "extra_items" VALUES (DEFAULT,'cocacola','refresco de cola con cafeina',2.95,'0',1),
(DEFAULT,'queso chedar','queso chedar para acompañar salsa tartufo',0.0,'1',1);
--En el pedido, se obliga a pedir la cocacola, escogiendo 2ud, y opcional el queso, que tambien lo pide, y es gratuito
INSERT INTO "order_extraitems" VALUES(1,1,2),(1,2,1);