import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchOpenAI } from '../services/openai';
import ImmediateContext from "../components/results/ImmediateContext";
import HistoricalBackdrop from "../components/results/HistoricalBackdrop";
import Timeline from "../components/results/Timeline";
import Header from "../components/Header";

function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await searchOpenAI(query);
        setResults(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <div className="text-center text-gray-700 font-semibold p-8">Traveling through time... 👀</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen p-8">
      <Header />
      <h1 className="text-lg text-gray-700 font-semibold text-center mb-4">🔎 {query}</h1>
      <div className="space-y-4">
        <ImmediateContext content={results.immediateContext} />
        <HistoricalBackdrop content={results.historicalBackdrop} />
        <Timeline timeline={results.timeline} queryCountry={results.queryCountry} queryYear={results.queryYear} query={query} />
      </div>
    </div>
  );
}

export default Results; 