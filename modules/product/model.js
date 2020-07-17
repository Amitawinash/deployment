const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Types.ObjectId,
  collectionName = 'products',

  projectSchema = new Schema({
    name: {type: String, required: true},
    size: {type: String, required: true},
    type: {type: String, required: true},
    retailPrice: {type: String, required: true}
  }, {strict: false, timestamps: true});


projectSchema.statics = {
  getCount(query) {
    return this.countDocuments(query);
  },
  get(id) {
    return this.findOne({_id: ObjectId(id)}).select({name: 1, size: 1, type: 1, retailPrice: 1});
  },
  list({match = {}, skip = 0, limit = 30, sortBy = {"createdAt": -1}}) {
    return this.find(match).sort(sortBy).skip(skip).limit(limit);
  },
  updateDocument(_id, {name, size, type, retailPrice}) {
    return this.findByIdAndUpdate(_id, {$set: {name, size, type, retailPrice, updatedAt: new Date()}},
      {new: true})
  }
};

module.exports = mongoose.model(collectionName, projectSchema);