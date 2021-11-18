import styled from '@emotion/styled';

const StyledSecondView = styled.div`
  background-color: #2c272e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 256px;
  max-height: 256px;
  width: 256px;
  height: 256px;
  overflow: hidden;
  color: #e59934;
  font-size: 14px;
  & > a {
    display: inline-block;
    color: #9ae66e;
    font-family: 'RobotoItalic', sans-serif;
    font-size: 16px;
  }
`;

export default StyledSecondView;
