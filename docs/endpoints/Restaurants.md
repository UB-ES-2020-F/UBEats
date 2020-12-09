
# Restaurants 
 [Go back to main readme](../../README.md)

---


## Endpoints
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants&color=000000)   
  
 #### Response  
```
{
  "restaurants": [
  {
    email: 'rst@gmail.com',
    name: 'roberto',
    CIF: '44444444E',
    street: 'calle arago 35. barcelona',
    pass: '1234',
    phone: '696696686',
    tipo: 'restaurant',
    url: 'images.com/perfil.jpg',
    avaliability: 'verde',
    visible: 'inactive',
    iban: 'ES8721000022293894885934',
    allergens: 'restaurante-rst.com/allergens.pdf',
    types: [ 
      {
        type_id: 219,
        name: 'vegetariano',
        description: 'comida vegetariana que por tanto incluye huevo y queso'
      },
      {
        type_id: 220,
        name: 'vegano',
        description: 'comida mas restrictiva, no hay nada de origen animal'
      }
    ]
  },
  {
    email: 'rst2@gmail.com',
    name: 'roberto',
    CIF: '44444444E',
    street: 'calle arago 35. barcelona',
    pass: '1234',
    phone: '696696686',
    tipo: 'restaurant',
    url: 'images.com/perfil.jpg',
    avaliability: 'verde',
    visible: 'inactive',
    iban: 'ES8721000022293894885934',
    allergens: 'restaurante-rst2.com/allergens.pdf',
    types: [ 
      {
        type_id: 219,
        name: 'vegetariano',
        description: 'comida vegetariana que por tanto incluye huevo y queso'
      },
      {
        type_id: 220,
        name: 'vegano',
        description: 'comida mas restrictiva, no hay nada de origen animal'
      }
    ]
  }
  ]
}

``` 
--- 
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/:email&color=000000)   
#### *Query*
 `email` corresponding to the email of the restaurant, matched in database

 #### Response  
```
{
  email: 'rst@gmail.com',
  name: 'roberto',
  CIF: '44444444E',
  street: 'calle arago 35. barcelona',
  pass: '1234',
  phone: '696696686',
  tipo: 'restaurant',
  url: 'images.com/perfil.jpg',
  avaliability: 'verde',
  visible: 'inactive',
  iban: 'ES8721000022293894885934',
  allergens: 'restaurante-rst.com/allergens.pdf',
  types: [
    {
      type_id: 87,
      name: 'vegetariano',
      description: 'comida vegetariana que por tanto incluye huevo y queso'
    },
    {
      type_id: 88,
      name: 'vegano',
      description: 'comida mas restrictiva, no hay nada de origen animal'
    }
  ]
}
``` 
--- 
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants&color=000000)  
  
 #### Body  
```
{
  "restaurant": {
    email: "rrr@gmail.com",
    name: "Rrr",
    CIF: "33333330E",
    street: "calle perdida alejada de todo, numero 30, barcelona",
    pass: "12344",
    phone: "609773493",
    tipo: "restaurant",
    url: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    avaliability: "verde",
    visible: "inactive",
    iban: "ES8021000000000000001234",
    allergens: "restaurante1.com/allergens.pdf"
  }
}
``` 

 #### Response
 _Restaurant created_
```
{
  "restaurant": {
    email: "rrr@gmail.com",
    name: "Rrr",
    CIF: "33333330E",
    street: "calle perdida alejada de todo, numero 30, barcelona",
    pass: "12344",
    phone: "609773493",
    tipo: "restaurant",
    url: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    avaliability: "verde",
    visible: "inactive",
    iban: "ES8021000000000000001234",
    allergens: "restaurante1.com/allergens.pdf"
  }
}
``` 

---
---
### ![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/:email&color=000000)   
#### *Query*
 `email` corresponding to the email of the restaurant, matched in database

 #### Response  
```
{
  "restaurant": {
    email: "rrr@gmail.com",
    name: "Rrr",
    CIF: "33333330E",
    street: "calle perdida alejada de todo, numero 30, barcelona",
    pass: "12344",
    phone: "609773493",
    tipo: "restaurant",
    url: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    avaliability: "verde",
    visible: "inactive",
    iban: "ES8021000000000000001234",
    allergens: "restaurante1.com/allergens.pdf"
  }
}
``` 

---
---
### ![PUT](https://img.shields.io/static/v1?label=&message=PUT&color=orange)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/:email&color=000000)   

 #### Body  
```
{
    visible: "active"
}
``` 

 #### Response
 _Restaurant updated
```
{
  "restaurant": {
    email: "rrr@gmail.com",
    name: "Rrr",
    CIF: "33333330E",
    street: "calle perdida alejada de todo, numero 30, barcelona",
    pass: "12344",
    phone: "609773493",
    tipo: "restaurant",
    url: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    avaliability: "verde",
    visible: "active",
    iban: "ES8021000000000000001234",
    allergens: "restaurante1.com/allergens.pdf"
  }
}
``` 

---
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/feedback/:email&color=000000)   
#### *Query*
 `email` corresponding to the email of the restaurant, matched in database

 #### Response  
```
{
  "feedback": [
    {
      "rating": 5,
      "explanation": "Muy caro y no es para tirar cohetes",
      "timestamp": "2020-11-14T20:47:28.000Z",
      "name": "Carla"
    },
    {
      "rating": 8,
      "explanation": "comida de calidad a precio economico",
      "timestamp": "2020-11-14T20:47:28.000Z",
      "name": "Ran"
    }
  ]
}
``` 
---
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/menu/:email&color=000000)   
#### *Query*
 `email` corresponding to the email of the restaurant, matched in database

 #### Response  
```
{
  "menu": 
    [
      {
        item_id: 27,
        title: 'espaguetis tartufo',
        desc: 'Espaguetis con salsa tartufata hecha a base de setas y trufa negra',
        price: 10.95,
        cat_id: 10,
        category: 'New items',
        types: [ 'vegetariano', 'vegano' ]
      }
    ]
}
``` 
---
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/types&color=000000)  

 #### Response
 _Type added to the restaurant_
```
{
  "insType": {
    type_id: 73,
    rest_id: 'rst@gmail.com'
  }
}
``` 
---
---
### ![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurants/types/:email/:type_id&color=000000)  
  
#### *Query*
 `email` corresponding to the email of the restaurant, matched in database
 `type_id` corresponding to the type_id of the type we want to delete from this restaurant, matched in database

 #### Response
  _Type deleted of the restaurant_
``` 
 {
  "delType": {
    type_id: 73,
    rest_id: 'rst@gmail.com'
  }
}
``` 

--- 
