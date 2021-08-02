export class Post {
  constructor(data) {
    this.id = data.id
    this.postBody = data.postBody
    this.title = data.title
    this.location = data.location
    this.rating = data.rating
    this.img = data.img
    this.upVote = '0' || data.upVote
    this.downVote = '0' || data.downVote
    this.edited = false || data.edited
    this.creatorId = data.creatorId
  }

  get Template() {
    return /* HTML */`
    <div class="row my-3 mx-2 bg-light shadow-card">
            <div class="col-md-12">
                <div class="row pb-2">
                    <div id="vote-count"
                        class="col-md-1 d-flex flex-column align-items-center justify-content-center line-right">
                        <span class="mdi mdi-arrow-up-bold mdi-36px text-primary" id="upVote"></span>
                        <span id="upVoteCount">${this.upVote}</span>
                        <span id="downVoteCount">${this.downVote}</span>
                        <span class="mdi mdi-arrow-down-bold mdi-36px text-danger" id="downVote"></span>
                    </div>
                    <div class="col-md-11">
                        <div class="row justify-content-between align-items-center bg-light-gray px-2 mb-2">
                            <h2 class="my-1">${this.title}</h2>
                            <h4 id="delete-button" class="text-danger justify-text-end my-1" onclick="app.postsController.deletePost('${this.id}')"><b>X</b></h4>
                        </div>
                        <div class="row">
                            <div class="col-md-4 mx-0">
                                <img class = "post-img mb-2" src="${this.img}" alt="${this.location}">
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p class="d-flex align-items-center mdi mdi-map-marker mdi-24px mb-0">${this.location}</p>
                                        <div id="rating">
                                            ${this.getRatings}
                                        </div>
                                        <div>
                                                <p>${this.postBody}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12 d-flex justify-content-between">
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#v">
                                    <span class="mdi mdi-lead-pencil mdi-10px" title="Edit Post"> Edit Post</span>
                                </button>
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#commentsModal"><span class="mdi mdi-comment"></span>
                                    Comments
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
  }

  get getRatings() {
    let template = ''
    for (let i = 0; i <= this.rating - 1; i++) {
      template += '<span class="mdi mdi-ghost mdi-36px text-primary"></span>'
    }
    return template
  }
}
