import React from 'react';

interface PowerUpsProps {
  powerups: {
    [key: string]: number;
  };
}

const PowerUps: React.FC<PowerUpsProps> = ({ powerups }) => {
  return (
    <div className="flex justify-center gap-4">
      {Object.entries(powerups).map(([power, count]) => (
        <button
          key={power}
          className={`px-4 py-2 rounded-lg font-bold ${
            count > 0 ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-500'
          } transition-colors`}
          disabled={count === 0}
        >
          {power.replace(/([A-Z])/g, ' $1').trim()} ({count})
        </button>
      ))}
    </div>
  );
};

export default PowerUps;