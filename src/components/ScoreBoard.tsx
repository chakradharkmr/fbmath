import React from 'react';
import { Star, Medal } from 'lucide-react';

interface ScoreBoardProps {
  score: { home: number; away: number };
  gameTime: number;
  stars: number;
  streak: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, gameTime, stars, streak }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold">{stars}</span>
        </div>
        <div className="text-2xl font-bold">{formatTime(gameTime)}</div>
        <div className="flex items-center gap-2">
          <Medal className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold">Streak: {streak}</span>
        </div>
      </div>
      <div className="text-center text-3xl font-bold mb-8">
        {score.home} - {score.away}
      </div>
    </>
  );
};

export default ScoreBoard;