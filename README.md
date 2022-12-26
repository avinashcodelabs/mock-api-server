# mock-api-server

## Installtion
`npm install @avinashcodelabs/mock-api-server`

## Setup

At the entry point of the app, for React apps, the index.js file is preferred.

```js
# index.js

import { startServer } from "@avinashcodelabs/mock-api-server";
startServer();
```

### API usage

```js
/**
 * 
 * @returns [
  {
    id: 1,
    name: "text",
    description: "text",
    price: 10.5,
    imgUrl: "url",
  },
  {
    id: 2,
    name: "text",
    description: "text",
    price: 10,
    imgUrl: "url",
  },
]
 */
function getProducts() {
  return fetch("http://api.avinashcodelabs.com/api/products")
    .then((res) => res.json())
    .then((products) => {
      return products;
    });
}

/**
 * 
 * @param {number} id 1to5 
 * @returns {
    id: 1,
    name: "text",
    description: "text",
    price: 10.5,
    imgUrl: "url",
  }
 */
function getProduct(id) {
  return fetch(`http://api.avinashcodelabs.com/api/products/${id}`)
    .then((res) => res.json())
    .then((product) => product);
}

/**
 * 
 * @param {object} p  {
    name: "text",
    description: "text",
    price: 10.5,
    imgUrl: "url",
  }
 * @returns  {
    id: 1,
    name: "text",
    description: "text",
    price: 10.5,
    imgUrl: "url",
  }
 */
function createProduct(p) {
  return fetch(`http://api.avinashcodelabs.com/api/products`, {
    method: "POST",
    body: JSON.stringify(p),
  }).then((res) => res.json());
}

/**
 * 
 * @param {object} p  {
    id: 1,
    name: "text",
    description: "text",
    price: 10.5,
    imgUrl: "url",
  }
 * @returns {
    id: 1,
    name: "text",
    description: "text",
    price: 10.5,
    imgUrl: "url",
  }
 */
function updateProduct(p) {
  return fetch(`http://api.avinashcodelabs.com/api/products/${p.id}`, {
    method: "PUT",
    body: JSON.stringify(p),
  })
    .then((res) => res.json())
    .then((data) => data);
}

/**
 *
 * @param {number} id 1to5
 * @returns null
 */
function deleteProduct(id) {
  return fetch(`http://api.avinashcodelabs.com/api/products/${id}`, {
    method: "DELETE",
  }).then((d) => d);
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };

```
