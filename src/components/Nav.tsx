import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
export default function Nav() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return <><a href="#main-content" className="skip-link">Skip to content</a><nav className="studio-nav" aria-label="Main navigation"><NavLink to="/" className="wordmark" aria-label="Roys A Kareem, home"><svg viewBox="0 0 56 56" className="w-12 h-12 shrink-0" fill="currentColor" aria-hidden="true"><path d="M24.767 9.25H38.0265C41.8961 9.25 44.8012 12.7856 44.0509 16.5817C43.6509 18.6057 42.7475 20.4963 41.424 22.079L23.758 43.2055C21.8796 45.4519 19.102 46.75 16.1738 46.75C13.2593 46.75 11.0919 44.055 11.717 41.2083L17.4416 15.1413C18.1971 11.701 21.2448 9.25 24.767 9.25Z"></path><path d="M27.8374 42.5289C29.5438 40.476 31.3963 38.2043 32.9759 36.2418C34.344 34.5421 37.1567 35.2368 37.547 37.3834L38.1783 40.8556C38.7364 43.9248 36.3785 46.75 33.259 46.75H29.79C27.6372 46.75 26.4612 44.1844 27.8374 42.5289Z"></path></svg></NavLink><div className="nav-links"><NavLink to="/case-studies">Case studies</NavLink><NavLink to="/works">Works</NavLink><NavLink to="/resume">About / Resume</NavLink></div><a className="nav-contact" href="mailto:roysak@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></nav></>;
}
