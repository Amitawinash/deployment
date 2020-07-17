const Product = require('../model');

module.exports = (req, res) =>  {
  const {body, params} = req;
  const {rule} = body;
  rule.updatedAt = new Date();

  Product
    .updateDocument(params.ruleId, rule)
    .then((rule) => res.status(200).json({rule}))
    .catch(e => {
      console.log('update : ', e);
      res.status(500).json(e)
    });
}