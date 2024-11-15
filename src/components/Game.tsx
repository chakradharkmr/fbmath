import React, { useState, useEffect } from 'react';
import { Trophy, Star, Medal, CircleDot, Crown } from 'lucide-react';
import ScoreBoard from './ScoreBoard';
import Field from './Field';
import QuestionPanel from './QuestionPanel';
import PowerUps from './PowerUps';

interface Question {
  problem: string;
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Game: React.FC = () => {
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [ballPosition, setBallPosition] = useState(50);
  const [gameTime, setGameTime] = useState(300);
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [powerups, setPowerups] = useState({
    timeFreeze: 2,
    doublePoints: 1,
    skipQuestion: 1
  });

  const generateQuestion = (difficulty: 'easy' | 'medium' | 'hard'): Question => {
    let num1, num2, operation;
    
    switch(difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        operation = '+';
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 20) + 10;
        operation = Math.random() > 0.5 ? '*' : '-';
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * 20) + 5;
        operation = Math.random() > 0.5 ? '÷' : '*';
        break;
    }

    let answer;
    switch(operation) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      case '÷': 
        num2 = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
        answer = num1 / num2;
        break;
      default: answer = 0;
    }

    return {
      problem: `${num1} ${operation} ${num2}`,
      answer,
      difficulty
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!currentQuestion) {
      const difficulty = streak > 5 ? 'hard' : streak > 2 ? 'medium' : 'easy';
      setCurrentQuestion(generateQuestion(difficulty));
    }
  }, [currentQuestion, streak]);

  const handleAnswer = () => {
    if (!currentQuestion) return;

    const isCorrect = Number(userAnswer) === currentQuestion.answer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setStars(prev => prev + (newStreak >= 3 ? 2 : 1));
      
      setBallPosition(prev => {
        const move = Math.min(90, prev + 20);
        if (move >= 90) {
          setScore(prev => ({ ...prev, home: prev.home + 1 }));
          setShowReward(true);
          setTimeout(() => setShowReward(false), 2000);
          return 50;
        }
        return move;
      });

      setMessage('Great job! Keep going! 🎉');
    } else {
      setStreak(0);
      setBallPosition(prev => Math.max(10, prev - 15));
      setMessage('Try again! You can do it! 💪');
    }

    setUserAnswer('');
    setCurrentQuestion(null);
  };

  if (gameTime <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-8">
        <h2 className="text-4xl font-bold mb-6">Game Over!</h2>
        <div className="flex items-center gap-4 mb-6">
          <Trophy className="w-12 h-12 text-yellow-400" />
          <span className="text-3xl">Final Score: {score.home}</span>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <Star className="w-8 h-8 text-yellow-400" />
          <span className="text-2xl">Stars Earned: {stars}</span>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-xl font-bold transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600 text-white p-4">
      <ScoreBoard score={score} gameTime={gameTime} stars={stars} streak={streak} />
      <Field ballPosition={ballPosition} />
      <QuestionPanel
        currentQuestion={currentQuestion}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        handleAnswer={handleAnswer}
        message={message}
      />
      <PowerUps powerups={powerups} />
      
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-bounce">
            <Crown className="w-32 h-32 text-yellow-400" />
            <p className="text-4xl font-bold text-center">GOAL!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;