import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { api } from './AxiosService.js'
import { logger } from '../Utils/logger.js'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async createPost(rawPost) {
    const res = await api.post('', rawPost)
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)]
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

  async downVote(postId) {
    try {
      const foundPost = ProxyState.posts.find(p => p.id === postId)
      foundPost.downVote++
      await api.put('posts/' + postId, foundPost)
      // eslint-disable-next-line no-self-assign
      ProxyState.posts = ProxyState.posts
    } catch (error) {
      logger.log(error)
    }
  }

  async deletePost(postId) {
    const foundPost = ProxyState.posts.find(p => p.id === postId)
    await api.delete(foundPost.id)
    ProxyState.posts = ProxyState.posts.filter(p => p.id !== postId)
  }

  async editPost(postId, body) {
    let foundPost = ProxyState.posts.find(p => p.id === postId)
    const res = await api.put('posts/' + postId, body)
    foundPost = res.data
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
  }
}

export const postsService = new PostsService()
