import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import './Layout.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="Layout">
      <Navigation />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
