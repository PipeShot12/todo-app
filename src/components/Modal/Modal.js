/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import useClickOutside from '../../hooks/useClickOutside'
import closeButton from '../../assets/closeButton.svg'
const mediaQuery = {
  desktop: '800px'
}
function Modal ({ children, onClose }) {
  const modalRef = useClickOutside(() => onClose())
  return (
    <ContainerModal>
      <ModalBox ref={modalRef}>
        <ButtonCloseModal onClick={() => onClose()} />
        {children}
      </ModalBox>
    </ContainerModal>
  )
}
export default function ModalPortal ({ children, onClose }) {
  return ReactDOM.createPortal(
    <Modal onClose={onClose}>
      {children}
    </Modal>,
    document.getElementById('modal')
  )
}
const ContainerModal = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
z-index: 20;
justify-content: center;
align-items: center;
background: rgba(83,83,70,0.5);

`
const ModalBox = styled.div`
color: #58A600;
background-color: var(--secondary);
height: 95vh;
width: 95vw;
border-radius: 5px;
padding: 0 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: relative;
 @media (min-width :${mediaQuery.desktop}){
   height: 45vh;
   width: 45vw;
 }

 `
const ButtonCloseModal = styled.span`
position: absolute;
top:0;
right:10px;
color: red;
height: 25px;
width: 25px;
::after{
  content: url(${closeButton});
  font-size: 2em;
  cursor: pointer;
}
`
