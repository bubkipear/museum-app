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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-4xl mb-4 animate-bounce">⏳</div>
          <h2 className="text-xl font-semibold text-secondary mb-2">Traveling through time...</h2>
          <p className="text-sm text-gray-500 mb-6">Gathering historical insights for your query</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-secondary h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  
  // Check if this is a non-historical query
  if (results && (!results.timeline || !results.queryYear || !results.queryCountry)) {
    return (
      <div className="min-h-screen p-8">
        <Header />
        <div className="max-w-md mx-auto text-center mt-16">
          <h1 className="text-2xl font-semibold text-secondary mb-4">🤔 Hmm...</h1>
          <p className="text-gray-600 mb-6">
            That doesn't seem to be a historical topic. Try searching for a specific historical event, person, or period!
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Examples: "Napoleon Bonaparte", "American Revolution", "Renaissance", "World War II"
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-secondary text-white rounded-full hover:bg-[#625E5C] transition-colors"
          >
            Try Another Search
          </button>
        </div>
      </div>
    );
  }

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