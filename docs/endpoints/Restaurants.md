
# Restaurants 
 [Go back to main readme](../../README.md)

---


## Endpoints
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/read&color=000000)   
  
#### Body TO BE CHANGED!
```
{
	"email":"rrr@gmail.com"
}
```
 #### Response  
```
{
  "restaurant": {
    "email": "rrr@gmail.com",
    "name": "Rrr",
    "CIF": "33333330E",
    "street": "calle perdida alejada de todo, numero 30, barcelona",
    "pass": "12344",
    "phone": "609773493",
    "tipo": "restaurant",
    "avaliability": "verde",
    "visible": "inactive",
    "iban": "ES8021000000000000001234",
    "allergens": ""
  }
}
``` 
--- 
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/menu&color=000000)   
#### Body TO BE CHANGED!
```
{
	"email":"rrr@gmail.com"
}
```
 #### Response  
```
{
  menu: [
    {
      item_id: 1,
      title: 'espaguetis tartufo',
      desc: 'Espaguetis con salsa tartufata hecha a base de setas y trufa negra',
      price: 10.95,
      types: [Array]
    }
  ]
}
``` 
--- 
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/types&color=000000)  

#### Body TO BE CHANGED!
```
{
	"email":"rrr@gmail.com"
}
```
 #### Response  
```
{
  "types": [
    {
      "name": "vegetariano",
      "description": "comida ecologica responsable con el medio ambiente y el maltrato animal"
    }
  ]
}
``` 
--- 
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/feedback&color=000000)   
#### Body TO BE CHANGED!
```
{
    "email":"rrr@gmail.com"
}
```
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
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/:rest_id/items&color=000000)   
#### Query 
```
    rest_id : email ( rrr@gmail.com)
```
 #### Response  
```
{
  "items": [
    {
      "item_id": 4,
      "title": "Pizza Dolç i Bacó",
      "desc": "Paleta cuita Canària de primeríssima qualitat, cansalada fumada i provolone italià amb Pimentón de la Vera D.O. i orenga.",
      "price": 11.8,
      "visible": "1",
      "rest_id": "rrr@gmail.com"
    },
    {
      "item_id": 5,
      "title": "Pizza Indian Curry",
      "desc": "Pit de pollastre rostit, formatge havarti danès, cansalada fumada, orenga i la nostra salsa Garam Masala Curry.",
      "price": 12.8,
      "visible": "1",
      "rest_id": "rrr@gmail.com"
    }
  ]
}
``` 
---
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)     ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/type&color=000000)   
  
#### Body
```
{
    email : 'rrr@gmail.com',
    type_id: 2
}
```
 #### Response  
```
{
  "insType": {
    "type_id": 2,
    "rest_id": "rrr@gmail.com"
  }
}
``` 
---
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)     ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/setAvaliability&color=000000)   
  
 #### Body 
```
{
    email : 'rrr@gmail.com',
    avaliability : 'rojo'
}
```
 #### Response  
```
{
  "avaliability": {
    "email": "rrr@gmail.com",
    "avaliability": "rojo",
    "visible": "inactive",
    "iban": "ES8021000000000000001234",
    "allergens": ""
  }
}
``` 
---
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)     ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/setVisible&color=000000)   
  
#### Body 
```
{
	"email": "rrr@gmail.com",
	"visible" : "inactive"
}
```
 #### Response  
```
{
  "visible": {
    "email": "rrr@gmail.com",
    "avaliability": "rojo",
    "visible": "inactive",
    "iban": "ES8021000000000000001234",
    "allergens": ""
  }
}
``` 
---
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)     ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/setIban&color=000000)   
 #### Body 
```
{
	"email": "rrr@gmail.com",
	 "iban":"123123123123123123123123"
}
```
 #### Response  
```
{
  "iban": {
    "email": "rrr@gmail.com",
    "avaliability": "rojo",
    "visible": "inactive",
    "iban": "123123123123123123123123",
    "allergens": ""
  }
}
``` 
---
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)     ![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/setAllergens&color=000000)   
#### Body 
```
{
    email : 'rrr@gmail.com',
    allergens: 'http://www.restaurante.com/list-of-allergens.pdf'
}
```
 #### Response  
```
{
  "allergens": {
    "email": "rrr@gmail.com",
    "avaliability": "rojo",
    "visible": "inactive",
    "iban": "123123123123123123123123",
    "allergens": "http://www.restaurante.com/list-of-allergens.pdf"
  }
}
``` 
---
---
### ![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000)![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant/type&color=000000)   
  
#### Body 
```
{
	"email": "rrr@gmail.com",
	 "type_id":"2"
}
```
 #### Response  
```
{
  "delType": {
    "type_id": 2,
    "rest_id": "rrr@gmail.com"
  }
}
``` 
---
---
### ![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000)![endpoint](https://img.shields.io/static/v1?label=&message=/restaurant&color=000000)   
  
#### Body 
```
{
    "email":"rst@gmail.com"
}
```
 #### Response  
```
{
  user: {
    email: 'rst@gmail.com',
    name: 'roberto',
    CIF: '44444444E',
    street: 'calle arago 35. barcelona',
    pass: '1234',
    phone: '696696686',
    tipo: 'restaurant'
  }
}
``` 
---         