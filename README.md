# backend_miniproject
dibimbing backend mini project
#Merchants

Merchant object
{
  id: VARCHAR(255)
	user_password: VARCHAR(255)
  user_name: VARCHAR(255)
  address: VARCHAR(255)
  phone_num: BIGINT
  join_date: TIMESTAMP
}
GET /merchant

Show login and register button

GET /merchant/register

Show form to fill out merhcant data

POST /merchant/register

URL Params
None
Data Body
{
    "id": "arbas"
  	"user_password": HASHPASSWORD
    "user_name": "tokoku"
    "address": "jalan bla bla"
    "phone_num": 081199199
    "join_date": NOW()
}
Headers
Content-Type: application/json
Success Response:
Code: 200
status: success
message: Created merchant success.
data:
{
  "id": req.body
  "user_password": req.body
  "user_name": req.body
  "address": req.body
  "phone_num": req.body
  "join_date": NOW()
}

GET /merchant/login

Show form of username: id and password: password

POST /merchant/login

Query merchant data based on id

URL Params
None
Data Params
None
Headers
Content-Type: application/json
session: user_id
Success Response:
Code: 200
status: success
message: login success. data:
{
  "id": req.body
  "user_password": req.body
}
Error Response:
Code: 404
status: error
message: { error : "Merchant doesn't exist" }
OR
Code: 401
status: error
message: unauthorized

POST /merchant/logout

Returns information success.

URL Params
None

Data Params
None

Headers
Content-Type: application/json

Success Response:

Code: 200
status: success message: cookie was cleared.

Error Response:

Code: 401
status: error
message: unauthorized

DELETE /merchant/:id

delete merchant based in id delete ON CASCADE product

URL Params
Required: id=VARCHAR

Data Params
None

Headers
Content-Type: application/json

Success Response:

Code: 200
status: success

#Products

Product object
{
  id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_name: VARCHAR(255) NOT NULL,
  quantity: INT,
  price: INT,
  created_at: TIMESTAMP DEFAULT NOW(),
  merchant_id: VARCHAR(30) NOT NULL,
	FOREIGN KEY(merchant_id) REFERENCES merchant(id) ON DELETE CASCADE
}

GET /merchant/:id/product

Returns all products in merchant database

URL Params
None
Data Params
None
Headers
Content-Type: application/json
Success Response:
Code: 200
status: success message: `` data:
{
  [
    {<product_object>},
    {<product_object>},
    {<product_object>}
  ]
}

GET /product/:id

Returns the specified product.

URL Params
Required: id=[integer]
Data Params
None
Headers
Content-Type: application/json
Success Response:
Code: 200
status: success message: `` data:
{
    {<product_object>},
    {<product_object>},
    {<product_object>}
}

GET /merchant/:id/product/new

Adding data to create new product

POST /merchant/:id/product

Creates a new Product add to product table

URL Params
None
Data Params
  {
    name: string
    quantity: integer
    price: integer
  }

Headers
Content-Type: application/json
Success Response:
Code: 200
status: success

PATCH /merchant/:id/product/:prodid/edit

update data in products
URL Params
None
Data Params
  {
    name: string
    quantity: integer
    price: integer
  }

Headers
Content-Type: application/json
Success Response:
Code: 200
status: success

DELETE /product/:id

Deletes the specified product.

URL Params
None
Data Params
  {
    name: string
    quantity: integer
    price: integer
  }

Headers
Content-Type: application/json
Success Response:
Code: 200
status: success

POST /merchant/logout

logging out merchant
destroy session
