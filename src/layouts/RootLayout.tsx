import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/ScrollToTop";

export default function RootLayout() {
  return (
    <div className="grain min-h-screen flex flex-col bg-ink text-bone font-sans antialiased">
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
