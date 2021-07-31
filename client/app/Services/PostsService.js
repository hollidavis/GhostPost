import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { api } from '.AxiosService.js'
import { logger } from '../Utils/logger.js'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async upVote(postId) {
    try {
      const foundPost = ProxyState.posts.find(p => p.id === postId)
      foundPost.upVote++
      await api.put('posts/' + postId, foundPost)
      // eslint-disable-next-line no-self-assign
      ProxyState.posts = ProxyState.posts
    } catch (error) {
      logger.log(error)
    }
  }
}

export const postsService = new PostsService()
