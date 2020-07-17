const product = require('express')();
const productController = require('./controllers/index');

product.route('/')
  .get(productController.list)
  .post(productController.create);
product.get('/:productId', productController.getOne);

product.put('/:productId', productController.update);

module.exports =  product;