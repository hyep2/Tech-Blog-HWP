// const { default: axios } = require("axios")


//getting the posts and display them
axios.get('/api/posts', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('badge')}`
  }
})
  .then(res => {
    console.log(res) //array of objects
    //want to put the posts on the page
    let posts = res.data
    posts.forEach(post => {
      document.getElementById('posts').innerHTML +=
        `
        <div class="card text-center">
          <div class="card-header">
            Post by ${post.User.username}
          </div>
          <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.content} </p>
              <hr>
              <form class="form-floating">
              <input class="form-control" id="${post.id}" >
             <label for="floatingInputValue">Add Comment</label>
              </form>
              <button class="addcomment" data-post="${post.id}">Add comments</button>
              <hr>
              <button class="post" data-post="${post.id}">See comments</button>
              <div id='comments ${post.id}'></div>
          </div>
          <div class="card-footer text-muted">
             Posted at: ${post.User.createdAt}
          </div>
          
        </div>
        <br>
      `
    })
  })


//add comments for each post when u press button for 'add comments'
document.addEventListener('click', event => {
  if (event.target.classList.contains('addcomment')) {
    event.preventDefault()

    let postId = event.target.dataset.post
    console.log(postId)
    console.log(document.getElementById(postId).value)
    let newComment = {
      body: document.getElementById(postId).value,
      postId: postId
    }
    console.log(newComment)

    axios.post('/api/comments', newComment, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('badge')}`
      }
    }
    )
      .then(res => {
        console.log(res)
      })
    }
})
  
  


//displaying comments when u press button for 'see comments'
  document.addEventListener('click', event=>{
    if(event.target.classList.contains('post')) {
      console.log(event.target.dataset.post)
      let postId=event.target.dataset.post
      axios.get(`/api/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('badge')}`
        }
      })
      .then(res=> {
        let comments = res.data.comments
        document.getElementById(`comments ${postId}`).innerHTML = "";
        comments.forEach(comment=> {
          document.getElementById(`comments ${postId}`).innerHTML+=
          `${comment.body}
          <br>`
        })
      })
  }})




//creating and submitting new post
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  alert('might need to refresh page to see all the posts')
  let newPost = {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value
  }

  //headers part is to make sure it knows it's authenticated
  axios.post('/api/posts', newPost, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('badge')}`
    }
  }
  )
    .then(res => {
      console.log(res.data)
    })
})


