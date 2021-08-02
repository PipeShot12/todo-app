
import styled from 'styled-components'
import { useState } from 'react'
import CustomButton from '../CustomButton/CustomButton'

export default function AddInput ({ addTodo }) {
  const [todo, setTodo] = useState('')
  const hadleChange = e => {
    setTodo(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (todo.length > 4) {
      addTodo(todo)
      setTodo('')
    }
  }
  return (
    <ConstainerInput onSubmit={handleSubmit}>
      <InputText type='text' placeholder='Enter a todo' onChange={hadleChange} value={todo} />
      <CustomButton classIcon='fas fa-plus' task={todo} />
    </ConstainerInput>
  )
}
const ConstainerInput = styled.form`
display: flex;
margin-top: 25px;
`
const InputText = styled.input.attrs({ type: 'text' })`
width: 80%;
padding: 0px 5px;
height: 40px;
border-radius: 3px;
border: 1px solid var(--info);
font-size: 20px;
color: var(--text);
::placeholder {
    font-style: italic;
    font-size: 15px;
    color:#a0a0a0;
    padding-left: 5px;
  }
  outline: none;

`
