import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer.component';
import Header from '../../components/header/header.component';
import SvgIcons from '../../components/svg-icons/svg-icons.component';

export default function LoadingPage(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <SvgIcons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <section className="error">
              <h1 className="error__title">Loading...</h1>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
