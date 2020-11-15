 
 # Users
 [Go back to main readme](../../README.md)

---

![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)
![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)
![PUT](https://img.shields.io/static/v1?label=&message=PUT&color=orange)
![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000)
![endpoint](https://img.shields.io/static/v1?label=&message=/login&color=000000)

 
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
--- 


