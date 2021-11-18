import styled from '@emotion/styled';

const StyledFirstView = styled.div`
  background-color: red;
  max-width: 512px;
  max-height: 512px;
  width: 512px;
  height: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'RobotoItalic', sans-serif;
  & > a {
    display: inline-block;
    color: #fefefe;
    font-size: 14px;
  }
`;

export default StyledFirstView;
