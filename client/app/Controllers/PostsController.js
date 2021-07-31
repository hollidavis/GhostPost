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
    ProxyState.on('profile', this.getAll)
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
      await postsService.createPost(rawPost)
      // eslint-disable-next-line no-undef
      $('#newPostsModal').modal('toggle')
      // eslint-disable-next-line no-undef
      $('body').removeClass('modal-open')
      // eslint-disable-next-line no-undef
      $('.modal-backdrop').remove()
    } catch (error) {
      logger.error(error)
    }
  }

  async upVote(postId) {
    try {
      await postsService.upVote(postId)
    } catch (error) {
      logger.error(error)
    }
  }

  async downVote(postId) {
    try {
      await postsService.downVote(postId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deletePost(id) {
    try {
      await postsService.deletePost(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async editPost(event, id) {
    try {
      await postsService.editPost(event, id)
    } catch (error) {
      logger.error(error)
    }
  }
}
