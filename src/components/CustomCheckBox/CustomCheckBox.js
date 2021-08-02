import styled from 'styled-components'

const CheckboxContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
${props => props.containerStyle}
`

const Icon = styled.svg`
fill: none;
stroke: var(--primary);
stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
border: 0;
clip: rect(0 0 0 0);
clip-path: inset(50%);
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;
white-space: nowrap;
width: 1px;
`

const StyledCheckbox = styled.div`
display: inline-block;
width: 25px;
height: 25px;
background: white;
border-radius: 3px;
transition: all 150ms;
border:1px solid var(--info);
/* ${HiddenCheckbox}:focus + & {
box-shadow: 0 0 0 3px pink;
} */
&:hover{
  background-color: var(--secondary);
}
${Icon} {
visibility: ${props => (props.checked ? 'visible' : 'hidden')}
}
`

const CustomCheckBox = ({ checked, onChange, containerStyle }) => {
  return (
    <CheckboxContainer containerStyle={containerStyle}>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox='0 0 24 24'>
          <polyline points='20 6 9 17 4 12' />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
export default CustomCheckBox
