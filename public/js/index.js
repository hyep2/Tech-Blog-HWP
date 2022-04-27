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
              <button class="post" data-post="${post.id}">See comments</button>
              <button class="addcomment" data-post="${post.id}">Add comments</button>
              <hr>
              <div id='comments'></div>
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
        let notes = res.data.notes
        notes.forEach(note=> {
          document.getElementById('comments').innerHTML+=
          `${note.body}
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


