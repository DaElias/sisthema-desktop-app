import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative z-10"
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-20 w-32 bg-black text-white text-xs rounded-md py-1 px-2 bottom-full left-1/2 -translate-x-1/2 mb-2">
          {text}
          <div className="w-2 h-2 bg-black absolute top-0 left-1/2 -translate-x-1/2 rotate-180"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
