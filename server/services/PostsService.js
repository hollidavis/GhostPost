import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query).populate('creator', 'name picture')
    return posts
  }

  async getOne(id, userId) {
    // const post = await dbContext.posts.findOne({ _id: id, creatorId: userId })
    const post = await dbContext.Posts.findById(id).populate('creator', 'name picture')
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your post')
    }
    return post
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    return await this.getOne(post._id, body.creatorId)
  }

  async edit(body) {
    await this.getOne(body.id, body.creatorId)
    const post = await dbContext.Posts.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return post
  }

  async destroy(id) {
    // await this.getOne(body.id, body.creatorId)
    // find a new way to verify
    return await dbContext.Posts.findByIdAndDelete(id)
  }
}

export const postsService = new PostsService()
