/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import todoLandingImage from '../../assets/todoLandingImage.svg'
import mediaQuery from '../../components/mediaQuery'
import CustomButton from '../../components/CustomButton'
import { Title, Container } from '../../commonStyles'
import { animated } from 'react-spring'
import { EnterAnimation } from '../../animation'

export default function LandingPage () {
  return (
    <ContainerStyle style={EnterAnimation()}>
      <ContainerPhoto>
        <Title size='3.5em' paddingTop='40px'>Todo List App</Title>
        <img src={todoLandingImage} atl='todo list app' />
      </ContainerPhoto>
      <ContainerButtons>
        <CustomButton
          component={Link}
          to='/sign-in'
          hover='#58A600'
          backgroundColor='#8170D6'
          width='40%'
        >Sign In
        </CustomButton>
        <CustomButton
          component={Link}
          to='/sign-up'
          width='40%'
        >Sign Up
        </CustomButton>
      </ContainerButtons>
    </ContainerStyle>
  )
}
const ContainerStyle = animated(styled(Container)`
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
`)
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
