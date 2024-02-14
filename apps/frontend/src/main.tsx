import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { browserHistory } from '@guitar-shop/services';

import App from './app/app';
import HistoryRouter from './app/components/history-router/history-router.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <HistoryRouter history={browserHistory}>
      <App />
    </HistoryRouter>
  </StrictMode>
);
