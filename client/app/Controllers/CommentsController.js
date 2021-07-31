import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/logger.js'

function _draw() {
  let template = ''
  ProxyState.comments.forEach(c => {
    template += c.Template
  })
  document.getElementById('comments').innerHTML = template
}

export class CommentsController {
  constructor() {
    ProxyState.on('comments', _draw)
  }

  async getAll() {
    try {
      await commentsService.getAll()
    } catch (error) {
      logger.error(error)
    }
  }

  async createComment(event, postId) {
    try {
      event.preventDefault()
      const form = event.target
      const rawComment = {
        commentBody: form.commentBody.value,
        postId: postId
      }
      await commentsService.createComment(rawComment)
      // eslint-disable-next-line no-undef
      $('#newCommentsModal').modal('toggle')
      // eslint-disable-next-line no-undef
      $('body').removeClass('modal-open')
      // eslint-disable-next-line no-undef
      $('.modal-backdrop').remove()
    } catch (error) {
      logger.error(error)
    }
  }

  async upVote(commentId) {
    try {
      await commentsService.upVote(commentId)
    } catch (error) {
      logger.error(error)
    }
  }

  async downVote(commentId) {
    try {
      await commentsService.downVote(commentId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(commentId) {
    try {
      await commentsService.deleteComment(commentId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editComment(event, id) {
    try {
      await commentsService.editComment(event, id)
    } catch (error) {
      logger.error(error)
    }
  }
}
