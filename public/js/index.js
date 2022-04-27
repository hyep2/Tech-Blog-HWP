

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
        
          </div>
          <div class="card-footer text-muted">
             Posted at: ${post.User.createdAt}
          </div>
        </div>
        <br>
      `
    })
  })

  // < h3 > ${ post.title } by ${ post.User.username }</ >
  //     <h4> ${post.content} </h4>
  //     <h6> Posted at: ${post.User.createdAt}</h6>
  //     <hr>

//creating and submitting new post
document.getElementById('submit').addEventListener('click', event => {
  // event.preventDefault()
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


