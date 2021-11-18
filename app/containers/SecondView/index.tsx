import React from 'react';
import { goBack } from 'route-lite';

import StyledSecondView from './StyledSecondView';

const SecondView = () => {
  return (
    <StyledSecondView>
      This is second view!
      <a href="#" onClick={() => goBack()}>
        &#8592; Go Back
      </a>
    </StyledSecondView>
  );
};

export default SecondView;
