import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/logger.js'

function _draw() {
  const posts = ProxyState.posts
}

export class PostsController {
  constructor() {
    // ProxyState.on('posts', _draw)
    // ProxyState.on('account', this.getAll)
  }

  async getAll() {
    try {
      await postsService.getAll()
    } catch (error) {
      logger.error(error)
    }
  }

  upVote(postId) {
    logger.log('hello from upVote in PostsController')
    postsService.upVote(postId)
  }

  downVote(postId) {
    logger.log('downVote from PostController')
    postsService.downVote(postId)
  }
}
