import styled from "styled-components";

export const TextArea = styled.div`
width:100%;
padding: 2rem 0;
margin-bottom: 5rem;
h1{
    font-size: 32px ;
    font-weight: 700;
    padding: 15px 0px;
    width: 80%;
    margin: auto;
}
p{
    font-size: 14px;
    line-height: 26px;
    width: 80%;
    margin: auto;
    margin-top: 5px
}

`

export const HeaderContainer = styled.div<{$imgUrl: string}>`
background: url(${(props: { $imgUrl: string }) => props.$imgUrl}) no-repeat ;
background-size: cover;
height: 400px;
text-align: center;
display:flex;
flex-direction: column;
justify-content:center;
align-items:center;
gap: 10px;
color: #ffffff;

h1{
    font-size: 52px ;
    font-weight: 700;
}



@media(max-width: 757px){
    text-align: start;
    h1{
    font-size: 40px ;
    }
    h1,p{
        width: 90%
    }
}
`
