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
Constraint "user_pkey" Primary Key ("email")
);
CREATE TYPE avaliability_rest AS ENUM ('verde','amarillo','naranja','rojo');
CREATE TYPE visible_rest AS ENUM ('inactive','invisible','visible');
CREATE TABLE "restaurants" (
"email" VARCHAR(50) NOT NULL,
"avaliability" avaliability_rest NOT NULL,
"visible" visible_rest NOT NULL,
"iban" VARCHAR(24) NOT NULL,
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
CREATE TABLE "items" (
"item_id" SERIAL NOT NULL UNIQUE,
"title" VARCHAR(30) NOT NULL,
"desc" VARCHAR(200) NOT NULL,
"price" float NOT NULL,
"rest_id" VARCHAR(50) NOT NULL,
Constraint "item_pkey" Primary Key ("item_id"),
Constraint "order_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE
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
"rest_id" VARCHAR(50) NOT NULL,
"cust_id" VARCHAR(50) NOT NULL,
Constraint "favourites_pkey" Primary Key ("rest_id", "cust_id"),
Constraint "favourites_fkey_rest" Foreign Key ("rest_id") References "restaurants"("email") ON DELETE CASCADE
ON UPDATE CASCADE,
Constraint "favourites_fkey_cust" Foreign Key ("cust_id") References "customers"("email") ON DELETE CASCADE
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
CREATE TABLE "allergens" (
"aller_id" SERIAL NOT NULL UNIQUE,
"name" VARCHAR(20),
"description" VARCHAR(100),
Constraint "allergens_pkey" Primary Key ("aller_id")
);
CREATE TABLE "allergen_items" (
"aller_id" INT NOT NULL,
"item_id" INT NOT NULL,
Constraint "allergenitems_pkey" Primary Key ("aller_id","item_id"),
Constraint "allergenitems_fkey_aller" Foreign Key ("aller_id") References "allergens"("aller_id") ON DELETE CASCADE,
Constraint "allergenitems_fkey_item" Foreign Key ("item_id") References "items"("item_id") ON DELETE CASCADE
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