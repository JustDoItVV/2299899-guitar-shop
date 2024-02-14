import { Helmet } from 'react-helmet-async';

export default function NotFoundPage(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>404. Page not found</title>
      </Helmet>
      <div>404. Page not found</div>
    </div>
  );
}
