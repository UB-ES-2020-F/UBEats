 
 # Users
 [Go back to main readme](../../README.md)

---

 
## Endpoints
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)  ![endpoint](https://img.shields.io/static/v1?label=&message=/login&color=000000)   
  
 #### Body 
```
{ email : example@gmail.com , password : passmock } 
``` 
 #### Response  
```
{
  "user": {
    "email": "rrr@gmail.com",
    "name": "Rrr",
    "CIF": "33333330E",
    "street": "calle perdida alejada de todo, numero 30, barcelona",
    "phone": "609773493",
    "tipo": "restaurant"
  }
}
``` 
--- 

### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)  ![endpoint](https://img.shields.io/static/v1?label=&message=/register&color=000000)   
  
 #### Body 
```
{
    name : 'Raul',
    email : 'raulito84@gmail.com',
    password : '797832',
    type : 'customer',
    CIF : '55455093R',
    street : 'Calle de las ventas destruidas, 45, Madrid',
    phone : '432521545',
}
``` 
 #### Response 
```
{
  "user": {
    "email": " das@gmail.com",
    "name": "Raul",
    "CIF": "55455093R",
    "street": " Calle de las ventas destruidas, 45, Madrid",
    "phone": "432521545",
    "tipo": "customer",
    "specifics": {
      "email": " das@gmail.com",
      "card": ""
    }
  }
}
```
 #### Commnents

  This endpoint allows to register customer/restaurant/deliveryman. To do so just write the type in `type` body.
  * `type : customer` to register a customer
  * `type : restaurant` to register a new restaurant
  * `type : deliveryman`  to register a deliveryman

--- 


