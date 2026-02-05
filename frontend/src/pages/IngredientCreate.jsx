import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientForm from '../components/ingredient/IngredientForm';
import { createIngredient } from '../services/ingredientService';

export default function IngredientCreate() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      const created = await createIngredient(payload);
      navigate(`/ingredients/${created.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return <IngredientForm onSubmit={handleCreate} submitting={submitting} />;
}
