
# Orders
 [Go back to main readme](../../README.md)

---


## Endpoints
---
### ![GET](https://img.shields.io/static/v1?label=&message=GET&color=blue)        ![endpoint](https://img.shields.io/static/v1?label=&message=/orders/:order_id&color=000000)   
  
 #### Response  
```
{
  order_id: 4,
  rest_id: 'rest1@gmail.com',
  deliv_id: 'deliv1@gmail.com',
  cust_id: 'cust1@gmail.com',
  status: 'esperando',
  timestamp: '2020-12-10T02:55:37.000Z',
  importe: 40,
  items: [
    {
      item_id: 167,
      cantidad: 2,
      title: 'espaguetis tartufo',
      desc: 'Espaguetis con salsa tartufata hecha a base de setas y trufa negra',
      price: 10
    },
    {
      item_id: 168,
      cantidad: 1,
      title: 'pulpo con patatas',
      desc: 'pulpo a la brasa acompañado de patatas fritas pochadas',
      price: 20
    }
  ]
}

``` 
--- 
---
### ![POST](https://img.shields.io/static/v1?label=&message=POST&color=green)        ![endpoint](https://img.shields.io/static/v1?label=&message=/orders&color=000000)  
  
 #### Body  
```
{
  "order": {
    rest_id : 'rest1@gmail.com',
    deliv_id : 'deliv1@gmail.com',
    cust_id : 'cust1@gmail.com',
    items : [{item_id : 167, cantidad : 2},{item_id : 168, cantidad : 1}]
  }
}
``` 

 #### Response
 _Order created_
```
[
  { order_id: 171, item_id: 167, cantidad: 2 },
  { order_id: 171, item_id: 168, cantidad: 1 }
]
``` 

---
---
### ![PUT](https://img.shields.io/static/v1?label=&message=PUT&color=orange)        ![endpoint](https://img.shields.io/static/v1?label=&message=/orders/:order_id&color=000000)   

 #### Body  
```
order = {
        status : 'preparando'
      }
``` 

 #### Response
 _Order updated
```
{
  order_id: 184,
  rest_id: 'rest1@gmail.com',
  deliv_id: 'deliv1@gmail.com',
  cust_id: 'cust1@gmail.com',
  status: 'preparando',
  timestamp: '2020-12-13T04:41:37.000Z'
}
``` 

---
---
### ![PUT](https://img.shields.io/static/v1?label=&message=PUT&color=orange)        ![endpoint](https://img.shields.io/static/v1?label=&message=/orders/:order_id/items/:item_id&color=000000)   

 #### Body  
```
item = {
        cantidad : 5
      }
``` 

 #### Response
 _Order_item updated
```
{ order_id: 4, item_id: 167, cantidad: 5 }
``` 

---
---
### ![DELETE](https://img.shields.io/static/v1?label=&message=DELETE&color=ff0000)        ![endpoint](https://img.shields.io/static/v1?label=&message=/orders/:order_id&color=000000)   
#### *Query*
 `order_id` corresponding to the order_id of the order, matched in database

 #### Response  
```
{
  order_id: 193,
  rest_id: 'rest1@gmail.com',
  deliv_id: 'deliv1@gmail.com',
  cust_id: 'cust1@gmail.com',
  status: 'esperando',
  timestamp: '2020-12-13T04:45:18.000Z'
}
``` 

---