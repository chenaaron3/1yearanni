import { useEffect, useRef, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { toast, Toaster } from 'sonner';

import duolingoComplete from './assets/complete.mp3';
import duolingoCorrect from './assets/duolingo.mp3';
import { questions } from './assets/questions';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Dialog, DialogContent } from './components/ui/dialog';

const TITLE = 'Happy 1 Year!';

function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [filled, setFilled] = useState<string[]>(Array(6).fill(''));
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefComplete = useRef<HTMLAudioElement>(null);

  const handleOption = (option: string) => {
    const q = questions[current];
    if (option === q.answer) {
      const newFilled = [...filled];
      newFilled[current] = q.letter;
      setFilled(newFilled);
      audioRef.current?.play();
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 1000);
      setModalImg(q.image);
      setShowModal(true);
    } else {
      toast.error('Try again!');
    }
  };

  const handleNext = () => {
    setShowModal(false);
    setModalImg(null);
    setCurrent((c) => c + 1);
  };

  useEffect(() => {
    if (current >= questions.length) {
      audioRefComplete.current?.play();
      setShowCelebration(true);
    }
  }, [current]);

  const isComplete = current >= questions.length;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 sm:p-6 md:p-8 overflow-hidden">
      <audio ref={audioRef} src={duolingoCorrect} preload="auto" />
      <audio ref={audioRefComplete} src={duolingoComplete} preload="auto" />
      <Toaster richColors position="top-center" />
      {isExploding && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <ConfettiExplosion
            force={0.8}
            duration={1000}
            particleCount={100}
            width={1600}
            colors={['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe']}
          />
        </div>
      )}
      {!started ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-700 mb-8 text-center drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {TITLE}
            </h1>
            {/* Give small description for the next clue: Complete the puzzle to get your next clue! */}
            <p className="text-blue-700 text-xl mb-8 text-center">
              Complete the puzzle to get your next clue!
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-blue-400 hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
              onClick={() => setStarted(true)}
            >
              Start the Puzzle
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="max-w-6xl w-full flex flex-col items-center h-full justify-between py-4">
            {/* Progress indicator */}
            <div className="w-full max-w-2xl mb-4">
              <div className="flex justify-between text-sm text-blue-600 mb-2">
                <span>Question {current} of {questions.length}</span>
                <span>{Math.round(((current) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((current) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Underscores */}
            <div className="flex justify-center gap-3 sm:gap-6 mb-4 w-full">
              {filled.map((l, i) => (
                <div
                  key={i}
                  className={`
                    relative w-12 h-16 sm:w-14 sm:h-20 md:w-16 md:h-24 flex items-center justify-center
                    ${l ? 'animate-in zoom-in duration-300' : ''}
                    transform hover:scale-110 transition-transform duration-200
                  `}
                >
                  <span className={`
                    text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700
                    ${l ? 'animate-in fade-in duration-300' : 'text-blue-300'}
                    transition-all duration-300
                  `}>
                    {l || '_'}
                  </span>
                  <div className="absolute bottom-0 w-full h-1.5 bg-blue-300 rounded-full" />
                </div>
              ))}
            </div>

            {/* Question/Options */}
            {!isComplete && (
              <Card className="w-full max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-blue-900 mb-6 leading-tight">
                    {questions[current].prompt}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questions[current].options.map((opt) => (
                      <Button
                        variant="outline"
                        className="w-full text-base sm:text-lg font-medium py-5 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md text-blue-600 border-blue-200 bg-white"
                        key={opt}
                        onClick={() => handleOption(opt)}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Modal for image */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogContent className="flex flex-col items-center justify-center p-6 sm:p-8 max-w-4xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                {modalImg && (
                  <>
                    <div className="text-2xl sm:text-3xl font-semibold text-blue-900 mb-4 text-center">
                      <span className="text-4xl sm:text-5xl font-bold text-blue-600">{questions[current].letter}</span>
                      <span className="text-blue-700"> for </span>
                      <span className="text-blue-800">
                        {
                          (() => {
                            const answer = questions[current].answer.toLowerCase();
                            const letter = questions[current].letter.toLowerCase();
                            const idx = answer.indexOf(letter);
                            if (idx === -1) return answer;
                            return (
                              answer.slice(0, idx) +
                              answer[idx].toUpperCase() +
                              answer.slice(idx + 1)
                            );
                          })()
                        }
                      </span>
                    </div>
                    <div className="relative w-full group">
                      <img
                        src={modalImg}
                        alt="memory"
                        className="rounded-xl w-full h-auto object-cover shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl" />
                    </div>
                  </>
                )}
                <Button
                  onClick={handleNext}
                  className="mt-6 bg-blue-400 hover:bg-blue-500 px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-white"
                >
                  Next Question
                </Button>
              </DialogContent>
            </Dialog>

            {/* Final code display with celebration */}
            {isComplete && (
              <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
                {showCelebration && (
                  <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                    <ConfettiExplosion
                      force={0.8}
                      duration={3000}
                      particleCount={200}
                      width={1600}
                      colors={['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe']}
                    />
                  </div>
                )}
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative animate-bounce">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 text-center">
                      Congratulations! 🎉
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 text-center animate-in slide-in-from-bottom-4 duration-700">
                      You've completed the puzzle!
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

