import { ProxyState } from '../AppState.js'
import Comment from '../Models/Comment.js'

class CommentsService {
  expand(boolean) {
    if (boolean) {
      document.getElementById('comments').classList.add('show')
      document.getElementById('comments').classList.remove('hide')
    } else {
      document.getElementById('comments').classList.add('hide')
      document.getElementById('comments').classList.remove('show')
    }
  }
}
export const commentsService = new CommentsService()
