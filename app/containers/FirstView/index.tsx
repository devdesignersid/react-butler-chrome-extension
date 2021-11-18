import React from 'react';
import { Link } from 'route-lite';

import StyledFirstView from './StyledFirstView';
import { SecondView } from '@/containers';

const FirstView = () => {
  return (
    <StyledFirstView>
      This is the First View
      <Link component={SecondView}>Go to Second View &#8594;</Link>
    </StyledFirstView>
  );
};

export default FirstView;
