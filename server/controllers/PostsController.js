import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll({ creatorId: req.userInfo.id })
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const post = await postsService.getOne(req.params.id, req.userInfo.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const post = await postsService.edit(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
