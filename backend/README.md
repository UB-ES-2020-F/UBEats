# UberEats

## API

### Products / Items
```/api/item```
#### Get info about an existing item
GET /api/item
```
body: {
    item_id: SERIAL // the identifier for the item
}
```
Returns
```
{

}
```
#### Create a new item
POST /api/item
```
body: {
    title: string max length of 30 chars
    desc: string max length of 200 chars
    price: non negative float
    visible: boolean [OPTIONAL]
    rest_id: restaurant email, string max length of 50 chars
}
```
Returns
```
{

}
```
#### Update an existing item

#### Delete an existing item
