export default class Comment {
  constructor(data) {
    this.commentBody = data.commentBody
    this.postId = data.postId
    this.creatorId = data.creatorId
  }

  get Template() {
    return /* HTML */`
    <div class="card bg-medium">
          <div class="card-body">
              <p>${this.commentBody}</p>
          </div>
      </div>`
  }
}
