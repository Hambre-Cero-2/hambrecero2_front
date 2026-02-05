import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredientById } from '../services/ingredientService';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function IngredientDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIngredientById(id);
        setItem(data);
      } catch {
        setError('Ingredient not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h2>{item.name}</h2>
      <p><b>ID:</b> {item.id}</p>
      <p><b>Season:</b> {item.season}</p>
      <p><b>Calories:</b> {item.calories}</p>
      <p><b>Organic:</b> {item.organic ? 'Yes' : 'No'}</p>
      <p><b>Price/Kg:</b> {item.priceKg}</p>
      <p><b>Carbon footprint:</b> {item.carbonFootprint}</p>
      <p><b>Harvest date:</b> {item.harvestDate}</p>
    </section>
  );
}
