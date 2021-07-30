import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Comment = new Schema({
  commentBody: { type: String, required: true },
  postId: { type: ObjectId, ref: 'Post', required: true },
  creatorId: { type: ObjectId, ref: 'Account', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Comment.virtual('post', {
  localField: 'postId',
  ref: 'Post',
  foreignField: '_id',
  justOne: true
})
