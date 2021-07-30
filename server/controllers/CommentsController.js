import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const comments = await commentsService.getAll({ creatorId: req.userInfo.id })
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const comment = await commentsService.getOne(req.params.id, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.edit(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await commentsService.destroy(req.body)
      res.send({ message: 'Successfully Deleted' })
    } catch (error) {
      next(error)
    }
  }
}
