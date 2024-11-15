import React from 'react';
import { CircleDot } from 'lucide-react';

interface FieldProps {
  ballPosition: number;
}

const Field: React.FC<FieldProps> = ({ ballPosition }) => {
  return (
    <div className="relative w-full h-32 bg-green-500 rounded-lg border-4 border-white mb-8">
      <div 
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: `${ballPosition}%`, transition: 'left 0.5s ease-out' }}
      >
        <CircleDot className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

export default Field;