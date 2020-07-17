const Rule = require('../model');

module.exports = (req, res) => {
  const {newRule = {}} = req.body || {};

  new Rule({...newRule, createdAt: new Date().toISOString()})
    .save()
    .then(result => res.status(200).json({rule: result}))
    .catch(e => {console.log(e)});
};