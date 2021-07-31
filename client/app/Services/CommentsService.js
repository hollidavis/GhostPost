import { ProxyState } from '../AppState.js'
import Comment from '../Models/Comment.js'
import { api } from './AxiosService.js'
import { logger } from '../Utils/logger.js'

class CommentsService {
  async getAll() {
    const res = await api.get('api/comments')
    ProxyState.comments = res.data.map(p => new Comment(p))
  }

  async createComment(rawComment) {
    const res = await api.post('api/comments', rawComment)
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
  }

  async upVote(commentId) {
    try {
      const foundComment = ProxyState.comments.find(p => p.id === commentId)
      foundComment.upVote++
      await api.put('comments/' + commentId, foundComment)
      // eslint-disable-next-line no-self-assign
      ProxyState.comments = ProxyState.comments
    } catch (error) {
      logger.log(error)
    }
  }

  async downVote(commentId) {
    try {
      const foundComment = ProxyState.comments.find(p => p.id === commentId)
      foundComment.downVote++
      await api.put('comments/' + commentId, foundComment)
      // eslint-disable-next-line no-self-assign
      ProxyState.comments = ProxyState.comments
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteComment(commentId) {
    const foundComment = ProxyState.comments.find(p => p.id === commentId)
    await api.delete(foundComment.id)
    ProxyState.comments = ProxyState.comments.filter(p => p.id !== commentId)
  }

  async editComment(commentId, body) {
    let foundComment = ProxyState.comments.find(p => p.id === commentId)
    const res = await api.put('comments/' + commentId, body)
    foundComment = res.data
    // eslint-disable-next-line no-self-assign
    ProxyState.comments = ProxyState.comments
  }
}
export const commentsService = new CommentsService()
