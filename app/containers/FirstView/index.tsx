import React from 'react';
import { Link } from 'route-lite';

import StyledFirstView from './StyledFirstView';
import { SecondView } from '@/containers';
import { Logo } from '@/components';

const FirstView = () => {
  return (
    <StyledFirstView>
      <Logo />
      This is the First View
      <Link component={SecondView}>Go to Second View &#8594;</Link>
    </StyledFirstView>
  );
};

export default FirstView;
