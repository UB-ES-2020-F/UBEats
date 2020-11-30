DROP DATABASE IF EXISTS ubereats;
CREATE DATABASE ubereats;
\connect ubereats;
CREATE TYPE tipo_user AS ENUM ('restaurant','deliveryman','customer');
CREATE TABLE "users" (
"email" VARCHAR NOT NULL,
"name" VARCHAR NOT NULL,
"CIF" VARCHAR(20) NOT NULL,
"street" VARCHAR NOT NULL,
"pass" VARCHAR NOT NULL,
"phone" VARCHAR(20) NOT NULL,
"tipo"  tipo_user NOT NULL,
"url" VARCHAR,
Constraint "user_pkey" Primary Key ("email")
);
CREATE TYPE avaliability_rest AS ENUM ('verde','amarillo','naranja','rojo');
CREATE TYPE visible_rest AS ENUM ('inactive','invisible','visible');
CREATE TABLE "restaurants" (
"email" VARCHAR NOT NULL,
"avaliability" avaliability_rest NOT NULL,
"visible" visible_rest NOT NULL,
"iban" CHAR(24) NOT NULL,
"allergens" VARCHAR,
Constraint "restaurant_pkey" Primary Key ("email"),
Constraint "restaurant_fkey_user" Foreign Key ("email") References "users"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TYPE avaliability_deliv AS ENUM ('verde','rojo');
CREATE TYPE visible_deliv AS ENUM ('inactive','invisible','visible');
CREATE TABLE "deliverymans" (
"email" VARCHAR NOT NULL,
"avaliability" avaliability_deliv NOT NULL,
"visible" visible_deliv NOT NULL,
"iban" CHAR(24) NOT NULL,
Constraint "deliveryman_pkey" Primary Key ("email"),
Constraint "deliveryman_fkey_user" Foreign Key ("email") References "users"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "customers" (
"email" VARCHAR NOT NULL,
"card" CHAR(23) NOT NULL,
Constraint "customer_pkey" Primary Key ("email"),
Constraint "customer_fkey_user" Foreign Key ("email") References "users"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TYPE status_orders AS ENUM ('esperando','preparando','preparado','enviado','entregado');
CREATE TABLE "orders" (
"order_id" SERIAL NOT NULL UNIQUE,
"rest_id" VARCHAR NOT NULL,
"deliv_id" VARCHAR NOT NULL,
"cust_id" VARCHAR NOT NULL,
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
"category" VARCHAR NOT NULL,
"rest_id" VARCHAR NOT NULL,
Constraint "categories_pkey" Primary Key ("cat_id"),
Constraint "cat_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "items" (
"item_id" SERIAL NOT NULL UNIQUE,
"title" VARCHAR NOT NULL,
"desc" VARCHAR NOT NULL,
"price" float NOT NULL,
"visible" BIT,
"rest_id" VARCHAR NOT NULL,
"url" VARCHAR,
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
"rest_id" VARCHAR NOT NULL,
"cust_id" VARCHAR NOT NULL,
"rating" INT,
"explanation" VARCHAR NOT NULL,
"timestamp" TIMESTAMPTZ NOT NULL,
Constraint "feedback_pkey" Primary Key ("rest_id", "cust_id"),
Constraint "feedback_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "feedback_fkey_cust" Foreign Key ("cust_id") References "customers"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "favourites" (
"cust_id" VARCHAR NOT NULL,
"rest_id" VARCHAR NOT NULL,
Constraint "favourites_pkey" Primary Key ("cust_id","rest_id"),
Constraint "favourites_fkey_cust" Foreign Key ("cust_id") References "customers"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "favourites_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE
);
CREATE TABLE "reports" (
"rep_id" SERIAL NOT NULL UNIQUE,
"order_id" INT NOT NULL,
"description" VARCHAR NOT NULL,
"timestamp" TIMESTAMPTZ NOT NULL,
Constraint "reports_pkey" Primary Key ("rep_id"),
Constraint "reports_fkey_order" Foreign Key ("order_id") References "orders"("order_id") ON DELETE CASCADE
);
CREATE TABLE "types" (
"type_id" SERIAL NOT NULL UNIQUE,
"name" VARCHAR,
"description" VARCHAR,
Constraint "types_pkey" Primary Key ("type_id")
);
CREATE TABLE "type_restaurants" (
"type_id" INT NOT NULL,
"rest_id" VARCHAR NOT NULL,
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
"name" VARCHAR NOT NULL,
"desc" VARCHAR NOT NULL,
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
('raul@gmail.com','Raul','33333330E','calle perdida alejada de todo, numero 30, barcelona','12344','609773493','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('carlos@gmail.com','Carlos','33333430E','Gran Via, numero 30, Barcelona','1234','609773495','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('ruben@gmail.com','Ruben','33343330E','calle perdida alejada de todo, numero 35, barcelona','1234666','60985996','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('david@gmail.com','David','33343330V','Av Diagonal, num 2, barcelona','12345','61985996','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('laura@gmail.com','Laura','44444092R','calle arago, numero 40, Barcelona','123456789gjh','608375886','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('carla@gmail.com','Carla','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

--Delivery
('juancarlos@gmail.com','Juan Carlos','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','deliveryman','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('josemaria@gmail.com','Jose Maria','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','deliveryman','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Sushi
('miu@gmail.com','Miu','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('saikosushi@gmail.com','Saiko Sushi','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('sushito@gmail.com','Sushito','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('hachiko@gmail.com','Hachiko Sushi','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Pizza
('pizzapazza@gmail.com','Pizza Pazza','44443292D','calle Martí, num 10, Hosp. Llobregat','pizzapazza','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('napoli@gmail.com','Via Napoli Restaurante Pizzeria','44443292D','calle Martí, num 10, Hosp. Llobregat','napoli','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('gusto_rest@gmail.com','Gusto Restaurante','44443292D','calle Martí, num 10, Hosp. Llobregat','gusto','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('pizzamarket@gmail.com','Pizza Market','44443292D','calle Martí, num 10, Hosp. Llobregat','pizzamarket','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

--Barbacoa
-- royal nepal (callejera)
('ayres@gmail.com','Ayres del Sur','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('caneusebio@gmail.com','Can Eusebio','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('bbqexpress@gmail.com','BBQ Express Nights','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Rapida
('canvador@gmail.com','Can Vador','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('chatico@gmail.com','Chatico','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('kfc@gmail.com','KFC','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('mcdonald@gmail.com','McDonalds','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- China
('wok@gmail.com','Wok Street','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('boabao@gmail.com','Boa Bao','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('fulin@gmail.com','Fu Lin','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('fandimsum@gmail.com','Fan Dim Sum','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');


-- Japonesa
-- saiko sushi (sushi)
('ramenya@gmail.com','Ramen-ya Hiro','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('kuyi@gmail.com','Kuyi','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('telemaki@gmail.com','Telemaki','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Hamburgueseria
-- chatico (rapida)
-- hideout ( eeuu)
('burgerniu@gmail.com','Burger Niu ( Ecologica)','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('tgb@gmail.com','TGB','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Saludable 
('mrgreensalad@gmail.com','Mr Green Salad House','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('pokesi@gmail.com','Poke Si','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('greenberry@gmail.com','Green & Berry','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('maoz@gmail.com','Maoz','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Estadounidense
('muns@gmail.com','Las Muns','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('goiko@gmail.com','Goiko','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('papajohns@gmail.com','Papa Johns','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('hideoutburger@gmail.com','Hideout burger','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Callejera
-- wok (china)
-- muns (eeuu)
('royalnepal@gmail.com','Royal Nepal','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('boko@gmail.com','Boko','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Cafe y te
-- fandimsum (china)
('chatime@gmail.com','Chatime','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('bubbolitas@gmail.com','Bubbolitas - Bubble Tea Bar','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('zenzoo@gmail.com','Zenzoo','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');


-- Mejicana
('tacobell@gmail.com','Taco Bell','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('rosanegra@gmail.com','Rosa Negra','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('tacos99@gmail.com','Tacos 99','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('burritowey@gmail.com','Burrito Wey','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

-- Postres
-- bubbolitas (cafe y te)
-- zenzoo (cafe y te)
('dulzuramia@gmail.com','Dulzura Mia','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
('thefresh@gmail.com','The Fresh Poke','44443292D','calle Martí, num 10, Hosp. Llobregat','wefjh','608374666','restaurant','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');

INSERT INTO restaurants VALUES('rrr@gmail.com','verde','inactive','ES8021000000000000001234',''),
('miu@gmail.com','rojo','visible','ES0000000004444000001234','restaurante.com/allergens.pdf');
('saikosushi@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('sushito@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('hachiko@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('pizzapazza@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('napoli@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('gusto_rest@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('pizzamarket@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('ayres@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('caneusebio@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('bbqexpress@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('canvador@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('chatico@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('kfc@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('mcdonald@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('wok@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('boabao@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('fulin@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('fandimsum@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('ramenya@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('kuyi@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('telemaki@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('burgerniu@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('tgb@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('mrgreensalad@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('pokesi@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('greenberry@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('maoz@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('muns@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('goiko@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('papajohns@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('hideoutburger@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('royalnepal@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('boko@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('chatime@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('bubbolitas@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('zenzoo@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('tacobell@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('rosanegra@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('tacos99@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('burritowey@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('dulzuramia@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
('thefresh@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
INSERT INTO deliverymans VALUES('rub@gmail.com','rojo','visible','ES8021000000000000001235'),
('juancarlos@gmail.com','verde','visible','ES8021000000000000001236');
('josemaria@gmail.com','verde','visible','ES8021000000000000001236');
INSERT INTO customers VALUES('ran@gmail.com','12345678912345670921345'),
('raul@gmail.com','12124545898923231023149');
('carlos@gmail.com','12124545898923231023149');
('ruben@gmail.com','12124545898923231023149');
('david@gmail.com','12124545898923231023149');
('laura@gmail.com','12124545898923231023149');
('carla@gmail.com','12124545898923231023149');
--Insert two mock orders that later we are going to rate and make feedback
INSERT INTO orders VALUES (DEFAULT,'rrr@gmail.com','r3@gmail.com','r4@gmail.com','esperando',CURRENT_TIMESTAMP(0)),
(DEFAULT,'r2@gmail.com','r3@gmail.com','r4@gmail.com','preparando',CURRENT_TIMESTAMP(0));
--Insert the four categories in the two restaurants of the mock data
INSERT INTO categories VALUES (DEFAULT,'Tapas & Sides','miu@gmail.com'),(DEFAULT,'Makis & Uramakis Clasicos y Atrevidos','miu@gmail.com'),(DEFAULT,'Sushi Combinado','miu@gmail.com'),(DEFAULT,'Menu','miu@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Lo mas pedido','saikosushi@gmail.com'),(DEFAULT,'Yakisoba','saikosushi@gmail.com'),(DEFAULT,'Tempuras','saikosushi@gmail.com'),(DEFAULT,'Sashimi','saikosushi@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Entrantes','sushito@gmail.com'),(DEFAULT,'Pokes','sushito@gmail.com'),(DEFAULT,'Sushito Specials','sushito@gmail.com'),(DEFAULT,'Sashimi','sushito@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Bandejas combinadas Sushi','hachiko@gmail.com'),(DEFAULT,'Rollos Especiales','hachiko@gmail.com'),(DEFAULT,'Maki Sushi','hachiko@gmail.com'),(DEFAULT,'Nigiri Sushi','hachiko@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Pizzas las Clasicas','pizzapazza@gmail.com'),(DEFAULT,'Platos','pizzapazza@gmail.com'),(DEFAULT,'Postre','pizzapazza@gmail.com'),(DEFAULT,'Bebidas','pizzapazza@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Lo mas pedido','napoli@gmail.com'),(DEFAULT,'Antipastis','napoli@gmail.com'),(DEFAULT,'Pizzas','napoli@gmail.com'),(DEFAULT,'Primi Piatti','napoli@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Specialita di Paste e Paste Fresche','gusto_rest@gmail.com'),(DEFAULT,'Rissoto Carnaroli Italiano','gusto_rest@gmail.com'),(DEFAULT,'Pizza Forno e Legna','gusto_rest@gmail.com'),(DEFAULT,'Pizza Speciali Forno a Legna','gusto_rest@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Pizzas Clasicas','pizzamarket@gmail.com'),(DEFAULT,'Pizzas Especiales','pizzamarket@gmail.com'),(DEFAULT,'Pizzas Gourmet','pizzamarket@gmail.com'),(DEFAULT,'Panini','pizzamarket@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Top ventas','ayres@gmail.com'),(DEFAULT,'Parrilla al Carbon','ayres@gmail.com'),(DEFAULT,'Entrantes','ayres@gmail.com'),(DEFAULT,'Platos del dia','ayres@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Menus','caneusebio@gmail.com'),(DEFAULT,'Menu Niños','caneusebio@gmail.com'),(DEFAULT,'Tapas','caneusebio@gmail.com'),(DEFAULT,'Bocadillos Calientes','caneusebio@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Pica Picas','bbqexpress@gmail.com'),(DEFAULT,'Ternera','bbqexpress@gmail.com'),(DEFAULT,'Parrilladas','bbqexpress@gmail.com'),(DEFAULT,'Vegetariano','bbqexpress@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Entretenimientos','canvador@gmail.com'),(DEFAULT,'De temporada','canvador@gmail.com'),(DEFAULT,'Platillos del Vador','canvador@gmail.com'),(DEFAULT,'Carnes a la brasa','canvador@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Combos','chatico@gmail.com'),(DEFAULT,'Frankfurts','chatico@gmail.com'),(DEFAULT,'Hamburguesas','chatico@gmail.com'),(DEFAULT,'Bocadillos','chatico@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Top Ventas','kfc@gmail.com'),(DEFAULT,'Menu para 2 personas','kfc@gmail.com'),(DEFAULT,'Menus para grupos','kfc@gmail.com'),(DEFAULT,'Menus del dia','kfc@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'McHappy','mcdonald@gmail.com'),(DEFAULT,'McMenu','mcdonald@gmail.com'),(DEFAULT,'Happy Meal','mcdonald@gmail.com'),(DEFAULT,'Complementos','mcdonald@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Especialidades','wok@gmail.com'),(DEFAULT,'Sopa de Ramen','wok@gmail.com'),(DEFAULT,'Platos principales','wok@gmail.com'),(DEFAULT,'Wok','wok@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Baos','boabao@gmail.com'),(DEFAULT,'Soups','boabao@gmail.com'),(DEFAULT,'Wok','boabao@gmail.com'),(DEFAULT,'Curry & sides','boabao@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Ofertas','fulin@gmail.com'),(DEFAULT,'Sopas','fulin@gmail.com'),(DEFAULT,'Fideos y tallarines','fulin@gmail.com'),(DEFAULT,'Arroces','fulin@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Menu','fandimsum@gmail.com'),(DEFAULT,'DIM SUM','fandimsum@gmail.com'),(DEFAULT,'Otros platos','fandimsum@gmail.com'),(DEFAULT,'Noodles','fandimsum@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Ramen','ramenya@gmail.com'),(DEFAULT,'Ramen Frio','ramenya@gmail.com'),(DEFAULT,'Arroz','ramenya@gmail.com'),(DEFAULT,'Onigiri','ramenya@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Arroz y tallarines','kuyi@gmail.com'),(DEFAULT,'Tempura','kuyi@gmail.com'),(DEFAULT,'Tepanyaki','kuyi@gmail.com'),(DEFAULT,'Maki, Futomaki, Uramaki','kuyi@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Arroz & Noodles','telemaki@gmail.com'),(DEFAULT,'California Gourmet','telemaki@gmail.com'),(DEFAULT,'Telemaki Rolls','telemaki@gmail.com'),(DEFAULT,'Nigiri & Sashimi','telemaki@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Las super burger','burgerniu@gmail.com'),(DEFAULT,'Burger Ecologica','burgerniu@gmail.com'),(DEFAULT,'Burger gran gourmet','burgerniu@gmail.com'),(DEFAULT,'Especialidades','burgerniu@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Burgers','tgb@gmail.com'),(DEFAULT,'Burgers Especiales','tgb@gmail.com'),(DEFAULT,'Premium','tgb@gmail.com'),(DEFAULT,'Hot Dogs','tgb@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Ofertas','mrgreensalad@gmail.com'),(DEFAULT,'Healthy Bowls','mrgreensalad@gmail.com'),(DEFAULT,'Bebidas','mrgreensalad@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Entrantes y Gyozas','pokesi@gmail.com'),(DEFAULT,'Pokes de la casa','pokesi@gmail.com'),(DEFAULT,'Crea tu poke','pokesi@gmail.com'),(DEFAULT,'Combo oferta','pokesi@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Bowls-Cold','greenberry@gmail.com'),(DEFAULT,'Toasts','greenberry@gmail.com'),(DEFAULT,'Veggie Sweets','greenberry@gmail.com'),(DEFAULT,'Superfood Smoothies','greenberry@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Maoz','maoz@gmail.com'),(DEFAULT,'Bebidas','maoz@gmail.com'),(DEFAULT,'Bebidas alcoholicas','maoz@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Combos','muns@gmail.com'),(DEFAULT,'Las Clasicas','muns@gmail.com'),(DEFAULT,'Las del Chef','muns@gmail.com'),(DEFAULT,'Las Veggies','muns@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Para compartir','goiko@gmail.com'),(DEFAULT,'Entrantes','goiko@gmail.com'),(DEFAULT,'Burguers','goiko@gmail.com'),(DEFAULT,'Bowls','goiko@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Combos','papajohns@gmail.com'),(DEFAULT,'Papadia','papajohns@gmail.com'),(DEFAULT,'Pizzas','papajohns@gmail.com'),(DEFAULT,'Personaliza tu pizza ','papajohns@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Smashburgers','hideoutburger@gmail.com'),(DEFAULT,'Starters','hideoutburger@gmail.com'),(DEFAULT,'Bebidas','hideoutburger@gmail.com'),(DEFAULT,'Cervezas','hideoutburger@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Aperitivos y Sopas','royalnepal@gmail.com'),(DEFAULT,'Entrantes','royalnepal@gmail.com'),(DEFAULT,'Entrantes Nepales Especial','royalnepal@gmail.com'),(DEFAULT,'Platos de Tandoor','royalnepal@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Curry','boko@gmail.com'),(DEFAULT,'Dim Sum','boko@gmail.com'),(DEFAULT,'Para compartir','boko@gmail.com'),(DEFAULT,'Wok','boko@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Milk Tea ','chatime@gmail.com'),(DEFAULT,'Mousse','chatime@gmail.com'),(DEFAULT,'Flavours','chatime@gmail.com'),(DEFAULT,'Lattes','chatime@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Recetas especiales','bubbolitas@gmail.com'),(DEFAULT,'Milkshakes','bubbolitas@gmail.com'),(DEFAULT,'Fruta Natural Smoothies & Fruiteas','bubbolitas@gmail.com'),(DEFAULT,'BubboCafes-FrappuBubbo','bubbolitas@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Milk Tea','zenzoo@gmail.com'),(DEFAULT,'Fruit Tea','zenzoo@gmail.com'),(DEFAULT,'Fresh Tea','zenzoo@gmail.com'),(DEFAULT,'Postres Caseros','zenzoo@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Menus','tacobell@gmail.com'),(DEFAULT,'Tacos','tacobell@gmail.com'),(DEFAULT,'Burritos','tacobell@gmail.com'),(DEFAULT,'Quesadillas','tacobell@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Entrantes','rosanegra@gmail.com'),(DEFAULT,'Quesadillas','rosanegra@gmail.com'),(DEFAULT,'Tacos','rosanegra@gmail.com'),(DEFAULT,'Burritos','rosanegra@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Tacos','tacos99@gmail.com'),(DEFAULT,'Quesadillas','tacos99@gmail.com'),(DEFAULT,'Vegetarianos','tacos99@gmail.com'),(DEFAULT,'Cocteles','tacos99@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Menu Burritos','burritowey@gmail.com'),(DEFAULT,'Menu Bowls Wey','burritowey@gmail.com'),(DEFAULT,'Menu de Tacos','burritowey@gmail.com'),(DEFAULT,'Big Burritos Wey','burritowey@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Tartas por Raciones','dulzuramia@gmail.com'),(DEFAULT,'Tartas enteras de 5 a 7 raciones','dulzuramia@gmail.com'),(DEFAULT,'Tartas enteras de 10 a 14 raciones','dulzuramia@gmail.com'),(DEFAULT,'Postres individuales','dulzuramia@gmail.com');
INSERT INTO categories VALUES (DEFAULT,'Poke del mes','thefresh@gmail.com'),(DEFAULT,'Poke Bowls','thefresh@gmail.com'),(DEFAULT,'Poke Burritos','thefresh@gmail.com'),(DEFAULT,'Postres','thefresh@gmail.com');
--Two items, in different restaurants
INSERT INTO items VALUES 
(DEFAULT,'Edamame','Judias de soja salteadas con mantequilla y flor de sal',5.40,'1','miu@gmail.com','',1),
(DEFAULT,'Spicy Edamame','Judías de soja con un toque de sischimi y salteadas con mantequilla',5.50,'1','miu@gmail.com','',1),
(DEFAULT,'Maguro Tartar','Dados de atún en estilo japonés con yema de codorniz.',12.95,'1','miu@gmail.com','',1),
(DEFAULT,'Eby Gyoza','De gambas y verduras. 5 piezas. ',8.75,'1','miu@gmail.com','',1),
(DEFAULT,'Foie Micuit Uramaki','Con mango, masago y tataki de atún. 8 piezas. ',12.90,'1','miu@gmail.com','',2),
(DEFAULT,'California Uramaki de Cangrejo','California Uramaki de Cangrejo',8.10,'1','miu@gmail.com','',2),
(DEFAULT,'Hot rainbow Futomaki','Rebozado con salmón, dorada, atún y lima crispy. 6 piezas. ',10.70,'1','miu@gmail.com','',2),
(DEFAULT,'Dragon Uramaki de Anguila','Aguacate, salmón en tempura, mayonesa y pepino. 8 piezas. ',14.95,'1','miu@gmail.com','',2),
(DEFAULT,'Sushi no Moriawase ','6 piezas de nigiri y 8 piezas de maki de salmón',19.50,'1','miu@gmail.com','',3),
(DEFAULT,'Nigiri no Moriawase','2 nigiris de atún, 2 nigiris de salmón, 2 nigiris de thai y 2 nigiris de ebi. ',19.50,'1','miu@gmail.com','',3),
(DEFAULT,'Combinado de Sushi y Sashimi','6 piezas de sashimi, 4 piezas de nigiri y 8 piezas de maki de salmón.',19.95,'1','miu@gmail.com','',3),
(DEFAULT,'Combinado de Salmón','6 piezas de sashimi de salmón y 8 piezas de maki de salmón.',17.95,'1','miu@gmail.com','',3),
(DEFAULT,'Menú del Día','Lunes a viernes al medio día. Con edamame (soja verde japonesa con flor de sal).',15.20,'1','miu@gmail.com','',4),
(DEFAULT,'Menú del Día con Cerverza','Lunes a viernes al medio día. Con edamame (soja verde japonesa con flor de sal). Con cerveza.',15.20,'1','miu@gmail.com','',4),

(DEFAULT,'Wakame','Ensalada de algas marinado con sesamo.',4.30,'1','saikosushi@gmail.com','',5),
(DEFAULT,'Yakisoba de Pollo y Verduras','Tallarines japones de trigo.',5.70,'1','saikosushi@gmail.com','',5),
(DEFAULT,'Tartar de Salmón con Aguacate','Con wakame edamame y mango. 1 pieza.',12.40,'1','saikosushi@gmail.com','',5),
(DEFAULT,'Uramaki Rainbow','Con salmón, atún, aguacate, pez mantequilla y anguila. 8 piezas.',9.9,'1','saikosushi@gmail.com','',5),

(DEFAULT,'Yakisoba de Huevos y Verduras','Tallarines japones de trigo.',5.30,'1','saikosushi@gmail.com','',6),
(DEFAULT,'Yakisoba de Pollo y Verduras','Tallarines japones de trigo.',5.70,'1','saikosushi@gmail.com','',6),
(DEFAULT,'Yakisoba de Gambas y Verduras','Tallarines japones de trigo.',6.30,'1','saikosushi@gmail.com','',6),
(DEFAULT,'Yakisoba de Cerdo Asado y Verduras','Tallarines japones de trigo.',6.60,'1','saikosushi@gmail.com','',6),

(DEFAULT,'Tempura de Langostino','5 unidades.',4.80,'1','saikosushi@gmail.com','',7),
(DEFAULT,'Tempura de Verduras','5 unidades.',4.60,'1','saikosushi@gmail.com','',7),

(DEFAULT,'Sashimi de Salmón','3 piezas',7.50,'1','saikosushi@gmail.com','',8),
(DEFAULT,'Sashimi de Atún','3 piezas',8.60,'1','saikosushi@gmail.com','',8),
(DEFAULT,'Sashimi de Salmón, Atún y Dorada','Sashimi de salmón 2 piezas, atún 2 piezas y dorada 2 piezas.',8.60,'1','saikosushi@gmail.com','',8),
(DEFAULT,'Sashimi de Salmón y Atún','Sashimi de salmón 3 piezas y atún 3 piezas.',8.20,'1','miu@gmail.com','',8),

(DEFAULT,'GYOZA POLLO (4 Pzas)','Empanadillas tradicionales japonesas de pollo y verduras finalizadas a la plancha acompañada de salsa de soja avinagrada. ',5.70,'1','sushito@gmail.com','',9),
(DEFAULT,'GYOZA VERDURAS (4 pzas)','Empanadillas tradicionales japonesas de verduras finalizadas a la plancha acompañada de salsa de soja avinagrada. ',5.50,'1','sushito@gmail.com','',9),
(DEFAULT,'GOHAN','Arroz blanco cocido con un toque de sésamo.',3.90,'1','sushito@gmail.com','',9),
(DEFAULT,'EDAMAME','Habitas de soja con cristales de sal. ',3.90,'1','sushito@gmail.com','',9),

(DEFAULT,'POKE SALMON','Base de arroz acompañado de salmón, aguacate, goma wakame, edamame, zanahoria encurtida, cebolla crispy y sésamo aderezado con aceite de sesa',10.90,'1','sushito@gmail.com','',10),
(DEFAULT,'POKE DE ATUN','Base de arroz acompañado de atún, aguacate, goma wakame, edamame, zanahoria encurtida, cebolla crispy y sésamo aderezado con salsa ponzu. ',11.50,'1','sushito@gmail.com','',10),
(DEFAULT,'POKE VEGETAL','Base de arroz, acompañado de tofu, aguacate, goma wakame, edamame, zanahoria encurtida, cebolla crispy y sésamo aderezado con salsa ponzu y dressing. ',9.90,'1','sushito@gmail.com','',10),

(DEFAULT,'CRUJIENTE ROLL (4 piezas)','Rollito invertido de arroz relleno de tempura de langostino y espárrago crujiente recubierto con masago, aguacate y sésamo aderezado con mayonesa japonesa y salsa teriyaki',5.30,'1','sushito@gmail.com','',11),
(DEFAULT,'DOBLE MAGURO (8Pzas)','Rollito invertido de arroz relleno de atún y aguacate, recubierto de tataki de atún con huevas de tobiko negro aderezado con salsa salsa ponzu',10.90,'1','sushito@gmail.com','',11),
(DEFAULT,'DELICIAS DE VIERA (4 piezas)','Rollito invertido con arroz relleno de salmón y queso, recubierto de salmón y vieira flameado con mayonesa de trufa, huevas de ikura con salsa teriyaki',5.80,'1','sushito@gmail.com','',11),
(DEFAULT,'RAINBOW (8 Pzas)','Rollito invertido con arroz relleno de aguacate, cangrejo natural, mayonesa, recubierto con láminas de salmón, atún, corvina y masago de wasabi',11.50,'1','sushito@gmail.com','',11),

(DEFAULT,'SASHIMI SALMON (6 PZAS)','',6.90,'1','sushito@gmail.com','',12),
(DEFAULT,'SASHIMI ATÚN (6 PZAS)','',7.90,'1','sushito@gmail.com','',12),
(DEFAULT,'SASHIMI CORVINA','',7.50,'1','sushito@gmail.com','',12),
(DEFAULT,'SASHIMI ANGUILA (6 PZAS)','',7.60,'1','sushito@gmail.com','',12),


(DEFAULT,'Bandeja Combina 1 ','4 makis de salmón, 4 makis de atún y 4 de makis de aguacate. Contiene pescado. ',5.80,'1','hachiko@gmail.com','',13),
(DEFAULT,'Bandeja Combina 2','4 makis de salmón, 4 makis de atún, 4 salmón roll de salmón y queso y 4 crunch roll surimi. Contiene cereales, soja, lácteos, pescado y huevo.',9.80,'1','hachiko@gmail.com','',13),
(DEFAULT,'Bandeja Combina 3','4 California de salmón y aguacate, 3 nigiris salmón, 2 nigiris atún y 1 nigiri de langostino cocido. Contiene pescado, crustáceos y sésamo.',9.30,'1','hachiko@gmail.com','',13),
(DEFAULT,'Bandeja Combina 4','4 makis salmón, 4 makis atún, 2 nigiris salmón, 2 nigiris atún y 2 nigiris langostino cocido. Contiene pescado y crustáceos. ',10.50,'1','hachiko@gmail.com','',13),

(DEFAULT,'Crunch Roll Surimi','Surimi, aguacate, pepino, arroz, alga nori y cebolla frita. Contiene soja, lácteos y huevo. Bandeja de 8 piezas. ',6.80,'1','hachiko@gmail.com','',14),
(DEFAULT,'Crunch Roll de Salmón','Salmón, aguacate, pepino, arroz, alga nori y cebolla frita. Contiene pescado. Bandeja de 8 piezas. ',7.80,'1','hachiko@gmail.com','',14),
(DEFAULT,'Salmón Roll de Salmón y Queso','Salmón, aguacate, queso Philadelphia, arroz y alga nori. Contiene lácteos y pescado. Bandeja de 8 piezas.',7.50,'1','hachiko@gmail.com','',14),
(DEFAULT,'Dragón Roll de Salmón','Salmón, aguacate, surimi, pepino, arroz y alga nori. Contiene frutos secos, lácteos, huevo, soja y pescado. Bandeja de 8 piezas. ',7.80,'1','hachiko@gmail.com','',14),

(DEFAULT,'Maki de Salmón','Salmón, arroz y alga nori. Contiene pescado.',4.20,'1','hachiko@gmail.com','',15),
(DEFAULT,'Maki de Atún','Atún, arroz y alga nori. Contiene pescado.',4.80,'1','hachiko@gmail.com','',15),
(DEFAULT,'Maki de Langostino Cocido','Langostino cocido, arroz y alga nori. Contiene crustáceos.',4.20,'1','hachiko@gmail.com','',15),
(DEFAULT,'Maki de Mango','Mango, arroz y alga nori.',3.20,'1','hachiko@gmail.com','',15),

(DEFAULT,'Nigiri de Salmón 1 Pieza','Salmón y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',1.40,'1','hachiko@gmail.com','',16),
(DEFAULT,'Nigiri de Salmón Flameado 1 Pieza','Salmón y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',1.40,'1','hachiko@gmail.com','',16),
(DEFAULT,'Nigiri de Anguila 6 Piezas','Anguila asada y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',9.80,'1','hachiko@gmail.com','',16),
(DEFAULT,'Nigiri de Pez Mantequilla 6 Piezas','Pez mantequilla y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',8.20,'1','hachiko@gmail.com','',16),


INSERT INTO categories VALUES (DEFAULT,'Pizzas las Clasicas','pizzapazza@gmail.com'),(DEFAULT,'Platos','pizzapazza@gmail.com'),(DEFAULT,'Postre','pizzapazza@gmail.com'),(DEFAULT,'Bebidas','pizzapazza@gmail.com');

(DEFAULT,'Combo de 3 porciones','Caja de 3 porciones grandes de pizzas variadas: Margherita, jamón dulce+champiñones, vegetariana',8.90,'1','pizzapazza@gmail.com','',17),
(DEFAULT,'Pizza Margherita','Tomate y mozzarella.',8.90,'1','pizzapazza@gmail.com','',17),
(DEFAULT,'Pizza Vegetariana','Tomate, mozzarella, zucchini funghi, melanzane y pimientos.',10.60,'1','pizzapazza@gmail.com','',17),
(DEFAULT,'Pizza Diavola','Tomate, mozzarella, salame piccante, pimientos y pepperoncini.',10.50,'1','pizzapazza@gmail.com','',17),

(DEFAULT,'Lasagna Casereccia','Hojas de pasta, tomate, carne picada, besciamella y parmesano.',4.50,'1','pizzapazza@gmail.com','',18),

(DEFAULT,'Pannacotta','Nata cocida a gusto fresa, caramelo o chocolate.',4.50,'1','pizzapazza@gmail.com','',19),
(DEFAULT,'Tiramisú','Mascarpone, savoiardi, huevos, café, cacao y azúcar.',4.50,'1','pizzapazza@gmail.com','',19),

(DEFAULT,'Estathé','Refresco gusto te.',2,'1','pizzapazza@gmail.com','',20),
(DEFAULT,'Aranciata','San Pellegrino.',2,'1','pizzapazza@gmail.com','',20),
(DEFAULT,'Chinotto','San Pellegrino.',2,'1','pizzapazza@gmail.com','',20),
(DEFAULT,'Agua','San Pellegrino.',1.50,'1','pizzapazza@gmail.com','',20),


 (DEFAULT,'Lo mas pedido','napoli@gmail.com'),(DEFAULT,'Antipastis','napoli@gmail.com'),(DEFAULT,'Pizzas','napoli@gmail.com'),(DEFAULT,'Primi Piatti','napoli@gmail.com');
 (DEFAULT,'Pizza Bellezza di Venere','Pizza estilo calzone, rellana de un mixto de 4 quesos, jamón de parma, rucula, Grana Padano, crema de balsamico y aceite de oliva virgen.',16.75,'1','napoli@gmail.com','',21),

(DEFAULT,'La Parmigiana di Melanzane','Berenjenas cocidas al horno con tomate y parmesano.',10.90,'1','napoli@gmail.com','',22),
(DEFAULT,'Caprese Pomodoro Mozzarella','Mozarella fior di latte 100% leche italiana, con tomate y albahaca.',10.70,'1','napoli@gmail.com','',22),
(DEFAULT,'Carpaccio di manzo ','Carpaccio de ternera con rúcula y parmesano',12.75,'1','napoli@gmail.com','',22),

(DEFAULT,'Pizza Tonno E Cipolla','Tomate, mozzarella, cebolla, atún y olivas.',11.90,'1','napoli@gmail.com','',23),
(DEFAULT,'Pizza Vegetariana','Tomate, mozzarella, calabacin, berenjenas y pimientos rojos.',11.40,'1','napoli@gmail.com','',23),
(DEFAULT,'Pizza Capricciosa','Tomate, mozzarella, prosciutto cotto, salami picante, champiñones y olivas negras.',13.45,'1','napoli@gmail.com','',23),
(DEFAULT,'Pizza Via Napoli','Mozzarella, rucula, tomate cherry, prosciutto crudo di parma y parmesano.',12.90,'1','napoli@gmail.com','',23),

(DEFAULT,'Spaghetti Carbonara','Spaguettis en salsa con guanciale italiano, huevo, queso romano y pimienta negra.',12.45,'1','napoli@gmail.com','',24),
(DEFAULT,'Spaghetti a Puttanesca','Spaguetti en salsa de tomate, olivas negras, ajo, chile y anchoas.',13.70,'1','napoli@gmail.com','',24),
(DEFAULT,'Lasagne','Lasaña boloñesa ',12.45,'1','napoli@gmail.com','',24),
(DEFAULT,'Linguine frutti di mare','Linguinis salteados con ajo, vino blanco, almejas, mejillones y gambitas',15.75,'1','napoli@gmail.com','',24),

 (DEFAULT,'Specialita di Paste e Paste Fresche','gusto_rest@gmail.com'),(DEFAULT,'Rissoto Carnaroli Italiano','gusto_rest@gmail.com'),(DEFAULT,'Pizza Forno e Legna','gusto_rest@gmail.com'),(DEFAULT,'Pizza Speciali Forno a Legna','gusto_rest@gmail.com');
 (DEFAULT,'Lasagna Napoletana','Típico pastel napolitano relleno, gratinados al horno de leña. ',13.50,'1','gusto_rest@gmail.com','',25),
(DEFAULT,'Cannelloni Al Forno','Canelones relleno, gratinados al horno de leña. ',13.50,'1','gusto_rest@gmail.com','',25),
(DEFAULT,'Mezzelune Ripiene di Burrata','Pasta fresca rellena de burata con salsa pesto o tomate.',14.00,'1','gusto_rest@gmail.com','',25),
(DEFAULT,'Panzerotti Ricotta e Funghi Porcini','Pasta fresca rellena de requesón y ceps “porcini italiani”, salsa de setas frescas y trufa negra de verano. ',15.00,'1','gusto_rest@gmail.com','',25),

(DEFAULT,'Risotto Cremoso di Verdure Fresche','Arroz con cremoso de verduras mixta y queso mascarpone.',13.00,'1','gusto_rest@gmail.com','',26),
(DEFAULT,'Risotto Misto Funghi e Porcini con Tartufo Nero','Arroz con salsa mixto de setas de cultivo con porcini (ceps italiano) y trufa negra de verano.',17.00,'1','gusto_rest@gmail.com','',26),
(DEFAULT,'Risotto al Nero con Moscardini e Gamberi di Palamos','Arroz con tinta de calamares, chipirones, gamba de Palamós y tomatito cherry.',18.00,'1','gusto_rest@gmail.com','',26),

(DEFAULT,'Pizza Margherita','Salsa de tomate, mozzarella y albahaca.',9.00,'1','gusto_rest@gmail.com','',27),
(DEFAULT,'Pizza Prosciutto e Funghi','Tomate, mozzarella, pernil dulce y champiñones.',12.00,'1','gusto_rest@gmail.com','',27),
(DEFAULT,'Pizza Bufala','Salsa de tomate, mozzarella de búfala y albahaca.',13.00,'1','gusto_rest@gmail.com','',27),
(DEFAULT,'Pizza Fantasia','Tomate, mozzarella, bacón, champiñones y huevo frito al horno.',14.00,'1','gusto_rest@gmail.com','',27),

(DEFAULT,'Pizza Calzone Fritto','Pizza doblada frita y rellena con requesón, queso provola ahumado, salami picante, salsa tomate y pimienta negra.',12.00,'1','gusto_rest@gmail.com','',28),
(DEFAULT,'Pizza Girello','Rollito de pizza relleno de mozzarella, pesto, rucola, mortadela, cortada y servida con base de rucola, tomatito cherry y parmesano.',16.00,'1','gusto_rest@gmail.com','',28),
(DEFAULT,'Pizza Bianca al Tartufo','Blanca sin tomate con mozzarella de búfala, piñones tostado y trufa negra de verano.',19.00,'1','gusto_rest@gmail.com','',28),
(DEFAULT,'Pizza Focaccia','Pan de pizza con aceite y romero.',5.00,'1','gusto_rest@gmail.com','',28),

 (DEFAULT,'Pizzas Clasicas','pizzamarket@gmail.com'),(DEFAULT,'Pizzas Especiales','pizzamarket@gmail.com'),(DEFAULT,'Pizzas Gourmet','pizzamarket@gmail.com'),(DEFAULT,'Panini','pizzamarket@gmail.com');
 (DEFAULT,'Margarita','Tomate y mozzarella. (Vegetariana)',9.90,'1','pizzamarket@gmail.com','',29),
(DEFAULT,'Funghi','Tomate, mozzarella, jamón dulce y champiñones. ',11.90,'1','pizzamarket@gmail.com','',29),
(DEFAULT,'4 Quesos','Tomate, mozzarella, queso de cabra, gorgonzola y emmental. (Vegetariana).',11.90,'1','pizzamarket@gmail.com','',29),
(DEFAULT,'Carbonara','Mozzarella, nata, cebolla, bacon, champiñones. ',12.90,'1','pizzamarket@gmail.com','',29),

(DEFAULT,'Reina','Tomate, mozzarella, jamón dulce, champiñones, rúcula y parmesano.',12.90,'1','pizzamarket@gmail.com','',30),
(DEFAULT,'Ses Illes','Tomate, mozzarella, cebolla, sobrasada de Mallorca y miel picante.',12.90,'1','pizzamarket@gmail.com','',30),
(DEFAULT,'American Meet','Tomate, mozzarella, bacon, pepperoni, ternera y extra de mozzarella',13.90,'1','pizzamarket@gmail.com','',30),
(DEFAULT,'Veggie','Tomate, mozzarella vegana, cebolla de Figueres, champiñones, calabacín, tomate seco y aceite de albahaca (es vegana)',14.90,'1','pizzamarket@gmail.com','',30),

(DEFAULT,'Toscana','Tomate, mozzarella, tomate seco, burrata, olivada, aceite de albahaca y rúcula. ',15.90,'1','pizzamarket@gmail.com','',31),
(DEFAULT,'Tartufata','Crema trufada, mozzarella, champiñones, virutas de bacon, queso gruyere y aceite de trufa blanca.',15.90,'1','pizzamarket@gmail.com','',31),
(DEFAULT,'Foie','Mozzarella, cebolla caramelizada, crema con ceps salteados y foie fresco ',16.90,'1','pizzamarket@gmail.com','',31),
(DEFAULT,'Jabugo','Tomate, mozzarella, 100gr de viruta de jamón ibérico de bellota Andreu',18.90,'1','pizzamarket@gmail.com','',31),

(DEFAULT,'Bikini','Jamón dulce y queso.',5.40,'1','pizzamarket@gmail.com','',32),
(DEFAULT,'Mallorquín','Sobrasada de Mallorca, queso y miel',5.40,'1','pizzamarket@gmail.com','',32),
(DEFAULT,'Ibérico','Burrata y virutas de jamón ibérico de bellota Andreu.',8.90,'1','pizzamarket@gmail.com','',32),

 (DEFAULT,'Top ventas','ayres@gmail.com'),(DEFAULT,'Parrilla al Carbon','ayres@gmail.com'),(DEFAULT,'Entrantes','ayres@gmail.com'),(DEFAULT,'Platos del dia','ayres@gmail.com');
 (DEFAULT,'Entraña de Ternera con fritas','Corte argentino con Fritas!!',15.65,'1','ayres@gmail.com','',33),
(DEFAULT,'Entrecot de Novillo Argentino','Lomo alto argentino . 300 gramos. ',21.00,'1','ayres@gmail.com','',33),
(DEFAULT,'Ñoquis del 29','Ñoquis caseros con salsa tradicional boloñesa. Solo disponible el 29 de cada mes',9.90,'1','ayres@gmail.com','',33),
(DEFAULT,'Ñoquis + chocotorta','Noquis casero con salsa boloñesa + 1 racion de chocotorta. Solo disponible el 29 de cada mes ',14.00,'1','ayres@gmail.com','',33),

(DEFAULT,'Hamburguesa Black Angus','200 gramos de ternera black angus a las brasas de carbon con queso y cebolla caramelizada! con patatas fritas ',10.50,'1','ayres@gmail.com','',34),
(DEFAULT,'Tira de Asado','Asado de tira estilo argentino ',15.65,'1','ayres@gmail.com','',34),
(DEFAULT,'Vacio con patatas fritas','',15.65,'1','ayres@gmail.com','',34),
(DEFAULT,'Pescado del dia a la Parrilla','',12.00,'1','ayres@gmail.com','',34),

(DEFAULT,'Coca de pan con chimichurri','Coca de pan crujiente y tostado a las brasas con chimichurri, una delicia!!',2.20,'1','ayres@gmail.com','',35),
(DEFAULT,'Queso Provoleta Ayres del Sur','Con cebolla caramelizada y pan de coca.',9.65,'1','ayres@gmail.com','',35),
(DEFAULT,'Ensalada César con Pollo a la Parrilla','Variedad de verdes, bacon, croutons, queso parmesano, pollo braseado y salsa César. ',8.90,'1','ayres@gmail.com','',35),
(DEFAULT,'Empanada de ternera ','Empanada criolla de ternera',2.80,'1','ayres@gmail.com','',35),

(DEFAULT,'Ensalada de tomates en diferentes texturas y tierra de aceitunas negras','ensalada de verdes con productos de temporada',5.00,'1','ayres@gmail.com','',36),
(DEFAULT,'Postre del dia: Tarta de manzana con caramelo','',4.50,'1','ayres@gmail.com','',36),

 (DEFAULT,'Menus','caneusebio@gmail.com'),(DEFAULT,'Menu Niños','caneusebio@gmail.com'),(DEFAULT,'Tapas','caneusebio@gmail.com'),(DEFAULT,'Bocadillos Calientes','caneusebio@gmail.com');
 (DEFAULT,'Hamburguesa Clásica con Cebolla y Queso + Patatas Fritas Regalo 1 Coca-cola','Deliciosa Hamburguesa de Carne alta Calidad , con Queso Fundido y Cebolla ,la hamburguesa tradicional ,acompañada com patatas Fritas una excelente opcion.',7.50,'1','caneusebio@gmail.com','',37),
(DEFAULT,'Hamburguesa Mediterránea +lechuga+cebolla+huevo+ tomate y Patatas Fritas','Con lechuga, huevo, tomate, queso, cebolla y patatas fritas.',9.50,'1','caneusebio@gmail.com','',37),
(DEFAULT,'Hamburguesa Paralelo +beicon+queso+cebolla+tomate+ Patatas Fritas Regalo 1 Coca-Cola','Con bacon, huevo Frito , Tomate, Queso Fundido , cebolla Frita y patatas fritas.',9.50,'1','caneusebio@gmail.com','',37),
(DEFAULT,'Frankfurt El Original + Patatas Fritas y Regalo 1 Coca-cola ','NO lleva ninguna salsa ,Ni tomate, si deseas alguna salsa deberas agregar al pedido.',6.50,'1','caneusebio@gmail.com','',37),

(DEFAULT,'Pollo Rebozado crujiente +patatas fritas +zumo +Tarrina helado Vainilla-chocolate','Menu especial niños pollo rebozado crujiente muy bueno con patatas fritas y un helado de vainilla -chocolate ',8.90,'1','caneusebio@gmail.com','',38),
(DEFAULT,'6 Nugget de Pollo + patatas Fritas + ketchup + Bebida zumo + un Petisuis ','Menu Para Niños completo.',8.50,'1','caneusebio@gmail.com','',38),

(DEFAULT,'Bolitas de queso Fritas Rebozadas ','Bolitas de queso fundido fritas , rebozadas para los amantes del queso , ',7.90,'1','caneusebio@gmail.com','',39),
(DEFAULT,'Empanada Argentina ','Deliciosa Empanada Argentina de Carne y Huevo 2und',7.90,'1','caneusebio@gmail.com','',38),
(DEFAULT,'Calamares Romana ','Calamares a la romana esquisito sabor ,y si lo acompañas con limon y mahonesa tendras la combinacion perfecta.',9.90,'1','caneusebio@gmail.com','',40),
(DEFAULT,'Chocos a la Andaluza','Tapa de tiras rebozadas de pota ,choco con limon exprimido por encima es perfecto ,para este verano .',8.90,'1','caneusebio@gmail.com','',40),

(DEFAULT,'Bocadillo Lomo +Queso Fundido pan con Tomate ','pan de baguet tamaño media barra de pan ',5.90,'1','caneusebio@gmail.com','',41),
(DEFAULT,'Bocadillo Beicon con Queso Fundido','se silve en pan de baguet su tamaño es media barra de pan',5.90,'1','caneusebio@gmail.com','',41),
(DEFAULT,'Bikini Jamon Dulce con Queso Fundido','se silve en pan de molde bikini con jamon york y queso loncha fundido .',3.90,'1','caneusebio@gmail.com','',41),
(DEFAULT,'Bocadilo Tortilla Francesa pan con Tomate','se silve en pan de baguet y su tamaño es media barra de pan',4.90,'1','caneusebio@gmail.com','',41),

 (DEFAULT,'Pica Picas','bbqexpress@gmail.com'),(DEFAULT,'Ternera','bbqexpress@gmail.com'),(DEFAULT,'Parrilladas','bbqexpress@gmail.com'),(DEFAULT,'Vegetariano','bbqexpress@gmail.com');
 (DEFAULT,'Palomitas de pollo con Barbacoa','Trocitos de pollo natural, con un rebozado muy dorado y crujiente, acompañado de salsa barbacoa. (La salsa va incluida y servida por separado).',4.90,'1','bbqexpress@gmail.com','',42),
(DEFAULT,'Jalapeños rellenos queso cheddar','5 Uds. Jalapeños verdes picantes, rellenos de auténtico queso cheddar.',4.90,'1','bbqexpress@gmail.com','',42),
(DEFAULT,'Dipper 3 salsas','Patata rústica con piel, en forma de arco. Ideal para “dipear” salsas. Incluyen 3 tarrinas de 50ml',4.90,'1','bbqexpress@gmail.com','',42),
(DEFAULT,'Tiras de pollo con chili dulce','Tiras de pollo rebozadas y sazonadas con un toque de chili dulce. (La salsa va incluida y servida por separado).',4.90,'1','bbqexpress@gmail.com','',42),

(DEFAULT,'Corte Argentino','Carne de ternera. Corte de vacío. Aproximadamente 250gr. Guarnición a elegir (opcional).',8.50,'1','bbqexpress@gmail.com','',43),
(DEFAULT,'Churrasco','Carne de ternera. Corte de churrasco (incluye hueso). Aproximadamente 300gr. Guarnición a elegir (opcional).',8.90,'1','bbqexpress@gmail.com','',43),
(DEFAULT,'Entraña','Corte de carne muy especial y no tan común. No se asegura siempre su disponibilidad. Se prepara con la piel entera para conservar su jugo y sabor. Se recomienda que esté hecha al punto. ¡Esta espectacular! Se acompaña con chimichurri casero.',11.40,'1','bbqexpress@gmail.com','',43),
(DEFAULT,'Entrecote','Carne de ternera. Corte de entrecot (incluye hueso). 300gr Aproximadamente. Guarnición a elegir (opcional).',12.90,'1','bbqexpress@gmail.com','',43),

(DEFAULT,'Parrillada extrema','Doble corte de vacío (ternera) + Doble corte de churrasco + Entraña entera + 20 Alitas de pollo normales + Medio pollo + 3 Chorizos criollos + 3 Butifarras + 3 Frankfurt + 3 Cervelas + 3 Morcillas',79.00,'1','bbqexpress@gmail.com','',44),
(DEFAULT,'Parrillanda Mix 2','Corte de vacío (ternera) + Churrasco + alitas de pollo normales (8 uds.) + Chorizo criollo parrillero + Butifarra + Cervela + Morcilla',26.90,'1','bbqexpress@gmail.com','',44),
(DEFAULT,'Parrillanda Mix 3','Doble corte de vacío (ternera) + Churrasco + alitas de pollo normales (12 uds.) + medio pollo + Chorizo criollo parrillero + Butifarra + Frankfurt + Cervela + Morcilla',37.90,'1','bbqexpress@gmail.com','',44),
(DEFAULT,'Parrillada deluxe','Entrecot + Media entraña + Vacío de ternera + Churrasco + 2 chorizos criollos + 2 butifarras + 8 alitas de pollo normales + 2 Morcillas',44.90,'1','bbqexpress@gmail.com','',44),

(DEFAULT,'Parrillada de verduras','Verduras frescas hechas a la brasa. (cebolla, pimiento, berenjena, tomate, espárragos, calabacín)',4.90,'1','bbqexpress@gmail.com','',45),
(DEFAULT,'Vegan burger','Hecha con proteína natural. Servida en pan de Sésamo. Acompañada de tomate, lechuga, cebolla natural.',6.90,'1','bbqexpress@gmail.com','',45),
(DEFAULT,'Arroz con chimichurri','Arroz blanco cocido al punto, mezclado con chimichurri. Ración de 150gr.',2.90,'1','bbqexpress@gmail.com','',45),
(DEFAULT,'Cheese vegan burger','Hamburguesa vegetariana. Pan con sésamo, queso Monterrey Jack (apto para vegetarianos). Acompañada de tomate, lechuga, cebolla natural.',7.90,'1','bbqexpress@gmail.com','',45),

 (DEFAULT,'Entretenimientos','canvador@gmail.com'),(DEFAULT,'De temporada','canvador@gmail.com'),(DEFAULT,'Platillos del Vador','canvador@gmail.com'),(DEFAULT,'Carnes a la brasa','canvador@gmail.com');
 (DEFAULT,'Croqueta Casera de Pollo Rustido','Unidad',1.50,'1','canvador@gmail.com','',46),
(DEFAULT,'Croqueta Vegana de Boletus','Unidad',2.00,'1','canvador@gmail.com','',46),
(DEFAULT,'Patatas Degustación Rellenas de Salsa Brava y Alioli','',5.50,'1','canvador@gmail.com','',46),

(DEFAULT,'Níscalos del Montseny a la Brasa con Picada de Ajo y Perejil','',12.00,'1','canvador@gmail.com','',47),
(DEFAULT,'Alcachofas del Prat Rebozadas ','',8.50,'1','canvador@gmail.com','',47),
(DEFAULT,'Tortilla Abierta con Crujiente de Alcachofa y Níscalos ','',8.50,'1','canvador@gmail.com','',47),
(DEFAULT,'Trinxat de La Cerdanya con Butifarra Negra y Rosta de Panceta ','',7.00,'1','canvador@gmail.com','',47),

(DEFAULT,'Nuestra Ensaladilla','Patata confitada con atún en aceite de oliva y huevo, mayonesa de crustáceos, pirarra y picos rústicos',7.00,'1','canvador@gmail.com','',48),
(DEFAULT,'Espárragos trigueros a la brasa con salsa holandesa','',7.00,'1','canvador@gmail.com','',48),
(DEFAULT,'Caldo de Escudella de Payés con Galets y Pelotitas de Cocido','',6.00,'1','canvador@gmail.com','',48),
(DEFAULT,'Canelones de Tres Carnes rustidas y Gratinados con Bechamel y Queso ','',7.00,'1','canvador@gmail.com','',48),

(DEFAULT,'Butifarra Artesana de Vallromanes','',8.00,'1','canvador@gmail.com','',49),
(DEFAULT,'Manitas de Cerdo al Estilo Can Vador','',10.00,'1','canvador@gmail.com','',49),
(DEFAULT,'Costillas y Chuletas de Cordero','',14.00,'1','canvador@gmail.com','',49),
(DEFAULT,'1/4 Pollo de Payés Muslo','',6.50,'1','canvador@gmail.com','',49),

 (DEFAULT,'Combos','chatico@gmail.com'),(DEFAULT,'Frankfurts','chatico@gmail.com'),(DEFAULT,'Hamburguesas','chatico@gmail.com'),(DEFAULT,'Bocadillos','chatico@gmail.com');
 (DEFAULT,'Combo Frankfurt + Patatas + Bebida','',8.00,'1','chatico@gmail.com','',50),
(DEFAULT,'Combo Hamburguesa + Patatas + Bebida','',8.00,'1','chatico@gmail.com','',50),

(DEFAULT,'Butifarra Pages','',4.50,'1','chatico@gmail.com','',51),
(DEFAULT,'Cervela','',4.30,'1','chatico@gmail.com','',51),
(DEFAULT,'Pikantwurst','',4.30,'1','chatico@gmail.com','',51),
(DEFAULT,'Salsitxa del País','',4.00,'1','chatico@gmail.com','',51),

(DEFAULT,'Hamburguesa Moruna','',5.30,'1','chatico@gmail.com','',52),
(DEFAULT,'Hamburguesa de Ternera','',5.00,'1','chatico@gmail.com','',52),

(DEFAULT,'Bocadillo Spicy','Pikantwurst con cebolla frita y queso.',7.00,'1','chatico@gmail.com','',53),
(DEFAULT,'Bocadillo Morcillo','Malagueña con queso y huevo frito.',5.50,'1','chatico@gmail.com','',53),
(DEFAULT,'Bocadillo Tejano','Frankfurt XL con queso edam, bacon crujiente y aros de cebolla.',6.00,'1','chatico@gmail.com','',53),
(DEFAULT,'Bocadillo Criollo','Chorizo criollo con lechuga y tomate con un toque argentino.',5.50,'1','chatico@gmail.com','',53),

 (DEFAULT,'Top Ventas','kfc@gmail.com'),(DEFAULT,'Menu para 2 personas','kfc@gmail.com'),(DEFAULT,'Menus para grupos','kfc@gmail.com'),(DEFAULT,'Menus del dia','kfc@gmail.com');
 (DEFAULT,'Menu Cheddar Addiction Burger','Filete de Pechuga Original, disco de cheddar fundido, bacon, lechuga, mayonesa y pan brioche + 1 complemento + 1 bebida',9.79,'1','kfc@gmail.com','',54),
(DEFAULT,'Súper Menú','El principal que quieras + 3 complementos + 1 bebida',9.99,'1','kfc@gmail.com','',54),
(DEFAULT,'Chick&Share 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas',13.99,'1','kfc@gmail.com','',54),
(DEFAULT,'Menú Bucket 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas + 2 complementos + 2 bebidas',17.99,'1','kfc@gmail.com','',54),

(DEFAULT,'Menú Super Bucket para 2','2 Twister Wrap + 9 Tiras de Pechuga + 3 salsas + 2 complementos + 2 bebidas',19.49,'1','kfc@gmail.com','',55),
(DEFAULT,'Menú Bucket 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas + 2 complementos + 2 bebidas',17.99,'1','kfc@gmail.com','',55),
(DEFAULT,'Chick&Share 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas',13.99,'1','kfc@gmail.com','',55),
(DEFAULT,'Menu Bucket Cheddar Addiction para 2','6 Tiras de Pechuga + 6 Delicias de Pollo + 6 Cheddar Bites + 2 salsas cheddar + 2 complementos + 2 bebidas',18.99,'1','kfc@gmail.com','',55),

(DEFAULT,'Menú Family Combo para 4','2 Original Burger + 2 Twister Wrap + 6 Tiras de Pechuga + 8 Alitas Picantes + 2 salsas + 4 complementos + 4 bebidas',34.99,'1','kfc@gmail.com','',56),
(DEFAULT,'Menú Bucket 15 Tiras para 3','15 Tiras de Pechuga + 5 salsas + 3 complementos + 3 bebidas',24.99,'1','kfc@gmail.com','',56),
(DEFAULT,'Menú Bucket 20 Tiras para 4','20 Tiras de Pechuga + 6 salsas + 4 complementos + 4 bebidas',29.99,'1','kfc@gmail.com','',56),
(DEFAULT,'Menú Bucket 12 Piezas para 4','12 Piezas de Pollo + 4 complementos + 4 bebidas',29.99,'1','kfc@gmail.com','',56),

(DEFAULT,'Súper Menú','El principal que quieras + 3 complementos + 1 bebida',9.99,'1','kfc@gmail.com','',57),
(DEFAULT,'Burger Double Krunch + Patatas','Burger de 2 Tiras de Pechuga, lechuga y mayonesa + 1 patatas',4.99,'1','kfc@gmail.com','',57),
(DEFAULT,'Box de 8 Alitas Picantes','',7.99,'1','kfc@gmail.com','',57),
(DEFAULT,'Box de 6 Tiras','6 Tiras de Pechuga + 2 salsas',7.99,'1','kfc@gmail.com','',57),

 (DEFAULT,'McHappy','mcdonald@gmail.com'),(DEFAULT,'McMenu','mcdonald@gmail.com'),(DEFAULT,'Happy Meal','mcdonald@gmail.com'),(DEFAULT,'Complementos','mcdonald@gmail.com');
 (DEFAULT,'Big Good','Una hamburguesa creada con 7 ingredientes de 2.000 productores locales afectados por la crisis del COVID-19.',5.65,'1','mcdonald@gmail.com','',58),
(DEFAULT,'Grand McExtreme™ Double Bacon','Doble de bacon y carne, queso gouda, cebolla y salsa McBacon',6.80,'1','mcdonald@gmail.com','',58),
(DEFAULT,'CBO','Bacon, cebolla, lechuga y sabroso pollo supreme',5.65,'1','mcdonald@gmail.com','',58),
(DEFAULT,'Big Mac','Carne, pepinillos, lechuga, cebolla y queso',4.65,'1','mcdonald@gmail.com','',58),

(DEFAULT,'McMenú Mediano ASC Tenders 3 uds.','Deliciosas tiras de pollo crujiente',7.75,'1','mcdonald@gmail.com','',59),
(DEFAULT,'McRoyal Deluxe','Queso, tomate, mayonesa y lechuga',4.75,'1','mcdonald@gmail.com','',59),
(DEFAULT,'McWrap® Chicken & Bacon','Pollo, bacon, tomate, lechuga y mayonesa',5.65,'1','mcdonald@gmail.com','',59),
(DEFAULT,'9 McNuggets','Bocaditos de pollo rebozados con salsa a elegir',4.75,'1','mcdonald@gmail.com','',59),

(DEFAULT,'Hamburguesa','Deliciosa carne, cebolla y pepinillos',3.96,'1','mcdonald@gmail.com','',60),
(DEFAULT,'Hamburguesa con Queso','Deliciosa carne, cebolla, pepinillos y queso',3.95,'1','mcdonald@gmail.com','',60),
(DEFAULT,'4 McNuggets','Deliciosos bocaditos de pollo rebozado',3.95,'1','mcdonald@gmail.com','',60),
(DEFAULT,'Chicken Burger Kids','Delicioso pollo crujiente y kétchup',3.95,'1','mcdonald@gmail.com','',60),

(DEFAULT,'8 A.S.C. Tenders','8 tiras de pollo crujiente',12.35,'1','mcdonald@gmail.com','',61),
(DEFAULT,'McNuggets 25 Uds.','Delicioso pollo rebozado con salsa a elegir',10.20,'1','mcdonald@gmail.com','',61),
(DEFAULT,'Top Fries Bacon & Cheese para Compartir','Patatas con salsa de queso y bacon',4.20,'1','mcdonald@gmail.com','',61),
(DEFAULT,'4 Alitas','Alitas de pollo con sabor barbacoa',2.65,'1','mcdonald@gmail.com','',61),

 (DEFAULT,'Especialidades','wok@gmail.com'),(DEFAULT,'Sopa de Ramen','wok@gmail.com'),(DEFAULT,'Platos principales','wok@gmail.com'),(DEFAULT,'Wok','wok@gmail.com');
 (DEFAULT,'Gyozas al Vapor de Cerdo y Verduras','',2.95,'1','wok@gmail.com','',62),
(DEFAULT,'Gyozas al Vapor de Gambas','',3.50,'1','wok@gmail.com','',62),
(DEFAULT,'Rollitos Primavera Vegetales','',2.75,'1','wok@gmail.com','',62),
(DEFAULT,'Samosas','Pollo al curry.',2.95,'1','wok@gmail.com','',62),

(DEFAULT,'Sopa de Ramen con Pollo','',4.95,'1','wok@gmail.com','',63),
(DEFAULT,'Sopa de Ramen con Gambas','',4.95,'1','wok@gmail.com','',63),
(DEFAULT,'Sopa de Ramen con Verduras','',4.95,'1','wok@gmail.com','',63),

(DEFAULT,'Pollo Teriyaki','Pollo, salsa teriyaki y arroz.',5.95,'1','wok@gmail.com','',64),
(DEFAULT,'Pollo al Curry','Pollo, salsa curry y arroz.',5.95,'1','wok@gmail.com','',64),
(DEFAULT,'Ternera con Salsa de Soja','Ternera, verduras, salsa de soja y arroz.',6.95,'1','wok@gmail.com','',64),

(DEFAULT,'Wok Normal','Escoge la base, combina ingredientes a tu gusto, escoge la salsa y el topping favorito.',5.20,'1','wok@gmail.com','',65),
(DEFAULT,'Wok Pequeño','Escoge la base, combina ingredientes a tu gusto, escoge la salsa y el topping favorito.',4.20,'1','wok@gmail.com','',65),

 (DEFAULT,'Baos','boabao@gmail.com'),(DEFAULT,'Soups','boabao@gmail.com'),(DEFAULT,'Wok','boabao@gmail.com'),(DEFAULT,'Curry & sides','boabao@gmail.com');
 (DEFAULT,'Pato Pekin Con Hoisin. Pepino Cebollino','Ingredientes: White Gua Bao bun: (wheat flour, water, yeast). Peking Duck. Gua Bao Sauce: (peanut, sake, hoisin). Sriracha. Yellow pickled radish. Cucumber. Spring Onion. ',7.50,'1','boabao@gmail.com','',66),
(DEFAULT,'Panceta De Cerdo Con Hoisin Y Verduras',' Ingredientes: Pumpkin Gua Bao bun: (wheat flour, water, yeast, pumpkin). Pork Belly. Miso Mayonnaise: (mayonnaise, miso paste). Japanese Coleslaw: (carrot, cabbage, edamame soybean, miso paste, rice wine vinegar). Yellow Pickled Radish. Cucumber. Pork Crackling. Spring Onion. ',6.50,'1','boabao@gmail.com','',66),
(DEFAULT,'Dragón con Gambas ','Ingredientes: White Gua Bao bun: (wheat flour, water, yeast). Shrimp. Sweet & Sour Sauce: (vinegar, soy, ketchup). Spring onion. Pineapple. Cucumber. Seaweed. ',6.50,'1','boabao@gmail.com','',66),
(DEFAULT,'Pollo Crujiente con Boniato y salsa de Tamarindo','Ingredientes: Gua Bao: (wheat flour, water, yeast, pumpkin, bambou). Panko Chicken. Tofu. Mushroom. Tamarind chutney: (tamarind, chili, ketchup, sugar). Marinated Sweet Potato: (sweet potato, soy, sesame). Pickled Radish. Spring Onion. ',6.50,'1','boabao@gmail.com','',66),

(DEFAULT,'Tom Yam Kung. Picante Con Gambas Black Tiger Y Fideos De Arroz','Ingredientes: Tom Yam soup: (galanga, lime leaf, lemongrass, chili, roasted chili paste, lime). Straw mushrooms. Rice noodle. Shrimp. Coriander. ',15.50,'1','boabao@gmail.com','',67),
(DEFAULT,'Hanoi Pho Con Ternera. Fideos De Arroz. Especias Y Brotes De Soja ','Ingredientes: Phō soup: (beef, fish sauce, spices, ginger, water). Rice stick noodle. Onion, bean sprouts, Thai Basil, beef, lime, sriracha, hoisin. ',14.90,'1','boabao@gmail.com','',67),

(DEFAULT,'Pad Thai Con Gambas Black Tiger Y Fideos De Arroz','Ingredientes: Rice noodles. Egg. Shrimps. Leeks, Chinese garlic, Bean sprouts. Pad Thai sauce: (tamarind, soy, sugar). Fish sauce. Peanuts, lime. ',16.50,'1','boabao@gmail.com','',68),
(DEFAULT,'Pad Thai Con Pollo,Verduras y Fideos De Arroz ',' Ingredientes: Rice noodles. Egg. Chicken. Leeks, Chinese garlic, Bean sprouts. Pad Thai sauce: (tamarind, soy, sugar). Fish sauce. Peanuts, lime. ',15.50,'1','boabao@gmail.com','',68),
(DEFAULT,'Arroz Frito Con Pollo Y Huevo','Ingredientes: Egg. Jasmine rice. Chicken. Carrots, onion, mushroom, water chestnut, sweetcorn, long beans, raisin, spring onion. Soy sauce. Spring onion. ',12.50,'1','boabao@gmail.com','',68),
(DEFAULT,'Japchae de Ternera (Fideo Coreanos De Boniato)','Ingredientes: Beef. Korean sweet potato noodles. Bok choy, Carrots, Broccoli, Onion, Mushroom,White cabbage,Snow peas, leeks, Ginger. Soy sauce, Oyster sauce, Garlic, Sesame oil. Sesame seeds. Spring onion. ',15.50,'1','boabao@gmail.com','',68),

(DEFAULT,'Massaman De Ternera Y Coco ','Ingredientes: Massaman curry: ( Spices, shrimp paste, coconut, tamarind ). Beef. Bamboo strips. Sliced onion. Potato. Coriander. Fried onion. Peanut.',15.50,'1','boabao@gmail.com','',69),
(DEFAULT,'Curry Verde Thai Con Tofu','Ingredientes: Green curry: ( spices, shrimp paste, coconut ). Tofu. Bamboo. Gourget. Potato. Spring onion, chili, lime leaves.',15.50,'1','boabao@gmail.com','',69),
(DEFAULT,'Arroz Frito','Ingredientes: Jasmine rice, egg, soy sauce. ',2.50,'1','boabao@gmail.com','',69),
(DEFAULT,'Arroz Jazmin ','Ingredientes: Jasmine rice. ',2.00,'1','boabao@gmail.com','',69),


 (DEFAULT,'Ofertas','fulin@gmail.com'),(DEFAULT,'Sopas','fulin@gmail.com'),(DEFAULT,'Fideos y tallarines','fulin@gmail.com'),(DEFAULT,'Arroces','fulin@gmail.com');

(DEFAULT,'Oferta 4€ Rollo de primavera( 3 piezas)','Oferta Rollo de primavera( 3 piezas). Relleno de carne de cerdo picada y verduras.',4.00,'1','fulin@gmail.com','',70),
(DEFAULT,'Oferta 5€ Empanadillas Fritas ( 12 piezas)','Oferta empanadillas fritas ( 12 piezas). Relleno de carne de cerdo picada y verduras. Incluye salsa de soja.',5.00,'1','fulin@gmail.com','',70),
(DEFAULT,'Oferta Combo Individual( 2 platos) + Bebida','Plato 1 ( arroz o tallarines) + plato 2 ( pollo o ternera) + bebida.',8.95,'1','fulin@gmail.com','',70),

(DEFAULT,'Sopa Agripicante','',3.15,'1','fulin@gmail.com','',71),
(DEFAULT,'Sopa Huevo con Tomate','',3.15,'1','fulin@gmail.com','',71),
(DEFAULT,'Sopa de Aleta de Tiburón','',3.95,'1','fulin@gmail.com','',71),
(DEFAULT,'Sopa de Mariscos','',2.95,'1','fulin@gmail.com','',71),

(DEFAULT,'Tallarines Tres Delicias','',4.95,'1','fulin@gmail.com','',72),
(DEFAULT,'Tallarines con Gambas','',5.65,'1','fulin@gmail.com','',72),
(DEFAULT,'Fideos de Arroz Tres Delicias','',5.75,'1','fulin@gmail.com','',72),
(DEFAULT,'Fideos de Arroz con Gambas','',5.95,'1','fulin@gmail.com','',72),

(DEFAULT,'Arroz Frito Tres Delicias','Arroz frito con ( jamón york, huevo, zanahoria y guisante).',4.50,'1','fulin@gmail.com','',73),
(DEFAULT,'Arroz Frito con Gambas','Arroz frito con ( gambas, huevo, zanahoria y guisante).',5.45,'1','fulin@gmail.com','',73),
(DEFAULT,'Arroz Especial de la Casa','Arroz frito con( gambas, ternera, huevo, jamón york, zanahoria, guisante, cangrejo y brotes de soja). *** Salteado con salsa de soja.',5.95,'1','fulin@gmail.com','',73),
(DEFAULT,'Arroz Frito con Pollo','Arroz frito con ( pollo, huevo, zanahoria y guisante).',4.95,'1','fulin@gmail.com','',73),

(DEFAULT,'Menu','fandimsum@gmail.com'),(DEFAULT,'DIM SUM','fandimsum@gmail.com'),(DEFAULT,'Otros platos','fandimsum@gmail.com'),(DEFAULT,'Noodles','fandimsum@gmail.com');
(DEFAULT,'MENU FESTIVAL DIM SUM','Wonton Frito (2u), Rollito de Primavera mixto (2u), Jiaozi de Gamba (2u), Jiaozi Vegetariano (2u), Siu Mai de Langostino y Vegetales (2u), Xiaolongbao de Cerdo (2u), Baozi de Cerdo (1u), Baozi de Setas (1u), Xiaolongbao de Chocolate (2u)',25.00,'1','fandimsum@gmail.com','',74),

(DEFAULT,'Xiao Long Bao de Cerdo ','4 unidades.',7.90,'1','fandimsum@gmail.com','',75),
(DEFAULT,'Jiaozi de Cerdo','4 unidades. Pueden hacerse al vapor o a la plancha. ',5.90,'1','fandimsum@gmail.com','',75),
(DEFAULT,'Jiaozi Gamba y Carne de Cerdo','4 unidades.Pueden hacerse al vapor o a la plancha. ',6.90,'1','fandimsum@gmail.com','',75),
(DEFAULT,'Dim Sum Surtido - Fu','Jiaozi gamba, Jiaozi Vegetariano, Jiaozi Sixi y Siu mai de langostino.',7.90,'1','fandimsum@gmail.com','',75),

(DEFAULT,'Edamame Jiaoyan','',4.50,'1','fandimsum@gmail.com','',76),
(DEFAULT,'Ensalada Fan ','',6.90,'1','fandimsum@gmail.com','',76),
(DEFAULT,'Pak Choi con Shitake','',6.90,'1','fandimsum@gmail.com','',76),
(DEFAULT,'Berenjena Estilo Yuxiang','',7.90,'1','fandimsum@gmail.com','',76),

(DEFAULT,'Noodles Salteados Vegetarianos','',8.90,'1','fandimsum@gmail.com','',77),
(DEFAULT,'Noodles Salteados de Gambas','',9.90,'1','fandimsum@gmail.com','',77),
(DEFAULT,'Noodles de Arroz Salteados con Gambas','',9.90,'1','fandimsum@gmail.com','',77),

 (DEFAULT,'Ramen','ramenya@gmail.com'),(DEFAULT,'Ramen Frio','ramenya@gmail.com'),(DEFAULT,'Arroz','ramenya@gmail.com'),(DEFAULT,'Onigiri','ramenya@gmail.com');
 (DEFAULT,'Ramen de Soja','Fideos ramen con caldo de pollo, cerdo y marisco con salsa de soja.',11.20,'1','ramenya@gmail.com','',78),
(DEFAULT,'Ramen de Miso','Fideos ramen con caldo de pollo y cerdo, con salsa de miso.',11.20,'1','ramenya@gmail.com','',78),
(DEFAULT,'Ramen de Mariscos','Fideos ramen con caldo de chirlas y cobertura de marisco del mediterráneo.',10.80,'1','ramenya@gmail.com','',78),

(DEFAULT,'Tsukemen','Fideos fríos con cha shu, bonito seco y lima. Comer mojando en una sopa con base de salsa de soja y naranja yuzu.',11.20,'1','ramenya@gmail.com','',79),
(DEFAULT,'Hiyashi Chuka','Fideos ramen fríos con cha shu, pepino, tomate, brotes de soja y huevo, aliñado con una vinagreta refrescante. Hay opción vegetariana y vegana,',11.20,'1','ramenya@gmail.com','',79),
(DEFAULT,'Hiyashi Chuka - Vegetariano','Fideos ramen fríos con tofu, pepino, tomate, brotes de soja y huevo, aliñado con una vinagreta refrescante. ',11.20,'1','ramenya@gmail.com','',79),
(DEFAULT,'Hiyashi Chuka -Vegano-','Fideos ramen fríos con tofu, pepino, tomate, brotes de soja y rucóla, aliñado con una vinagreta refrescante. ',11.20,'1','ramenya@gmail.com','',79),

(DEFAULT,'Arroz Blanco','Bol de arroz blanco.',2.20,'1','ramenya@gmail.com','',80),
(DEFAULT,'Cha Shu Don','Bol de arroz con panceta de cerdo guisada y cebolleta con salsa.',7.50,'1','ramenya@gmail.com','',80),
(DEFAULT,'Cha shu don -Grande-','cha shu don con mas cantidad de arroz y carne',9.50,'1','ramenya@gmail.com','',80),

(DEFAULT,'Onigiri de Pruna','Onigiri con ciruela encurtida.',3.90,'1','ramenya@gmail.com','',81),
(DEFAULT,'Onigiri de Alga Kombu','Onigiri con kombu.',3.90,'1','ramenya@gmail.com','',81),
(DEFAULT,'Onigiri de Cha Shu','Onigiri con panceta de cerdo guisada.',3.90,'1','ramenya@gmail.com','',81),

 (DEFAULT,'Arroz y tallarines','kuyi@gmail.com'),(DEFAULT,'Tempura','kuyi@gmail.com'),(DEFAULT,'Tepanyaki','kuyi@gmail.com'),(DEFAULT,'Maki, Futomaki, Uramaki','kuyi@gmail.com');
 (DEFAULT,'Fideos de Arroz con Verduras','Contiene: soja, huevo y gluten.',5.00,'1','kuyi@gmail.com','',82),
(DEFAULT,'Yakisoba de Verduras','Contiene: soja, granos de sésamo, gluten, mostaza y lácteos.',5.00,'1','kuyi@gmail.com','',82),
(DEFAULT,'Yakiudon de Gamba','Contiene: soja, gluten, mostaza, lácteos, crustáceos y granos de sésamo.',5.50,'1','kuyi@gmail.com','',82),
(DEFAULT,'Yakimeshi de Gamba','Contiene: soja, huevos, crustáceos y granos de sésamo.',5.50,'1','kuyi@gmail.com','',82),

(DEFAULT,'Queso Frito','Contiene: gluten, soja, granos de sésamo, lácteos y huevos.',3.50,'1','kuyi@gmail.com','',83),
(DEFAULT,'Tempura de Langostino','2 unidades. Contiene: gluten, soja y crustaceos.',3.50,'1','kuyi@gmail.com','',83),
(DEFAULT,'Tempura de Verduras','Contiene: gluten y soja.',5.00,'1','kuyi@gmail.com','',83),
(DEFAULT,'Tempura de Pollo con Almendra','Contiene: gluten y frutos secos. ',4.50,'1','kuyi@gmail.com','',83),

(DEFAULT,'Teppan Hotate','Vieira a la plancha. Contiene: gluten, soja y moluscos. ',4.50,'1','kuyi@gmail.com','',84),
(DEFAULT,'Tataki Salmón ','Salmón asado. Contiene: gluten, soja y pescado.',4.50,'1','kuyi@gmail.com','',84),
(DEFAULT,'Teppan Salmón ','Salmón a la plancha.Contiene: gluten, soja y pescado.',4.50,'1','kuyi@gmail.com','',84),
(DEFAULT,'Teppan Asuparagasu','Esparrago a la plancha. Contiene: gluten y soja.',3.90,'1','kuyi@gmail.com','',84),

(DEFAULT,'Tempura Sake Maki','Hosomaki de salmón rebozado. 8 unidades. Contiene: pescado, gluten y huevos.',4.50,'1','kuyi@gmail.com','',85),
(DEFAULT,'Sake Maki ','Hosomaki de salmón. 8Udidades.Contiene:Pescado ',3.50,'1','kuyi@gmail.com','',85),
(DEFAULT,'Leon Maki',' Maki de salmón, atún y aguacate, Rebozado ,con salsa Teriyaki,Mayonesa. 5 unidades.Contiene pescado, gluten, lácteos, soja, huevos y sésamo.',4.20,'1','kuyi@gmail.com','',85),
(DEFAULT,'Gu Maki','5 unidades, Uramaki de atún, salmón, aguacate con tobiko naranja encima. Contiene: pescado.',4.20,'1','kuyi@gmail.com','',85),

 (DEFAULT,'Arroz & Noodles','telemaki@gmail.com'),(DEFAULT,'California Gourmet','telemaki@gmail.com'),(DEFAULT,'Telemaki Rolls','telemaki@gmail.com'),(DEFAULT,'Nigiri & Sashimi','telemaki@gmail.com');
 (DEFAULT,'Yakisoba grande','',6.90,'1','telemaki@gmail.com','',86),
(DEFAULT,'Ramen','',7.60,'1','telemaki@gmail.com','',86),
(DEFAULT,'Arroz Tonkatsu','',7.90,'1','telemaki@gmail.com','',86),
(DEFAULT,'Pad Thai ','',8.20,'1','telemaki@gmail.com','',86),

(DEFAULT,'Roll de salmón y aguacate','',6.10,'1','telemaki@gmail.com','',87),
(DEFAULT,'Hot Crispy Salmon','',9.40,'1','telemaki@gmail.com','',87),
(DEFAULT,'Roll de atún y aguacate','',6.40,'1','telemaki@gmail.com','',87),
(DEFAULT,'Ebi Tempura Roll','',9.10,'1','telemaki@gmail.com','',87),

(DEFAULT,'Anguila Teriyaki Roll','',11.00,'1','telemaki@gmail.com','',88),
(DEFAULT,'Roll X','',10.50,'1','telemaki@gmail.com','',88),
(DEFAULT,'Sibarita roll','',11.60,'1','telemaki@gmail.com','',88),
(DEFAULT,'Salmon Chicken Roll','',11.00,'1','telemaki@gmail.com','',88),

(DEFAULT,'Nigiri de salmón','Nigiri de salmón flameado',1.90,'1','telemaki@gmail.com','',89),
(DEFAULT,'Nigiri de atún','Nigiri de salmón flameado',2.10,'1','telemaki@gmail.com','',89),
(DEFAULT,'Sashimi de atún','Nigiri de salmón flameado',12.00,'1','telemaki@gmail.com','',89),
(DEFAULT,'Nigiri de salmón flameado','Nigiri de salmón flameado',2.20,'1','telemaki@gmail.com','',89),

 (DEFAULT,'Las super burger','burgerniu@gmail.com'),(DEFAULT,'Burger Ecologica','burgerniu@gmail.com'),(DEFAULT,'Burger gran gourmet','burgerniu@gmail.com'),(DEFAULT,'Especialidades','burgerniu@gmail.com');
 (DEFAULT,'Súper Niu','Doble de ha b ecologica ,doble bacon,doble cebolla caramelizada',14.75,'1','burgerniu@gmail.com','',90),
(DEFAULT,'Súper PATA NEGRA','Dos hamburguesas,doble de brie y jamón ibérico ',19.50,'1','burgerniu@gmail.com','',90),
(DEFAULT,'La super Niu','doble de hamburguesa,doble de jamon iberico,doble de queso brie',18.50,'1','burgerniu@gmail.com','',90),
(DEFAULT,'la super BBQ NIU','doble hamburguesa,doble queso cheddlar y salsa barbacoa',14.90,'1','burgerniu@gmail.com','',90),

(DEFAULT,'Hamburguesa menorquina ','Hamburguesa ecologica ,con queso edam y sobrasada D.O menorquina ',8.90,'1','burgerniu@gmail.com','',91),
(DEFAULT,'Hamburguesa con queso parmesano','hamburguesa ecologica con cebolla caramelizada y queso parmesano',8.90,'1','burgerniu@gmail.com','',91),
(DEFAULT,'Hamburguesa con queso de cabra y arandanos','expectacular combinacion de hamburguesa ecologica con cebolla caramelizada,queso ce cabra y mermelada de arandanos',10.50,'1','burgerniu@gmail.com','',91),
(DEFAULT,'Hamburguesa Pata Negra','hamburguesa ecologica con jamon iberico y queso brie',15.00,'1','burgerniu@gmail.com','',91),

(DEFAULT,'Hamburguesa Rossini','hamburguesa ecologica del pirineo con escalopa de foie a la plancha con reduccion de pedro ximenez',16.50,'1','burgerniu@gmail.com','',92),
(DEFAULT,'Hamburguesa Super Rossini & Gourmet(con coulant de chocolate de regalo)','hamburguesa ecologica del pirineo con escalopa de foie a la plancha con reduccion de pedro ximenez y salteado de setas ',19.80,'1','burgerniu@gmail.com','',92),
(DEFAULT,'Hamburguesa Pata Negra Gourmet i Gourmet(con coulant de chocolate de regalo)','hamburguesa ecologica del pirineo con jamon iberico y escalopa de foie con reduccion de pedro ximenez ',19.80,'1','burgerniu@gmail.com','',92),
(DEFAULT,'Hamburguesa Pata Negra Gourmet Plus(con coulant de chocolate de regalo)','Hamburguesa ecologica del pirineo con escalopa de foie y reduccion de Pedro Ximenez ,queso brie ',19.80,'1','burgerniu@gmail.com','',92),

(DEFAULT,'Butifarra del perol','Butifarra elaborada de manera tradicional',7.90,'1','burgerniu@gmail.com','',93),
(DEFAULT,'Menorquín','Con sobrasada menorquina',7.50,'1','burgerniu@gmail.com','',93),

 (DEFAULT,'Burgers','tgb@gmail.com'),(DEFAULT,'Burgers Especiales','tgb@gmail.com'),(DEFAULT,'Premium','tgb@gmail.com'),(DEFAULT,'Hot Dogs','tgb@gmail.com');
 (DEFAULT,'TGB Burguer','Hamburguesa con carne 100% vacuno, queso americano, bacon, tomate, lechuga y salsa TGB.',5.50,'1','tgb@gmail.com','',94),
(DEFAULT,'BBQ Burger','Hamburguesa con carne 100% vacuno, bacon, aros de cebolla y salsa BBQ. ',5.50,'1','tgb@gmail.com','',94),
(DEFAULT,'Hamburguesa con carne 100% vacuno, bacon, aros de cebolla y salsa BBQ. ','Carne deshilachada de cerdo, aros de cebolla y salsa BBQ.',5.50,'1','tgb@gmail.com','',94),
(DEFAULT,'Hamburguesa Pollo Crunchy','Pechuga de pollo crujiente, queso americano, tomate, lechuga y mayonesa.',6.00,'1','tgb@gmail.com','',94),


(DEFAULT,'Blue Mountain Burger','Hamburguesa con carne de vacuno, queso gorgonzola, bacon, cebolla caramelizada, rúcula y mostaza horseradish.',7.50,'1','tgb@gmail.com','',95),
(DEFAULT,'50 Shades Burger','Hamburguesa con carne de vacuno, pulled Pork, queso americano, bacon, aros de cebolla y salsa BBQ.',7.50,'1','tgb@gmail.com','',95),
(DEFAULT,'Truffle Burger','Hamburguesa con carne 100% vacuno, lechuga, cebolla caramelizada, queso provolone, champiñón y salsa de mayonesa trufa.',7.50,'1','tgb@gmail.com','',95),
(DEFAULT,'Cheese Lovers Burger ','Pan xl, mantequilla, carne xl,  queso loncha,  queso cabra, gorgonzola, cebolla caramelizada, rúcula y mostaza mil. ',7.50,'1','tgb@gmail.com','',95),

(DEFAULT,'Tennessee Burger','Pan XL - mantequilla. TAPA: lechuga. BASE: carne XL - queso americano - panceta (2) - salsa bourbon',8.00,'1','tgb@gmail.com','',96),
(DEFAULT,'Gringa Burger','Pan XL - mantequilla. TAPA: mahonesa - lechuga - tomate (2). BASE: carne XL - queso americano - chilli carne - guacamole',8.00,'1','tgb@gmail.com','',96),


(DEFAULT,'Jumbo Clásico','Salchicha de vacuno, ketchup y mostaza',4.50,'1','tgb@gmail.com','',97),
(DEFAULT,'Jumbo California','Salchicha de vacuno, Bacon y Salsa Cheddar',4.50,'1','tgb@gmail.com','',97),
(DEFAULT,'Jumbo Arizona',' Salchicha de vacuno, Aros de cebolla y Salsa BBQ',4.50,'1','tgb@gmail.com','',97),

 (DEFAULT,'Ofertas','mrgreensalad@gmail.com'),(DEFAULT,'Healthy Bowls','mrgreensalad@gmail.com'),(DEFAULT,'Bebidas','mrgreensalad@gmail.com');
 (DEFAULT,'Combo Individual','Healthy Bowl + Bebida',9.90,'1','mrgreensalad@gmail.com','',98),
(DEFAULT,'Combo Pareja','2 Healthy Bowls + 2 Bebidas',14.90,'1','mrgreensalad@gmail.com','',98),
(DEFAULT,'Combo para 3','3 Healthy Bowls + 3 Bebidas',19.90,'1','mrgreensalad@gmail.com','',98),

(DEFAULT,'Buddha Bowl','Kale, Quinoa, Garbanzos, Aguacate, Boniato al horno, Espagueti de calabacín, Tomates cherry y Semillas de sésamo',8.40,'1','mrgreensalad@gmail.com','',99),
(DEFAULT,'Veggie Actress','Arroz integral, Pasta integral, Boniato al horno, Hummus, Garbanzos, Tomates cherry y Semillas de sésamo',8.40,'1','mrgreensalad@gmail.com','',99),
(DEFAULT,'Magic Heura','Espinacas baby, pasta integral, Heura, hummus, boniato al horno, espagueti de zanahoria y semillas de calabaza',8.90,'1','mrgreensalad@gmail.com','',99),
(DEFAULT,'Detox Bowl','Canónigos, Espinacas baby, Hummus, Quinoa, Espagueti de calabacín, Espaguetis de zanahoria, Semillas de sésamo y Semillas de chía',7.90,'1','mrgreensalad@gmail.com','',99),

(DEFAULT,'Agua EnCaja Mejor (33 cl.)','',1.60,'1','mrgreensalad@gmail.com','',100),
(DEFAULT,'ChariTea Mate (33 cl.)','',2.60,'1','mrgreensalad@gmail.com','',100),
(DEFAULT,'ChariTea Red (33 cl.)','',2.60,'1','mrgreensalad@gmail.com','',100),
(DEFAULT,'Vitae Kombucha de limón y jengibre (25 cl.)','',3.30,'1','mrgreensalad@gmail.com','',100),

 (DEFAULT,'Entrantes y Gyozas','pokesi@gmail.com'),(DEFAULT,'Pokes de la casa','pokesi@gmail.com'),(DEFAULT,'Crea tu poke','pokesi@gmail.com'),(DEFAULT,'Combo oferta','pokesi@gmail.com');
 (DEFAULT,'Ensalada Kani','Algas wakame, cangrejo, sésamo y mayo sriracha.',3.55,'1','pokesi@gmail.com','',101),
(DEFAULT,'Sexy Nachos','Deliciosos nachos cubiertos de spicy tuna y aguacate!',6.95,'1','pokesi@gmail.com','',101),
(DEFAULT,'Gyozas de Cerdo','5 unidades. Cerdo y col acompañadas con salsa de ciruela.',5.15,'1','pokesi@gmail.com','',101),
(DEFAULT,'Gyozas Veganas','Veganas acompañadas con salsa yakiniku elaborada a base de soja, miso y ajo.',5.15,'1','pokesi@gmail.com','',101),

(DEFAULT,'Peas Please','Base de arroz, Salmón/Miso Cítrico, Wakame, Brotes de Soja, Rábano, Aguacate, Piña Mango, Mayo Sirracha, Goma Soba, Cebolla Crujiente, Wasabi Peas, Sésamo',10.95,'1','pokesi@gmail.com','',102),
(DEFAULT,'Chick Chick! ','Base: Arroz y Quinoa. Proteina: Pollo teryiaki Complementos: Tomates en Soja/ Zanahoria/ Brotes de soja/ Cebolla tierna japonesa Salsas: Salsa teryiaki/ Salsa piña y miso Toques finales: Semillas de sésamo y cacahuetes.',10.95,'1','pokesi@gmail.com','',102),
(DEFAULT,'GambYum! ','Base: Fideos soba Proteina: Tartar de gambas/ Atún marinado en soja Complementos: Edamames/ Cebolla roja/ Kimchi de pepino Salsas: Ponzu/ Mayo siracha Toques finales: Alga nori/masago',10.95,'1','pokesi@gmail.com','',102),
(DEFAULT,'Vegan Si ','Base: Arroz venere Proteina: Heura marianda en soja y sesamo. Complementos: Tomates en soja/ Brotes de soja/ Aguacate/ Setas Shitake/ Cebolla tierna japonesa. Salsas: Salsa teryiaki Toques finales: Dukkah asiático/ Wakame crujiente.',10.95,'1','pokesi@gmail.com','',102),

(DEFAULT,'Poke Mediano','Elige 1 o 2 bases, 1 o 2 proteínas, 1 marinado, hasta 6 acompañantes, 1 espuma, 1 salsa y 1, 2 o 3 toques finales.',11.45,'1','pokesi@gmail.com','',103),
(DEFAULT,'Poke Grande','Elige 1 o 2 bases, 1, 2 o 3 proteínas, 1 marinado, 7 acompañantes máximo, 1 espuma, 1 salsa y 1, 2, 3, 4 o 5 toques finales.',14.45,'1','pokesi@gmail.com','',103),

(DEFAULT,'Combo para 2','',33.00,'1','pokesi@gmail.com','',101),

 (DEFAULT,'Bowls-Cold','greenberry@gmail.com'),(DEFAULT,'Toasts','greenberry@gmail.com'),(DEFAULT,'Veggie Sweets','greenberry@gmail.com'),(DEFAULT,'Superfood Smoothies','greenberry@gmail.com');
 (DEFAULT,'Rio Açaí Bowl','Açaí orgánico, plátano, zumo de manzana "cold press", home made granola, plátano, fresa, bayas de goji y coco.',8.95,'1','greenberry@gmail.com','',104),
(DEFAULT,'Pink Dragon Bowl','Pitaya, mango, frambuesa, leche de almendras, hojuelas de coco y fruta.',10.95,'1','greenberry@gmail.com','',104),
(DEFAULT,'Pure Coconut Bowl','Pulpa de coco, plátano, granola y fruta.',9.95,'1','greenberry@gmail.com','',104),
(DEFAULT,'Blue Marmaid','Pulpa de coco orgánica, plátano, espirulina azul, chips de coco, arándanos y frambuesa liofilizada. ',10.95,'1','greenberry@gmail.com','',104),

(DEFAULT,'Avocado Toast','Tostada de pan con mash de aguacate.',5.95,'1','greenberry@gmail.com','',103),
(DEFAULT,'Sweet Toast','Crea tu propia combinación. Crema: cacahuate o Nutella vegana. Fruta: plátano o fresa. Topping: nibs de cacao o crunchy de almendra.',6.95,'1','greenberry@gmail.com','',103),
(DEFAULT,'Penaut & Jelly Toast','Tostada de pan con mantequilla de cacahuete y homemade mermelada.',6.95,'1','greenberry@gmail.com','',103),
(DEFAULT,'Antipasti Toast','Tostadas de pan con berenjenas encurtidas, tomates cherries asados y mozzarella vegana casera.',5.95,'1','greenberry@gmail.com','',103),

(DEFAULT,'Carrot Cake Cashews Cream','Vegano.',5.95,'1','greenberry@gmail.com','',104),
(DEFAULT,'Azuki Brownie','',5.95,'1','greenberry@gmail.com','',104),
(DEFAULT,'Raw Oreo','Vegano, sin gluten, crudivegano y sin azúcar.',3.00,'1','greenberry@gmail.com','',104),
(DEFAULT,'Choco-Chip Cookie','Galleta de harina integral y avena con pepitas de chocolate. ',3.00,'1','greenberry@gmail.com','',104),

(DEFAULT,'Smoothie Shine On','Banana, mango, semillas de chia, fruta de la pasión, espinacas, mesquite, extracto de vainilla y leche vegetal. ',6.96,'1','greenberry@gmail.com','',105),
(DEFAULT,'Smoothie Greenie','Kale, espinacas, pepino, espirulina, banana, dátiles, nueces de brasil, agua alcalina. ',6.95,'1','greenberry@gmail.com','',105),
(DEFAULT,'Smoothie Coco-Nana','Carne de coco joven, banana, mesquite, canela, miel raw, chips de coco y leche vegetal.',6.95,'1','greenberry@gmail.com','',105),
(DEFAULT,'Smoothie PeanutButter Fix','Mantequilla de cacahuete, banana, cacao nibs, carne de coco joven, semillas de chia y leche vegetal.',6.95,'1','greenberry@gmail.com','',105),

 (DEFAULT,'Maoz','maoz@gmail.com'),(DEFAULT,'Bebidas','maoz@gmail.com'),(DEFAULT,'Bebidas alcoholicas','maoz@gmail.com');
 (DEFAULT,'','',,'1','maoz@gmail.com','',106),
(DEFAULT,'','',,'1','maoz@gmail.com','',106),
(DEFAULT,'','',,'1','maoz@gmail.com','',106),
(DEFAULT,'','',,'1','maoz@gmail.com','',106),

(DEFAULT,'','',,'1','maoz@gmail.com','',107),
(DEFAULT,'','',,'1','maoz@gmail.com','',107),
(DEFAULT,'','',,'1','maoz@gmail.com','',107),
(DEFAULT,'','',,'1','maoz@gmail.com','',107),

(DEFAULT,'','',,'1','maoz@gmail.com','',108),
(DEFAULT,'','',,'1','maoz@gmail.com','',108),
(DEFAULT,'','',,'1','maoz@gmail.com','',108),
(DEFAULT,'','',,'1','maoz@gmail.com','',108),

(DEFAULT,'','',,'1','maoz@gmail.com','',19),
(DEFAULT,'','',,'1','maoz@gmail.com','',19),
(DEFAULT,'','',,'1','maoz@gmail.com','',19),
(DEFAULT,'','',,'1','maoz@gmail.com','',19),

 (DEFAULT,'Combos','muns@gmail.com'),(DEFAULT,'Las Clasicas','muns@gmail.com'),(DEFAULT,'Las del Chef','muns@gmail.com'),(DEFAULT,'Las Veggies','muns@gmail.com');
 (DEFAULT,'','',,'1','muns@gmail.com','',16),
(DEFAULT,'','',,'1','muns@gmail.com','',16),
(DEFAULT,'','',,'1','muns@gmail.com','',16),
(DEFAULT,'','',,'1','muns@gmail.com','',16),

(DEFAULT,'','',,'1','muns@gmail.com','',17),
(DEFAULT,'','',,'1','muns@gmail.com','',17),
(DEFAULT,'','',,'1','muns@gmail.com','',17),
(DEFAULT,'','',,'1','muns@gmail.com','',17),

(DEFAULT,'','',,'1','muns@gmail.com','',18),
(DEFAULT,'','',,'1','muns@gmail.com','',18),
(DEFAULT,'','',,'1','muns@gmail.com','',18),
(DEFAULT,'','',,'1','muns@gmail.com','',18),

(DEFAULT,'','',,'1','muns@gmail.com','',19),
(DEFAULT,'','',,'1','muns@gmail.com','',19),
(DEFAULT,'','',,'1','muns@gmail.com','',19),
(DEFAULT,'','',,'1','muns@gmail.com','',19),

 (DEFAULT,'Para compartir','goiko@gmail.com'),(DEFAULT,'Entrantes','goiko@gmail.com'),(DEFAULT,'Burguers','goiko@gmail.com'),(DEFAULT,'Bowls','goiko@gmail.com');
 (DEFAULT,'','',,'1','goiko@gmail.com','',16),
(DEFAULT,'','',,'1','goiko@gmail.com','',16),
(DEFAULT,'','',,'1','goiko@gmail.com','',16),
(DEFAULT,'','',,'1','goiko@gmail.com','',16),

(DEFAULT,'','',,'1','goiko@gmail.com','',17),
(DEFAULT,'','',,'1','goiko@gmail.com','',17),
(DEFAULT,'','',,'1','goiko@gmail.com','',17),
(DEFAULT,'','',,'1','goiko@gmail.com','',17),

(DEFAULT,'','',,'1','goiko@gmail.com','',18),
(DEFAULT,'','',,'1','goiko@gmail.com','',18),
(DEFAULT,'','',,'1','goiko@gmail.com','',18),
(DEFAULT,'','',,'1','goiko@gmail.com','',18),

(DEFAULT,'','',,'1','goiko@gmail.com','',19),
(DEFAULT,'','',,'1','goiko@gmail.com','',19),
(DEFAULT,'','',,'1','goiko@gmail.com','',19),
(DEFAULT,'','',,'1','goiko@gmail.com','',19),

 (DEFAULT,'Combos','papajohns@gmail.com'),(DEFAULT,'Papadia','papajohns@gmail.com'),(DEFAULT,'Pizzas','papajohns@gmail.com'),(DEFAULT,'Personaliza tu pizza ','papajohns@gmail.com');
 (DEFAULT,'','',,'1','papajohns@gmail.com','',16),
(DEFAULT,'','',,'1','papajohns@gmail.com','',16),
(DEFAULT,'','',,'1','papajohns@gmail.com','',16),
(DEFAULT,'','',,'1','papajohns@gmail.com','',16),

(DEFAULT,'','',,'1','papajohns@gmail.com','',17),
(DEFAULT,'','',,'1','papajohns@gmail.com','',17),
(DEFAULT,'','',,'1','papajohns@gmail.com','',17),
(DEFAULT,'','',,'1','papajohns@gmail.com','',17),

(DEFAULT,'','',,'1','papajohns@gmail.com','',18),
(DEFAULT,'','',,'1','papajohns@gmail.com','',18),
(DEFAULT,'','',,'1','papajohns@gmail.com','',18),
(DEFAULT,'','',,'1','papajohns@gmail.com','',18),

(DEFAULT,'','',,'1','papajohns@gmail.com','',19),
(DEFAULT,'','',,'1','papajohns@gmail.com','',19),
(DEFAULT,'','',,'1','papajohns@gmail.com','',19),
(DEFAULT,'','',,'1','papajohns@gmail.com','',19),

 (DEFAULT,'Smashburgers','hideoutburger@gmail.com'),(DEFAULT,'Starters','hideoutburger@gmail.com'),(DEFAULT,'Bebidas','hideoutburger@gmail.com'),(DEFAULT,'Cervezas','hideoutburger@gmail.com');
 (DEFAULT,'','',,'1','hideoutburger@gmail.com','',16),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',16),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',16),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',16),

(DEFAULT,'','',,'1','hideoutburger@gmail.com','',17),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',17),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',17),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',17),

(DEFAULT,'','',,'1','hideoutburger@gmail.com','',18),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',18),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',18),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',18),

(DEFAULT,'','',,'1','hideoutburger@gmail.com','',19),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',19),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',19),
(DEFAULT,'','',,'1','hideoutburger@gmail.com','',19),

 (DEFAULT,'Aperitivos y Sopas','royalnepal@gmail.com'),(DEFAULT,'Entrantes','royalnepal@gmail.com'),(DEFAULT,'Entrantes Nepales Especial','royalnepal@gmail.com'),(DEFAULT,'Platos de Tandoor','royalnepal@gmail.com');
 (DEFAULT,'','',,'1','royalnepal@gmail.com','',16),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',16),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',16),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',16),

(DEFAULT,'','',,'1','royalnepal@gmail.com','',17),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',17),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',17),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',17),

(DEFAULT,'','',,'1','royalnepal@gmail.com','',18),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',18),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',18),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',18),

(DEFAULT,'','',,'1','royalnepal@gmail.com','',19),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',19),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',19),
(DEFAULT,'','',,'1','royalnepal@gmail.com','',19),

 (DEFAULT,'Curry','boko@gmail.com'),(DEFAULT,'Dim Sum','boko@gmail.com'),(DEFAULT,'Para compartir','boko@gmail.com'),(DEFAULT,'Wok','boko@gmail.com');
 (DEFAULT,'','',,'1','boko@gmail.com','',16),
(DEFAULT,'','',,'1','boko@gmail.com','',16),
(DEFAULT,'','',,'1','boko@gmail.com','',16),
(DEFAULT,'','',,'1','boko@gmail.com','',16),

(DEFAULT,'','',,'1','boko@gmail.com','',17),
(DEFAULT,'','',,'1','boko@gmail.com','',17),
(DEFAULT,'','',,'1','boko@gmail.com','',17),
(DEFAULT,'','',,'1','boko@gmail.com','',17),

(DEFAULT,'','',,'1','boko@gmail.com','',18),
(DEFAULT,'','',,'1','boko@gmail.com','',18),
(DEFAULT,'','',,'1','boko@gmail.com','',18),
(DEFAULT,'','',,'1','boko@gmail.com','',18),

(DEFAULT,'','',,'1','boko@gmail.com','',19),
(DEFAULT,'','',,'1','boko@gmail.com','',19),
(DEFAULT,'','',,'1','boko@gmail.com','',19),
(DEFAULT,'','',,'1','boko@gmail.com','',19),

 (DEFAULT,'Milk Tea ','chatime@gmail.com'),(DEFAULT,'Mousse','chatime@gmail.com'),(DEFAULT,'Flavours','chatime@gmail.com'),(DEFAULT,'Lattes','chatime@gmail.com');
 (DEFAULT,'','',,'1','chatime@gmail.com','',16),
(DEFAULT,'','',,'1','chatime@gmail.com','',16),
(DEFAULT,'','',,'1','chatime@gmail.com','',16),
(DEFAULT,'','',,'1','chatime@gmail.com','',16),

(DEFAULT,'','',,'1','chatime@gmail.com','',17),
(DEFAULT,'','',,'1','chatime@gmail.com','',17),
(DEFAULT,'','',,'1','chatime@gmail.com','',17),
(DEFAULT,'','',,'1','chatime@gmail.com','',17),

(DEFAULT,'','',,'1','chatime@gmail.com','',18),
(DEFAULT,'','',,'1','chatime@gmail.com','',18),
(DEFAULT,'','',,'1','chatime@gmail.com','',18),
(DEFAULT,'','',,'1','chatime@gmail.com','',18),

(DEFAULT,'','',,'1','chatime@gmail.com','',19),
(DEFAULT,'','',,'1','chatime@gmail.com','',19),
(DEFAULT,'','',,'1','chatime@gmail.com','',19),
(DEFAULT,'','',,'1','chatime@gmail.com','',19),

 (DEFAULT,'Recetas especiales','bubbolitas@gmail.com'),(DEFAULT,'Milkshakes','bubbolitas@gmail.com'),(DEFAULT,'Fruta Natural Smoothies & Fruiteas','bubbolitas@gmail.com'),(DEFAULT,'BubboCafes-FrappuBubbo','bubbolitas@gmail.com');
 (DEFAULT,'','',,'1','bubbolitas@gmail.com','',16),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',16),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',16),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',16),

(DEFAULT,'','',,'1','bubbolitas@gmail.com','',17),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',17),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',17),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',17),

(DEFAULT,'','',,'1','bubbolitas@gmail.com','',18),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',18),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',18),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',18),

(DEFAULT,'','',,'1','bubbolitas@gmail.com','',19),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',19),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',19),
(DEFAULT,'','',,'1','bubbolitas@gmail.com','',19),

 (DEFAULT,'Milk Tea','zenzoo@gmail.com'),(DEFAULT,'Fruit Tea','zenzoo@gmail.com'),(DEFAULT,'Fresh Tea','zenzoo@gmail.com'),(DEFAULT,'Postres Caseros','zenzoo@gmail.com');
 (DEFAULT,'','',,'1','zenzoo@gmail.com','',16),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',16),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',16),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',16),

(DEFAULT,'','',,'1','zenzoo@gmail.com','',17),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',17),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',17),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',17),

(DEFAULT,'','',,'1','zenzoo@gmail.com','',18),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',18),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',18),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',18),

(DEFAULT,'','',,'1','zenzoo@gmail.com','',19),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',19),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',19),
(DEFAULT,'','',,'1','zenzoo@gmail.com','',19),

 (DEFAULT,'Menus','tacobell@gmail.com'),(DEFAULT,'Tacos','tacobell@gmail.com'),(DEFAULT,'Burritos','tacobell@gmail.com'),(DEFAULT,'Quesadillas','tacobell@gmail.com');
 (DEFAULT,'','',,'1','tacobell@gmail.com','',16),
(DEFAULT,'','',,'1','tacobell@gmail.com','',16),
(DEFAULT,'','',,'1','tacobell@gmail.com','',16),
(DEFAULT,'','',,'1','tacobell@gmail.com','',16),

(DEFAULT,'','',,'1','tacobell@gmail.com','',17),
(DEFAULT,'','',,'1','tacobell@gmail.com','',17),
(DEFAULT,'','',,'1','tacobell@gmail.com','',17),
(DEFAULT,'','',,'1','tacobell@gmail.com','',17),

(DEFAULT,'','',,'1','tacobell@gmail.com','',18),
(DEFAULT,'','',,'1','tacobell@gmail.com','',18),
(DEFAULT,'','',,'1','tacobell@gmail.com','',18),
(DEFAULT,'','',,'1','tacobell@gmail.com','',18),

(DEFAULT,'','',,'1','tacobell@gmail.com','',19),
(DEFAULT,'','',,'1','tacobell@gmail.com','',19),
(DEFAULT,'','',,'1','tacobell@gmail.com','',19),
(DEFAULT,'','',,'1','tacobell@gmail.com','',19),

 (DEFAULT,'Entrantes','rosanegra@gmail.com'),(DEFAULT,'Quesadillas','rosanegra@gmail.com'),(DEFAULT,'Tacos','rosanegra@gmail.com'),(DEFAULT,'Burritos','rosanegra@gmail.com');
 (DEFAULT,'','',,'1','rosanegra@gmail.com','',16),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',16),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',16),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',16),

(DEFAULT,'','',,'1','rosanegra@gmail.com','',17),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',17),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',17),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',17),

(DEFAULT,'','',,'1','rosanegra@gmail.com','',18),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',18),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',18),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',18),

(DEFAULT,'','',,'1','rosanegra@gmail.com','',19),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',19),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',19),
(DEFAULT,'','',,'1','rosanegra@gmail.com','',19),

 (DEFAULT,'Tacos','tacos99@gmail.com'),(DEFAULT,'Quesadillas','tacos99@gmail.com'),(DEFAULT,'Vegetarianos','tacos99@gmail.com'),(DEFAULT,'Cocteles','tacos99@gmail.com');
 (DEFAULT,'','',,'1','tacos99@gmail.com','',16),
(DEFAULT,'','',,'1','tacos99@gmail.com','',16),
(DEFAULT,'','',,'1','tacos99@gmail.com','',16),
(DEFAULT,'','',,'1','tacos99@gmail.com','',16),

(DEFAULT,'','',,'1','tacos99@gmail.com','',17),
(DEFAULT,'','',,'1','tacos99@gmail.com','',17),
(DEFAULT,'','',,'1','tacos99@gmail.com','',17),
(DEFAULT,'','',,'1','tacos99@gmail.com','',17),

(DEFAULT,'','',,'1','tacos99@gmail.com','',18),
(DEFAULT,'','',,'1','tacos99@gmail.com','',18),
(DEFAULT,'','',,'1','tacos99@gmail.com','',18),
(DEFAULT,'','',,'1','tacos99@gmail.com','',18),

(DEFAULT,'','',,'1','tacos99@gmail.com','',19),
(DEFAULT,'','',,'1','tacos99@gmail.com','',19),
(DEFAULT,'','',,'1','tacos99@gmail.com','',19),
(DEFAULT,'','',,'1','tacos99@gmail.com','',19),

 (DEFAULT,'Menu Burritos','burritowey@gmail.com'),(DEFAULT,'Menu Bowls Wey','burritowey@gmail.com'),(DEFAULT,'Menu de Tacos','burritowey@gmail.com'),(DEFAULT,'Big Burritos Wey','burritowey@gmail.com');
 (DEFAULT,'','',,'1','burritowey@gmail.com','',16),
(DEFAULT,'','',,'1','burritowey@gmail.com','',16),
(DEFAULT,'','',,'1','burritowey@gmail.com','',16),
(DEFAULT,'','',,'1','burritowey@gmail.com','',16),

(DEFAULT,'','',,'1','burritowey@gmail.com','',17),
(DEFAULT,'','',,'1','burritowey@gmail.com','',17),
(DEFAULT,'','',,'1','burritowey@gmail.com','',17),
(DEFAULT,'','',,'1','burritowey@gmail.com','',17),

(DEFAULT,'','',,'1','burritowey@gmail.com','',18),
(DEFAULT,'','',,'1','burritowey@gmail.com','',18),
(DEFAULT,'','',,'1','burritowey@gmail.com','',18),
(DEFAULT,'','',,'1','burritowey@gmail.com','',18),

(DEFAULT,'','',,'1','burritowey@gmail.com','',19),
(DEFAULT,'','',,'1','burritowey@gmail.com','',19),
(DEFAULT,'','',,'1','burritowey@gmail.com','',19),
(DEFAULT,'','',,'1','burritowey@gmail.com','',19),

 (DEFAULT,'Tartas por Raciones','dulzuramia@gmail.com'),(DEFAULT,'Tartas enteras de 5 a 7 raciones','dulzuramia@gmail.com'),(DEFAULT,'Tartas enteras de 10 a 14 raciones','dulzuramia@gmail.com'),(DEFAULT,'Postres individuales','dulzuramia@gmail.com');
 (DEFAULT,'','',,'1','dulzuramia@gmail.com','',16),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',16),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',16),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',16),

(DEFAULT,'','',,'1','dulzuramia@gmail.com','',17),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',17),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',17),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',17),

(DEFAULT,'','',,'1','dulzuramia@gmail.com','',18),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',18),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',18),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',18),

(DEFAULT,'','',,'1','dulzuramia@gmail.com','',19),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',19),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',19),
(DEFAULT,'','',,'1','dulzuramia@gmail.com','',19),

 (DEFAULT,'Poke del mes','thefresh@gmail.com'),(DEFAULT,'Poke Bowls','thefresh@gmail.com'),(DEFAULT,'Poke Burritos','thefresh@gmail.com'),(DEFAULT,'Postres','thefresh@gmail.com');
(DEFAULT,'','',,'1','thefresh@gmail.com','',16),
(DEFAULT,'','',,'1','thefresh@gmail.com','',16),
(DEFAULT,'','',,'1','thefresh@gmail.com','',16),
(DEFAULT,'','',,'1','thefresh@gmail.com','',16),

(DEFAULT,'','',,'1','thefresh@gmail.com','',17),
(DEFAULT,'','',,'1','thefresh@gmail.com','',17),
(DEFAULT,'','',,'1','thefresh@gmail.com','',17),
(DEFAULT,'','',,'1','thefresh@gmail.com','',17),

(DEFAULT,'','',,'1','thefresh@gmail.com','',18),
(DEFAULT,'','',,'1','thefresh@gmail.com','',18),
(DEFAULT,'','',,'1','thefresh@gmail.com','',18),
(DEFAULT,'','',,'1','thefresh@gmail.com','',18),

(DEFAULT,'','',,'1','thefresh@gmail.com','',19),
(DEFAULT,'','',,'1','thefresh@gmail.com','',19),
(DEFAULT,'','',,'1','thefresh@gmail.com','',19),
(DEFAULT,'','',,'1','thefresh@gmail.com','',19),

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
INSERT INTO types VALUES 
(DEFAULT,'sushi','comida relacionada con el mundo del sushi o con ingredientes propios del sushi tradicional'),
(DEFAULT,'pizzas','comida relacionada directamente con el mundo de las pizzas y sus variedades'),
(DEFAULT,'barbacoa','comida de barbacoa. Hecha en el mas puro estilo barbacoa casera'),
(DEFAULT,'rapida','comida rapida o tambien conocida como fast-food'),
(DEFAULT,'china','comida relacionada con China y su gastronomia.'),
(DEFAULT,'japonesa','comida relacionada con Japon y su gastronomia.'),
(DEFAULT,'hamburguesa','comida relacionada con el mundo de la hamburgueseria y las variaciones que estas ofrecen'),
(DEFAULT,'saludable','comida saludable, es decir, sin azucares agregados. Los ingrendientes ayudan a mantener una dieta sana y equilibrada'),
(DEFAULT,'estadounidense','comida relacionada con Estados Unidos de America (EEUU) y su gastronomia.'),
(DEFAULT,'callejera','comida hecha especialmente para comer fuera y de rapida preparacion.'),
(DEFAULT,'cafeyte','comida para desayunos, meriendas o como snack'),
(DEFAULT,'mejicana','comida relacionada con Mejico y su gastronomia'),
(DEFAULT,'postres','comida capricho para un dia en que sea mejor pedir que cocinar'),
--Labels of the restaurants that they have chosen
INSERT INTO type_restaurants VALUES 
(1,'miu@gmail.com'),(1,'saikosushi@gmail.com'),(1,'sushito@gmail.com'),(1,'hachiko@gmail.com'), 
(2,'pizzapazza@gmail.com'),(2,'napoli@gmail.com'),(2,'gusto_rest@gmail.com'),(2,'pizzamarket@gmail.com'), 
(3,'ayres@gmail.com'),(3,'royalnepal@gmail.com'),(3,'caneusebio@gmail.com'),(3,'bbqexpress@gmail.com'), 
(4,'canvador@gmail.com'),(4,'chatico@gmail.com'),(4,'kfc@gmail.com'),(4,'mcdonald@gmail.com'), 
(5,'wok@gmail.com'),(5,'boabao@gmail.com'),(5,'fulin@gmail.com'),(5,'fandimsum@gmail.com'), 
(6,'saikosushi@gmail.com'),(6,'ramenya@gmail.com'),(6,'kuyi@gmail.com'),(6,'telemaki@gmail.com'), 
(7,'chatico@gmail.com'),(7,'hideoutburger@gmail.com'),(7,'burgerniu@gmail.com'),(7,'tgb@gmail.com'), 
(8,'mrgreensalad@gmail.com'),(8,'pokesi@gmail.com'),(8,'greenberry@gmail.com'),(8,'maoz@gmail.com'), 
(9,'muns@gmail.com'),(9,'goiko@gmail.com'),(9,'papajohns@gmail.com'),(9,'hideoutburger@gmail.com'), 
(10,'wok@gmail.com'),(10,'muns@gmail.com'),(10,'royalnepal@gmail.com'),(10,'boko@gmail.com'), 
(11,'fandimsum@gmail.com'),(11,'chatime@gmail.com'),(11,'bubbolitas@gmail.com'),(11,'zenzoo@gmail.com'), 
(12,'tacobell@gmail.com'),(12,'rosanegra@gmail.com'),(12,'tacos99@gmail.com'),(12,'burritowey@gmail.com'), 
(13,'bubbolitas@gmail.com'),(13,'zenzoo@gmail.com'),(13,'dulzuramia@gmail.com'),(13,'thefresh@gmail.com')
--Labels of the items of the restaurant that the owner of the item has chosen
INSERT INTO type_items VALUES (1,1),(2,2);
--Añadimos un refresco y un extra al plato espagueti tartufo, siendo el refresco obligatorio y el queso opcional
INSERT INTO "extra_items" VALUES (DEFAULT,'cocacola','refresco de cola con cafeina',2.95,'0',1),
(DEFAULT,'queso chedar','queso chedar para acompañar salsa tartufo',0.0,'1',1);
--En el pedido, se obliga a pedir la cocacola, escogiendo 2ud, y opcional el queso, que tambien lo pide, y es gratuito
INSERT INTO "order_extraitems" VALUES(1,1,2),(1,2,1);