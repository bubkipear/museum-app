import React from 'react';

function ImmediateContext({ content }) {
  return (
    <div className="w-full bg-white rounded-lg p-4">
      <h1 className="text-sm text-secondary font-semibold mb-2">•  Immediate Context</h1>
      <p className="text-sm text-gray-500">{content}</p>
    </div>
  );
}

export default ImmediateContext; 