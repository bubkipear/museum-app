import React from 'react';

function Timeline({ timeline, queryCountry, queryYear, query }) {
  const { localEvents, globalEvents } = timeline;
  
  const allEvent = [...localEvents, ...globalEvents].sort((a,b) => a.year - b.year);
  const sortedGlobalEvents = globalEvents.sort((a,b) => a.year - b.year);
  const sortedLocalEvents = localEvents.sort((a,b) => a.year - b.year);
  const minYear = Math.min(...allEvent.map(event => event.year));
  const maxYear = Math.max(...allEvent.map(event => event.year));
  const timeSpan = maxYear - minYear;

  const calculatePositions = (events) => {
    const positions = [];
    const minSpacing =15; 
    
    events.forEach((event, i) => {
      const basePos = ((event.year - minYear) / timeSpan) * 80;
      let adjustedPos = basePos;
      
      
      // Check previous event position
      if (i > 0) {
        const prevPos = positions[i-1];
        if (adjustedPos - prevPos < minSpacing) {
          adjustedPos =prevPos + minSpacing
        }
      }
      
      positions.push(adjustedPos);
      console.log(`${event.year} ${event.event}: ${adjustedPos}`);
    });
    
    return positions;
  };

const localPositions = calculatePositions(sortedLocalEvents);
const globalPositions = calculatePositions(sortedGlobalEvents);

  return (
    <div className="w-full bg-white rounded-lg p-4 pb-20 overflow-visible">
      <h1 className="text-sm text-secondary font-semibold mb-2">•  Timeline</h1>
      <div className="flex pr-6 justify-center gap-12 text-sm text-secondary italic">
        <div>{queryCountry}</div>
        <div>World</div>
      </div>
      {/* Timeline */}
      <div className="relative min-h-[500px] overflow-visible">
        <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-[-2px] left-1/2 transform -translate-x-1/2"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full absolute bottom-[-50px] left-1/2 transform -translate-x-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-[-50px] w-[2px] bg-gray-300 transform -translate-x-1/2"></div>
        {/* Local Events */}
      {sortedLocalEvents.map((event, index) => (
        <div 
        key={`local-${index}`} 
        style={{top: `${localPositions[index]}%`}}
        className="absolute right-1/2 w-[45%] flex items-center">
          <div className="flex-1 text-right pr-4">
            <div className="text-sm text-gray-500 font-semibold">{event.year}</div>
            <div className="text-sm text-gray-500">{event.event}</div>
          </div>
        </div>
      ))}
      {/* Global Events */}
      {globalEvents.map((event, index) => (
        <div 
        key={index} 
        style={{top: `${globalPositions[index]}%`}}
        className="absolute left-1/2 w-[45%] flex items-center">
          <div className="flex-1 text-left pl-4">
            <div className="text-sm font-semibold text-gray-500">{event.year}</div>
            <div className="text-sm text-gray-500">{event.event}</div>
          </div>
        </div>
      ))}
    </div>
      </div>
      
  )
}

export default Timeline 