 
 # Items
 [Go back to main readme](../../README.md)

---


## Endpoints
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/items/:item_id&color=000000)   
  
 #### *Query*
 `item_id` corresponding to the id of the item, matched in database

 #### Response  
```
{
  "item": {
    "item_id": 12,
    "title": "Fish It",
    "desc": "4 makis de atún, 4 makis de salmón, 2 nigiris de salmón, 2 nigiris de atún y 2 nigiris de gamba ebi.",
    "price": 12.9,
    "visible": "1",
    "rest_id": "r2@gmail.com"
  }
}
``` 
--- 
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/items&color=000000)   
  
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
    },
  ]
}
``` 
--- 
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green) ![endpoint](https://img.shields.io/static/v1?label=&message=/items&color=000000)   
  
 #### Body  
```
{
    title: 'qwertyuiop',
    desc: 'qiur qejhfrg hqeoi qhfiqe he',
    price: 3.141592,
    rest_id: 'rrr@gmail.com',
}
``` 

 #### Response
 _Item created_
```
{
  "item": {
    "item_id": 26,
    "title": "qwertyuiop",
    "desc": "qiur qejhfrg hqeoi qhfiqe he",
    "price": 3.141592,
    "visible": "0",
    "rest_id": "rrr@gmail.com"
  }
}
``` 
#### Comments  
The body can contain `visible`, being this `0` or `1`. By default is `0`.

---
---
### ![PUT](https://img.shields.io/static/v1?label=&message=PUT&color=orange) ![endpoint](https://img.shields.io/static/v1?label=&message=/items/:item_id&color=000000)   
  
 #### Body  
```
{
    title: 'wefvweochi2echrg'
}
``` 

 #### Response
 _Item updated
```
{
  "item": {
    "item_id": 26,
    "title": "wefvweochi2echrg",
    "desc": "qiur qejhfrg hqeoi qhfiqe he",
    "price": 3.141592,
    "visible": "0",
    "rest_id": "rrr@gmail.com"
  }
}
``` 
#### Comments  

The values that can be included in the body to be updated are `title,desc,price,visible`.

---
---
### ![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000) ![endpoint](https://img.shields.io/static/v1?label=&message=/items/:item_id&color=000000)   

 #### Response
 _Item deleted_
```
{
  "item": {
    "item_id": 12,
    "title": "Fish It",
    "desc": "4 makis de atún, 4 makis de salmón, 2 nigiris de salmón, 2 nigiris de atún y 2 nigiris de gamba ebi.",
    "price": 12.9,
    "visible": "1",
    "rest_id": "r2@gmail.com"
  }
}
``` 

---  


