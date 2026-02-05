import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Temporal hasta crear páginas reales */}
          <Route path="/recipes" element={<div>Recipes page pending...</div>} />
          <Route path="/ingredients" element={<div>Ingredients page pending...</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}