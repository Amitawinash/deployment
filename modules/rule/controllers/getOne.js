const Rule = require('../model');

module.exports = (req, res) => {
  const {params:{ruleId}} = req;
  Rule
    .get(ruleId)
    .then(rule => res.status(200).json({rule}))
    .catch(e => res.status(404).json("Error"));
};