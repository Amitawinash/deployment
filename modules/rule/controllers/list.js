const Rule = require('../model');

module.exports = (req, res) => {
  const {query: {q, limit, skip}} = req;
  const queryObj = {
    match: {...JSON.parse(q || {})},
    sortBy: {"createdAt": -1},
    limit: parseInt(limit || 10),
    skip: parseInt(skip || 0),
  };

  if(queryObj.match.name) queryObj.match["name"] = new RegExp(queryObj.match.name, 'i');

  Promise.all([
    Rule.list( queryObj),
    Rule.getCount(queryObj.match)
  ])
    .then(([rules, count]) => res.status(200).json({rules, count}))
    .catch(e => console.log(e));
};
