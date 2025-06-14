import React, { useState } from 'react';

function HistoricalBackdrop({ content }) {
  const [selectedSection, setSelectedSection] = useState('europe');

  const sections = {
    europe: { title: 'Europe', content: content.europe },
    americas: { title: 'Americas', content: content.americas },
    asia: { title: 'Asia', content: content.asia },
    africa: { title: 'Africa', content: content.africa },
    cultural: { title: 'Cultural', content: content.cultural },
    technological: { title: 'Technological', content: content.technological }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-sm text-secondary font-semibold">• Historical Backdrop</h1>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="text-sm border rounded-md px-2 py-1 text-secondary"
        >
          {Object.entries(sections).map(([key, { title }]) => (
            <option key={key} value={key}>
              {title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="text-sm text-gray-500">
        {sections[selectedSection].content}
      </div>
    </div>
  );
}

export default HistoricalBackdrop; 