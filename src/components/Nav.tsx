import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
export default function Nav() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return <><a href="#main-content" className="skip-link">Skip to content</a><nav className="studio-nav" aria-label="Main navigation"><NavLink to="/" className="wordmark" aria-label="Roys A Kareem, home">roys<span>®</span></NavLink><div className="nav-links"><NavLink to="/case-studies">Case studies</NavLink><NavLink to="/works">Works</NavLink><NavLink to="/resume">About / Resume</NavLink></div><a className="nav-contact" href="mailto:roysak@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></nav></>;
}
