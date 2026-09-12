import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

/**
 * Home and the chrome ship in the entry bundle; every other surface is split
 * out, so a first visit downloads the cover and nothing else.
 */
const WorksLayout = lazy(() => import("./layouts/WorksLayout"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const PasswordGate = lazy(() => import("./components/PasswordGate"));
const Works = lazy(() => import("./pages/Works"));
const DigitalPaintings = lazy(() => import("./pages/DigitalPaintings"));
const Applications = lazy(() => import("./pages/Applications"));
const Resume = lazy(() => import("./pages/Resume"));
const CreativeCoding = lazy(() => import("./pages/CreativeCoding"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const Article = lazy(() => import("./pages/Article"));

/** Held deliberately plain — a flash of nothing beats a flash of spinner. */
const Loading = <div className="min-h-[60svh]" aria-busy="true" />;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={Loading}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/case-studies"
              element={
                <PasswordGate>
                  <CaseStudies />
                </PasswordGate>
              }
            />
            <Route
              path="/case-studies/:id"
              element={
                <PasswordGate>
                  <CaseStudy />
                </PasswordGate>
              }
            />
            <Route path="/works">
              <Route index element={<Works />} />
              <Route element={<WorksLayout />}>
                <Route path="digital-paintings" element={<DigitalPaintings />} />
                <Route path="creative-coding" element={<CreativeCoding />} />
                <Route path="applications" element={<Applications />} />
              </Route>
            </Route>
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
