--DROP DATABASE IF EXISTS ubereats;
CREATE DATABASE ubereats;
\connect ubereats;
​
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
);​
INSERT INTO "users" VALUES
('rrr@gmail.com','Rrr','33333330E','calle perdida alejada de todo, numero 30, barcelona','12344','609773493','restaurant'),
('rub@gmail.com','Rub','33343330E','calle perdida alejada de todo, numero 35, barcelona','1234666','60985996','deliveryman'),
('ran@gmail.com','Ran','44444092R','calle arago, numero 40, Barcelona','123456789gjh','608375886','customer');
INSERT INTO restaurants VALUES('rrr@gmail.com','verde','inactive','ES8021000000000000001234');
INSERT INTO deliverymans VALUES('rub@gmail.com','rojo','visible','ES8021000000000000001235');
INSERT INTO customers VALUES('ran@gmail.com','12345678912345670921345');