import { AuthController } from './Controllers/AuthController.js'
import { PostsController } from './Controllers/PostsController.js'
import { CommentsController } from './Controllers/CommentsController.js'

class App {
authController = new AuthController();
postsController = new PostsController();
commentsController = new CommentsController();
}
// eslint-disable-next-line dot-notation
window['app'] = new App()
