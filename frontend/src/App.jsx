import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import IngredientList from './pages/IngredientList';
import IngredientDetail from './pages/IngredientDetail';
import IngredientCreate from './pages/IngredientCreate';
import IngredientEdit from './pages/IngredientEdit';
import RecipeList from './pages/RecipeList';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<IngredientList />} />
          <Route path="/ingredients/new" element={<IngredientCreate />} />
          <Route path="/ingredients/:id" element={<IngredientDetail />} />
          <Route path="/ingredients/:id/edit" element={<IngredientEdit />} />

          {/* placeholders para no romper */}
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<div>Recipe detail</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
