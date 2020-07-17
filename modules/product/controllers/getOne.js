const Product = require('../model');

module.exports = (req, res) => {
  const {params:{productId}} = req;
  Product
    .get(productId)
    .then(product => res.status(200).json({product}))
    .catch(e => res.status(404).json("Error"));
};