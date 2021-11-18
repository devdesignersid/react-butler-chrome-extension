import * as React from 'react';
import { Global, CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import Router from 'route-lite';

import AppContainer from './AppContiner';
import { GlobalCss } from '@/styles';
import { FirstView } from '@/containers';

const App = () => {
  const emotionCache = createCache({
    key: 'react-butler-key',
    stylisPlugins: [prefixer]
  });
  return (
    <CacheProvider value={emotionCache}>
      <AppContainer>
        <Global styles={GlobalCss} />
        <Router>
          <FirstView />
        </Router>
      </AppContainer>
    </CacheProvider>
  );
};

export default App;
