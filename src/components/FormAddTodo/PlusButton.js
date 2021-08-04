import React from 'react'
import styled from 'styled-components'
const Button = styled.button`
background-color: ${({ task }) => task.length > 4 ? 'var(--primary)' : 'var(--info)'};
color:white;
font-weight: bold;
max-height: 40px;
width: 20%;
border-radius: 3px;
margin-left: 5px;
display: flex;
align-items: center;
justify-content: center;
font-size:25px;
padding-top: 2px;
transition: background-color 0.2s ease-in;
cursor: pointer;
outline: none;
border: none;
`
export default function CustomButton ({ task, classIcon }) {
  return (
    <>
      <Button task={task}>
        <i className={classIcon} />
      </Button>
    </>
  )
}
