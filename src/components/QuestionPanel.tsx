import React from 'react';

interface Question {
  problem: string;
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuestionPanelProps {
  currentQuestion: Question | null;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  handleAnswer: () => void;
  message: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  currentQuestion,
  userAnswer,
  setUserAnswer,
  handleAnswer,
  message
}) => {
  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
      {currentQuestion && (
        <>
          <p className="text-2xl font-bold text-center mb-4">
            {currentQuestion.problem} = ?
          </p>
          <div className="flex gap-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white text-xl"
              placeholder="Your answer"
            />
            <button
              onClick={handleAnswer}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition-colors"
            >
              Submit
            </button>
          </div>
        </>
      )}
      {message && (
        <p className="text-center mt-4 text-xl font-bold">{message}</p>
      )}
    </div>
  );
};

export default QuestionPanel;