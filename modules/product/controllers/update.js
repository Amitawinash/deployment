const Product = require('../model');

module.exports = (req, res) =>  {
  const {body, params} = req;
  const {product} = body;
  product.updatedAt = new Date();

  Product
    .updateDocument(params.productId, product)
    .then((product) => res.status(200).json({product}))
    .catch(e => {
      console.log('update : ', e);
      res.status(500).json(e)
    });
}