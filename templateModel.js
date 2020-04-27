const Mongoose = require('mongoose')

const templateSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  versions: {
    type: Array,

  },
},{timestamps: true})


templateSchema.statics = {
  list({match = {}, limit = 30, skip = 0, select={name: 1, versions: 1}}) {
    return this.find(match).limit(limit).skip(skip).select(select).lean()
  }
};

module.exports = Mongoose.model('Templates', templateSchema);