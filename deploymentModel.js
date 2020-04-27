const Mongoose = require('mongoose')

const deploymentSchema = new Mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  templateId: {
    type: String,
    required: true
  },
  version: {
    type: Array,
    required: true
  },
  deployedAt: {
    type: Date
  }
});

deploymentSchema.statics = {
  list({match = {}, limit = 30, skip = 0}) {
    return this.find(match).limit(limit).skip(skip).populate([
      {
        path: 'templateId',
        model: 'Templates',
        select: 'name'
      },
    ]).lean()
  }
};

module.exports = Mongoose.model('Deployments', deploymentSchema);