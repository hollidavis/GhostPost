import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Post as PostSchema } from '../models/Post'
import { Comment as CommentSchema } from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
