//creating and submitting new post
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
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

