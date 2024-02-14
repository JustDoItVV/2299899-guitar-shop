import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { browserHistory } from '@guitar-shop/services';
import { frontendStorage } from '@guitar-shop/storage';

import App from './app/app';
import HistoryRouter from './app/components/history-router/history-router.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={frontendStorage}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>
);
