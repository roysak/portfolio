import { HashRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import Works from "./pages/Works";
import DigitalPaintings from "./pages/DigitalPaintings";
import Applications from "./pages/Applications";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:id" element={<CaseStudy />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/digital-paintings" element={<DigitalPaintings />} />
          <Route path="/works/applications" element={<Applications />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
