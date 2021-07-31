import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { api } from './AxiosService.js'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }
}

  async upVote() {
    try {
      const res = await api.put()
    } catch (error) {
      console.log(error)
    }
  }

export const postsService = new PostsService()
