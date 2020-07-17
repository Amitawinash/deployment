const Product = require('../model');

module.exports = (req, res) => {
  const {newProduct = {}} = req.body || {};

  new Product({...newProduct, createdAt: new Date().toISOString()})
    .save()
    .then(result => res.status(200).json({product: result}))
    .catch(e => {console.log(e)});
};