import { Routes, Route, HashRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import PasswordGate from "./components/PasswordGate";
import Works from "./pages/Works";
import DigitalPaintings from "./pages/DigitalPaintings";
import Applications from "./pages/Applications";
import Resume from "./pages/Resume";
import CreativeCoding from "./pages/CreativeCoding";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<PasswordGate><CaseStudies /></PasswordGate>} />
          <Route path="/case-studies/:id" element={<PasswordGate><CaseStudy /></PasswordGate>} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/digital-paintings" element={<DigitalPaintings />} />
          <Route path="/works/creative-coding" element={<CreativeCoding />} />
          <Route path="/works/applications" element={<Applications />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
