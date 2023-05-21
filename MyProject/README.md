# StockAPI

An inventory control API for managing products and stocks.

> Status: Developing ⚠️

## Description

StockAPI is a stock control API that allows you to manage product information and their respective inventories. With it, you can list products, add new products, update information, remove products, and manage the inventories of each product.

## Features

- List products
- Add new product
- Update product information
- Remove product
- Manage product stocks
- etc.

## Installation

Follow the instructions below to set up and run the API locally.

1. Clone this repository:

git clone https://github.com/gabrielforcellini/APIStock.git

2. Run `npm i` command to install dependencies
3. Setup database settings inside `.env` file

Create a `.env` file in the project root and set the required environment variables, such as database credentials

4. Run `npm start` command to run the application

4. The API will be available at http://localhost:3000.

## Usage

StockAPI provides various endpoints to interact with the API resources. Below are examples of how to use some of the main features.

## Routes

### User

- POST /user/create
Example request:

```json
{
    "name": "Joao",
    "lastname": "Silva",
    "mail": "joao@gmail.com",
    "telephone": "48999999999",
    "password": "******",
    "address": 1
}
```

- GET /user/`id`
- GET /user/find-one/`id`
- GET /user/find-all
- PATCH /user/`id`
- DELETE /user/`id`

### Supplier

- POST /supplier/create
Example request:

```json
{
    "name": "Joao",
    "telephone": "48999999999",
    "mail": "joao@gmail.com",
    "address": 1,
    "cnpj": "52.753.874/0001-12",
    "fantasy_name": "joaodasilvafantasia",
    "active_status": true
}
```

- GET /supplier/`id`
- GET /supplier/find-one
- GET /supplier/find-all
- PATCH /supplier/`id`
- DELETE /supplier/`id`

### Product

- POST /product/create
Example request:

```json
{
    "name": "faróis de milha",
    "part_number": "1234",
    "bar_code": "234234",
    "buy_price": 123,
    "sale_price": 133,
    "category": 1,
    "supplier": 1,
    "active_status": true,
    "create_date": "2023-05-21",
    "update_date": "2023-05-21",
    "brand": "generica",
}
```

- GET /product/`id`
- GET /product/find-one
- GET /product/find-all
- PATCH /product/`id`
- DELETE /product/`id`

### Establishment

- POST /establishment/create
Example request:

```json
{
    "name": "matriz",
    "code": "1",
    "address": 1
}
```

- GET /establishment/`id`
- GET /establishment/find-one
- GET /establishment/find-all
- PATCH /establishment/`id`
- DELETE /establishment/`id`

### Category

- POST /category/create
Example request:

```json
{
    "code": "1234",
    "description": "material"
}
```
- GET /category/`id`
- GET /category/find-one
- GET /category/find-all
- PATCH /category/`id`
- DELETE /category/`id`