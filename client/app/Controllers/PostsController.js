import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/logger.js'

function _draw() {
  let template = ''
  ProxyState.posts.forEach(p => {
    template += p.Template
  })
  document.getElementById('posts').innerHTML = template
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', _draw)
    ProxyState.on('account', this.getAll)
  }

  async getAll() {
    try {
      await postsService.getAll()
    } catch (error) {
      logger.error(error)
    }
  }

  async createPost(event) {
    try {
      event.preventDefault()
      const form = event.target
      const rawPost = {
        postBody: form.postBody.value,
        title: form.title.value,
        location: form.location.value,
        rating: form.rating.value,
        img: form.img.value
      }
      await postsService.create(rawPost)
    } catch (error) {
      logger.error('could not create post from Controller')
    }
  }

  async upVote(postId) {
    try {
      logger.log('hello from upVote in PostsController')
      await postsService.upVote(postId)
    } catch (error) {
      logger.error('invalid id')
    }
  }

  downVote(postId) {
    logger.log('downVote from PostController')
    postsService.downVote(postId)
  }

  async deletePost(postId) {
    try {
      await postsService.deletePost(postId)
    } catch (error) {
      logger.error('not deleting from controller')
    }
  }

  async editPost(postId, body) {
    try {
      await postsService.editPost
    } catch (error) {
      logger.error('invalid id')
    }
  }
}
