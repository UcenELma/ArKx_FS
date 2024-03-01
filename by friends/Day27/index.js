const mongoose = require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

const ProductModel = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const products = mongoose.model('products', ProductModel);

function sortByPrice() {
  products.find()
    .sort({ price: -1 })
    .then((products) => {
      console.log("Sorted products:", products);
    })
    .catch((error) => console.log("Error products sorting: ", error))
}

function limitedResult() {
  const pageSize = 5;
  const pageNumber = 1;

  products.find()
    .sort({ price: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((products) => {
      console.log(`Page ${pageNumber} of products:`);
      console.log(products);
    })
    .catch((error) => console.log("Error retrieving products: ", error));
}

function customPagination() {
  const pageSize = 2;
  const pageNumber = 3;

  products.find()
    .sort({ price: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((products) => {
      console.log(`Products for page ${pageNumber}:`, products);
    })
    .catch((error) => console.log("Error retrieving products: ", error));
}

function countProduct() {
  products.aggregate([
    { $match: { inStock: true } },
    { $group: { _id: null, count: { $sum: 1 } } }
  ])
    .then((result) => {
      // Log the count of products in stock
      if (result.length > 0) {
        let count = result[0].count
        console.log("Number of products in stock:", count);
      } else console.log("No products in stock.");
    })
    .catch((error) => console.log("Error counting products: ", error));
}

function averagePrice() {
  products.aggregate([
    { $group: { _id: null, averagePrice: { $avg: "$price" } } }
  ])
    .then((result) => {
      if (result.length > 0) {
        console.log("Average price of all products:", result[0].averagePrice);
      } else {
        console.log("No products found.");
      }
    })
    .catch((error) => console.log("Error calculating average price: ", error));
}

function sortByName() {
  products.find()
    .sort({ name: 1 })
    .then((products) => {
      console.log("Sorted products by name:", products);
    })
    .catch((error) => console.log("Error retrieving and sorting products: ", error));
}

function groupByCategory() {
  const dynamicPageSize = 4;
  const pageNumber = 1;

  products.find()
    .sort({ name: 1 })
    .skip((pageNumber - 1) * dynamicPageSize)
    .limit(dynamicPageSize)
    .then((products) => {
      console.log(`Products for page ${pageNumber} with page size ${dynamicPageSize}:`, products);
    })
    .catch((error) => console.log("Error retrieving and paginating products: ", error));
}

function dynamicResult() {
  products.aggregate([
    { $group: { _id: "$category", products: { $push: "$$ROOT" }, count: { $sum: 1 } } }
  ])
    .then((result) => {
      console.log("Products grouped by categories:", result);
    })
    .catch((error) => console.log("Error grouping products: ", error))
}

// sortByPrice()
// limitedResult()
// customPagination()
// countProduct()
// averagePrice()
sortByName()
// groupByCategory()
// dynamicResult()
