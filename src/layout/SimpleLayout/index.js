'use client';

import PropTypes from 'prop-types';
import { lazy } from 'react';
import { usePathname } from 'next/navigation';
import { SimpleLayoutType } from 'config';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ children }) {
  const pathname = usePathname();
  const layout = pathname === 'landing' || pathname === '/' ? SimpleLayoutType.LANDING : SimpleLayoutType.SIMPLE;

  return (
    <>
      <Header />
      {children}
      <FooterBlock isFull={layout === 'landing'} />
    </>
  );
}

Layout.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node
};
