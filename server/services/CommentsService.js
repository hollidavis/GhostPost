import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return comments
  }

  async getOne(id, userId) {
    // const comment = await dbContext.comments.findOne({ _id: id, creatorId: userId })
    const comment = await dbContext.Comments.findById(id).populate('creator', 'name picture')
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your comment')
    }
    return comment
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    return await this.getOne(comment._id, body.creatorId)
  }

  async edit(body) {
    await this.getOne(body.id, body.creatorId)
    const comment = await dbContext.Comments.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return comment
  }

  async destroy(body) {
    await this.getOne(body.id, body.creatorId)
    return await dbContext.Comments.findByIdAndDelete(body.id)
  }
}

export const commentsService = new CommentsService()
