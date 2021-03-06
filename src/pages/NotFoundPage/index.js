/* eslint-disable jsx-a11y/alt-text */
import { animated } from 'react-spring'
import { Container } from '../../commonStyles/'
import { EnterAnimation } from '../../animation'
import { Link } from 'react-router-dom'
import CustomButton from '../../components/CustomButton'
import mediaQuery from '../../components/mediaQuery'
import pageNotFound from '../../assets/pageNotFound.svg'
import styled from 'styled-components'


export default function NotFound () {
  return (
    <ContainerStyle style={EnterAnimation()}>
      <ContainerPhoto>
        <img src={pageNotFound} atl='page not found' />
      </ContainerPhoto>

      <CustomButton
        style={{ margin: '10px 0' }}
        width="40%"
        component={Link}
        to='/'
      >Go Home
      </CustomButton>
    </ContainerStyle>
  )
}
const ContainerStyle = animated(styled(Container)`
padding: 50px 0px;
overflow: hidden;
overflow-y: auto;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
@media (min-width :${mediaQuery.desktop}){
  height: 80vh;
  width: 80vw;

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
