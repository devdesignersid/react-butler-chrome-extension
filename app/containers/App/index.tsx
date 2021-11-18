import * as React from 'react';
import { Global, CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import Router from 'route-lite';
import { ErrorBoundary } from 'react-error-boundary';

import AppContainer from './AppContiner';
import { GlobalCss } from '@/styles';
import { FirstView, ErrorFallback } from '@/containers';

const App = () => {
  const emotionCache = createCache({
    key: 'react-butler-key',
    stylisPlugins: [prefixer]
  });
  return (
    <CacheProvider value={emotionCache}>
      <AppContainer>
        <Global styles={GlobalCss} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            <FirstView />
          </Router>
        </ErrorBoundary>
      </AppContainer>
    </CacheProvider>
  );
};

export default App;
