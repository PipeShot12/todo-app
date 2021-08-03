import { Button, withStyles } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContex'
import AddInput from '../../components/AddInput/AddInput'
import Modal from '../../components/Modal/Modal'
import styled from 'styled-components'
import TodoList from '../../components/TodoList/TodoList'
import todoServices from '../../services/todoServices'
import mediaQuery from '../../components/mediaQuery'
const CustomButton = withStyles({
  root: {
    width: '40%',
    height: '50px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    fontWeight: 'initial',
    color: 'white',
    padding: '6px 12px',
    lineHeight: 1.5,
    backgroundColor: props => props.backgroundColor || 'var(--primary)',
    '&:hover': {
      // backgroundColor: '#F35BB8',
      backgroundColor: props => props.hover || '#F35BB8',
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#F35BB8',
      borderColor: '#005cbf'
    }
  }
})(Button)
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
    <ContainerStyle>
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <IconModal className='fas fa-question-circle' />
          <TitleModal>Are You Sure {username}?</TitleModal>
          <CustomButton onClick={deleteAllCompleted}>Yes</CustomButton>
        </Modal>}
      <Logount onClick={handleLogout}>Logout</Logount>
      <Title>Todo List</Title>
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
const ContainerStyle = styled.div`
color: white;
background-color: var(--secondary);
height: 95vh;
width: 95vw;
border-radius: 5px;
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
::-webkit-scrollbar{
    width: 8px;
}
::-webkit-scrollbar-track{
    background: var(--info)
}
::-webkit-scrollbar-thumb{
    background: #f02b41;
    
}
::-webkit-scrollbar-thumb:hover{
    background: #F35BB8
}
`
const Title = styled.h1`
color:var(--primary);
/* font-size: 1.5em;
font-weight: 400; */
font-size: 2.5em;
font-weight: 300;
`
const Logount = styled.p`
color:#8170D6;
/* font-size: 1.5em;
font-weight: 400; */
font-size: 2em;
font-weight: 300;
text-align: right;
cursor: pointer;
`
const IconModal = styled.i`
color:#8170D6;
font-size:4em;
`
const TitleModal = styled(Title)`
color: #8170D6;
font-size: 2em;
`
