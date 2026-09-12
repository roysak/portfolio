import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/ScrollToTop";

export default function RootLayout() {
  const { pathname, hash } = useLocation();

  // Every route change starts at the top; the router does not do this for us.
  // A hash means the visitor asked for a specific section, so leave it alone.
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="texture min-h-svh flex flex-col bg-ink text-bone font-sans antialiased">
      <Nav />
      <div className="flex flex-col flex-1 min-w-0 w-full">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
      <Cursor />
    </div>
  );
}
