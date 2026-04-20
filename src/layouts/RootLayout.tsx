import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollToTop from '../components/ScrollToTop';

export default function RootLayout() {
  return (
    <div className="grid h-screen grid-rows-[min-content_auto_min-content] bg-white text-neutral-900 font-sans antialiased">
      <Nav />
      <div className="flex flex-col">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
