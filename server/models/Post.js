import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Post = new Schema({
  postBody: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  img: { type: String, required: true },
  edited: { type: Boolean, required: true, default: false },
  creatorId: { type: ObjectId, ref: 'Account', required: true }

},
{ timestamps: true, toJSON: { virtuals: true } }
)
Post.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
