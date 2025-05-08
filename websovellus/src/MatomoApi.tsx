import { useState, useEffect } from 'react'
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
}

function AnalyticsData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        if (response.status === 200) {
          setProducts(response.data.products); 
        }
      } catch (err) {
        console.error('Virhe tietojen haussa:', err);
        setError('Tietojen hakeminen epäonnistui');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Ladataan tuotteita...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Tuotteet DummyJSON API:sta</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}: {product.price} €
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalyticsData;
