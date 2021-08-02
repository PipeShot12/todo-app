/* eslint-disable jsx-a11y/alt-text */
import { Button, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import pageNotFound from '../../assets/pageNotFound.svg'
const mediaQuery = {
  desktop: '800px'
}
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

export default function NotFound () {
  return (
    <ContainerStyle>
      <ContainerPhoto>
        <img src={pageNotFound} atl='page not found' />
      </ContainerPhoto>

      <CustomButton
        style={{ margin: '10px 0' }}
        component={Link}
        to='/'
      >Go Home
      </CustomButton>
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
justify-content: center;
flex-direction: column;
align-items: center;
@media (min-width :${mediaQuery.desktop}){
  height: 80vh;
  width: 80vw;

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
