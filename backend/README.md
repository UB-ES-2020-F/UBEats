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
#### Get info about all existing items
GET /api/items
#### Get info about all existing items for a specified restaurant
GET /api/items
```
body: {
    restaurant: restaurant email, max 50 chars
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

## Database
to reset your local database for testing execute
```
psql -v ON_ERROR_STOP=ON -f setup_database.sql -U ${your postgre user}
```
