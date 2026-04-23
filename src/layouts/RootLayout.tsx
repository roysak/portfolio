import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollToTop from '../components/ScrollToTop';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans antialiased">
      <Nav />
      {/* pt-[72px] reserves space for the fixed nav (py-4 padding + h-10 logo = 72px) */}
      <div className="flex flex-col flex-1 pt-18">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
