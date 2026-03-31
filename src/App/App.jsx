import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactPage from "../pages/ContactPage";
import WorkPage from "../pages/WorkPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AboutUsPage" element={<AboutUsPage />} />
      <Route path="/ContactPage" element={<ContactPage />} />
      <Route path="/WorkPage" element={<WorkPage />} />
    </Routes>
  );
}

export default App;
