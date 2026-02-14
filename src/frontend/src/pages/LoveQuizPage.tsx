import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import PageTransition from '../components/PageTransition';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const quizData: Question[] = [
  {
    question: "What's my go-to comfort food?",
    options: ['Pizza', 'Ice Cream', 'Chocolate', 'Pasta'],
    correctIndex: 1,
  },
  {
    question: "What's the first thing I noticed about you?",
    options: ['Your smile', 'Your eyes', 'Your laugh', 'Your kindness'],
    correctIndex: 0,
  },
  {
    question: 'What song reminds me of us?',
    options: [
      'Perfect by Ed Sheeran',
      'All of Me by John Legend',
      'Thinking Out Loud',
      'A Thousand Years',
    ],
    correctIndex: 3,
  },
  {
    question: 'What do I love most about our relationship?',
    options: [
      'How we laugh together',
      'Our deep conversations',
      'The way you understand me',
      'All of the above',
    ],
    correctIndex: 3,
  },
  {
    question: 'What would be my dream date with you?',
    options: [
      'Stargazing under the night sky',
      'Cozy movie night at home',
      'Adventure in a new city',
      'Romantic dinner by candlelight',
    ],
    correctIndex: 0,
  },
];

export default function LoveQuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(quizData.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizData[index].correctIndex ? score + 1 : score;
    }, 0);
  };

  const getResultMessage = (score: number) => {
    if (score === 5) return "Perfect! You know me so well! 💙";
    if (score >= 3) return "Amazing! We're so connected! 💕";
    return "We still have so much to learn about each other! 🥰";
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <PageTransition>
        <GlassCard className="text-center">
          <div className="mb-6 text-6xl">🎉</div>
          <h2 className="mb-4 text-3xl font-bold text-white">Quiz Complete!</h2>
          <div className="mb-6">
            <div className="mb-2 text-5xl font-bold text-blue-glow">
              {score} / {quizData.length}
            </div>
            <p className="text-xl text-blue-100">{getResultMessage(score)}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <PrimaryButton onClick={() => navigate({ to: '/gifts' })}>
              Back to Gifts
            </PrimaryButton>
            <PrimaryButton
              variant="secondary"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers(Array(quizData.length).fill(-1));
                setShowResults(false);
              }}
            >
              Try Again
            </PrimaryButton>
          </div>
        </GlassCard>
      </PageTransition>
    );
  }

  const question = quizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;

  return (
    <PageTransition>
      <div className="space-y-6">
        <button
          onClick={() => navigate({ to: '/gifts' })}
          className="flex items-center gap-2 text-blue-100 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Gifts
        </button>

        <GlassCard>
          <div className="mb-6">
            <div className="mb-2 text-sm text-blue-200">
              Question {currentQuestion + 1} of {quizData.length}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-blue-glow transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-white">
            {question.question}
          </h2>

          <div className="mb-8 space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-glow bg-blue-glow/20 text-white'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <PrimaryButton
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous
            </PrimaryButton>
            <PrimaryButton onClick={handleNext} disabled={!isAnswered}>
              {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
              {currentQuestion < quizData.length - 1 && (
                <ArrowRight className="ml-2 h-5 w-5" />
              )}
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
