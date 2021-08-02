import CustomCheckBox from '../CustomCheckBox/CustomCheckBox'
import { useState } from 'react'
import styled from 'styled-components'

export default function TodoItem ({ todo, deleteTodo, changeToCompleted }) {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (e, todo) => {
    setChecked(e.target.checked)
    changeToCompleted(todo)
  }
  const hadleClick = (e, todo) => {
    deleteTodo(todo)
  }
  return (
    <ContainerItem>
      <label>
        <CustomCheckBox
          checked={checked}
          containerStyle={{ margin: '0px 10px' }}
          onChange={e => handleCheckboxChange(e, todo)}
        />
      </label>
      <TodoTitle>{todo?.title}</TodoTitle>
      <DeleteBox className='deleteBox' onClick={e => hadleClick(e, todo)}>
        <TrashIcon className='fas fa-trash trashIcon' />
      </DeleteBox>
    </ContainerItem>

  )
}

const ContainerItem = styled.div`
background-color: #E0E8F5;
height: 50px;
padding:5px;
display: flex;
align-items: center;
border-radius: 3px;
position: relative;
margin: 10px 0;
:hover{ 
  .deleteBox{
    opacity: 1;
    visibility: visible;
    width: 50px;

  }
  .trashIcon{
    opacity: 1;
    visibility: visible;
  }
}
`

const TodoTitle = styled.p`
color: var(--text);
`

const TrashIcon = styled.i`
  visibility: hidden;
  opacity: 0;
  transition: visibility 50ms, opacity 0.3s linear;
`
const DeleteBox = styled.div`
background-color: var(--primary);
height: 50px;
width: 0;
border-radius: 0 3px 3px 0;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
right: 0;
cursor: pointer;
opacity: 0;
visibility: hidden;
transition: visibility 0.3s, width 0.3s, opacity 350ms linear;

`
