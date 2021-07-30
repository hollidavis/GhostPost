export class Post {
  constructor(data) {
    this.id = data.id
    this.postBody = data.postBody
    this.location = data.location
    this.rating = data.rating
    this.img = data.img
    this.upVote = data.upVote
    this.downVote = data.downVote
    this.edited = data.edited
    this.creatorId = data.creatorId
  }
}
