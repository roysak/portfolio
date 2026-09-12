import { Routes, Route, BrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import WorksLayout from "./layouts/WorksLayout";
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import PasswordGate from "./components/PasswordGate";
import Works from "./pages/Works";
import DigitalPaintings from "./pages/DigitalPaintings";
import Applications from "./pages/Applications";
import Resume from "./pages/Resume";
import CreativeCoding from "./pages/CreativeCoding";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Article from "./pages/Article";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<PasswordGate><CaseStudies /></PasswordGate>} />
          <Route path="/case-studies/:id" element={<PasswordGate><CaseStudy /></PasswordGate>} />
          <Route path="/works" element={<Works />} />
          <Route path="/works" element={<WorksLayout />}>
            <Route path="digital-paintings" element={<DigitalPaintings />} />
            <Route path="creative-coding" element={<CreativeCoding />} />
            <Route path="applications" element={<Applications />} />
          </Route>
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
