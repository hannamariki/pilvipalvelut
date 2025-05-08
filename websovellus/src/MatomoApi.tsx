import { useState, useEffect} from 'react'
import axios from 'axios';

function AnalyticsData() {
  const [visits, setVisits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = 'KORVAA_TALLA_OIKEALLA_TOKENILLA';

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pilvipalvelut-matomo.2.rahtiapp.fi/index.php`, {
            params: {
              module: 'API',
              method: 'VisitsSummary.get',
              idSite: 1,
              period: 'day',
              date: 'last30',
              format: 'json',
              token_auth: token
            }
          }
        );

        if (response.status === 200) {
          setVisits(response.data);
        }
      } catch (err) {
        console.error('Virhe tietojen haussa:', err);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Ladataan tietoja...</p>;
  if (error) return <p>Virhe tietojen haussa</p>;

  return (
    <div>
      <h2>Kävijätilastot (viimeiset 30 päivää)</h2>
      <ul>
        {visits && Object.entries(visits).map(([date, data]) => (
          <li key={date}>
            {date}: {(data as { nb_visits: number }).nb_visits} vierailua
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalyticsData;