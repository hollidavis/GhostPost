import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'

function _draw() {

}

export default class CommentsController {
  constructor() {

  }

  expand() {
    try {
      commentsService.expand()
    } catch (error) {
      logger.log(error)
    }
  }
}
