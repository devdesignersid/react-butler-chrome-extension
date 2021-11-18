import React from 'react';

import StyledErrorFallback from './StyledErrorFallback';
import { ReactComponent as Dino } from '@/images/icons/dino.svg';

const ErrorFallback = () => (
  <StyledErrorFallback>
    <Dino fill="#090910" />
    <p> Oops! Something went wrong.</p>
  </StyledErrorFallback>
);

export default ErrorFallback;
