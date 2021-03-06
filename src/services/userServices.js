const loginUrl = 'https://todo-list-app-pipe-api.herokuapp.com/api/v1/login'
const registerUrl = 'https://todo-list-app-pipe-api.herokuapp.com/api/v1/user'
const loginService = async (userData) => {
  const req = await window.fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  return req
}
const registerService = async (userData) => {
  const req = await window.fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  return req
}
export default { loginService, registerService }
