const rule = require('express')();
const ruleController = require('./controllers/index');

rule.route('/')
  .get(ruleController.list)
  .post(ruleController.create);

rule.get('/:ruleId', ruleController.getOne);
rule.put('/:ruleId', ruleController.update);

module.exports =  rule;