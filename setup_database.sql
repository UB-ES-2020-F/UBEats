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
('raul@gmail.com','Raul','33333330E','77146 Everett Drives Apt. 782 - Concord, MT / 88133','12344','609773493','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('carlos@gmail.com','Carlos','33333430E','266 Hudson Falls Apt. 821 - Port Arthur, MO / 37363','1234','609773495','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('ruben@gmail.com','Ruben','33343330E','41217 Nella Shoal Suite 111 - Anchorage, ND / 31687','1234666','60985996','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('david@gmail.com','David','33343330V','3863 Hortense Orchard Suite 568 - Warwick, ND / 77112','12345','61985996','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('laura@gmail.com','Laura','44444092R','365 Javier Glen Suite 476 - Baltimore, MO / 90471','123456789gjh','608375886','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('carla@gmail.com','Carla','44443292D','6336 Eloy Unions Apt. 873 - Washington, AL / 23599','wefjh','608374666','customer','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),

--Delivery
('juancarlos@gmail.com','Juan Carlos','44443292D','98546 Bailey Cliff Apt. 769 - Wilmington, CT / 77470','wefjh','608374666','deliveryman','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('josemaria@gmail.com','Jose Maria','44443292D','763 Colin Mall Apt. 660 - North Charleston, RI / 71836','wefjh','608374666','deliveryman','https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),

-- Sushi
('miu@gmail.com','Miu','44443292D','6610 Danny Ford Suite 080 - Columbia, KY / 74493','wefjh','608374666','restaurant','http://www.lonifasiko.com/wp-content/uploads/2015/03/Uramaki-italiano-restaurante-japones-miu-bilbao-001-672x364.jpg'),
('saikosushi@gmail.com','Saiko Sushi','44443292D','827 Arlo Pines Apt. 979 - Wilson, TX / 26995','wefjh','608374666','restaurant','https://img77.uenicdn.com/image/upload/v1563349362/business/be992d6920ae4745bd343822b281bcc2.jpg'),
('sushito@gmail.com','Sushito','44443292D','7503 Hermann Pine Apt. 612 - Arlington, AK / 32878','wefjh','608374666','restaurant','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fu.tfstatic.com%2Frestaurant_photos%2F021%2F450021%2F169%2F612%2Feveryday-sushi-sugerencia-del-chef-878a2.jpg&f=1&nofb=1'),
('hachiko@gmail.com','Hachiko Sushi','44443292D','2716 Justice Canyon Suite 610 - Bristol, NE / 56910','wefjh','608374666','restaurant','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fu.tfstatic.com%2Frestaurant_photos%2F081%2F462081%2F169%2F612%2Fhachiko-sushi-plato-91b81.jpg&f=1&nofb=1'),

-- Pizza
('pizzapazza@gmail.com','Pizza Pazza','44443292D','263 Carter Course Suite 446 - Dover, IA / 99328','pizzapazza','608374666','restaurant','http://www.foodanddrink-antigua.com/wp-content/uploads/2014/03/Food-Drink-Antigua-Pirates-Pizza-restaurant-02-25218814fddf1767d52333bf8367688c.jpg'),
('napoli@gmail.com','Via Napoli Restaurante Pizzeria','44443292D','27466 Torp Squares Apt. 077 - Cheyenne, NM / 16165','napoli','608374666','restaurant','https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/630/354/90/wdpromedia.disney.go.com/media/wdpro-assets/things-to-do/dining/epcot/via-napoli/via-napoli-00.jpg?26092012144810'),
('gusto_rest@gmail.com','Gusto Restaurante','44443292D','237 Torey Village Apt. 890 - Anchorage, MT / 26833','gusto','608374666','restaurant','https://u.tfstatic.com/restaurant_photos/103/6103/169/612/gusto-restaurante-vista-terraza-bfa56.jpg'),
('pizzamarket@gmail.com','Pizza Market','44443292D','0203 Kacey Mount Apt. 165 - Fresno, IL / 30206','pizzamarket','608374666','restaurant','https://www.intrepidtravel.com/adventures/wp-content/uploads/2017/03/Spain_Barcelona_Placa_Reial.jpg'),

--Barbacoa
-- royal nepal (callejera)
('ayres@gmail.com','Ayres del Sur','44443292D','266 Rodriguez Field Apt. 525 - Washington, CT / 24893','wefjh','608374666','restaurant','http://barcelonabbq.com/wp-content/uploads/2016/11/12294832_195644657439867_5813121155159895279_n.jpg'),
('caneusebio@gmail.com','Can Eusebio','44443292D','3372 Rollin Point Apt. 064 - Johnson City, AK / 02492','wefjh','608374666','restaurant','https://cdn.atrapalo.com/common/photo/res/1494/0/ticr_890_370.jpg'),
('bbqexpress@gmail.com','BBQ Express Nights','44443292D','5215 Koepp Spur Apt. 393 - Coachella, MS / 79701','wefjh','608374666','restaurant','http://barcelonabbq.com/wp-content/uploads/2016/08/1282_static1.squarespace.com_.jpg'),

-- Rapida
('canvador@gmail.com','Can Vador','44443292D','227 Reina Stravenue Suite 453 - Jacksonville, WA / 42437','wefjh','608374666','restaurant','https://u.tfstatic.com/restaurant_photos/787/300787/169/612/can-vador-vista-sala-24615.jpg'),
('chatico@gmail.com','Chatico','44443292D','5799 Mayer Common Apt. 480 - Decatur, NM / 25063','wefjh','608374666','restaurant','https://www.hola.com/imagenes/viajes/20190314138949/restaurantes-cool-barcelona/0-658-536/restaurante-gatsby-barcelona-a.jpg'),
('kfc@gmail.com','KFC','44443292D','618 Jacobi Shores Apt. 020 - Eugene, AR / 96990','wefjh','608374666','restaurant','https://www.lavanguardia.com/r/GODO/LV/p7/WebSite/2020/06/02/Recortada/img_jdelriov_20200602-165228_imagenes_lv_terceros_kfc-504-kGVC-U481576515261dqE-992x558@LaVanguardia-Web.jpg'),
('mcdonald@gmail.com','McDonalds','44443292D','639 Reba Manor Apt. 225 - Kingsport, NJ / 35610','wefjh','608374666','restaurant','https://www.metropoliabierta.com/uploads/s1/97/30/82/mc-donalds.png'),

-- China
('wok@gmail.com','Wok Street','44443292D','5294 Janis Lodge Suite 282 - Logan, MI / 60253','wefjh','608374666','restaurant','https://media-cdn.tripadvisor.com/media/photo-s/03/c5/55/39/getlstd-property-photo.jpg'),
('boabao@gmail.com','Boa Bao','44443292D','2864 Connelly Villages Apt. 384 - Mission, WV / 23000','wefjh','608374666','restaurant','https://ocio.dn.pt/files/2019/07/Boa-Bao-Barcelona1-1200x675_c.jpg'),
('fulin@gmail.com','Fu Lin','44443292D','183 Clovis Ports Apt. 387 - Muncie, IN / 27821','wefjh','608374666','restaurant','https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_es:cuisines:china-0.jpg,f_auto,q_auto,w_414,h_400/v1/es/restaurants/22450.jpg'),
('fandimsum@gmail.com','Fan Dim Sum','44443292D','9408 Hintz Prairie Apt. 356 - Tulsa, AL / 39706','wefjh','608374666','restaurant','https://u.tfstatic.com/restaurant_photos/923/553923/169/612/fan-dim-sum-sugerencia-del-chef-91ff1.jpg'),


-- Japonesa
-- saiko sushi (sushi)
('ramenya@gmail.com','Ramen-ya Hiro','44443292D','721 Candida Crest Suite 911 - Casper, AR / 88083','wefjh','608374666','restaurant','https://i1.wp.com/yummybarcelona.com/wp-content/uploads/2014/10/platos-del-restaurante-ramen-ya-hiro-barcelona.jpg?resize=950%2C713&ssl=1'),
('kuyi@gmail.com','Kuyi','44443292D','663 Hermann Bridge Suite 404 - Wilmington, RI / 57494','wefjh','608374666','restaurant','https://u.tfstatic.com/restaurant_photos/899/452899/169/612/kuyi-vista-sala-224ff.jpg'),
('telemaki@gmail.com','Telemaki','44443292D','498 Kobe Walks Suite 932 - Henderson, MN / 24930','wefjh','608374666','restaurant','https://barcelonasecreta.com/wp-content/uploads/2016/10/6x4-rolls-monster-sushi-barcelona.jpg'),

-- Hamburgueseria
-- chatico (rapida)
-- hideout ( eeuu)
('burgerniu@gmail.com','Burger Niu ( Ecologica)','44443292D','598 Charlie Turnpike Suite 383 - Surprise, KS / 23095','wefjh','608374666','restaurant','https://www.shbarcelona.com/blog/en/wp-content/uploads/2016/02/BACOA-1.jpg'),
('tgb@gmail.com','TGB','44443292D','45648 Will Trace Apt. 418 - Norwich, WA / 73184','wefjh','608374666','restaurant','https://f.roocdn.com/images/menus/122051/header-image.jpg?width=1200&height=630&auto=webp&format=jpg&fit=crop&v=1600443186'),

-- Saludable 
('mrgreensalad@gmail.com','Mr Green Salad House','44443292D','848 McDermott Mill Suite 407 - Roswell, MT / 04758','wefjh','608374666','restaurant','https://www.gourmandize.com/uploads/media/image-95.jpg?1391963438'),
('pokesi@gmail.com','Poke Si','44443292D','54404 Frami Stream Apt. 826 - Bloomington, LA / 79791','wefjh','608374666','restaurant','https://media.quincemil.com/imagenes/2019/04/16195742/0012_IMG_8960-1024x683.jpg'),
('greenberry@gmail.com','Green & Berry','44443292D','83892 Nova Stream Suite 958 - Bellevue, AK / 29172','wefjh','608374666','restaurant','https://www.mantelacuadros.com/wp-content/uploads/2016/09/ensalada-restaurante-greenberry-barcelona.jpg'),
('maoz@gmail.com','Maoz','44443292D','740 Quentin Ville Apt. 233 - Cheyenne, CO / 18661','wefjh','608374666','restaurant','https://charlieontravel.com/wp-content/uploads/2015/09/Vegetarian-falafel-salad-pitta-bread-Maus-Barcelona.jpg'),

-- Estadounidense
('muns@gmail.com','Las Muns','44443292D','33481 Jocelyn Lights Suite 523 - Blacksburg, CT / 93191','wefjh','608374666','restaurant','https://media-cdn.tripadvisor.com/media/photo-p/12/8e/ae/ec/te-esperamos-en-urquinaona.jpg'),
('goiko@gmail.com','Goiko','44443292D','2981 Simonis Mount Apt. 474 - Broken Arrow, OH / 46072','wefjh','608374666','restaurant','https://i1.wp.com/www.lafranquicia.es/wp-content/uploads/2018/05/Goiko-Grill.jpg?ssl=1'),
('papajohns@gmail.com','Papa Johns','44443292D','70890 Dina Highway Apt. 363 - Apex, NH / 07189','wefjh','608374666','restaurant','https://farm6.static.flickr.com/5129/5338018626_d3177ed7d4_b.jpg'),
('hideoutburger@gmail.com','Hideout burger','44443292D','285 Ewell River Suite 996 - North Little Rock, ID / 04788','wefjh','608374666','restaurant','https://barcelona-home.com/blog/wp-content/upload/2013/12/hamburger-fast-food-french-fries-barcelona2.jpg'),

-- Callejera
-- wok (china)
-- muns (eeuu)
('royalnepal@gmail.com','Royal Nepal','44443292D','639 Sonny Forges Apt. 533 - Carson City, ND / 28098','wefjh','608374666','restaurant','https://www.bcnrestaurantes.com/img-trans/productos/23461/fotos/600-5cd5489a3ba58-royal-nepal.png'),
('boko@gmail.com','Boko','44443292D','464 Emerald Drive Suite 270 - Cedar Falls, KS / 71051','wefjh','608374666','restaurant','https://rs-menus-api.roocdn.com/images/a243b2cd-3173-4184-9270-30400a5c7d86/image.jpeg?width=1200&height=630&auto=webp&format=jpg&fit=crop&v='),

-- Cafe y te
-- fandimsum (china)
('chatime@gmail.com','Chatime','44443292D','0598 Weimann Light Suite 381 - Troy, MO / 48452','wefjh','608374666','restaurant','https://everydayisafoodday.files.wordpress.com/2015/05/639.jpg'),
('bubbolitas@gmail.com','Bubbolitas - Bubble Tea Bar','44443292D','15761 OReilly Road Suite 407 - Ocoee, SC / 56535','wefjh','608374666','restaurant','https://3.bp.blogspot.com/-6nPFwsCyl4Q/U_dRTfEY6eI/AAAAAAAAAZ4/B-wp5taQysU/s1600/TitleBanner.png'),
('zenzoo@gmail.com','Zenzoo','44443292D','197 Metz Islands Suite 954 - Woburn, MO / 56327','wefjh','608374666','restaurant','https://www.busquetsgalvez.com/web/wp-content/uploads/2017/06/Zenzoo.jpg'),


-- Mejicana
('tacobell@gmail.com','Taco Bell','44443292D','62193 Buford Isle Suite 705 - Woonsocket, UT / 41322','wefjh','608374666','restaurant','https://f.roocdn.com/images/menus/6184/header-image.jpg?width=1200&height=630&auto=webp&format=jpg&fit=crop&v=1551170443'),
('rosanegra@gmail.com','Rosa Negra','44443292D','1170 OKon Fields Suite 941 - Sheboygan, SC / 09766','wefjh','608374666','restaurant','https://media-cdn.tripadvisor.com/media/photo-s/15/5f/dd/39/flautas.jpg'),
('tacos99@gmail.com','Tacos 99','44443292D','7539 Columbus Gateway Suite 738 - Rockville, GA / 90774','wefjh','608374666','restaurant','https://www.spottedbylocals.com/barcelona/files/tacos-tacos-barcelona-by-ilse-de-ridder--414x276.jpg'),
('burritowey@gmail.com','Burrito Wey','44443292D','300 Gracie Flat Suite 478 - Grand Forks, RI / 41965','wefjh','608374666','restaurant','https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/5c1deaf5-7c58-4c6c-a88e-2828755e4606/d1cfadcc-dd32-46cb-95c9-7842993e8824.jpg'),

-- Postres
-- bubbolitas (cafe y te)
-- zenzoo (cafe y te)
('dulzuramia@gmail.com','Dulzura Mia','44443292D','4633 Lebsack Ramp Apt. 996 - Nashua, TX / 46912','wefjh','608374666','restaurant','https://res.cloudinary.com/glovoapp/w_1200,f_auto,q_auto/Stores/roqy9ucwy6gm4nbs0eir'),
('thefresh@gmail.com','The Fresh Poke','44443292D','440 Torphy Ridges Apt. 675 - Apple Valley, MN / 96329','wefjh','608374666','restaurant','https://poke-fresh.com/wp-content/uploads/2020/05/bubble-tea-promo-400x250.jpg');

INSERT INTO restaurants VALUES
('miu@gmail.com','rojo','visible','ES0000000004444000001234','restaurante.com/allergens.pdf'),
('saikosushi@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('sushito@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('hachiko@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('pizzapazza@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('napoli@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('gusto_rest@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('pizzamarket@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('ayres@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('caneusebio@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('bbqexpress@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('canvador@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('chatico@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('kfc@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('mcdonald@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('wok@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('boabao@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('fulin@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('fandimsum@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('ramenya@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('kuyi@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('telemaki@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('burgerniu@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('tgb@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('mrgreensalad@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('pokesi@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('greenberry@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('maoz@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('muns@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('goiko@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('papajohns@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('hideoutburger@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('royalnepal@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('boko@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('chatime@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('bubbolitas@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('zenzoo@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('tacobell@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('rosanegra@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('tacos99@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('burritowey@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('dulzuramia@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf'),
('thefresh@gmail.com','rojo','visible','ES8021000004444000001234','restaurante.com/allergens.pdf');
INSERT INTO deliverymans VALUES
('juancarlos@gmail.com','verde','visible','ES8021000000000000001236'),
('josemaria@gmail.com','verde','visible','ES8021000000000000001236');
INSERT INTO customers VALUES
('raul@gmail.com','12124545898923231023149'),
('carlos@gmail.com','12124545898923231023149'),
('ruben@gmail.com','12124545898923231023149'),
('david@gmail.com','12124545898923231023149'),
('laura@gmail.com','12124545898923231023149'),
('carla@gmail.com','12124545898923231023149');
--Insert two mock orders that later we are going to rate and make feedback
INSERT INTO orders VALUES (DEFAULT,'tacos99@gmail.com','josemaria@gmail.com','raul@gmail.com','esperando',CURRENT_TIMESTAMP(0)),
(DEFAULT,'dulzuramia@gmail.com','juancarlos@gmail.com','carla@gmail.com','preparando',CURRENT_TIMESTAMP(0));
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
(DEFAULT,'Edamame','Judias de soja salteadas con mantequilla y flor de sal',5.40,'1','miu@gmail.com','https://2.bp.blogspot.com/_34gqXLiMUNA/TT8C2JecK6I/AAAAAAAACsg/WocRCUtUfyI/s1600/Seasoned+Edamame.jpg',1),
(DEFAULT,'Spicy Edamame','Judías de soja con un toque de sischimi y salteadas con mantequilla',5.50,'1','miu@gmail.com','https://explorecookeat.com/wp-content/uploads/2019/10/IMG_7573.jpeg',1),
(DEFAULT,'Maguro Tartar','Dados de atún en estilo japonés con yema de codorniz.',12.95,'1','miu@gmail.com','https://www.sushibarminato.com/wp-content/uploads/2014/09/Maguro-tartar.jpg',1),
(DEFAULT,'Eby Gyoza','De gambas y verduras. 5 piezas. ',8.75,'1','miu@gmail.com','https://cdn.shopify.com/s/files/1/2264/3783/products/ShrimpGyoza.jpg?v=1548961949',1),

(DEFAULT,'Foie Micuit Uramaki','Con mango, masago y tataki de atún. 8 piezas. ',12.90,'1','miu@gmail.com','http://www.rostianjin.it/images/2017/01/23/uramaki-tempura.jpg',2),
(DEFAULT,'California Uramaki de Cangrejo','California Uramaki de Cangrejo',8.10,'1','miu@gmail.com','https://www.comidaereceitas.com.br/img/sizes/600x400/Uramaki_sakuraa.jpg',2),
(DEFAULT,'Hot rainbow Futomaki','Rebozado con salmón, dorada, atún y lima crispy. 6 piezas. ',10.70,'1','miu@gmail.com','http://www.sushikiku.com/wp-content/uploads/2013/07/IMG_0417.jpg',2),
(DEFAULT,'Dragon Uramaki de Anguila','Aguacate, salmón en tempura, mayonesa y pepino. 8 piezas. ',14.95,'1','miu@gmail.com','https://www.uitetenmiddelburg.nl/wp-content/uploads/2017/05/Dragon.jpg',2),

(DEFAULT,'Sushi no Moriawase ','6 piezas de nigiri y 8 piezas de maki de salmón',19.50,'1','miu@gmail.com','https://www.restaurante-japones-midori.com/wp-content/uploads/2018/01/sushi-27-bateau-1170x679.jpg',3),
(DEFAULT,'Nigiri no Moriawase','2 nigiris de atún, 2 nigiris de salmón, 2 nigiris de thai y 2 nigiris de ebi. ',19.50,'1','miu@gmail.com','https://1.bp.blogspot.com/-F3_jgC71DA4/UJ5MbUMwERI/AAAAAAAAGrs/mFqVe1P2wb4/s1600/DSC_0024.JPG',3),
(DEFAULT,'Combinado de Sushi y Sashimi','6 piezas de sashimi, 4 piezas de nigiri y 8 piezas de maki de salmón.',19.95,'1','miu@gmail.com','https://i.pinimg.com/originals/db/86/fe/db86fe4852ce9325c4c5691f8dd16de9.jpg',3),
(DEFAULT,'Combinado de Salmón','6 piezas de sashimi de salmón y 8 piezas de maki de salmón.',17.95,'1','miu@gmail.com','http://beisushi.com.ar/wp-content/uploads/2017/07/combinados-de-salmon.jpg',3),

(DEFAULT,'Menú del Día','Lunes a viernes al medio día. Con edamame (soja verde japonesa con flor de sal).',15.20,'1','miu@gmail.com','https://restaurantekomori.com/wp-content/uploads/2017/09/edamame.jpg',4),
(DEFAULT,'Menú del Día con Cerverza','Lunes a viernes al medio día. Con edamame (soja verde japonesa con flor de sal). Con cerveza.',15.20,'1','miu@gmail.com','https://resizer.abc.es/resizer/resizer.php?imagen=https:%2F%2Foferplan.sevilla.abc.es%2F%2Fimages%2Fsized%2Fimages%2Fmenujaponesshangshisevilla-2-497x280.jpg&nuevoancho=497&nuevoalto=280&crop=1',4),

(DEFAULT,'Wakame','Ensalada de algas marinado con sesamo.',4.30,'1','saikosushi@gmail.com','https://ep01.epimg.net/elcomidista/imagenes/2018/07/19/receta/1531997897_413701_1531998451_media_normal.jpg',5),
(DEFAULT,'Yakisoba de Pollo y Verduras','Tallarines japones de trigo.',5.70,'1','saikosushi@gmail.com','https://unareceta.com/wp-content/uploads/2016/08/receta-yakisoba-de-pollo.jpg',5),
(DEFAULT,'Tartar de Salmón con Aguacate','Con wakame edamame y mango. 1 pieza.',12.40,'1','saikosushi@gmail.com','https://www.deliciosi.com/images/0/96/tartar-de-salmon-y-aguacate.jpg',5),
(DEFAULT,'Uramaki Rainbow','Con salmón, atún, aguacate, pez mantequilla y anguila. 8 piezas.',9.9,'1','saikosushi@gmail.com','https://www.makesushi.com/wp-content/uploads/2014/10/rainbow-sushi-roll-uramaki-e1424269932219.jpg',5),

(DEFAULT,'Yakisoba de Huevos y Verduras','Tallarines japones de trigo.',5.30,'1','saikosushi@gmail.com','https://www.solucionesparaladiabetes.com/magazine-diabetes/wp-content/uploads/thai-food-noodle-fried-noodles-meal-46247-696x522.jpeg',6),
(DEFAULT,'Yakisoba de Pollo y Verduras','Tallarines japones de trigo.',5.70,'1','saikosushi@gmail.com','http://www.wikichef.net/webapp/img/recipes/b6f5f6_zyakisoba-chickent_w1000.jpg',6),
(DEFAULT,'Yakisoba de Gambas y Verduras','Tallarines japones de trigo.',6.30,'1','saikosushi@gmail.com','https://pixiecocina.files.wordpress.com/2016/02/receta-yakisoba-gambas.jpg?w=1200',6),
(DEFAULT,'Yakisoba de Cerdo Asado y Verduras','Tallarines japones de trigo.',6.60,'1','saikosushi@gmail.com','https://www.aisushi.es/wp-content/uploads/2020/09/BUTINIKUYAKISOBA.jpg',6),

(DEFAULT,'Tempura de Langostino','5 unidades.',4.80,'1','saikosushi@gmail.com','https://cocinista-vsf.netdna-ssl.com/download/bancorecursos/recetas/receta-tempura-extra-crujiente.jpg',7),
(DEFAULT,'Tempura de Verduras','5 unidades.',4.60,'1','saikosushi@gmail.com','https://1.bp.blogspot.com/-i67XRB-xE9k/VNtd-RdWTxI/AAAAAAABBLs/pBeSKPiYssc/s1600/IMG_5547.JPG',7),

(DEFAULT,'Sashimi de Salmón','3 piezas',7.50,'1','saikosushi@gmail.com','https://cookingandmoredotes.files.wordpress.com/2015/08/img_8505-1.jpg',8),
(DEFAULT,'Sashimi de Atún','3 piezas',8.60,'1','saikosushi@gmail.com','https://img.leafcdn.tv/640/clsd/getty/6d21985f5c1f48e5bc6fdd49914b2929',8),
(DEFAULT,'Sashimi de Salmón, Atún y Dorada','Sashimi de salmón 2 piezas, atún 2 piezas y dorada 2 piezas.',8.60,'1','saikosushi@gmail.com','https://i.ytimg.com/vi/0x5I1QvGKvY/hqdefault.jpg',8),
(DEFAULT,'Sashimi de Salmón y Atún','Sashimi de salmón 3 piezas y atún 3 piezas.',8.20,'1','miu@gmail.com','https://shiaadi.es/wp-content/uploads/sashimi-atun.jpg',8),

(DEFAULT,'GYOZA POLLO (4 Pzas)','Empanadillas tradicionales japonesas de pollo y verduras finalizadas a la plancha acompañada de salsa de soja avinagrada. ',5.70,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',9),
(DEFAULT,'GYOZA VERDURAS (4 pzas)','Empanadillas tradicionales japonesas de verduras finalizadas a la plancha acompañada de salsa de soja avinagrada. ',5.50,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',9),
(DEFAULT,'GOHAN','Arroz blanco cocido con un toque de sésamo.',3.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',9),
(DEFAULT,'EDAMAME','Habitas de soja con cristales de sal. ',3.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',9),

(DEFAULT,'POKE SALMON','Base de arroz acompañado de salmón, aguacate, goma wakame, edamame, zanahoria encurtida, cebolla crispy y sésamo aderezado con aceite de sesa',10.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',10),
(DEFAULT,'POKE DE ATUN','Base de arroz acompañado de atún, aguacate, goma wakame, edamame, zanahoria encurtida, cebolla crispy y sésamo aderezado con salsa ponzu. ',11.50,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',10),
(DEFAULT,'POKE VEGETAL','Base de arroz, acompañado de tofu, aguacate, goma wakame, edamame, zanahoria encurtida, cebolla crispy y sésamo aderezado con salsa ponzu y dressing. ',9.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',10),

(DEFAULT,'CRUJIENTE ROLL (4 piezas)','Rollito invertido de arroz relleno de tempura de langostino y espárrago crujiente recubierto con masago, aguacate y sésamo aderezado con mayonesa japonesa y salsa teriyaki',5.30,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',11),
(DEFAULT,'DOBLE MAGURO (8Pzas)','Rollito invertido de arroz relleno de atún y aguacate, recubierto de tataki de atún con huevas de tobiko negro aderezado con salsa salsa ponzu',10.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',11),
(DEFAULT,'DELICIAS DE VIERA (4 piezas)','Rollito invertido con arroz relleno de salmón y queso, recubierto de salmón y vieira flameado con mayonesa de trufa, huevas de ikura con salsa teriyaki',5.80,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',11),
(DEFAULT,'RAINBOW (8 Pzas)','Rollito invertido con arroz relleno de aguacate, cangrejo natural, mayonesa, recubierto con láminas de salmón, atún, corvina y masago de wasabi',11.50,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',11),

(DEFAULT,'SASHIMI SALMON (6 PZAS)','https://fondosmil.com/fondo/17536.jpg',6.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',12),
(DEFAULT,'SASHIMI ATÚN (6 PZAS)','https://fondosmil.com/fondo/17536.jpg',7.90,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',12),
(DEFAULT,'SASHIMI CORVINA','https://fondosmil.com/fondo/17536.jpg',7.50,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',12),
(DEFAULT,'SASHIMI ANGUILA (6 PZAS)','https://fondosmil.com/fondo/17536.jpg',7.60,'1','sushito@gmail.com','https://fondosmil.com/fondo/17536.jpg',12),

(DEFAULT,'Bandeja Combina 1 ','4 makis de salmón, 4 makis de atún y 4 de makis de aguacate. Contiene pescado. ',5.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',13),
(DEFAULT,'Bandeja Combina 2','4 makis de salmón, 4 makis de atún, 4 salmón roll de salmón y queso y 4 crunch roll surimi. Contiene cereales, soja, lácteos, pescado y huevo.',9.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',13),
(DEFAULT,'Bandeja Combina 3','4 California de salmón y aguacate, 3 nigiris salmón, 2 nigiris atún y 1 nigiri de langostino cocido. Contiene pescado, crustáceos y sésamo.',9.30,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',13),
(DEFAULT,'Bandeja Combina 4','4 makis salmón, 4 makis atún, 2 nigiris salmón, 2 nigiris atún y 2 nigiris langostino cocido. Contiene pescado y crustáceos. ',10.50,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',13),

(DEFAULT,'Crunch Roll Surimi','Surimi, aguacate, pepino, arroz, alga nori y cebolla frita. Contiene soja, lácteos y huevo. Bandeja de 8 piezas. ',6.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',14),
(DEFAULT,'Crunch Roll de Salmón','Salmón, aguacate, pepino, arroz, alga nori y cebolla frita. Contiene pescado. Bandeja de 8 piezas. ',7.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',14),
(DEFAULT,'Salmón Roll de Salmón y Queso','Salmón, aguacate, queso Philadelphia, arroz y alga nori. Contiene lácteos y pescado. Bandeja de 8 piezas.',7.50,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',14),
(DEFAULT,'Dragón Roll de Salmón','Salmón, aguacate, surimi, pepino, arroz y alga nori. Contiene frutos secos, lácteos, huevo, soja y pescado. Bandeja de 8 piezas. ',7.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',14),

(DEFAULT,'Maki de Salmón','Salmón, arroz y alga nori. Contiene pescado.',4.20,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',15),
(DEFAULT,'Maki de Atún','Atún, arroz y alga nori. Contiene pescado.',4.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',15),
(DEFAULT,'Maki de Langostino Cocido','Langostino cocido, arroz y alga nori. Contiene crustáceos.',4.20,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',15),
(DEFAULT,'Maki de Mango','Mango, arroz y alga nori.',3.20,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',15),

(DEFAULT,'Nigiri de Salmón 1 Pieza','Salmón y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',1.40,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',16),
(DEFAULT,'Nigiri de Salmón Flameado 1 Pieza','Salmón y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',1.40,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',16),
(DEFAULT,'Nigiri de Anguila 6 Piezas','Anguila asada y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',9.80,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',16),
(DEFAULT,'Nigiri de Pez Mantequilla 6 Piezas','Pez mantequilla y arroz. Contiene pescado. Base alargada de arroz con lámina de pescado por encima. ',8.20,'1','hachiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',16),

(DEFAULT,'Combo de 3 porciones','Caja de 3 porciones grandes de pizzas variadas: Margherita, jamón dulce+champiñones, vegetariana',8.90,'1','pizzapazza@gmail.com','https://static8.depositphotos.com/1163409/979/i/950/depositphotos_9799865-Three-slices-of-pizza.jpg',17),
(DEFAULT,'Pizza Margherita','Tomate y mozzarella.',8.90,'1','pizzapazza@gmail.com','https://imgp3.schaer.com/sites/default/files/1418_Pizza%20margherita.jpg',17),
(DEFAULT,'Pizza Vegetariana','Tomate, mozzarella, zucchini funghi, melanzane y pimientos.',10.60,'1','pizzapazza@gmail.com','https://blog.chefsclub.com.br/wp-content/uploads/2017/05/pizza-vegetariana.jpg',17),
(DEFAULT,'Pizza Diavola','Tomate, mozzarella, salame piccante, pimientos y pepperoncini.',10.50,'1','pizzapazza@gmail.com','https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/03/d-evid-672x372.jpg',17),

(DEFAULT,'Lasagna Casereccia','Hojas de pasta, tomate, carne picada, besciamella y parmesano.',4.50,'1','pizzapazza@gmail.com','https://i.pinimg.com/originals/c8/fe/29/c8fe2904210871b8d45aef3a65223fb0.jpg',18),

(DEFAULT,'Pannacotta','Nata cocida a gusto fresa, caramelo o chocolate.',4.50,'1','pizzapazza@gmail.com','http://www.jellibeanjournals.com/wp-content/uploads/2017/08/White-Chocolate-Panna-Cotta-with-Berries_3.jpg',19),
(DEFAULT,'Tiramisú','Mascarpone, savoiardi, huevos, café, cacao y azúcar.',4.50,'1','pizzapazza@gmail.com','https://i.ytimg.com/vi/TWkDRIOmwoc/maxresdefault.jpg',19),

(DEFAULT,'Estathé','Refresco gusto te.',2,'1','pizzapazza@gmail.com','https://content.dambros.it/uploads/2016/01/01134255/0000037204-1024x1024.jpg',20),
(DEFAULT,'Aranciata','San Pellegrino.',2,'1','pizzapazza@gmail.com','http://spesadoc.com/4064-thickbox_default/aranciata-san-benedetto-15-l.jpg',20),
(DEFAULT,'Chinotto','San Pellegrino.',2,'1','pizzapazza@gmail.com','https://media.eataly.net/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/u/lurisia-chinotto-0.75-41756.jpg',20),
(DEFAULT,'Agua','San Pellegrino.',1.50,'1','pizzapazza@gmail.com','https://www.imigrantesbebidas.com.br/bebida/images/products/full/2823_Agua_Mineral_Pureza_Vital_Sem_Gas_510_ml.1534622255.jpg',20),

(DEFAULT,'Pizza Bellezza di Venere','Pizza estilo calzone, rellana de un mixto de 4 quesos, jamón de parma, rucula, Grana Padano, crema de balsamico y aceite de oliva virgen.',16.75,'1','napoli@gmail.com','https://wallpapershome.com/images/pages/pic_h/428.jpg',21),

(DEFAULT,'La Parmigiana di Melanzane','Berenjenas cocidas al horno con tomate y parmesano.',10.90,'1','napoli@gmail.com','https://astelus.com/wp-content/viajes/Parmigiana-di-melanzane.jpg',22),
(DEFAULT,'Caprese Pomodoro Mozzarella','Mozarella fior di latte 100% leche italiana, con tomate y albahaca.',10.70,'1','napoli@gmail.com','https://www.dolcesalato.com/wp-content/uploads/2014/06/insalata-caprese-pomodoro-mozzarella-basilico-650x360.png',22),
(DEFAULT,'Carpaccio di manzo ','Carpaccio de ternera con rúcula y parmesano',12.75,'1','napoli@gmail.com','https://image.freepik.com/foto-gratuito/carpaccio-di-manzo-servito-con-rucola_144627-495.jpg',22),

(DEFAULT,'Pizza Tonno E Cipolla','Tomate, mozzarella, cebolla, atún y olivas.',11.90,'1','napoli@gmail.com','https://www.bofrost.it/writable/products/images-v2/15196.jpg',23),
(DEFAULT,'Pizza Vegetariana','Tomate, mozzarella, calabacin, berenjenas y pimientos rojos.',11.40,'1','napoli@gmail.com','https://img.cybercook.com.br/receitas/611/pizza-vegetariana-1.jpeg',23),
(DEFAULT,'Pizza Capricciosa','Tomate, mozzarella, prosciutto cotto, salami picante, champiñones y olivas negras.',13.45,'1','napoli@gmail.com','http://spicygoulash.com/wp-content/uploads/pizza-capricciosa.jpg',23),
(DEFAULT,'Pizza Via Napoli','Mozzarella, rucula, tomate cherry, prosciutto crudo di parma y parmesano.',12.90,'1','napoli@gmail.com','https://www.orlandovacation.com/wp-content/uploads/2015/08/orlandovacation_epcot-via-napoli.jpg',23),

(DEFAULT,'Spaghetti Carbonara','Spaguettis en salsa con guanciale italiano, huevo, queso romano y pimienta negra.',12.45,'1','napoli@gmail.com','https://dolmafood.ca/wp-content/uploads/spaghetti-carbonara-recipe-dolma-food.jpg',24),
(DEFAULT,'Spaghetti a Puttanesca','Spaguetti en salsa de tomate, olivas negras, ajo, chile y anchoas.',13.70,'1','napoli@gmail.com','https://images.lacucinaitaliana.it/wp-content/uploads/2016/02/spaghetti-alla-puttanesca-890x570.jpg',24),
(DEFAULT,'Lasagne','Lasaña boloñesa ',12.45,'1','napoli@gmail.com','https://www.zenysro.cz/images/recipe/6941/main.jpg',24),
(DEFAULT,'Linguine frutti di mare','Linguinis salteados con ajo, vino blanco, almejas, mejillones y gambitas',15.75,'1','napoli@gmail.com','http://www.kitchenette.it/wordpress/wp-content/uploads/2015/08/Linguine-ai-frutti-di-mare.jpg',24),

 (DEFAULT,'Lasagna Napoletana','Típico pastel napolitano relleno, gratinados al horno de leña. ',13.50,'1','gusto_rest@gmail.com','https://www.ilroma.net/sites/default/files/styles/curiosita-full/public/lasagna-napoletana-di-carnevale.jpg?itok=J3OGyY-H',25),
(DEFAULT,'Cannelloni Al Forno','Canelones relleno, gratinados al horno de leña. ',13.50,'1','gusto_rest@gmail.com','https://www.valsesianotizie.it/typo3temp/pics/1_195751e0b7.jpg',25),
(DEFAULT,'Mezzelune Ripiene di Burrata','Pasta fresca rellena de burata con salsa pesto o tomate.',14.00,'1','gusto_rest@gmail.com','https://www.valsesianotizie.it/typo3temp/pics/1_195751e0b7.jpg',25),
(DEFAULT,'Panzerotti Ricotta e Funghi Porcini','Pasta fresca rellena de requesón y ceps “porcini italiani”, salsa de setas frescas y trufa negra de verano. ',15.00,'1','gusto_rest@gmail.com','https://i.pinimg.com/originals/e0/40/4f/e0404f8fca5fe1ed08d76e7454ccebad.jpg',25),

(DEFAULT,'Risotto Cremoso di Verdure Fresche','Arroz con cremoso de verduras mixta y queso mascarpone.',13.00,'1','gusto_rest@gmail.com','https://www.ricettasprint.it/wp-content/uploads/2019/11/Risotto-cremoso-con-spinaci-e-mortadella-ricettasprint2.jpg',26),
(DEFAULT,'Risotto Misto Funghi e Porcini con Tartufo Nero','Arroz con salsa mixto de setas de cultivo con porcini (ceps italiano) y trufa negra de verano.',17.00,'1','gusto_rest@gmail.com','http://convivium.it/wp-content/uploads/2016/10/Risotto-al-tartufo-e-porcini-in-cialda-di-grana-e1477300931209.jpg',26),
(DEFAULT,'Risotto al Nero con Moscardini e Gamberi di Palamos','Arroz con tinta de calamares, chipirones, gamba de Palamós y tomatito cherry.',18.00,'1','gusto_rest@gmail.com','https://blog.giallozafferano.it/cucinaplus/wp-content/uploads/2019/11/20190827110535_IMG_8040-01.jpeg',26),

(DEFAULT,'Pizza Margherita','Salsa de tomate, mozzarella y albahaca.',9.00,'1','gusto_rest@gmail.com','https://imgp2.schaer.com/sites/default/files/2017-09/HeaderProducts_Pizza%20Margherita.jpg',27),
(DEFAULT,'Pizza Prosciutto e Funghi','Tomate, mozzarella, pernil dulce y champiñones.',12.00,'1','gusto_rest@gmail.com','http://www.pizzaforum.ro/wp-content/uploads/2014/06/Pizza_Forum_Craiova_pizza_prosciutto_e_funghi__0102.jpg',27),
(DEFAULT,'Pizza Bufala','Salsa de tomate, mozzarella de búfala y albahaca.',13.00,'1','gusto_rest@gmail.com','https://blog.giallozafferano.it/dolcesalatomiky/wp-content/uploads/2016/09/DSC_0036.jpg',27),
(DEFAULT,'Pizza Fantasia','Tomate, mozzarella, bacón, champiñones y huevo frito al horno.',14.00,'1','gusto_rest@gmail.com','https://cdn.pymesenlared.es/img/136/1727/68941/0x1200/img_4343.1500286568.JPG',27),

(DEFAULT,'Pizza Calzone Fritto','Pizza doblada frita y rellena con requesón, queso provola ahumado, salami picante, salsa tomate y pimienta negra.',12.00,'1','gusto_rest@gmail.com','https://www.vesuviolive.it/wp-content/uploads/2015/03/Calzone-napoletano-1.jpg',28),
(DEFAULT,'Pizza Girello','Rollito de pizza relleno de mozzarella, pesto, rucola, mortadela, cortada y servida con base de rucola, tomatito cherry y parmesano.',16.00,'1','gusto_rest@gmail.com','https://www.menu.it/media/ricette/pizza-ai-carciofi-e-girello-64857/conversions/pizza-ai-carciofi-e-girello_supp79-main.jpg',28),
(DEFAULT,'Pizza Bianca al Tartufo','Blanca sin tomate con mozzarella de búfala, piñones tostado y trufa negra de verano.',19.00,'1','gusto_rest@gmail.com','https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/238209.jpg',28),
(DEFAULT,'Pizza Focaccia','Pan de pizza con aceite y romero.',5.00,'1','gusto_rest@gmail.com','https://imagesvc.meredithcorp.io/v3/mm/image?url=https://static.onecms.io/wp-content/uploads/sites/19/2017/11/21/mr-focacciapizza-2000.jpg',28),

 (DEFAULT,'Margarita','Tomate y mozzarella. (Vegetariana)',9.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',29),
(DEFAULT,'Funghi','Tomate, mozzarella, jamón dulce y champiñones. ',11.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',29),
(DEFAULT,'4 Quesos','Tomate, mozzarella, queso de cabra, gorgonzola y emmental. (Vegetariana).',11.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',29),
(DEFAULT,'Carbonara','Mozzarella, nata, cebolla, bacon, champiñones. ',12.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',29),

(DEFAULT,'Reina','Tomate, mozzarella, jamón dulce, champiñones, rúcula y parmesano.',12.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',30),
(DEFAULT,'Ses Illes','Tomate, mozzarella, cebolla, sobrasada de Mallorca y miel picante.',12.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',30),
(DEFAULT,'American Meet','Tomate, mozzarella, bacon, pepperoni, ternera y extra de mozzarella',13.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',30),
(DEFAULT,'Veggie','Tomate, mozzarella vegana, cebolla de Figueres, champiñones, calabacín, tomate seco y aceite de albahaca (es vegana)',14.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',30),

(DEFAULT,'Toscana','Tomate, mozzarella, tomate seco, burrata, olivada, aceite de albahaca y rúcula. ',15.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',31),
(DEFAULT,'Tartufata','Crema trufada, mozzarella, champiñones, virutas de bacon, queso gruyere y aceite de trufa blanca.',15.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',31),
(DEFAULT,'Foie','Mozzarella, cebolla caramelizada, crema con ceps salteados y foie fresco ',16.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',31),
(DEFAULT,'Jabugo','Tomate, mozzarella, 100gr de viruta de jamón ibérico de bellota Andreu',18.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',31),

(DEFAULT,'Bikini','Jamón dulce y queso.',5.40,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',32),
(DEFAULT,'Mallorquín','Sobrasada de Mallorca, queso y miel',5.40,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',32),
(DEFAULT,'Ibérico','Burrata y virutas de jamón ibérico de bellota Andreu.',8.90,'1','pizzamarket@gmail.com','https://fondosmil.com/fondo/17536.jpg',32),

 (DEFAULT,'Entraña de Ternera con fritas','Corte argentino con Fritas!!',15.65,'1','ayres@gmail.com','https://i.ytimg.com/vi/1xDh4_1AEzc/maxresdefault.jpg',33),
(DEFAULT,'Entrecot de Novillo Argentino','Lomo alto argentino . 300 gramos. ',21.00,'1','ayres@gmail.com','https://media-cdn.tripadvisor.com/media/photo-s/04/c1/bc/c7/asador-el-atlantico.jpg',33),
(DEFAULT,'Ñoquis del 29','Ñoquis caseros con salsa tradicional boloñesa. Solo disponible el 29 de cada mes',9.90,'1','ayres@gmail.com','https://www.minutoneuquen.com/u/fotografias/m/2020/4/29/f1280x720-249795_381470_5050.jpg',33),
(DEFAULT,'Ñoquis + chocotorta','Noquis casero con salsa boloñesa + 1 racion de chocotorta. Solo disponible el 29 de cada mes ',14.00,'1','ayres@gmail.com','https://i.pinimg.com/736x/0c/ac/57/0cac57f0eb33555fc631b52bc712d9cd.jpg',33),

(DEFAULT,'Hamburguesa Black Angus','200 gramos de ternera black angus a las brasas de carbon con queso y cebolla caramelizada! con patatas fritas ',10.50,'1','ayres@gmail.com','https://i0.wp.com/carnescamponatura.com/wp-content/uploads/2020/02/hamburguesa-angus-online.jpg?fit=800%2C450&ssl=1',34),
(DEFAULT,'Tira de Asado','Asado de tira estilo argentino ',15.65,'1','ayres@gmail.com','https://i.ytimg.com/vi/fb8thTiZAus/maxresdefault.jpg',34),
(DEFAULT,'Vacio con patatas fritas','https://fondosmil.com/fondo/17536.jpg',15.65,'1','ayres@gmail.com','https://i.pinimg.com/originals/56/8e/9b/568e9b1a9d0c08329e1b0b0aec9124ca.jpg',34),
(DEFAULT,'Pescado del dia a la Parrilla','https://fondosmil.com/fondo/17536.jpg',12.00,'1','ayres@gmail.com','https://cdn-pro.elsalvador.com/wp-content/uploads/2017/01/29145152/1460973239261.jpg',34),

(DEFAULT,'Coca de pan con chimichurri','Coca de pan crujiente y tostado a las brasas con chimichurri, una delicia!!',2.20,'1','ayres@gmail.com','https://www.pavisucre.cat/wp-content/uploads/2014/04/Coca-de-forner-destacada.jpg',35),
(DEFAULT,'Queso Provoleta Ayres del Sur','Con cebolla caramelizada y pan de coca.',9.65,'1','ayres@gmail.com','https://images.restopolitan.com/restaurant/ayres-del-sur/305203/Carousel3.jpg',35),
(DEFAULT,'Ensalada César con Pollo a la Parrilla','Variedad de verdes, bacon, croutons, queso parmesano, pollo braseado y salsa César. ',8.90,'1','ayres@gmail.com','https://image.freepik.com/foto-gratis/ensalada-cesar-pollo-parrilla-saludable-tomates-queso-crutones_2829-3210.jpg',35),
(DEFAULT,'Empanada de ternera ','Empanada criolla de ternera',2.80,'1','ayres@gmail.com','https://www.juanideanasevilla.com/archivos/recetas/9bfb1de2cc8bdf33142eab8a30931a4bb5c3434f.jpg',35),

(DEFAULT,'Ensalada de tomates en diferentes texturas y tierra de aceitunas negras','ensalada de verdes con productos de temporada',5.00,'1','ayres@gmail.com','https://mejorconsalud.as.com/wp-content/uploads/2015/02/ensalada.jpg',36),
(DEFAULT,'Postre del dia: Tarta de manzana con caramelo','https://fondosmil.com/fondo/17536.jpg',4.50,'1','ayres@gmail.com','https://www.cookand.es/wp-content/uploads/2013/05/TartaManzana-1024x769.jpg',36),

(DEFAULT,'Hamburguesa Clásica con Cebolla y Queso + Patatas Fritas Regalo 1 Coca-cola','Deliciosa Hamburguesa de Carne alta Calidad , con Queso Fundido y Cebolla ,la hamburguesa tradicional ,acompañada com patatas Fritas una excelente opcion.',7.50,'1','caneusebio@gmail.com','https://thumbs.dreamstime.com/b/hamburguesa-del-queso-del-tocino-con-cola-de-la-cebolla-del-tomate-de-la-empanada-de-carne-de-vaca-57814561.jpg',37),
(DEFAULT,'Hamburguesa Mediterránea +lechuga+cebolla+huevo+ tomate y Patatas Fritas','Con lechuga, huevo, tomate, queso, cebolla y patatas fritas.',9.50,'1','caneusebio@gmail.com','http://www.espacioculinario.cl/wp-content/uploads/2018/03/HamburguesaAhumadaFEAT-1.jpg',37),
(DEFAULT,'Hamburguesa Paralelo +beicon+queso+cebolla+tomate+ Patatas Fritas Regalo 1 Coca-Cola','Con bacon, huevo Frito , Tomate, Queso Fundido , cebolla Frita y patatas fritas.',9.50,'1','caneusebio@gmail.com','https://cdn-3.expansion.mx/dims4/default/9713a6b/2147483647/strip/true/crop/630x500+0+0/resize/800x635!/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fgex.lifeandstyle%2Fuploads%2Fasset%2Fasset_file%2F8596%2Fweb_burger_1.jpg',37),
(DEFAULT,'Frankfurt El Original + Patatas Fritas y Regalo 1 Coca-cola ','NO lleva ninguna salsa ,Ni tomate, si deseas alguna salsa deberas agregar al pedido.',6.50,'1','caneusebio@gmail.com','https://www.proveedores.com/site/company/f9/67858/images/96140/proveedores-frankfurt_crs2.jpg',37),

(DEFAULT,'Pollo Rebozado crujiente +patatas fritas +zumo +Tarrina helado Vainilla-chocolate','Menu especial niños pollo rebozado crujiente muy bueno con patatas fritas y un helado de vainilla -chocolate ',8.90,'1','caneusebio@gmail.com','http://catfish.kaaltech.com/images/poultry_crispy_battered_fried_chicken_strips_steam_pohuski_1.jpg',38),
(DEFAULT,'6 Nugget de Pollo + patatas Fritas + ketchup + Bebida zumo + un Petisuis ','Menu Para Niños completo.',8.50,'1','caneusebio@gmail.com','https://eldoradomalaga.com/wp-content/uploads/2020/05/lagrimitas_pollo_patatas.jpg',38),

(DEFAULT,'Bolitas de queso Fritas Rebozadas ','Bolitas de queso fundido fritas , rebozadas para los amantes del queso , ',7.90,'1','caneusebio@gmail.com','https://recetinas.com/wp-content/uploads/2018/05/receta-de-bolitas-de-queso.jpg',39),
(DEFAULT,'Empanada Argentina ','Deliciosa Empanada Argentina de Carne y Huevo 2und',7.90,'1','caneusebio@gmail.com','https://astelus.com/wp-content/viajes/empanadas-argentinas.jpg',39),
(DEFAULT,'Calamares Romana ','Calamares a la romana esquisito sabor ,y si lo acompañas con limon y mahonesa tendras la combinacion perfecta.',9.90,'1','caneusebio@gmail.com','https://i.ytimg.com/vi/YUbkVV__PkI/maxresdefault.jpg',39),
(DEFAULT,'Chocos a la Andaluza','Tapa de tiras rebozadas de pota ,choco con limon exprimido por encima es perfecto ,para este verano .',8.90,'1','caneusebio@gmail.com','https://www.misrecetaspreferidas.com/wp-content/uploads/2011/09/Chocos_456.jpg',39),

(DEFAULT,'Bocadillo Lomo +Queso Fundido pan con Tomate ','pan de baguet tamaño media barra de pan ',5.90,'1','caneusebio@gmail.com','https://i.pinimg.com/originals/0c/1c/76/0c1c76fb58cc0c140ddeb44ac1475231.jpg',40),
(DEFAULT,'Bocadillo Beicon con Queso Fundido','se silve en pan de baguet su tamaño es media barra de pan',5.90,'1','caneusebio@gmail.com','https://www.pansandcompany.com/files/products/es/bocadillos/clasicos/british-bacon/images/24_01_2019_05_46_13.jpg',40),
(DEFAULT,'Bikini Jamon Dulce con Queso Fundido','se silve en pan de molde bikini con jamon york y queso loncha fundido .',3.90,'1','caneusebio@gmail.com','https://i.ytimg.com/vi/KNgEQeL3Fto/maxresdefault.jpg',40),
(DEFAULT,'Bocadilo Tortilla Francesa pan con Tomate','se silve en pan de baguet y su tamaño es media barra de pan',4.90,'1','caneusebio@gmail.com','http://tienda.novaterracatering.com/wp-content/uploads/2015/01/21.jpg',40),

 (DEFAULT,'Palomitas de pollo con Barbacoa','Trocitos de pollo natural, con un rebozado muy dorado y crujiente, acompañado de salsa barbacoa. (La salsa va incluida y servida por separado).',4.90,'1','bbqexpress@gmail.com','https://t2.uc.ltmcdn.com/images/4/2/1/como_hacer_palomitas_de_pollo_49124_600.jpg',41),
(DEFAULT,'Jalapeños rellenos queso cheddar','5 Uds. Jalapeños verdes picantes, rellenos de auténtico queso cheddar.',4.90,'1','bbqexpress@gmail.com','https://i.pinimg.com/originals/08/9f/a1/089fa13d9a310e78226968437251c26c.jpg',41),
(DEFAULT,'Dipper 3 salsas','Patata rústica con piel, en forma de arco. Ideal para “dipear” salsas. Incluyen 3 tarrinas de 50ml',4.90,'1','bbqexpress@gmail.com','https://areabrico.com/38084-large_default/ciotole-da-salsa-snack-dipper-pacco-da-4.jpg',41),
(DEFAULT,'Tiras de pollo con chili dulce','Tiras de pollo rebozadas y sazonadas con un toque de chili dulce. (La salsa va incluida y servida por separado).',4.90,'1','bbqexpress@gmail.com','https://i.pinimg.com/originals/d3/74/ab/d374ab71d9c99104b96a5261764d565e.jpg',41),

(DEFAULT,'Corte Argentino','Carne de ternera. Corte de vacío. Aproximadamente 250gr. Guarnición a elegir (opcional).',8.50,'1','bbqexpress@gmail.com','https://www.nacion.com/resizer/XeFHNCIeMEHPa2-W92U3CzBw5d4=/600x0/center/middle/filters:quality(100)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/FB5KMDIYSVEAHAOV7OKGW2I4J4.jpg',42),
(DEFAULT,'Churrasco','Carne de ternera. Corte de churrasco (incluye hueso). Aproximadamente 300gr. Guarnición a elegir (opcional).',8.90,'1','bbqexpress@gmail.com','http://cdnsonhos.sonhos.com.br/wp-content/uploads/2013/09/shutterstock_135084815.jpg',42),
(DEFAULT,'Entraña','Corte de carne muy especial y no tan común. No se asegura siempre su disponibilidad. Se prepara con la piel entera para conservar su jugo y sabor. Se recomienda que esté hecha al punto. ¡Esta espectacular! Se acompaña con chimichurri casero.',11.40,'1','bbqexpress@gmail.com','https://wongfood.vteximg.com.br/arquivos/ids/161663-1000-1000/Entrana-Americana-Certified-Angus-Beef-x-Kilo-441326.jpg?v=636111893553130000',42),
(DEFAULT,'Entrecote','Carne de ternera. Corte de entrecot (incluye hueso). 300gr Aproximadamente. Guarnición a elegir (opcional).',12.90,'1','bbqexpress@gmail.com','https://st3.depositphotos.com/1062035/12662/i/950/depositphotos_126623644-stock-photo-entrecote-with-grilled-garlic.jpg',42),

(DEFAULT,'Parrillada extrema','Doble corte de vacío (ternera) + Doble corte de churrasco + Entraña entera + 20 Alitas de pollo normales + Medio pollo + 3 Chorizos criollos + 3 Butifarras + 3 Frankfurt + 3 Cervelas + 3 Morcillas',79.00,'1','bbqexpress@gmail.com','https://www.miscostillitas.com/tienda/wp-content/uploads/2019/02/PARRILLA.jpg',43),
(DEFAULT,'Parrillanda Mix 2','Corte de vacío (ternera) + Churrasco + alitas de pollo normales (8 uds.) + Chorizo criollo parrillero + Butifarra + Cervela + Morcilla',26.90,'1','bbqexpress@gmail.com','https://static.vix.com/pt/sites/default/files/c/carne-de-churrasco-092016-1400x800.jpg',43),
(DEFAULT,'Parrillanda Mix 3','Doble corte de vacío (ternera) + Churrasco + alitas de pollo normales (12 uds.) + medio pollo + Chorizo criollo parrillero + Butifarra + Frankfurt + Cervela + Morcilla',37.90,'1','bbqexpress@gmail.com','https://cdn-5ec3bd24c1ac18016c051fb6.closte.com/wp-content/uploads/2019/07/churrasco-1.jpg',43),
(DEFAULT,'Parrillada deluxe','Entrecot + Media entraña + Vacío de ternera + Churrasco + 2 chorizos criollos + 2 butifarras + 8 alitas de pollo normales + 2 Morcillas',44.90,'1','bbqexpress@gmail.com','https://www.tumercagourmet.com/wp-content/uploads/2019/10/entrecot-de-ternera.jpg',43),

(DEFAULT,'Parrillada de verduras','Verduras frescas hechas a la brasa. (cebolla, pimiento, berenjena, tomate, espárragos, calabacín)',4.90,'1','bbqexpress@gmail.com','https://www.divinacocina.es/wp-content/uploads/parrillada-de-verduras-platoD.jpg',44),
(DEFAULT,'Vegan burger','Hecha con proteína natural. Servida en pan de Sésamo. Acompañada de tomate, lechuga, cebolla natural.',6.90,'1','bbqexpress@gmail.com','https://www.blondelish.com/wp-content/uploads/2019/02/Easy-Veggie-Burger-Recipe-Vegan-Healthy-9.jpg',44),
(DEFAULT,'Arroz con chimichurri','Arroz blanco cocido al punto, mezclado con chimichurri. Ración de 150gr.',2.90,'1','bbqexpress@gmail.com','https://i.pinimg.com/originals/fb/6e/c3/fb6ec3174c2b2c13b0c7b69695a7aeaf.jpg',44),
(DEFAULT,'Cheese vegan burger','Hamburguesa vegetariana. Pan con sésamo, queso Monterrey Jack (apto para vegetarianos). Acompañada de tomate, lechuga, cebolla natural.',7.90,'1','bbqexpress@gmail.com','https://minimalistbaker.com/wp-content/uploads/2015/07/AMAZING-GRILLABLE-Veggie-Burgers-Hearty-flavorful-and-hold-up-on-the-grill-or-skillet-vegan-veggieburger-grilling-dinner-healthy-recipe.jpg',44),

 (DEFAULT,'Croqueta Casera de Pollo Rustido','Unidad',1.50,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',45),
(DEFAULT,'Croqueta Vegana de Boletus','Unidad',2.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',45),
(DEFAULT,'Patatas Degustación Rellenas de Salsa Brava y Alioli','https://fondosmil.com/fondo/17536.jpg',5.50,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',45),

(DEFAULT,'Níscalos del Montseny a la Brasa con Picada de Ajo y Perejil','https://fondosmil.com/fondo/17536.jpg',12.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',46),
(DEFAULT,'Alcachofas del Prat Rebozadas ','https://fondosmil.com/fondo/17536.jpg',8.50,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',46),
(DEFAULT,'Tortilla Abierta con Crujiente de Alcachofa y Níscalos ','https://fondosmil.com/fondo/17536.jpg',8.50,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',46),
(DEFAULT,'Trinxat de La Cerdanya con Butifarra Negra y Rosta de Panceta ','https://fondosmil.com/fondo/17536.jpg',7.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',46),

(DEFAULT,'Nuestra Ensaladilla','Patata confitada con atún en aceite de oliva y huevo, mayonesa de crustáceos, pirarra y picos rústicos',7.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',47),
(DEFAULT,'Espárragos trigueros a la brasa con salsa holandesa','https://fondosmil.com/fondo/17536.jpg',7.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',47),
(DEFAULT,'Caldo de Escudella de Payés con Galets y Pelotitas de Cocido','https://fondosmil.com/fondo/17536.jpg',6.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',47),
(DEFAULT,'Canelones de Tres Carnes rustidas y Gratinados con Bechamel y Queso ','https://fondosmil.com/fondo/17536.jpg',7.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',47),

(DEFAULT,'Butifarra Artesana de Vallromanes','https://fondosmil.com/fondo/17536.jpg',8.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',48),
(DEFAULT,'Manitas de Cerdo al Estilo Can Vador','https://fondosmil.com/fondo/17536.jpg',10.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',48),
(DEFAULT,'Costillas y Chuletas de Cordero','https://fondosmil.com/fondo/17536.jpg',14.00,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',48),
(DEFAULT,'1/4 Pollo de Payés Muslo','https://fondosmil.com/fondo/17536.jpg',6.50,'1','canvador@gmail.com','https://fondosmil.com/fondo/17536.jpg',48),

 (DEFAULT,'Combo Frankfurt + Patatas + Bebida','https://fondosmil.com/fondo/17536.jpg',8.00,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',49),
(DEFAULT,'Combo Hamburguesa + Patatas + Bebida','https://fondosmil.com/fondo/17536.jpg',8.00,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',49),

(DEFAULT,'Butifarra Pages','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',50),
(DEFAULT,'Cervela','https://fondosmil.com/fondo/17536.jpg',4.30,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',50),
(DEFAULT,'Pikantwurst','https://fondosmil.com/fondo/17536.jpg',4.30,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',50),
(DEFAULT,'Salsitxa del País','https://fondosmil.com/fondo/17536.jpg',4.00,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',50),

(DEFAULT,'Hamburguesa Moruna','https://fondosmil.com/fondo/17536.jpg',5.30,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',51),
(DEFAULT,'Hamburguesa de Ternera','https://fondosmil.com/fondo/17536.jpg',5.00,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',51),

(DEFAULT,'Bocadillo Spicy','Pikantwurst con cebolla frita y queso.',7.00,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',52),
(DEFAULT,'Bocadillo Morcillo','Malagueña con queso y huevo frito.',5.50,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',52),
(DEFAULT,'Bocadillo Tejano','Frankfurt XL con queso edam, bacon crujiente y aros de cebolla.',6.00,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',52),
(DEFAULT,'Bocadillo Criollo','Chorizo criollo con lechuga y tomate con un toque argentino.',5.50,'1','chatico@gmail.com','https://fondosmil.com/fondo/17536.jpg',52),

 (DEFAULT,'Menu Cheddar Addiction Burger','Filete de Pechuga Original, disco de cheddar fundido, bacon, lechuga, mayonesa y pan brioche + 1 complemento + 1 bebida',9.79,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',53),
(DEFAULT,'Súper Menú','El principal que quieras + 3 complementos + 1 bebida',9.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',53),
(DEFAULT,'Chick&Share 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas',13.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',53),
(DEFAULT,'Menú Bucket 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas + 2 complementos + 2 bebidas',17.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',53),

(DEFAULT,'Menú Super Bucket para 2','2 Twister Wrap + 9 Tiras de Pechuga + 3 salsas + 2 complementos + 2 bebidas',19.49,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',54),
(DEFAULT,'Menú Bucket 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas + 2 complementos + 2 bebidas',17.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',54),
(DEFAULT,'Chick&Share 12 Tiras para 2','12 Tiras de Pechuga + 4 salsas',13.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',54),
(DEFAULT,'Menu Bucket Cheddar Addiction para 2','6 Tiras de Pechuga + 6 Delicias de Pollo + 6 Cheddar Bites + 2 salsas cheddar + 2 complementos + 2 bebidas',18.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',54),

(DEFAULT,'Menú Family Combo para 4','2 Original Burger + 2 Twister Wrap + 6 Tiras de Pechuga + 8 Alitas Picantes + 2 salsas + 4 complementos + 4 bebidas',34.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',55),
(DEFAULT,'Menú Bucket 15 Tiras para 3','15 Tiras de Pechuga + 5 salsas + 3 complementos + 3 bebidas',24.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',55),
(DEFAULT,'Menú Bucket 20 Tiras para 4','20 Tiras de Pechuga + 6 salsas + 4 complementos + 4 bebidas',29.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',55),
(DEFAULT,'Menú Bucket 12 Piezas para 4','12 Piezas de Pollo + 4 complementos + 4 bebidas',29.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',55),

(DEFAULT,'Súper Menú','El principal que quieras + 3 complementos + 1 bebida',9.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',56),
(DEFAULT,'Burger Double Krunch + Patatas','Burger de 2 Tiras de Pechuga, lechuga y mayonesa + 1 patatas',4.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',56),
(DEFAULT,'Box de 8 Alitas Picantes','https://fondosmil.com/fondo/17536.jpg',7.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',56),
(DEFAULT,'Box de 6 Tiras','6 Tiras de Pechuga + 2 salsas',7.99,'1','kfc@gmail.com','https://fondosmil.com/fondo/17536.jpg',56),

 (DEFAULT,'Big Good','Una hamburguesa creada con 7 ingredientes de 2.000 productores locales afectados por la crisis del COVID-19.',5.65,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',57),
(DEFAULT,'Grand McExtreme™ Double Bacon','Doble de bacon y carne, queso gouda, cebolla y salsa McBacon',6.80,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',57),
(DEFAULT,'CBO','Bacon, cebolla, lechuga y sabroso pollo supreme',5.65,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',57),
(DEFAULT,'Big Mac','Carne, pepinillos, lechuga, cebolla y queso',4.65,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',57),

(DEFAULT,'McMenú Mediano ASC Tenders 3 uds.','Deliciosas tiras de pollo crujiente',7.75,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',58),
(DEFAULT,'McRoyal Deluxe','Queso, tomate, mayonesa y lechuga',4.75,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',58),
(DEFAULT,'McWrap® Chicken & Bacon','Pollo, bacon, tomate, lechuga y mayonesa',5.65,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',58),
(DEFAULT,'9 McNuggets','Bocaditos de pollo rebozados con salsa a elegir',4.75,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',58),

(DEFAULT,'Hamburguesa','Deliciosa carne, cebolla y pepinillos',3.96,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',59),
(DEFAULT,'Hamburguesa con Queso','Deliciosa carne, cebolla, pepinillos y queso',3.95,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',59),
(DEFAULT,'4 McNuggets','Deliciosos bocaditos de pollo rebozado',3.95,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',59),
(DEFAULT,'Chicken Burger Kids','Delicioso pollo crujiente y kétchup',3.95,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',59),

(DEFAULT,'8 A.S.C. Tenders','8 tiras de pollo crujiente',12.35,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',60),
(DEFAULT,'McNuggets 25 Uds.','Delicioso pollo rebozado con salsa a elegir',10.20,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',60),
(DEFAULT,'Top Fries Bacon & Cheese para Compartir','Patatas con salsa de queso y bacon',4.20,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',60),
(DEFAULT,'4 Alitas','Alitas de pollo con sabor barbacoa',2.65,'1','mcdonald@gmail.com','https://fondosmil.com/fondo/17536.jpg',60),

 (DEFAULT,'Gyozas al Vapor de Cerdo y Verduras','https://fondosmil.com/fondo/17536.jpg',2.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',61),
(DEFAULT,'Gyozas al Vapor de Gambas','https://fondosmil.com/fondo/17536.jpg',3.50,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',61),
(DEFAULT,'Rollitos Primavera Vegetales','https://fondosmil.com/fondo/17536.jpg',2.75,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',61),
(DEFAULT,'Samosas','Pollo al curry.',2.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',61),

(DEFAULT,'Sopa de Ramen con Pollo','https://fondosmil.com/fondo/17536.jpg',4.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',62),
(DEFAULT,'Sopa de Ramen con Gambas','https://fondosmil.com/fondo/17536.jpg',4.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',62),
(DEFAULT,'Sopa de Ramen con Verduras','https://fondosmil.com/fondo/17536.jpg',4.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',62),

(DEFAULT,'Pollo Teriyaki','Pollo, salsa teriyaki y arroz.',5.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',63),
(DEFAULT,'Pollo al Curry','Pollo, salsa curry y arroz.',5.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',63),
(DEFAULT,'Ternera con Salsa de Soja','Ternera, verduras, salsa de soja y arroz.',6.95,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',63),

(DEFAULT,'Wok Normal','Escoge la base, combina ingredientes a tu gusto, escoge la salsa y el topping favorito.',5.20,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',64),
(DEFAULT,'Wok Pequeño','Escoge la base, combina ingredientes a tu gusto, escoge la salsa y el topping favorito.',4.20,'1','wok@gmail.com','https://fondosmil.com/fondo/17536.jpg',64),

 (DEFAULT,'Pato Pekin Con Hoisin. Pepino Cebollino','Ingredientes: White Gua Bao bun: (wheat flour, water, yeast). Peking Duck. Gua Bao Sauce: (peanut, sake, hoisin). Sriracha. Yellow pickled radish. Cucumber. Spring Onion. ',7.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',65),
(DEFAULT,'Panceta De Cerdo Con Hoisin Y Verduras',' Ingredientes: Pumpkin Gua Bao bun: (wheat flour, water, yeast, pumpkin). Pork Belly. Miso Mayonnaise: (mayonnaise, miso paste). Japanese Coleslaw: (carrot, cabbage, edamame soybean, miso paste, rice wine vinegar). Yellow Pickled Radish. Cucumber. Pork Crackling. Spring Onion. ',6.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',65),
(DEFAULT,'Dragón con Gambas ','Ingredientes: White Gua Bao bun: (wheat flour, water, yeast). Shrimp. Sweet & Sour Sauce: (vinegar, soy, ketchup). Spring onion. Pineapple. Cucumber. Seaweed. ',6.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',65),
(DEFAULT,'Pollo Crujiente con Boniato y salsa de Tamarindo','Ingredientes: Gua Bao: (wheat flour, water, yeast, pumpkin, bambou). Panko Chicken. Tofu. Mushroom. Tamarind chutney: (tamarind, chili, ketchup, sugar). Marinated Sweet Potato: (sweet potato, soy, sesame). Pickled Radish. Spring Onion. ',6.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',65),

(DEFAULT,'Tom Yam Kung. Picante Con Gambas Black Tiger Y Fideos De Arroz','Ingredientes: Tom Yam soup: (galanga, lime leaf, lemongrass, chili, roasted chili paste, lime). Straw mushrooms. Rice noodle. Shrimp. Coriander. ',15.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',66),
(DEFAULT,'Hanoi Pho Con Ternera. Fideos De Arroz. Especias Y Brotes De Soja ','Ingredientes: Phō soup: (beef, fish sauce, spices, ginger, water). Rice stick noodle. Onion, bean sprouts, Thai Basil, beef, lime, sriracha, hoisin. ',14.90,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',66),

(DEFAULT,'Pad Thai Con Gambas Black Tiger Y Fideos De Arroz','Ingredientes: Rice noodles. Egg. Shrimps. Leeks, Chinese garlic, Bean sprouts. Pad Thai sauce: (tamarind, soy, sugar). Fish sauce. Peanuts, lime. ',16.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',67),
(DEFAULT,'Pad Thai Con Pollo,Verduras y Fideos De Arroz ',' Ingredientes: Rice noodles. Egg. Chicken. Leeks, Chinese garlic, Bean sprouts. Pad Thai sauce: (tamarind, soy, sugar). Fish sauce. Peanuts, lime. ',15.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',67),
(DEFAULT,'Arroz Frito Con Pollo Y Huevo','Ingredientes: Egg. Jasmine rice. Chicken. Carrots, onion, mushroom, water chestnut, sweetcorn, long beans, raisin, spring onion. Soy sauce. Spring onion. ',12.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',67),
(DEFAULT,'Japchae de Ternera (Fideo Coreanos De Boniato)','Ingredientes: Beef. Korean sweet potato noodles. Bok choy, Carrots, Broccoli, Onion, Mushroom,White cabbage,Snow peas, leeks, Ginger. Soy sauce, Oyster sauce, Garlic, Sesame oil. Sesame seeds. Spring onion. ',15.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',67),

(DEFAULT,'Massaman De Ternera Y Coco ','Ingredientes: Massaman curry: ( Spices, shrimp paste, coconut, tamarind ). Beef. Bamboo strips. Sliced onion. Potato. Coriander. Fried onion. Peanut.',15.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',68),
(DEFAULT,'Curry Verde Thai Con Tofu','Ingredientes: Green curry: ( spices, shrimp paste, coconut ). Tofu. Bamboo. Gourget. Potato. Spring onion, chili, lime leaves.',15.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',68),
(DEFAULT,'Arroz Frito','Ingredientes: Jasmine rice, egg, soy sauce. ',2.50,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',68),
(DEFAULT,'Arroz Jazmin ','Ingredientes: Jasmine rice. ',2.00,'1','boabao@gmail.com','https://fondosmil.com/fondo/17536.jpg',68),


(DEFAULT,'Oferta 4€ Rollo de primavera( 3 piezas)','Oferta Rollo de primavera( 3 piezas). Relleno de carne de cerdo picada y verduras.',4.00,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',69),
(DEFAULT,'Oferta 5€ Empanadillas Fritas ( 12 piezas)','Oferta empanadillas fritas ( 12 piezas). Relleno de carne de cerdo picada y verduras. Incluye salsa de soja.',5.00,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',69),
(DEFAULT,'Oferta Combo Individual( 2 platos) + Bebida','Plato 1 ( arroz o tallarines) + plato 2 ( pollo o ternera) + bebida.',8.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',69),

(DEFAULT,'Sopa Agripicante','https://fondosmil.com/fondo/17536.jpg',3.15,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',70),
(DEFAULT,'Sopa Huevo con Tomate','https://fondosmil.com/fondo/17536.jpg',3.15,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',70),
(DEFAULT,'Sopa de Aleta de Tiburón','https://fondosmil.com/fondo/17536.jpg',3.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',70),
(DEFAULT,'Sopa de Mariscos','https://fondosmil.com/fondo/17536.jpg',2.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',70),

(DEFAULT,'Tallarines Tres Delicias','https://fondosmil.com/fondo/17536.jpg',4.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',71),
(DEFAULT,'Tallarines con Gambas','https://fondosmil.com/fondo/17536.jpg',5.65,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',71),
(DEFAULT,'Fideos de Arroz Tres Delicias','https://fondosmil.com/fondo/17536.jpg',5.75,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',71),
(DEFAULT,'Fideos de Arroz con Gambas','https://fondosmil.com/fondo/17536.jpg',5.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',71),

(DEFAULT,'Arroz Frito Tres Delicias','Arroz frito con ( jamón york, huevo, zanahoria y guisante).',4.50,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',72),
(DEFAULT,'Arroz Frito con Gambas','Arroz frito con ( gambas, huevo, zanahoria y guisante).',5.45,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',72),
(DEFAULT,'Arroz Especial de la Casa','Arroz frito con( gambas, ternera, huevo, jamón york, zanahoria, guisante, cangrejo y brotes de soja). *** Salteado con salsa de soja.',5.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',72),
(DEFAULT,'Arroz Frito con Pollo','Arroz frito con ( pollo, huevo, zanahoria y guisante).',4.95,'1','fulin@gmail.com','https://fondosmil.com/fondo/17536.jpg',72),

(DEFAULT,'MENU FESTIVAL DIM SUM','Wonton Frito (2u), Rollito de Primavera mixto (2u), Jiaozi de Gamba (2u), Jiaozi Vegetariano (2u), Siu Mai de Langostino y Vegetales (2u), Xiaolongbao de Cerdo (2u), Baozi de Cerdo (1u), Baozi de Setas (1u), Xiaolongbao de Chocolate (2u)',25.00,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',73),

(DEFAULT,'Xiao Long Bao de Cerdo ','4 unidades.',7.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',74),
(DEFAULT,'Jiaozi de Cerdo','4 unidades. Pueden hacerse al vapor o a la plancha. ',5.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',74),
(DEFAULT,'Jiaozi Gamba y Carne de Cerdo','4 unidades.Pueden hacerse al vapor o a la plancha. ',6.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',74),
(DEFAULT,'Dim Sum Surtido - Fu','Jiaozi gamba, Jiaozi Vegetariano, Jiaozi Sixi y Siu mai de langostino.',7.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',74),

(DEFAULT,'Edamame Jiaoyan','https://fondosmil.com/fondo/17536.jpg',4.50,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',75),
(DEFAULT,'Ensalada Fan ','https://fondosmil.com/fondo/17536.jpg',6.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',75),
(DEFAULT,'Pak Choi con Shitake','https://fondosmil.com/fondo/17536.jpg',6.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',75),
(DEFAULT,'Berenjena Estilo Yuxiang','https://fondosmil.com/fondo/17536.jpg',7.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',75),

(DEFAULT,'Noodles Salteados Vegetarianos','https://fondosmil.com/fondo/17536.jpg',8.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',76),
(DEFAULT,'Noodles Salteados de Gambas','https://fondosmil.com/fondo/17536.jpg',9.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',76),
(DEFAULT,'Noodles de Arroz Salteados con Gambas','https://fondosmil.com/fondo/17536.jpg',9.90,'1','fandimsum@gmail.com','https://fondosmil.com/fondo/17536.jpg',76),

 (DEFAULT,'Ramen de Soja','Fideos ramen con caldo de pollo, cerdo y marisco con salsa de soja.',11.20,'1','ramenya@gmail.com','https://verytastyblog.files.wordpress.com/2015/01/img_27021.jpg',77),
(DEFAULT,'Ramen de Miso','Fideos ramen con caldo de pollo y cerdo, con salsa de miso.',11.20,'1','ramenya@gmail.com','https://www.japanesecooking101.com/wp-content/uploads/2014/11/IMG_8397.jpg',77),
(DEFAULT,'Ramen de Mariscos','Fideos ramen con caldo de chirlas y cobertura de marisco del mediterráneo.',10.80,'1','ramenya@gmail.com','https://cdn2.momjunction.com/wp-content/uploads/2015/11/Ramen-Noodles-During-Pregnancy.jpg',77),

(DEFAULT,'Tsukemen','Fideos fríos con cha shu, bonito seco y lima. Comer mojando en una sopa con base de salsa de soja y naranja yuzu.',11.20,'1','ramenya@gmail.com','https://eatbook.sg/wp-content/uploads/2017/08/Tsukemen-sanpoutei.jpg',78),
(DEFAULT,'Hiyashi Chuka','Fideos ramen fríos con cha shu, pepino, tomate, brotes de soja y huevo, aliñado con una vinagreta refrescante. Hay opción vegetariana y vegana,',11.20,'1','ramenya@gmail.com','https://3.bp.blogspot.com/-ks_xb4H81i4/UjKf-x4I5VI/AAAAAAAACWg/czYfd2tPotc/s1600/Hiyashi+Chuka+Recipe+5.jpg',78),
(DEFAULT,'Hiyashi Chuka - Vegetariano','Fideos ramen fríos con tofu, pepino, tomate, brotes de soja y huevo, aliñado con una vinagreta refrescante. ',11.20,'1','ramenya@gmail.com','https://hirota.com.br/wp-content/uploads/2019/03/SHUCA-463x348.jpg',78),
(DEFAULT,'Hiyashi Chuka -Vegano-','Fideos ramen fríos con tofu, pepino, tomate, brotes de soja y rucóla, aliñado con una vinagreta refrescante. ',11.20,'1','ramenya@gmail.com','https://i.pinimg.com/736x/3c/47/c0/3c47c07e0a84e5b7dae8b74c49785735.jpg',78),

(DEFAULT,'Arroz Blanco','Bol de arroz blanco.',2.20,'1','ramenya@gmail.com','http://cookdiary.net/wp-content/uploads/images/Arroz-Blanco_15375.jpg',79),
(DEFAULT,'Cha Shu Don','Bol de arroz con panceta de cerdo guisada y cebolleta con salsa.',7.50,'1','ramenya@gmail.com','https://xlbcr.files.wordpress.com/2015/01/chagawker.jpg?w=1200',79),
(DEFAULT,'Cha shu don -Grande-','cha shu don con mas cantidad de arroz y carne',9.50,'1','ramenya@gmail.com','https://kachou.jp/wp-content/uploads/2014/01/201709_cha-shu-don-640x467.jpg',79),

(DEFAULT,'Onigiri de Pruna','Onigiri con ciruela encurtida.',3.90,'1','ramenya@gmail.com','https://janetskitchenlab.files.wordpress.com/2009/02/img_2197.jpg',80),
(DEFAULT,'Onigiri de Alga Kombu','Onigiri con kombu.',3.90,'1','ramenya@gmail.com','https://www.unagiapponeseincucina.com/wp-content/uploads/2020/06/IMG_0307.png',80),
(DEFAULT,'Onigiri de Cha Shu','Onigiri con panceta de cerdo guisada.',3.90,'1','ramenya@gmail.com','https://i1.wp.com/caliplate.com/wp-content/uploads/2016/04/onigiri_DSC_0064.jpg',80),

 (DEFAULT,'Fideos de Arroz con Verduras','Contiene: soja, huevo y gluten.',5.00,'1','kuyi@gmail.com','https://i.pinimg.com/originals/6d/96/b3/6d96b36283541a79168f37eda8b4ba9c.jpg',81),
(DEFAULT,'Yakisoba de Verduras','Contiene: soja, granos de sésamo, gluten, mostaza y lácteos.',5.00,'1','kuyi@gmail.com','https://i.ytimg.com/vi/LY9OTY9kFiA/maxresdefault.jpg',81),
(DEFAULT,'Yakiudon de Gamba','Contiene: soja, gluten, mostaza, lácteos, crustáceos y granos de sésamo.',5.50,'1','kuyi@gmail.com','https://vidazen.es/img/cms/yaki_udon.jpg',81),
(DEFAULT,'Yakimeshi de Gamba','Contiene: soja, huevos, crustáceos y granos de sésamo.',5.50,'1','kuyi@gmail.com','https://www.palaureial.es/wp-content/uploads/2018/10/yakimeshi-de-pollo-ok.jpg',81),

(DEFAULT,'Queso Frito','Contiene: gluten, soja, granos de sésamo, lácteos y huevos.',3.50,'1','kuyi@gmail.com','https://www.mycolombianrecipes.com/wp-content/uploads/2013/12/queso-frito-recipe.jpg',82),
(DEFAULT,'Tempura de Langostino','2 unidades. Contiene: gluten, soja y crustaceos.',3.50,'1','kuyi@gmail.com','http://elcocinerocasero.com/imagen/receta/1000/1000/2015-10-13-20-02/langostinos-en-tempura-con-mayonesa-de-lima.jpeg',82),
(DEFAULT,'Tempura de Verduras','Contiene: gluten y soja.',5.00,'1','kuyi@gmail.com','https://i.ytimg.com/vi/hZW2pwROsdQ/maxresdefault.jpg',82),
(DEFAULT,'Tempura de Pollo con Almendra','Contiene: gluten y frutos secos. ',4.50,'1','kuyi@gmail.com','https://sites.google.com/site/recetasdepescadosymariscos/_/rsrc/1249331981799/recetas/tempura-de-salmon/TEMPURADESALMON.jpg',82),

(DEFAULT,'Teppan Hotate','Vieira a la plancha. Contiene: gluten, soja y moluscos. ',4.50,'1','kuyi@gmail.com','https://i0.wp.com/www.disneytouristblog.com/wp-content/uploads/2018/03/teppan-edo-japan-epcot-restaurant-disney-world-472.jpg?ssl=1',83),
(DEFAULT,'Tataki Salmón ','Salmón asado. Contiene: gluten, soja y pescado.',4.50,'1','kuyi@gmail.com','https://clubandresortbusiness.com/wp-content/uploads/2016/10/IMG_4413.jpg',83),
(DEFAULT,'Teppan Salmón ','Salmón a la plancha.Contiene: gluten, soja y pescado.',4.50,'1','kuyi@gmail.com','https://4.bp.blogspot.com/-YilG9WWzGy0/Ubp-f5nrFYI/AAAAAAAAdgE/y6r4_qICEOk/s1600/1009519_462789153815844_1367186510_o.jpg',83),
(DEFAULT,'Teppan Asuparagasu','Esparrago a la plancha. Contiene: gluten y soja.',3.90,'1','kuyi@gmail.com','http://leapple-klcc.com.my/wp-content/uploads/2015/03/Rokko-Dishes-70-03.jpg',83),

(DEFAULT,'Tempura Sake Maki','Hosomaki de salmón rebozado. 8 unidades. Contiene: pescado, gluten y huevos.',4.50,'1','kuyi@gmail.com','https://i.pinimg.com/originals/e8/b6/db/e8b6db1a2fbf1207ab3112dd363976b4.jpg',84),
(DEFAULT,'Sake Maki ','Hosomaki de salmón. 8Udidades.Contiene:Pescado ',3.50,'1','kuyi@gmail.com','https://www.sushi-izumi.de/data/multiposts/Maki/Sake%20Maki_0.png',84),
(DEFAULT,'Leon Maki',' Maki de salmón, atún y aguacate, Rebozado ,con salsa Teriyaki,Mayonesa. 5 unidades.Contiene pescado, gluten, lácteos, soja, huevos y sésamo.',4.20,'1','kuyi@gmail.com','https://i.pinimg.com/736x/dd/eb/c4/ddebc476ea11b58747f9bfee3d5b58dd.jpg',84),
(DEFAULT,'Gu Maki','5 unidades, Uramaki de atún, salmón, aguacate con tobiko naranja encima. Contiene: pescado.',4.20,'1','kuyi@gmail.com','https://restaurantewokshanghai.com/wp-content/uploads/2020/05/uramaki-salmon-y-aguacate.jpg',84),

 (DEFAULT,'Yakisoba grande','https://fondosmil.com/fondo/17536.jpg',6.90,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',85),
(DEFAULT,'Ramen','https://fondosmil.com/fondo/17536.jpg',7.60,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',85),
(DEFAULT,'Arroz Tonkatsu','https://fondosmil.com/fondo/17536.jpg',7.90,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',85),
(DEFAULT,'Pad Thai ','https://fondosmil.com/fondo/17536.jpg',8.20,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',85),

(DEFAULT,'Roll de salmón y aguacate','https://fondosmil.com/fondo/17536.jpg',6.10,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',86),
(DEFAULT,'Hot Crispy Salmon','https://fondosmil.com/fondo/17536.jpg',9.40,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',86),
(DEFAULT,'Roll de atún y aguacate','https://fondosmil.com/fondo/17536.jpg',6.40,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',86),
(DEFAULT,'Ebi Tempura Roll','https://fondosmil.com/fondo/17536.jpg',9.10,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',86),

(DEFAULT,'Anguila Teriyaki Roll','https://fondosmil.com/fondo/17536.jpg',11.00,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',87),
(DEFAULT,'Roll X','https://fondosmil.com/fondo/17536.jpg',10.50,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',87),
(DEFAULT,'Sibarita roll','https://fondosmil.com/fondo/17536.jpg',11.60,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',87),
(DEFAULT,'Salmon Chicken Roll','https://fondosmil.com/fondo/17536.jpg',11.00,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',87),

(DEFAULT,'Nigiri de salmón','Nigiri de salmón flameado',1.90,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',88),
(DEFAULT,'Nigiri de atún','Nigiri de salmón flameado',2.10,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',88),
(DEFAULT,'Sashimi de atún','Nigiri de salmón flameado',12.00,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',88),
(DEFAULT,'Nigiri de salmón flameado','Nigiri de salmón flameado',2.20,'1','telemaki@gmail.com','https://fondosmil.com/fondo/17536.jpg',88),

 (DEFAULT,'Súper Niu','Doble de ha b ecologica ,doble bacon,doble cebolla caramelizada',14.75,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',89),
(DEFAULT,'Súper PATA NEGRA','Dos hamburguesas,doble de brie y jamón ibérico ',19.50,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',89),
(DEFAULT,'La super Niu','doble de hamburguesa,doble de jamon iberico,doble de queso brie',18.50,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',89),
(DEFAULT,'la super BBQ NIU','doble hamburguesa,doble queso cheddlar y salsa barbacoa',14.90,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',89),

(DEFAULT,'Hamburguesa menorquina ','Hamburguesa ecologica ,con queso edam y sobrasada D.O menorquina ',8.90,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',90),
(DEFAULT,'Hamburguesa con queso parmesano','hamburguesa ecologica con cebolla caramelizada y queso parmesano',8.90,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',90),
(DEFAULT,'Hamburguesa con queso de cabra y arandanos','expectacular combinacion de hamburguesa ecologica con cebolla caramelizada,queso ce cabra y mermelada de arandanos',10.50,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',90),
(DEFAULT,'Hamburguesa Pata Negra','hamburguesa ecologica con jamon iberico y queso brie',15.00,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',90),

(DEFAULT,'Hamburguesa Rossini','hamburguesa ecologica del pirineo con escalopa de foie a la plancha con reduccion de pedro ximenez',16.50,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',91),
(DEFAULT,'Hamburguesa Super Rossini & Gourmet(con coulant de chocolate de regalo)','hamburguesa ecologica del pirineo con escalopa de foie a la plancha con reduccion de pedro ximenez y salteado de setas ',19.80,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',91),
(DEFAULT,'Hamburguesa Pata Negra Gourmet i Gourmet(con coulant de chocolate de regalo)','hamburguesa ecologica del pirineo con jamon iberico y escalopa de foie con reduccion de pedro ximenez ',19.80,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',91),
(DEFAULT,'Hamburguesa Pata Negra Gourmet Plus(con coulant de chocolate de regalo)','Hamburguesa ecologica del pirineo con escalopa de foie y reduccion de Pedro Ximenez ,queso brie ',19.80,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',91),

(DEFAULT,'Butifarra del perol','Butifarra elaborada de manera tradicional',7.90,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',92),
(DEFAULT,'Menorquín','Con sobrasada menorquina',7.50,'1','burgerniu@gmail.com','https://fondosmil.com/fondo/17536.jpg',92),

 (DEFAULT,'TGB Burguer','Hamburguesa con carne 100% vacuno, queso americano, bacon, tomate, lechuga y salsa TGB.',5.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',93),
(DEFAULT,'BBQ Burger','Hamburguesa con carne 100% vacuno, bacon, aros de cebolla y salsa BBQ. ',5.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',93),
(DEFAULT,'Hamburguesa con carne 100% vacuno, bacon, aros de cebolla y salsa BBQ. ','Carne deshilachada de cerdo, aros de cebolla y salsa BBQ.',5.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',93),
(DEFAULT,'Hamburguesa Pollo Crunchy','Pechuga de pollo crujiente, queso americano, tomate, lechuga y mayonesa.',6.00,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',93),


(DEFAULT,'Blue Mountain Burger','Hamburguesa con carne de vacuno, queso gorgonzola, bacon, cebolla caramelizada, rúcula y mostaza horseradish.',7.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',94),
(DEFAULT,'50 Shades Burger','Hamburguesa con carne de vacuno, pulled Pork, queso americano, bacon, aros de cebolla y salsa BBQ.',7.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',94),
(DEFAULT,'Truffle Burger','Hamburguesa con carne 100% vacuno, lechuga, cebolla caramelizada, queso provolone, champiñón y salsa de mayonesa trufa.',7.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',94),
(DEFAULT,'Cheese Lovers Burger ','Pan xl, mantequilla, carne xl,  queso loncha,  queso cabra, gorgonzola, cebolla caramelizada, rúcula y mostaza mil. ',7.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',94),

(DEFAULT,'Tennessee Burger','Pan XL - mantequilla. TAPA: lechuga. BASE: carne XL - queso americano - panceta (2) - salsa bourbon',8.00,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',95),
(DEFAULT,'Gringa Burger','Pan XL - mantequilla. TAPA: mahonesa - lechuga - tomate (2). BASE: carne XL - queso americano - chilli carne - guacamole',8.00,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',95),


(DEFAULT,'Jumbo Clásico','Salchicha de vacuno, ketchup y mostaza',4.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',96),
(DEFAULT,'Jumbo California','Salchicha de vacuno, Bacon y Salsa Cheddar',4.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',96),
(DEFAULT,'Jumbo Arizona',' Salchicha de vacuno, Aros de cebolla y Salsa BBQ',4.50,'1','tgb@gmail.com','https://fondosmil.com/fondo/17536.jpg',96),

 (DEFAULT,'Combo Individual','Healthy Bowl + Bebida',9.90,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',97),
(DEFAULT,'Combo Pareja','2 Healthy Bowls + 2 Bebidas',14.90,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',97),
(DEFAULT,'Combo para 3','3 Healthy Bowls + 3 Bebidas',19.90,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',97),

(DEFAULT,'Buddha Bowl','Kale, Quinoa, Garbanzos, Aguacate, Boniato al horno, Espagueti de calabacín, Tomates cherry y Semillas de sésamo',8.40,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',98),
(DEFAULT,'Veggie Actress','Arroz integral, Pasta integral, Boniato al horno, Hummus, Garbanzos, Tomates cherry y Semillas de sésamo',8.40,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',98),
(DEFAULT,'Magic Heura','Espinacas baby, pasta integral, Heura, hummus, boniato al horno, espagueti de zanahoria y semillas de calabaza',8.90,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',98),
(DEFAULT,'Detox Bowl','Canónigos, Espinacas baby, Hummus, Quinoa, Espagueti de calabacín, Espaguetis de zanahoria, Semillas de sésamo y Semillas de chía',7.90,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',98),

(DEFAULT,'Agua EnCaja Mejor (33 cl.)','https://fondosmil.com/fondo/17536.jpg',1.60,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',99),
(DEFAULT,'ChariTea Mate (33 cl.)','https://fondosmil.com/fondo/17536.jpg',2.60,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',99),
(DEFAULT,'ChariTea Red (33 cl.)','https://fondosmil.com/fondo/17536.jpg',2.60,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',99),
(DEFAULT,'Vitae Kombucha de limón y jengibre (25 cl.)','https://fondosmil.com/fondo/17536.jpg',3.30,'1','mrgreensalad@gmail.com','https://fondosmil.com/fondo/17536.jpg',99),

 (DEFAULT,'Ensalada Kani','Algas wakame, cangrejo, sésamo y mayo sriracha.',3.55,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',100),
(DEFAULT,'Sexy Nachos','Deliciosos nachos cubiertos de spicy tuna y aguacate!',6.95,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',100),
(DEFAULT,'Gyozas de Cerdo','5 unidades. Cerdo y col acompañadas con salsa de ciruela.',5.15,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',100),
(DEFAULT,'Gyozas Veganas','Veganas acompañadas con salsa yakiniku elaborada a base de soja, miso y ajo.',5.15,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',100),

(DEFAULT,'Peas Please','Base de arroz, Salmón/Miso Cítrico, Wakame, Brotes de Soja, Rábano, Aguacate, Piña Mango, Mayo Sirracha, Goma Soba, Cebolla Crujiente, Wasabi Peas, Sésamo',10.95,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',101),
(DEFAULT,'Chick Chick! ','Base: Arroz y Quinoa. Proteina: Pollo teryiaki Complementos: Tomates en Soja/ Zanahoria/ Brotes de soja/ Cebolla tierna japonesa Salsas: Salsa teryiaki/ Salsa piña y miso Toques finales: Semillas de sésamo y cacahuetes.',10.95,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',101),
(DEFAULT,'GambYum! ','Base: Fideos soba Proteina: Tartar de gambas/ Atún marinado en soja Complementos: Edamames/ Cebolla roja/ Kimchi de pepino Salsas: Ponzu/ Mayo siracha Toques finales: Alga nori/masago',10.95,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',101),
(DEFAULT,'Vegan Si ','Base: Arroz venere Proteina: Heura marianda en soja y sesamo. Complementos: Tomates en soja/ Brotes de soja/ Aguacate/ Setas Shitake/ Cebolla tierna japonesa. Salsas: Salsa teryiaki Toques finales: Dukkah asiático/ Wakame crujiente.',10.95,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',101),

(DEFAULT,'Poke Mediano','Elige 1 o 2 bases, 1 o 2 proteínas, 1 marinado, hasta 6 acompañantes, 1 espuma, 1 salsa y 1, 2 o 3 toques finales.',11.45,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',102),
(DEFAULT,'Poke Grande','Elige 1 o 2 bases, 1, 2 o 3 proteínas, 1 marinado, 7 acompañantes máximo, 1 espuma, 1 salsa y 1, 2, 3, 4 o 5 toques finales.',14.45,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',102),

(DEFAULT,'Combo para 2','https://fondosmil.com/fondo/17536.jpg',33.00,'1','pokesi@gmail.com','https://fondosmil.com/fondo/17536.jpg',103),

 (DEFAULT,'Rio Açaí Bowl','Açaí orgánico, plátano, zumo de manzana "cold press", home made granola, plátano, fresa, bayas de goji y coco.',8.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',104),
(DEFAULT,'Pink Dragon Bowl','Pitaya, mango, frambuesa, leche de almendras, hojuelas de coco y fruta.',10.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',104),
(DEFAULT,'Pure Coconut Bowl','Pulpa de coco, plátano, granola y fruta.',9.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',104),
(DEFAULT,'Blue Marmaid','Pulpa de coco orgánica, plátano, espirulina azul, chips de coco, arándanos y frambuesa liofilizada. ',10.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',104),

(DEFAULT,'Avocado Toast','Tostada de pan con mash de aguacate.',5.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',105),
(DEFAULT,'Sweet Toast','Crea tu propia combinación. Crema: cacahuate o Nutella vegana. Fruta: plátano o fresa. Topping: nibs de cacao o crunchy de almendra.',6.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',105),
(DEFAULT,'Penaut & Jelly Toast','Tostada de pan con mantequilla de cacahuete y homemade mermelada.',6.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',105),
(DEFAULT,'Antipasti Toast','Tostadas de pan con berenjenas encurtidas, tomates cherries asados y mozzarella vegana casera.',5.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',105),

(DEFAULT,'Carrot Cake Cashews Cream','Vegano.',5.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',106),
(DEFAULT,'Azuki Brownie','https://fondosmil.com/fondo/17536.jpg',5.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',106),
(DEFAULT,'Raw Oreo','Vegano, sin gluten, crudivegano y sin azúcar.',3.00,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',106),
(DEFAULT,'Choco-Chip Cookie','Galleta de harina integral y avena con pepitas de chocolate. ',3.00,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',106),

(DEFAULT,'Smoothie Shine On','Banana, mango, semillas de chia, fruta de la pasión, espinacas, mesquite, extracto de vainilla y leche vegetal. ',6.96,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',107),
(DEFAULT,'Smoothie Greenie','Kale, espinacas, pepino, espirulina, banana, dátiles, nueces de brasil, agua alcalina. ',6.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',107),
(DEFAULT,'Smoothie Coco-Nana','Carne de coco joven, banana, mesquite, canela, miel raw, chips de coco y leche vegetal.',6.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',107),
(DEFAULT,'Smoothie PeanutButter Fix','Mantequilla de cacahuete, banana, cacao nibs, carne de coco joven, semillas de chia y leche vegetal.',6.95,'1','greenberry@gmail.com','https://fondosmil.com/fondo/17536.jpg',107),

 (DEFAULT,'Maoz de Falafel','Pan de pita, 5 croquetas de falafel, 3 ensaladas al gusto y una salsa a escoger.',6.90,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',108),
(DEFAULT,'Maoz sin Gluten','5 croquetas de falafel, 4 ensaladas al gusto y una salsa a escoger.',6.90,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',108),
(DEFAULT,'Menú de Maoz','Pan de pita, 5 croquetas de falafel, 3 ensaladas al gusto, una porción de patatas caseras, una salsa a escoger y una bebida.',10.80,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',108),
(DEFAULT,'Croquetas de Falafel','Ración de 5 croquetas de falafel.',2.50,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',108),

(DEFAULT,'Agua Mineral','0.5 litros.',0.50,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',109),
(DEFAULT,'Coca-Cola','0.33 litros.',2.00,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',109),
(DEFAULT,'Fanta Naranja','0.33 litros.',2.00,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',109),
(DEFAULT,'Sprite','0.33 litros.',2.00,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',109),

(DEFAULT,'Cerveza Estrella Damm','0.33 litros.',2.00,'1','maoz@gmail.com','https://fondosmil.com/fondo/17536.jpg',110),

 (DEFAULT,'Combo Básico','Una empanada más una bebida.',4.25,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',111),
(DEFAULT,'Combo Personal (2 muns)','2 empanadas, más 1 bebida. ¡Un combo para que disfrutes!.',6.00,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',111),
(DEFAULT,'Combo Veggie','2 empanadas veggies más bebida. ¡Ideal para los veggie lovers!',6.00,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',111),
(DEFAULT,'Combo Vegano','2 empanadas veganas más 1 bebida. ¡Una deliciosa opción vegana para que disfrutes!.',8.50,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',111),

(DEFAULT,'Jamón y Queso','Jamón cocido y hebras de queso mozzarella ¡Porque lo clásico nunca pasa de moda!. Ham and mozzarella cheese. Classic never goes out of fashion!',2.50,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',112),
(DEFAULT,'Ternera Suave','Solomillo de ternera cocinado a fuego lento, cebolla cortada en cubos, trocitos de huevo, y especias. ¡Para los fanáticos de la carne! Slow cooked beef, onion cubes, pieces of egg and species. ¡For meat lovers!',3.30,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',112),
(DEFAULT,'Espinacas y Emmental','Espinacas frescas, salsa bechamel y queso emmental ¡Disfruta de esta muns vegetariana tan sabrosa! Fresh spinach, béchamel sauce and emmental cheese. Enjoy this tasty vegetarian muns!',2.50,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',112),
(DEFAULT,'Tomate y Albahaca','Tomate maduro, albahaca fresca y queso mozzarella ¡Fresca, vegetariana y sabrosa!. Mature tomato, fresh basil and mozzarella cheese. ¡Fresh, veggie and tasty!',2.95,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',112),

(DEFAULT,'Cebolla Caramelizada','"Cebolla caramelizada, queso de cabra y nueces crujientes ¡Irrestistible!. Caramelized onion, goat cheese and walnuts.¡Irrestistible! "',2.95,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',113),
(DEFAULT,'Pollo al Curry','Pechuga de pollo grillada y jugosa, cebolla salteada, especies y curry. ¡Un toque suave y exótico al paladar! Grilled and juicy chicken breast, sautéed onion, spices and curry. A soft and exotic touch to the palate!',3.30,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',113),
(DEFAULT,'Pollo Thai','Pechuga de pollo grillada, cebolla salteada, crema de coco, curry verde y jengibre. ¡Un sabor asiático, con un toque picante! Grilled chicken breast, sautéed onion, coconut cream, green curry and ginger. An Asian flavor, with a spicy touch!',3.50,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',113),
(DEFAULT,'Heura','Heura salteado, cebolla cortada a cuchillo, cilantro fresco, salsa mole, crema de cacahuetes, y kale crujiente. ¡Nuestra especial vegana!. Vegetable soy meat, grilled onion, fresh coriander, mole sauce, peanut butter, and crispy kale. Our special vegan!',3.90,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',113),

(DEFAULT,'Olivada y Mozzarella','Olivas, mozzarella, huevo duro y aceite de oliva ¡Un sabor vegetariano y mediterráneo!. Olives, mozzarella cheese, boiled egg and olive oil ¡A veggie and mediterranean flavour!',2.75,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',114),
(DEFAULT,'Tomate Seco y Provolone','Queso provolone, cebolla salteada, pesto de orégano y tomates secos. ¡Un sabor típico italiano!. Provolone cheese, sautéed onion, oregano pesto, dried tomatoes. A typical Italian flavor!',2.95,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',114),
(DEFAULT,'Setas Camembert','Mix de setas, crema de queso camembert elaborada en nuestro obrador, y ciboulette para darle un toque final exquisito! Mushroom mix, homemade camembert cream cheese, and a ciboulette touch!',3.50,'1','muns@gmail.com','https://fondosmil.com/fondo/17536.jpg',114),

 (DEFAULT,'Guateque','Caja con 12 teques + 2 salsas (Emulsión de ron y 50 Goiko)',14.90,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',115),

(DEFAULT,'Crispy Chicken Wings','7 Alitas de pollo rebozadas a la perfección, con bacon bits, cebolla morada y salsa 50.',9.40,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',116),
(DEFAULT,'Nachos 2.0','Nachos bañados en chili con carne, queso fundido (Enquésame Goiko), guacamole, nata agria, tomate picado y jalapeños.',12.40,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',116),
(DEFAULT,'Teques','Tradición venezolana. Palitos fritos rellenos de queso derretido acompañados de la salsa de la casa.',8.90,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',116),
(DEFAULT,'Tri Loaded Reloaded (Media)','3 Fat Rings (aros de gouda y bacon), 2 chicken tenders y 2 teques.',9.90,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',116),

(DEFAULT,'Chiliraptor','Carne mezclada con chili (sin picante), queso americano, guacamole y salsa chipotle.',13.90,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',117),
(DEFAULT,'Bomba Sexy','Queso Monterrey Jack empanado, setas fritas, bacon, salsa Mayo Ahumada y lechuga batavia.',13.40,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',117),
(DEFAULT,'La DeliDeli','Queso de cabra a la plancha, tiras de bacon, cebolla morada, cebolla crunchy, setas fritas, lechuga batavía y salsa 50 de Goiko.',14.40,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',117),
(DEFAULT,'Kendall Bacon','Carne picada y mezclada con queso de cabra, queso americano, bacon bits y cebolla caramelizada.',13.40,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',117),

(DEFAULT,'Thai Chicken','Pollo marinado y vegetales a la plancha, arroz salvaje, espinacas, semillas de sésamo y salsa teriyaki.',11.90,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',118),
(DEFAULT,'César','Pollo empanado, queso parmesano, lechuga, canónigos, croutones y salsa César de la casa.',11.40,'1','goiko@gmail.com','https://fondosmil.com/fondo/17536.jpg',118),

 (DEFAULT,'Menu Papadia','Papadia (Cualquier sabor) + ½ Ración (Pechuguitas o Alitas) + Bebida 0,5ml 10,50€',9.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',119),
(DEFAULT,'Combo Pizza Mediana','1 pizza mediana + 1 entrante + 1 bebidas 500ml',20.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',119),
(DEFAULT,'Combo Pizza Grande','1 pizza grande + 1 entrante + 1 bebida 1L',22.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',119),

(DEFAULT,'Papadia Philly Cheese Steak','Salsa ranch de base, delicioso Philly Steak, cebolla, pimiento verde, queso mozzarella y mezcla de 5 quesos.',6.50,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',120),
(DEFAULT,'Papadia Pollo Barbacoa','Deliciosa salsa barbacoa con bacon, pollo, cebolla fresca y queso mozzarella.',6.50,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',120),
(DEFAULT,'Papadia Especial de John','Salsa de tomate natural, mezcla 5 quesos, pepperoni, carne de cerdo especiada y queso mozzarella.',6.50,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',120),
(DEFAULT,'Papadia Vegetariana','Nueva salsa ranch, cebolla fresca, pimiento verde, champiñones portobello y queso mozzarella.',6.50,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',120),

(DEFAULT,'Philly Cheese Steak ','Salsa ranch de base, delicioso Philly Steak, cebolla, pimiento verde, queso mozzarella y mezcla de 5 quesos',15.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',121),
(DEFAULT,'Supercheese','Salsa de tomate natural, mozzarella, mezcla 5 quesos, queso azul, queso de cabra y especias italianas.',15.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',121),
(DEFAULT,'6 Quesos','Salsa de tomate natural, mezcla de seis quesos (provolone, parmesano, romano, fontina, asiago y mozzarella) y un toque de especias italianas.',13.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',121),
(DEFAULT,'Vegetariana','Salsa de tomate natural, cebolla fresca, pimiento verde, Champiñones portobello, aceitunas negras, rodajas de tomate fresco y queso mozzarella. Todas las pizzas Incluyen un Pepperonccini y una salsa de ajo.',14.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',121),

(DEFAULT,'Personaliza tu Pizza 3 Ingredientes','Pizza 3 Ingredientes',13.95,'1','papajohns@gmail.com','https://fondosmil.com/fondo/17536.jpg',122),

 (DEFAULT,'Hideout Burger','Smashburger, queso, bacon, pepinillos y Salsa Hideout',7.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',123),
(DEFAULT,'Say, Cheese!','Doble smashburger con un montón de nuestra salsa casera de queso fundido y trocitos de bacon.',9.90,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',123),
(DEFAULT,'Sunny Barcelona','Smashburger, queso, huevo estrellado y mayonesa casera',6.90,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',123),
(DEFAULT,'First Love','Smashburger, queso y mayonesa casera',5.90,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',123),

(DEFAULT,'Bacon Cheese Fries','Patatas fritas caseras cubiertas con nuestra salsa de queso fundido y trocitos de bacon',5.00,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',124),
(DEFAULT,'Bravas Loucas','Nuestra versión de las bravas. Patatas fritas caseras cubiertas com nuestra Carne Louca, alioli y aceite picante.',5.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',124),
(DEFAULT,'Crispy Onion','Cebolla cortada finita y rebozada servida con nuestra salsa Hideout',3.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',124),
(DEFAULT,'Bolinhos de Arroz','Nuestras deliciosas croquetas de arroz brasileñas',3.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',124),

(DEFAULT,'Coca-Cola Zero','33 cl.',2.20,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',125),
(DEFAULT,'Coca-Cola','33 cl.',2.20,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',125),
(DEFAULT,'Aquarius Limón','33 cl.',2.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',125),
(DEFAULT,'Té frio con lima','Mate Limão brasileño',3.20,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',125),

(DEFAULT,'Clara','https://fondosmil.com/fondo/17536.jpg',2.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',126),
(DEFAULT,'Estrella Galicia 0.0%','https://fondosmil.com/fondo/17536.jpg',2.50,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',126),
(DEFAULT,'Corona 35.5cl','https://fondosmil.com/fondo/17536.jpg',2.95,'1','hideoutburger@gmail.com','https://fondosmil.com/fondo/17536.jpg',126),

 (DEFAULT,'Papadum/Papad','Pan crujiente de harina de garbanzo. ',2.00,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',127),
(DEFAULT,'Sopa de pollo/Chicken Soup','Sopa de pollo con nata y especies de la casa. ',4.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',127),
(DEFAULT,'Sopa de Legumbre/Daal Soup','Sopa de lentejas con nata y especies. ',4.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',127),
(DEFAULT,'Sopa de Verduras/Vegetables Soup','Sopa de verduras julienne con especies de la casa. ',4.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',127),

(DEFAULT,'Ensalada Royal/Royal Salad','Ensalada con pepino, zanahoria, tomate, cebolla roja, oliva y queso fresco. ',6.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',128),
(DEFAULT,'Samosa 2 Unidades','Empanadas crujientes rellenas con patatas, cebollas y frutos secos. ',4.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',128),
(DEFAULT,'Pollo Pakora/Chicken Pakora','Pechuga de pollo frito rebozados con harina de garbanzo. ',5.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',128),
(DEFAULT,'Alitas de Pollo/Chicken Wings Spicy','Alas de pollo al horno marinado con especies. ',5.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',128),

(DEFAULT,'Alu Dum','Patas bravas picantes estilo nepalés. Picante. ',4.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',129),
(DEFAULT,'Thukpa','Sopa de fideos nepalés con verduras julienne. ',7.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',129),
(DEFAULT,'Chowmein','Salteadas de tallarines y verduras con soja. ',7.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',129),
(DEFAULT,'Royal Sekuwa','Dados de cordero asado con salteadas de verduras frescas. Picante. ',8.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',129),

(DEFAULT,'Pollo Malai Tikka/Chicken Malai Tikka','Brochetas de pollo marinado con yogurt y masalas. ',11.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',130),
(DEFAULT,'Pollo Tandoori/Chicken Tandoori','Muslos de pollo al horno tandoor. ',12.50,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',130),
(DEFAULT,'Royal Cordero Koseli','Dados de cordero asado al tandoor servidos con verduras salteadas. ',12.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',130),
(DEFAULT,'Mixed Grill','Platos de degustación con pollo tikka, cordero tikka, pollo tandoori y seekh kebab. ',13.95,'1','royalnepal@gmail.com','https://fondosmil.com/fondo/17536.jpg',130),

 (DEFAULT,'Curry suave con verduras','Curry amarillo estilo thai acompañado de arroz y vegetales con tofu, langostinos, ternera, pato o pollo. El curry suave, como su nombre indica, es picante pero solo un poco, para darle vida al plato y notar ese punto picante que tanto te gusta. ¡Pídelo con pollo, con ternera o langostinos, sea como sea, es un plato delicioso!',10.40,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',131),
(DEFAULT,'Curry massaman con verduras','Curry massaman estilo thai acompañado de arroz y vegetales con tofu, langostinos, ternera, pato o pollo. Esta versión del curry es cero picante por lo que si quieres saborear el mejor curry pero no te gusta el picante, esta es tu opción. Nuestra receta secreta con toque de cacahuete te encantará. ¿A qué esperas para probarlo?    ',10.40,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',131),
(DEFAULT,'Curry verde con verduras','Curry verde estilo thai acompañado con arroz y vegetales con tofu, langostinos, ternera, pato o pollo. La versión más picante de todos los curries, para los que os gustan las emociones fuertes. Pídelo y prepárate para transportarte a la Tailandia más auténtica, un sabor inconfundible que te llevará en cada cucharada a recordar los sabores más típicos de la cocina Thai.',10.40,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',131),
(DEFAULT,'Curry rojo con verduras','Curry rojo estilo thai acompañado con arroz y vegetales con tofu, langostinos, ternera, pato o pollo. El curry rojo es un plato picante, para los que les gusta sentir con fuerza el sabor del curry thai más tradicional. Pídelo y prepárate para un sabor intenso y auténtico.',10.40,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',131),

(DEFAULT,'Jiaozi Vegetal','(5 u.) Ravioli relleno de vegetales a la plancha. Las Jiaozi más típicas, como las de siempre pero ahora totalmente vegetales. Muchos nos las habéis pedido y aquí las tenéis, para los amantes de las Jiaozi que queréis o preferís comer vegetariano o vegano. Como siempre te las cocinamos al momento para que te lleguen a casa recién hechas y listas para disfrutar.',7.10,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',132),
(DEFAULT,'Ha kao de langostinos','(5 u.) Dim sum relleno de cola de langostino y puntas de bambú  al vapor. Otra versión de dim sum parecida al Siu mai pero con otro plegado y otra masa aún más suave, para darle si cabe mas delicadeza a la combinación de langostinos y puntas de bambú. Si te gustan los sabores delicados esta es sin duda tu opción.',9.20,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',132),
(DEFAULT,'Rollito Nem de pollo','(4 u.) Rollito estilo vietnam de pollo y fideos transparentes. Un plato muy típico de la cocina vietnamita, este plato gusta también mucho a los pequeños de la casa por la facilidad a la hora de comerlo con las manos así como su sabor agradable que le confiere el pollo y los fideos transparentes. Lo acompañamos con una salsa agridulce que combina muy bien con este plato tan típico y tradicional.',6.80,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',132),
(DEFAULT,'Jiaozi crujiente','(5 u.) Ravioli crujiente de pollo y verduras. Cocinamos y creamos este dim sum con la idea de que fuera un plato que gustara a todos y fuera muy saludable. Esta opción es perfecta si tenemos niños en casa ya que les encanta por sus ingredientes ya conocidos, pollo y verduras para los  más queridos de la casa.',8.00,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',132),

(DEFAULT,'Edamame spicy','Vainas de soja fritas picantes con sal maldon. El edamame es sin duda un plato ideal para compartir, están deliciosos al toque de sal pero aquí te lo preparamos con nuestra combinación spicy secreta. Si quieres darle un toque a tu pedido este plato es un muy buen acompañante.',4.70,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',133),
(DEFAULT,'Satay Kai','(2 u.) Brocheta de pollo con salsa de tamarindo y cacahuetes. Usamos el mejor pollo del mercado para preparar una a una las brochetas Satay Kai de forma casera. Te lo servimos con nuestra receta de salsa de tamarindo especial. ¡Un plato 100% casero que te encantará!',6.80,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',133),
(DEFAULT,'Rollitos de pollo al curry','(4 u.) Rollito relleno de pollo con salsa de curry amarillo. Este plato esta en el top 10 más demandado por nuestros clientes. A base de pollo de primera calidad y curry amarillo esta receta es un a de la preferidas para muchos. ¡Pruébalos y verás como te unes al club del rollito!',6.80,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',133),
(DEFAULT,'Karaage','(4 u.) Pollo marinado con textura crujiente al estilo japonés. El tori no karaage o pollo frito marinado al estilo japonés es uno de los platos más apreciados y disfrutados por los japoneses en las fiestas populares (matsuri) aunque también se come en casa o en la izakayacomo aperitivo (con una buena cerveza fresquista está ideal), en los obento o comida para llevar o en casa como plato principal. Si lo pruebas no te arrepentirás.',8.30,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',133),

(DEFAULT,'Udon','Fideo grueso salteado con verduras estilo japonés y ligeramente picante. Este fideo típico de la región de japón que como todos sabéis, puso de moda el monje budista Kukai en el siglo VIII al importarlo desde china, se diferencian del resto por su grosor, el cual les otorga una textura muy agradable al paladar. Nosotros lo cocinamos al puro estilo japonés con un toque muy personal y algo de picante. ¿Te animas a probarlos?',10.90,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',134),
(DEFAULT,'Yakisoba','Fideos estilo japonés salteados con verduras . Es un plato que no necesita presentación. Es un plato muy típico japonés que aquí en Boko cocinamos con nuestro toque especial. ¡Si lo pides seguro que no te dejara indiferente!',9.70,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',134),
(DEFAULT,'Pad Thai','Tallarines de arroz estilo Thai salteados con tofu, pollo o langostinos y huevo, cacahuetes y salsa de tamarindo. Este plato es sin duda uno de los top tres de los más solicitados por nuestros clientes. Es un plato con influencias de la cocina china que con el tiempo se ha ido adaptando al gusto tailandés, y que se ha convertido sin duda en el símbolo de la comida nacional de Tailandia.',10.90,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',134),
(DEFAULT,'Arroz salteado con huevo','Arroz salteado con huevo. Una opción perfecta para acompañar cualquiera de nuestros platos, sobretodo los de curry. Además es un plato ideal para los niños, nos damos cuenta que nos lo piden muy a menudo para los más pequeños de la casa. Un plato sencillo pero delicioso.',4.30,'1','boko@gmail.com','https://fondosmil.com/fondo/17536.jpg',134),

 (DEFAULT,'Signature Milk Tea with Pearls','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://cdn.shopify.com/s/files/1/1851/1205/products/600px-MT01-Signature-Brown-Sugar-Pearl-Milk-Tea_large.png?v=1521025880',135),
(DEFAULT,'Signature Milk Tea','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://www.eatandtravelwithus.com/wp-content/uploads/2019/05/Signature-KOI-Jewel-Changi-Boba-Brown-Sugar-Milk-Tea-1.jpg',135),
(DEFAULT,'Oolong Milk Tea','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://i1.wp.com/delightfullyfull.com/wp-content/uploads/2017/06/DSC_0055.jpg?fit=3812%2C2325',135),
(DEFAULT,'Roasted Milk Tea','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','http://chatimecafe.com/data/images/products/lrg0521302001404290971.jpg',135),

(DEFAULT,'Chocolate Mousse','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://www.recipetineats.com/wp-content/uploads/2018/09/Chocolate-Mousse_9.jpg',136),
(DEFAULT,'Matcha Mousse','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://www.foodfashionparty.com/wp-content/uploads/2018/05/mousse6.jpg',136),
(DEFAULT,'Tieguanyin Mousse','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','http://www.chatime.com.ph/wp-content/uploads/2017/03/%E9%90%B5%E8%A7%80%E9%9F%B3%E6%85%95%E6%96%AF-ok.png',136),

(DEFAULT,'Milky Taro Delight','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://i.pinimg.com/originals/fb/d0/c1/fbd0c1235ecb1c430a6071b28269f5d3.jpg',137),
(DEFAULT,'Milky Chocolate Delight','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Julian%20Rovagnati,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1459074635/pxtptcbcfinwvm7h2gck.jpg',137),
(DEFAULT,'Milky Taro Delight Hot','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://st2.depositphotos.com/1177973/10508/i/950/depositphotos_105084736-stock-photo-glass-of-chocolate-milkshake-with.jpg',137),
(DEFAULT,'Milky Chocolate Delight Hot','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://pixnio.com/free-images/2017/06/08/2017-06-08-15-36-57.jpg',137),

(DEFAULT,'Matcha Tea Latte','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://japancentre-images.global.ssl.fastly.net/recipes/pics/16/main/matcha-latte.jpg?1469572822',138),
(DEFAULT,'Tieguanyin Tea Latte','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://chatimetexas.com/wp-content/uploads/product/Tieguanyin%20Tea%20Latte.jpg',138),
(DEFAULT,'Jasmine Green Tea Latte','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://i.pinimg.com/originals/6f/09/2b/6f092b2eebc72cbc2835372698f638b2.jpg',138),
(DEFAULT,'Black Tea Latte','https://fondosmil.com/fondo/17536.jpg',4.50,'1','chatime@gmail.com','https://globalassets.starbucks.com/assets/ad9f5abd95ee4c94a036d8d1a8878a23.jpg',138),

 (DEFAULT,'Taro Oreo','Oreo, taro y leche.',3.80,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',139),
(DEFAULT,'Argentino','Dulce de leche, té negro y leche.',3.80,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',139),
(DEFAULT,'Milky Matcha - Matcha Latte','Té verde japonés molido y con leche.',3.80,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',139),
(DEFAULT,'Chai','Especias indias y leche.',3.80,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',139),

(DEFAULT,'Milkshake Argentino Split','Dulce de leche y plátano.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',140),
(DEFAULT,'Milkshake Clásico de Nutella','Con mucha nutella.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',140),
(DEFAULT,'Milkshake Super Galleta','Con crema de galletas y canela.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',140),
(DEFAULT,'Milkshake de Vani Matcha','Matcha con vainilla.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',140),

(DEFAULT,'Mango Solo','Mango y té verde',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',141),
(DEFAULT,'Red Mango','Mango, fresa, frutos rojos y té verde.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',141),
(DEFAULT,'Vitamin','Kiwi, piña y té verde.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',141),
(DEFAULT,'Piña Naranja','Piña, frutos rojos y zumo de naranja.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',141),

(DEFAULT,'Vanilcafé','Café, leche y vainilla.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',142),
(DEFAULT,'Taro Café','Taro, café y leche.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',142),
(DEFAULT,'Cappuccio','Café con leche y espuma de leche.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',142),
(DEFAULT,'Moka','Café con leche y chocolate.',4.30,'1','bubbolitas@gmail.com','https://fondosmil.com/fondo/17536.jpg',142),

 (DEFAULT,'Zenzoo Clásico','Batido con té y leche, té negro assam con leche.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',143),
(DEFAULT,'Zenzoo Jungle','Batido con té y leche, té verde jazmín con leche.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',143),
(DEFAULT,'Angel Ring','Qin cha con leche. sabor entre Jungle y Oolong Milk tea',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',143),
(DEFAULT,'Thai tea','té tailandés! ',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',143),

(DEFAULT,'Fresh Limón ','Té frío y dulce con sabor de frutas, té verde de limón.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',144),
(DEFAULT,'Mango Island','Té frío y dulce con sabor de frutas, té verde de mango.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',144),
(DEFAULT,'Blossom Berry','Té frío y dulce con sabor de frutas, té de fruta del bosque.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',144),
(DEFAULT,'Pink Lemonade','Pinki limonada, sin té.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',144),

(DEFAULT,'Pure Macha','Té Japonés fresco natural. ',4.05,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',145),
(DEFAULT,'Té Verde Jazmín','Té fresco natural.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',145),
(DEFAULT,'Té Negro Assam','Té fresco natural.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',145),
(DEFAULT,'Fresh Oolong','Té fresco natural.',4.50,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',145),

(DEFAULT,'Dorayaki','Matcha, fresa, azuki y chocolate.',3.00,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',146),
(DEFAULT,'Mochi Japonés','Matcha, fresa y azuki.',3.20,'1','zenzoo@gmail.com','https://fondosmil.com/fondo/17536.jpg',146),

 (DEFAULT,'Menú GSB','Gran burrito a la plancha con carne a elegir, acompañado de nachos con queso o patatas o ensalada y bebida',9.15,'1','tacobell@gmail.com','https://sifu.unileversolutions.com/image/es-MX/recipe-topvisual/2/1260-709/wrap-burrita-50229500.jpg',147),
(DEFAULT,'Menú Burrito Bowl Guacamole','Arroz Mexican, frijoles negros, lechuga, pico de gallo, queso cheddar, nata agria, carne a elegir y guacamole, nachos con queso o patatas o ensalada y bebida (también opción veggie)',8.65,'1','tacobell@gmail.com','https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_5637_9038.jpg',147),
(DEFAULT,'Menú Burrito Bowl Mexican','Arroz Mexican, frijoles negros, lechuga, pico de gallo, queso cheddar, nata agria, carne a elegir y salsa Mexican, nachos con queso o patatas o ensalada y bebida (también opción veggie)',8.65,'1','tacobell@gmail.com','https://i1.wp.com/www.piloncilloyvainilla.com/wp-content/uploads/2020/06/pico-de-gallo-con-crema-de-aguacate-38-scaled.jpg?fit=1200%2C1800&ssl=1',147),
(DEFAULT,'Menú Chicken Burrito','Chicken Burrito de pollo crujiente acompañado de nachos con queso o patatas o ensalada y bebida - picante',9.05,'1','tacobell@gmail.com','http://images-gmi-pmc.edge-generalmills.com/cbc5b3d7-48bd-42d4-b567-efb99ba54e17.jpg',147),

(DEFAULT,'Taco','Lechuga, queso cheddar y carne a elegir',2.15,'1','tacobell@gmail.com','https://bargainbabe.com/wp-content/uploads/2019/09/tacos.jpg',148),
(DEFAULT,'Taco Supreme','Lechuga, queso cheddar, crema agria, tomate y carne a elegir',2.80,'1','tacobell@gmail.com','https://isinginthekitchen.files.wordpress.com/2014/08/dsc_00411.jpg',148),

(DEFAULT,'Burrito Santa Monica','Tortilla a la plancha rellena de frijoles negros, guacamole, nata, lechuga, doble de queso, pico de gallo, salsa Pepper Jack y carne a elegir',4.40,'1','tacobell@gmail.com','https://d1gzkaymd7grop.cloudfront.net/wp-content/uploads/2020/07/02_IMGWEB_BURRITOSANTAMONICA_560X410-min.jpg',149),
(DEFAULT,'Quesarito','Carne a elegir, arroz, salsa habanero y crema agria envuelto en quesadilla caliente con quesos fundidos',4.90,'1','tacobell@gmail.com','https://3.bp.blogspot.com/-V0Thk1_Le00/U1hfrtEpOrI/AAAAAAAAPq8/EqsFpuQLXM4/s1600/quesarito.jpg',149),
(DEFAULT,'Burrito GSB','Frijoles negros, arroz, salsa Pepper Jack, doble queso, pico de gallo y carne a elegir',4.90,'1','tacobell@gmail.com','https://resizer.deliverect.com/w5zv3wALegZ-mUNwki8gyJMlOj3UbAGS1ihRV-x8oHs/rt:fill/w:1024/h:1024/g:ce/el:0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2lrb25hLWJ1Y2tldC1wcm9kdWN0aW9uL2ltYWdlcy81ZWJiZjNlZTk0YWJmYjAwMDExYjg4NWIvMjAyMC0wNi0wNFQwODo0NjoxMy40NjdaLTAyX0JPREVHT05fMTkyMFgxMDgwX1NBTlRBTU9OSUNBXzAzSlVOSU8uanBn',149),
(DEFAULT,'Chicken Burrito','Piezas de pollo crujiente con salsa nacho, lechuga fresca, pico de gallo y salsa Creamy jalapeño - picante',4.90,'1','tacobell@gmail.com','https://assets.kraftfoods.com/recipe_images/opendeploy/54595_640x428.jpg',149),

(DEFAULT,'Quesadilla','Salsa Creamy jalapeño, doble de queso y carne - picante',4.70,'1','tacobell@gmail.com','https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Quesadilla_2.jpg/1200px-Quesadilla_2.jpg',150),
(DEFAULT,'Quesadilla Queso','Salsa Creamy jalapeño y doble de queso - picante',3.90,'1','tacobell@gmail.com','https://www.cscassets.com/recipes/wide_cknew/wide_50526.jpg',150),
(DEFAULT,'Kidsadilla Queso','Para niños con doble de queso',1.65,'1','tacobell@gmail.com','https://d1gzkaymd7grop.cloudfront.net/wp-content/uploads/2020/07/03_IMGWEB_KIDSADILLA_560X408-min.jpg',150),
(DEFAULT,'Kidsadilla','Para niños con doble de queso y carne',2.05,'1','tacobell@gmail.com','http://www.tacobell.com.cy/content/images/menu/155015a64ed77b.jpg',150),

 (DEFAULT,'Nachos con salsa de queso casera','https://fondosmil.com/fondo/17536.jpg',6.55,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',151),
(DEFAULT,'Chips (Totopos)','https://fondosmil.com/fondo/17536.jpg',2.5,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',151),

(DEFAULT,'Quesadillas de Pollo (3uds)','Pollo Pechuga de pollo a la parrilla marinada con especias y aceite de oliva',8.85,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',152),
(DEFAULT,'Quesadillas de Cochinita Pibil (3uds)','Cochinita Cerdo adobado con naranja, achiote y especias',8.85,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',152),
(DEFAULT,'Quesadillas de carne asada (3uds)','Carne asada Carne de ternera (marinada con soja)',8.85,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',152),
(DEFAULT,'Quesadillas al Pastor (3 uds)','Cerdo marinado en salsa de tres chiles con cebolla, cilantro y piña',8.85,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',152),

(DEFAULT,'Tacos de Pollo (4 uds)','Pollo Pechuga de pollo marinada con especias y aceite de oliva con guacamole',9.55,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',153),
(DEFAULT,'Tacos de Carne Asada (4 uds)','Carne asada Carne de ternera (marinada con soja), pico de gallo, con salsa de chile de árbol picante y lima al lado',8.95,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',153),
(DEFAULT,'Tacos de Cochinita Pibil (4 uds)','Cochinita Cerdo adobado con naranja, achiote y especias con cebolla roja marinada en lima, naranja y hierbas',9.55,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',153),
(DEFAULT,'Tacos al Pastor (4 uds)','Cerdo marinado en una salsa de tres chiles con cebolla, cilantro y piña.',9.55,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',153),

(DEFAULT,'Burrito de Carne Asada','tortilla de harina de trigo rellena de carne asada, frijoles refritos, lechuga, arroz, queso, pico de gallo (tomate, cebolla, cilantro), nata agria',9.95,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',154),
(DEFAULT,'Burrito de Pollo','tortilla de harina de trigo rellena de pollo, frijoles refritos, lechuga, arroz, queso, pico de gallo (tomate, cebolla, cilantro), nata agria',9.95,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',154),
(DEFAULT,'Burrito de Cochinita Pibil','tortilla de harina de trigo rellena de cochinita pibil, frijoles refritos, lechuga, arroz, queso, pico de gallo (tomate, cebolla, cilantro), nata agria',9.95,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',154),
(DEFAULT,'Burrito vegetariano con guacamole y maiz','tortilla de harina de trigo rellena de Frijol negro, maíz y guacamole.',9.10,'1','rosanegra@gmail.com','https://fondosmil.com/fondo/17536.jpg',154),

 (DEFAULT,'Taco de Carnitas','https://fondosmil.com/fondo/17536.jpg',2.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',155),
(DEFAULT,'Taco Barbacoa','https://fondosmil.com/fondo/17536.jpg',2.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',155),
(DEFAULT,'Taco de Suadero','https://fondosmil.com/fondo/17536.jpg',2.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',155),
(DEFAULT,'Taco de Cochinita','https://fondosmil.com/fondo/17536.jpg',2.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',155),

(DEFAULT,'Quesadilla Gringa','https://fondosmil.com/fondo/17536.jpg',3.80,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',156),
(DEFAULT,'Quesadilla de Patata','https://fondosmil.com/fondo/17536.jpg',3.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',156),
(DEFAULT,'Quesadilla de Picadillo','https://fondosmil.com/fondo/17536.jpg',3.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',156),
(DEFAULT,'Quesadilla de Tinga de Res','https://fondosmil.com/fondo/17536.jpg',3.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',156),

(DEFAULT,'Quesadilla de Champiñones','https://fondosmil.com/fondo/17536.jpg',3.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',157),
(DEFAULT,'Quesadilla de Picadillo Vegetariano','https://fondosmil.com/fondo/17536.jpg',3.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',157),
(DEFAULT,'Taco Dorado de Patata','https://fondosmil.com/fondo/17536.jpg',2.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',157),
(DEFAULT,'Quesadilla de Queso Ranchero','https://fondosmil.com/fondo/17536.jpg',3.50,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',157),

(DEFAULT,'Margarita Limón','https://fondosmil.com/fondo/17536.jpg',5.00,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',158),
(DEFAULT,'Margarita Maracuyá','https://fondosmil.com/fondo/17536.jpg',5.00,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',158),
(DEFAULT,'Margarita Mango','https://fondosmil.com/fondo/17536.jpg',5.00,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',158),
(DEFAULT,'Mojito Fresa','https://fondosmil.com/fondo/17536.jpg',5.00,'1','tacos99@gmail.com','https://fondosmil.com/fondo/17536.jpg',158),

 (DEFAULT,'Menú BIG Burrito Wey al Pastor','Uno de los clásicos de México. Lomo de cerdo marinado en un adobo de tomate, cebolla, naranja, chiles y especias con trozos de piña asada. Con arroz, frijol negro y lechuga, acompañado de una guarnición + bebida.',10.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',159),
(DEFAULT,'Menú big burrito wey chili con carne','La auténtica receta de carne picada de ternera y cerdo guisada con especias y frijoles, con arroz y lechuga. Acompañado de una guarnición + bebida.',13.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',159),
(DEFAULT,'Menú BIG Burrito Wey Cochinita Pibil','Cerdo marinado en salsa de axiote, una especia típica de Yucatán de sabor apimentado, no picante pero rico en matices. Con arroz, frijol negro y lechuga. Acompañado de una guarnición + bebida.',10.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',159),
(DEFAULT,'Menú Big Burrito Tinga de Pollo','Tinga de pollo, arroz, frijol negro, lechuga y verduras asadas. Acompañado de una guarnición + bebida.',10.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',159),

(DEFAULT,'Menu Green Bowl Wey','¿No eres fan de la carne? Este bowl es para ti. Cremoso guacamole hecho en casa con verduras, queso gouda, frijoles, maíz y cebolla roja en una base de lechuga. Acompañado de una guarnición y una bebida.',11.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',160),
(DEFAULT,'Menu Mexican Pastor Bowl Wey','Lomo de cerdo marinado en un adobo de tomate, cebolla, naranja, chiles y especias con trozos de piña asada. Con queso gouda, frijoles, cebolla roja, cilantro y lima en una base de lechuga. Acompañad o de una guarnición y una bebida.',11.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',160),
(DEFAULT,'Menu Carnitas Bowl Wey','Carne de cerdo al estilo de Michoacán, guacamole, pico de gallo, frijoles, cebolla roja, cilantro y lima en una base de lechuga. Acompañado de una guarnición y una bebida.',11.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',160),
(DEFAULT,'Menu Chicken Bowl Wey','Pechuga de pollo a la plancha acompañada de pimiento rojo y verde asado, maíz, cebolla roja y aguacate en una base de lechuga. Acompañado de una guarnición y una bebida.',11.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',160),

(DEFAULT,'Menú Degustación Tacos Mexicanos ','Degustación de sabores típicos de México. ¿Te atreves a probarla? Acompañado de dos guarniciones + 2 bebidas.',21.50,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',161),

(DEFAULT,'BIG Burrito Wey Chili con Carne','La auténtica receta de carne picada de ternera y cerdo guisada con especias y frijoles, con arroz y lechuga. ',7.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',162),
(DEFAULT,'BIG Burrito Wey Pollo','Pechuga de pollo a la plancha, arroz, frijol negro, lechuga y verduras asadas.',7.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',162),
(DEFAULT,'BIG Burrito Wey Guacamole','Cremoso guacamole hecho en casa con arroz, frijol negro, lechuga y verduras asadas. ',7.59,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',162),
(DEFAULT,'BIG Burrito Tinga de Pollo','Tinga de pollo, arroz, frijol negro, lechuga y verduras asadas.',7.95,'1','burritowey@gmail.com','https://fondosmil.com/fondo/17536.jpg',162),

 (DEFAULT,'Ración de Red Velvet','Gracias a su nombre que viene de la traducción (terciopelo rojo) nos enfocamos en crear la mejor tarta en cuanto a su sabor, es delicioso cacao mezclado con vainilla y el toque de bizcocho rojo y suave crema de queso hará que los amantes de esta tarta vuelvan una y otra vez.',4.90,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',163),
(DEFAULT,'Ración de Cheesecake de Frutos Rojos','Tarta de queso típica americana elaborada a baja temperatura con base de galleta crujiente de naranja y cubierta con gelatina de frutos rojos.',4.90,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',163),
(DEFAULT,'Ración de Cheesecake de Caramelo Salado','Ocupamos la beneficiosa por sus propiedades sal de Himalaya en fusión con caramelo artesanal y hecha a baja temperatura, no todo tiene que ser dulce siempre.',4.90,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',163),
(DEFAULT,'Ración de Oreo Cake','Tus galletas favoritas son una pareja ideal para nuestra crema y la combinación con bizcochos de chocolate y vainilla, se hace que esa tarta puede quedar en tu corazón profundamente.',4.90,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',163),

(DEFAULT,'Tarta Entera Pequeña de Carrot Cake','Con una mezcla tan saludable y deliciosa como lo son las pasas, nueces, canela y el ingrediente principal la zanahoria, sin duda la combinación perfecta que crea nuestra best seller carrot cake un clásico pero hecho con mucho amor.',30.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',164),
(DEFAULT,'Tarta Entera Pequeña de Red Velvet','Gracias a su nombre que viene de la traducción (terciopelo rojo) nos enfocamos en crear la mejor tarta en cuanto a su sabor, ese delicioso cacao mezclado con vainilla y el toque de bizcocho rojo y suave crema de queso hará que los amantes de esta tarta vuelvan una y otra vez.',30.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',164),
(DEFAULT,'Tarta Entera Pequeña de Oreo Cake','Tus galletas favoritas son una pareja ideal para nuestra crema y la combinación con bizcochos de chocolate y vainilla se hace que esa tarta puede quedar en tu corazón profundamente.',30.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',164),
(DEFAULT,'Cheesecake de frutos rojos 1 kg','Delicioso cheesecake de frutos del bosque. Ideal para compartir con los amigos o familia. ',30.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',164),

(DEFAULT,'Tarta Entera Grande de Carrot Cake','Con una mezcla tan saludable y deliciosa como lo son las pasas, nueces, canela y el ingrediente principal la zanahoria, sin duda la combinación perfecta que crea nuestra best seller carrot cake un clásico pero hecho con mucho amor.',50.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',165),
(DEFAULT,'Tarta Entera Grande de Red Velvet','Gracias a su nombre que viene de la traducción (terciopelo rojo) nos enfocamos en crear la mejor tarta en cuanto a su sabor, ese delicioso cacao mezclado con vainilla y el toque de bizcocho rojo y suave crema de queso hará que los amantes de esta tarta vuelvan una y otra vez.',50.0,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',165),
(DEFAULT,'Tarta Entera Grande de Oreo Cake','Tus galletas favoritas es una pareja ideal para nuestra crema y la combinación con bizcochos de chocolate y vainilla se hace que esa tarta puede quedar en tu corazón profundamente.',50.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',165),
(DEFAULT,'Tarta Entera Grande de Lemon Pie','Para los clásicos existe nuestra receta secreta en la crema de limón con una crujiente base de galleta que finaliza con una nube de merengue francés.',50.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',165),

(DEFAULT,'Bombón de Avellanas Vegano','Bombón vegano de masa de avellanas con corazón de avellana tostada, cubierta con chocolate y trocitos de avellanas.',2.50,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',166),
(DEFAULT,'Tartaleta Apple Cheesecake Crumble Pie','Una riquísima tartaleta de cuatro capas, crujiente masa quebrada casera, fina capa de cheesecake de vainilla, trozos de manzanas especiadas y crumble de almendra, nueces, coco y otros ingredientes secretos.',4.50,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',166),
(DEFAULT,'Cookie de Nueces y Chocolate','Nuestro cookies rico, crujiente por fuera y suave por dentro.',3.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',166),
(DEFAULT,'Tres Leches ','Bizcocho mojado en 3 leches con un toque de canela y merengue francés.',7.00,'1','dulzuramia@gmail.com','https://fondosmil.com/fondo/17536.jpg',166),

(DEFAULT,'Fire Poke','Arroz sushi, quinoa, salmón noruego flambeado, salsa teriyaki, edamame, aguacate, furikake y algas nori.',9.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',167),

(DEFAULT,'Philsalmon Poke','Arroz sushi, salmón marinado en una suave salsa casera yogur queso crema, mango, aguacate, nuestra salsa dulce y algas nori. ',9.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',168),
(DEFAULT,'Premium Poke ','Arroz sushi, langostinos premium, mango y coco, cilantro, salsa de sésamo y un toque de teriyaki.',9.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',168),

(DEFAULT,'Crunchy Salmón','Arroz sushi, salmón, ensalada de frutas, edemame, cebolla frita y salsa Fresh.',8.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',169),
(DEFAULT,'Spicy Tuna','Arroz sushi, atún marinado en kimchi, cebolla tierna y pepino.',8.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',169),
(DEFAULT,'Crab Mania','Arroz sushi, cangrejo spicy mayo, aguacate y wakame.',8.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',169),

(DEFAULT,'Bowl de Frutas','Bowl de frutas variadas. ',3.00,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',170),
(DEFAULT,'Nuestras tarrinas caseras','https://fondosmil.com/fondo/17536.jpg',3.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',170),
(DEFAULT,'Mochi','Coco, chocolate o té matcha.',3.90,'1','thefresh@gmail.com','https://fondosmil.com/fondo/17536.jpg',170);

--Here we have the order_id, the item_id, and the amount
INSERT INTO order_items VALUES (1,1,2),(2,2,4);
--Two feedbacks about the 2 orders
INSERT INTO feedbacks VALUES ('thefresh@gmail.com','raul@gmail.com',8,'comida de calidad a precio economico',CURRENT_TIMESTAMP(0)),
('thefresh@gmail.com','carlos@gmail.com',5,'Muy caro y no es para tirar cohetes',CURRENT_TIMESTAMP(0));
--The favourite restaurants of one customer
INSERT INTO favourites VALUES ('carlos@gmail.com','dulzuramia@gmail.com'),('carlos@gmail.com','thefresh@gmail.com');
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
(DEFAULT,'postres','comida capricho para un dia en que sea mejor pedir que cocinar');
--Labels of the restaurants that they have chosen
INSERT INTO type_restaurants VALUES 
(1,'miu@gmail.com'),(1,'saikosushi@gmail.com'),(1,'sushito@gmail.com'),(1,'hachiko@gmail.com'), 
(2,'pizzapazza@gmail.com'),(2,'napoli@gmail.com'),(2,'gusto_rest@gmail.com'),(2,'pizzamarket@gmail.com'), 
(3,'ayres@gmail.com'),(3,'royalnepal@gmail.com'),(3,'caneusebio@gmail.com'),(3,'bbqexpress@gmail.com'), 
(4,'canvador@gmail.com'),(4,'chatico@gmail.com'),(4,'kfc@gmail.com'),(4,'mcdonald@gmail.com'), 
(5,'wok@gmail.com'),(5,'boabao@gmail.com'),(5,'fulin@gmail.com'),(5,'fandimsum@gmail.com'), 
(6,'ramenya@gmail.com'),(6,'kuyi@gmail.com'),(6,'telemaki@gmail.com'), 
(7,'hideoutburger@gmail.com'),(7,'burgerniu@gmail.com'),(7,'tgb@gmail.com'), 
(8,'mrgreensalad@gmail.com'),(8,'pokesi@gmail.com'),(8,'greenberry@gmail.com'),(8,'maoz@gmail.com'), 
(9,'muns@gmail.com'),(9,'goiko@gmail.com'),(9,'papajohns@gmail.com'), 
(10,'wok@gmail.com'),(10,'boko@gmail.com'),(11,'chatime@gmail.com'),(11,'zenzoo@gmail.com'), 
(12,'tacobell@gmail.com'),(12,'rosanegra@gmail.com'),(12,'tacos99@gmail.com'),(12,'burritowey@gmail.com'), 
(13,'bubbolitas@gmail.com'),(13,'dulzuramia@gmail.com'),(13,'thefresh@gmail.com');
--Labels of the items of the restaurant that the owner of the item has chosen
INSERT INTO type_items VALUES (1,1),(2,2);
--Añadimos un refresco y un extra al plato espagueti tartufo, siendo el refresco obligatorio y el queso opcional
INSERT INTO "extra_items" VALUES (DEFAULT,'cocacola','refresco de cola con cafeina',2.95,'0',1),
(DEFAULT,'queso chedar','queso chedar para acompañar salsa tartufo',0.0,'1',1);
--En el pedido, se obliga a pedir la cocacola, escogiendo 2ud, y opcional el queso, que tambien lo pide, y es gratuito
INSERT INTO "order_extraitems" VALUES(1,1,2),(1,2,1);