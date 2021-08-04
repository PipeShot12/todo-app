import styled from 'styled-components'

export const Title = styled.p`
color: ${ props => props.color || 'var(--primary)'};
font-size: ${ props => props.size || '2.5em'};
font-weight: 300;
text-align: center;
padding-top: ${ props => props?.paddingTop};
text-align: ${ props => props?.textAlign};
cursor: ${ props => props.cursor};
`
export const ContainerAnchor = styled.div`
display: flex;
justify-content: space-evenly;
margin-bottom: 52px;
font-size: ${props => props?.size};
color:var(--text);
`
export const AnchorStyle = styled.p`
text-decoration:underline; 
cursor:pointer; 
color:var(--primary);
`
export const Container = styled.div`
background-color: var(--secondary);
height: 95vh;
width: 95vw;
border-radius: 5px;

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