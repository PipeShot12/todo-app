import { animated } from 'react-spring'
import { EnterAnimation } from '../../animation'
import { Title, Container } from '../../commonStyles'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContex'
import AddInput from '../../components/FormAddTodo/Input'
import CustomButton from '../../components/CustomButton'
import mediaQuery from '../../components/mediaQuery'
import Modal from '../../components/Modal'
import styled from 'styled-components'
import TodoList from '../../components/TodoList'
import todoServices from '../../services/todoServices'

export default function Todo () {
  const { localStorageToken, saveTemporalToken, setSaveTemporalToken, setLocalStorageToken } = useUser()
  const [todos, setTodos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()
  const { token, username } = localStorageToken || saveTemporalToken
  useEffect(() => {
    todoServices.getAllTodos(token)
      .then(res => res.json())
      .then(res => setTodos(res))
      .catch(() => {
        history.replace('/')
        setLocalStorageToken('')
        window.localStorage.removeItem('loginToken')
      })
  }, [])

  const addTodo = (newTodo) => {
    todoServices.createTodo(newTodo, token)
      .then(res => res.json())
      .then(res => setTodos(prev => [res, ...prev]))
  }
  const deleteTodo = ({ id }) => {
    todoServices.deleteTodo(id, token)
      .then(res => {
        if (res.status === 204) {
          setTodos(todos.filter(item => item.id !== id))
        }
      })
  }
  const deleteAllCompleted = () => {
    const ids = todos.filter(item => item.complete).map(todo => todo.id)
    todoServices.deleteAllCompleted(ids, token).then(res => {
      if (res.status === 204) {
        setTodos(todos.filter(item => !item.complete))
        setShowModal(false)
      }
    })
  }
  const changeToCompleted = ({ id }) => {
    todoServices.updateTodo(id, true, token)
      .then(res => res.json())
      .then(res => {
        setTodos([res, ...todos.filter(item => item.id !== id)])
      })
  }
  const changeToUncompleted = ({ id }) => {
    todoServices.updateTodo(id, false, token)
      .then(res => res.json())
      .then(res => {
        setTodos([res, ...todos.filter(item => item.id !== id)])
      })
  }
  const handleLogout = () => {
    if (localStorageToken) {
      setLocalStorageToken('')
      setTimeout(() => window.localStorage.removeItem('loginToken'), 200)
      history.replace('/')
    } else if (saveTemporalToken) {
      setSaveTemporalToken('')
      history.replace('/')
    }
  }
  const deleteAllCompletedModal = () => {
    setShowModal(true)
  }
  return (
    <ContainerStyle style={EnterAnimation()}>
      {showModal &&
        <Modal 
        onClose={() => setShowModal(false)} 
        icon='fas fa-question-circle'
        iconColor='#8170D6'
        iconSize="4em"

        titleColor='#8170D6'
        titleSize='2em'
        titleText={`Are You Sure ${username}?`}
        >
          <CustomButton width="40%" onClick={deleteAllCompleted}>Yes</CustomButton>
        </Modal>}
      <Title 
      onClick={handleLogout}
      size='2em'
      textAlign='right'
      cursor='pointer'
      color='#8170D6'
      >Logout</Title>
      <Title textAlign='left' >Todo List</Title>
      <AddInput addTodo={addTodo} />
      <TodoList
        list={todos}
        deleteTodo={deleteTodo}
        deleteAllCompleted={deleteAllCompletedModal}
        changeToCompleted={changeToCompleted}
        changeToUncompleted={changeToUncompleted}
      />
    </ContainerStyle>
  )
}
const ContainerStyle = animated(styled(Container)`
padding: 0 20px;
overflow: hidden;
overflow-y: auto;

@media (min-width:${mediaQuery.tabletW}) and (max-width:${mediaQuery.desktop}){
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
}
@media (min-width :${mediaQuery.desktop}){
  height: 66vh;
  width: 420px;
}
`)
