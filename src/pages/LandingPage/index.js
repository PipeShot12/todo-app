/* eslint-disable jsx-a11y/alt-text */
import { Button, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import todoLandingImage from '../../assets/todoLandingImage.svg'
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

export default function LandingPage () {
  return (
    <ContainerStyle>
      <ContainerPhoto>
        <Title>Todo List App</Title>
        <img src={todoLandingImage} atl='todo list app' />
      </ContainerPhoto>
      <ContainerButtons>
        <CustomButton
          component={Link}
          to='/sign-in'
          hover='#58A600'
          backgroundColor='#8170D6'
        >Sign In
        </CustomButton>
        <CustomButton
          component={Link}
          to='/sign-up'
        >Sign Up
        </CustomButton>
      </ContainerButtons>
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
color: white;
background-color: var(--secondary);
height: 95vh;
width: 95vw;
border-radius: 5px;
padding: 50px 0px;
overflow: hidden;
overflow-y: auto;

display: flex;
flex-direction: column;
@media (min-width :${mediaQuery.desktop}){
  height: 80vh;
  width: 80vw;
  flex-direction: column;
  justify-content: center;

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
font-size: 3.5em;
font-weight: 300;
padding-top: 40px;
`
const ContainerPhoto = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media (min-width :${mediaQuery.desktop}){
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
`
const ContainerButtons = styled.div`
display: flex;
align-items: flex-end;
justify-content: space-around;
`
