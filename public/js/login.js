document.getElementById('login-btn').addEventListener('click', event => {
  event.preventDefault()
  let loggedUser = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }
  
  axios.post('/user/login', loggedUser)
    .then(res => {
      //the res.data shld be jsonwebtoken aka your badge
      //allows u to have access to authenticated browse 
      //will put this token in local storage
      localStorage.setItem('badge', res.data)
     window.location = 'index.html'
    })
})