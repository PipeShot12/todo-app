import styled from 'styled-components'
const styledTransitionFade = styled.div`
  .fade-enter {
    opacity: 0;
   
  }
  .fade-enter-active {
    opacity: 1;

    transition: opacity 250ms ease-in;
  }
  .fade-exit {
    opacity: 1;

  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 250ms ease-in;
  }
`

export default styledTransitionFade
