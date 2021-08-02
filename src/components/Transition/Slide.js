import styled from 'styled-components'
const styledTransition = styled.div`
  .item-enter {
    opacity: 0;
    transform: translateX(200%);
  }
  .item-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 500ms ease-in;
  }
  .item-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .item-exit-active {
    opacity: 0;
    transform: translateX(200%);
    transition: all 500ms ease-in;
  }
`

export default styledTransition
