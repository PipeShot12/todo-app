import { useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../TodoItem/TodoItem'
import TodoItemComplete from '../TodoItemCompleted/TodoItemCompleted'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styledTransition from '../Transition/Slide'
export default function TodoList ({ list, deleteTodo, deleteAllCompleted, changeToCompleted, changeToUncompleted }) {
  const [showCompletedTodos, setShowCompletedTodos] = useState(false)

  const handleShowCompletedTodos = e => {
    setShowCompletedTodos(prev => !prev)
  }

  const pnedingTodos = (item) => {
    const unCompleted = item.filter(item => !item.complete).length
    return unCompleted > 0 ? `You have ${unCompleted} pending tasks` : null
  }

  const completedTodos = (item) => {
    return item.length > 0 ? Math.floor(((item.filter(item => item.complete).length) / item.length) * 100) : 0
  }

  return (
    <>
      <TitlePendingTodos>{pnedingTodos(list)}</TitlePendingTodos>
      <ContainerTodoList>
        <TransitionGroup component={styledTransition}>
          {list.map((item, index) => !item.complete
            ? (
              <CSSTransition key={item.id} timeout={500} classNames='item'>
                <TodoItem key={item.id} todo={item} deleteTodo={deleteTodo} changeToCompleted={changeToCompleted} />
              </CSSTransition>)
            : null)}
        </TransitionGroup>
      </ContainerTodoList>
      {showCompletedTodos &&
        <ContainerTodoList>
          <TitlePendingTodos>Completed Tasks {completedTodos(list)} %</TitlePendingTodos>
          <TransitionGroup component={styledTransition}>
            {list.map((item, index) => item.complete
              ? (
                <CSSTransition key={item.id} timeout={500} classNames='item'>
                  <TodoItemComplete key={item.id} todo={item} deleteTodo={deleteTodo} changeToUncompleted={changeToUncompleted} />
                </CSSTransition>)
              : null)}
          </TransitionGroup>
        </ContainerTodoList>}
      <CompletedControls>
        <ShowCompleted onClick={handleShowCompletedTodos}>{showCompletedTodos ? 'Hide Completed' : 'Show Completed'}</ShowCompleted>
        <ShowCompleted onClick={deleteAllCompleted}>{list.filter(item => item.complete).length > 0 && showCompletedTodos ? 'Delete All' : null}</ShowCompleted>
      </CompletedControls>
    </>
  )
}

const ContainerTodoList = styled.div`
margin: 25px 0px;
`
const TitlePendingTodos = styled.p`
margin-top: 25px;
color: var(--text);
font-size: 18px;
`
const ShowCompleted = styled.p`
color: var(--text);
font-size: 16px;
font-weight: 500;
margin:30px 0;
cursor: pointer;
user-select: none;

`
const CompletedControls = styled.div`
display: flex;
justify-content: space-between;
align-self: flex-end;
`
