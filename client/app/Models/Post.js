export class Post {
  constructor(data) {
    this.id = data.id
    this.postBody = data.postBody
    this.title = data.title
    this.location = data.location
    this.rating = data.rating
    this.img = data.img
    this.upVote = data.upVote || 0
    this.downVote = data.downVote || 0
    this.edited = data.edited || false
    this.creatorId = data.creatorId
  }
}
