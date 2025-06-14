import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";

function SearchComponent() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search..."
        className="text-sm flex-1 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <button 
        onClick={handleSearch}
        className="p-3 bg-secondary text-white rounded-full hover:bg-[#625E5C] transition-colors"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

export default SearchComponent 