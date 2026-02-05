import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import IngredientList from './pages/IngredientList';
import IngredientDetail from './pages/IngredientDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Temporal hasta crear páginas reales */}
          <Route path="/recipes" element={<div>Recipes page pending...</div>} />
          <Route path="/ingredients" element={<IngredientList />} />
          <Route path="/ingredients/:id" element={<IngredientDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}