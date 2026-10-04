import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
export default function RootLayout() {
  const isHome = useLocation().pathname === '/';
  return <div className="studio-shell min-h-screen flex flex-col text-neutral-900 antialiased"><Nav /><div id={isHome ? undefined : 'main-content'} className={`flex flex-col flex-1 ${isHome ? '' : 'studio-inner-page'}`}><Outlet /></div><Footer /></div>;
}
