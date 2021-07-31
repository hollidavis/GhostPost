import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/logger.js'

function _draw() {

}

export class CommentsController {
  constructor() {
    ProxyState.on('comments', _draw)
  }

  expand() {
    try {
      commentsService.expand()
    } catch (error) {
      logger.log(error)
    }
  }
}
