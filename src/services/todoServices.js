const todoUrl = 'http://localhost:8080/api/v1/todos'

const getAllTodos = async (token) => {
  const req = await window.fetch(todoUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return req
}
const createTodo = async (title, token) => {
  const req = await window.fetch(todoUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  })
  return req
}
const deleteTodo = async (id, token) => {
  const req = await window.fetch(`${todoUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  return req
}
const updateTodo = async (id, complete, token) => {
  const req = await window.fetch(`${todoUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ complete })
  })
  return req
}
const deleteAllCompleted = async (todos, token) => {
  const req = await window.fetch(`${todoUrl}/delete-completed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ todos })
  })
  return req
}

export default { getAllTodos, createTodo, updateTodo, deleteTodo, deleteAllCompleted }
