import styled from '@emotion/styled';

const StyledLogo = styled.img`
  position: absolute;
  width: 128px;
  top: 18%;
  left: 35%;
    -webkit-animation:spin 6s linear infinite;
    -moz-animation:spin 6s linear infinite;
    animation:spin 6s linear infinite;
}
    @-moz-keyframes spin { 
        100% { -moz-transform: rotate(360deg); } 
    }
    @-webkit-keyframes spin { 
        100% { -webkit-transform: rotate(360deg); } 
    }
    @keyframes spin { 
        100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 

`;

export default StyledLogo;
