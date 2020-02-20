var db = require("../../db");
var Product = require("../../models/product.model");
module.exports = {
  index: async function(req, res) {
    var products = await Product.find();
    res.json(products);
  },
  createProduct: async function(req, res) {
    var products = await Product.create(req.body);
    res.json(products);
  }
};
