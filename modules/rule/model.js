const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Types.ObjectId,
  collectionName = 'rules',

projectSchema = new Schema({
    name: {type: String, required: true},
    count: {type: String, required: true},
    discount: {type: String, required: true},
    productId: {type: Schema.ObjectId, ref: 'products', required: [true, 'Product Id is required']}
  }, {strict: false, timestamps: true}),
  populate = [
    {
      path: 'productId',
      model: 'products',
      select: 'name size type retailPrice'
    }];

projectSchema.statics = {
  getCount(query) {
    return this.countDocuments(query);
  },
  get(id) {
    return this.findOne({_id: ObjectId(id)});
  },
  list({match = {}, skip = 0, limit = 30, sortBy = {"createdAt": -1}}) {
    return this.find(match).sort(sortBy).skip(skip).limit(limit).populate(populate);
  },
  updateDocument(_id, {name, count, discount, productId}) {
    return this.findByIdAndUpdate(_id,
      {$set: {name, count, discount, productId, updatedAt: new Date()}},
      {new: true});
  }
};

module.exports = mongoose.model(collectionName, projectSchema);