import styled from '@emotion/styled';

const StyledFirstView = styled.div`
  background-color: #2c2e43;
  max-width: 512px;
  max-height: 512px;
  width: 512px;
  height: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #b2b1b9;
  & > a {
    display: inline-block;
    color: #ffd523;
    font-family: 'RobotoItalic', sans-serif;
    font-size: 16px;
  }
`;

export default StyledFirstView;
