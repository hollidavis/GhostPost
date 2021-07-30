import { ProxyState } from '../AppState.js'
import Comment from '../Models/Comment.js'

class CommentsService {
  expand(boolean) {
    if (boolean) {
      document.getElementById('comments').add('show')
      document.getElementById('comments').remove('hide')
    } else {
      document.getElementById('comments').add('hide')
      document.getElementById('comments').remove('show')
    }
  }
}
export const commentsService = new CommentsService()
