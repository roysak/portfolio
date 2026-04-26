import { Routes, Route, BrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import Works from "./pages/Works";
import DigitalPaintings from "./pages/DigitalPaintings";
import Applications from "./pages/Applications";
import Resume from "./pages/Resume";
import CreativeCoding from "./pages/CreativeCoding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:id" element={<CaseStudy />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/digital-paintings" element={<DigitalPaintings />} />
          <Route path="/works/creative-coding" element={<CreativeCoding />} />
          <Route path="/works/applications" element={<Applications />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
