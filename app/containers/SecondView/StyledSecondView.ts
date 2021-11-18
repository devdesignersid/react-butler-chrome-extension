import styled from '@emotion/styled';

const StyledSecondView = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 256px;
  max-height: 256px;
  width: 256px;
  height: 256px;
  overflow: hidden;
  & > a {
    display: inline-block;
    color: #000;
    font-size: 14px;
  }
`;

export default StyledSecondView;
