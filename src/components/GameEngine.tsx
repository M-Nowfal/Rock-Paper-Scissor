
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

async function generateRandomChoice(): Promise<string> {
  return new Promise((resolve: (value: string) => void) => {
    const choices = ["rock", "paper", "scissor"];
    setTimeout(() => {
      resolve(choices[Math.floor(Math.random() * 3)]);
    }, 2000);
  });
}

function checkWin(userSelected: string, result: string, setScore: (value: any) => void) {
  if (userSelected === result) {
    setScore((prev: { win: number, loss: number, draw: number }) => (
      { ...prev, draw: prev.draw + 1 }
    ));
  } else if (
    (userSelected === "rock" && result === "scissor") ||
    (userSelected === "paper" && result === "rock") ||
    (userSelected === "scissor" && result === "paper")
  ) {
    setScore((prev: { win: number, loss: number, draw: number }) => (
      { ...prev, win: prev.win + 1 }
    ));
  } else {
    setScore((prev: { win: number, loss: number, draw: number }) => (
      { ...prev, loss: prev.loss + 1 }
    ));
  }
}

const GameEngine = ({ userSelected, setUserSelected, setScore }: {
  userSelected: string,
  setUserSelected: (value: string) => void,
  setScore: (value: any) => void
}) => {
  const [randomChoices, setRandomChoices] = useState("");
  const [alternateChoices, setAlternateChoices] = useState<string>("rock");
  const [isAnimating, setIsAnimating] = useState(true);

  const choices = ["rock", "paper", "scissor"];
  const changeImage = (x: number) => {
    if (x < 20) {
      setTimeout(() => {
        setAlternateChoices(choices[x % 3]);
        changeImage(x + 1);
      }, 100);
    } else {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    if (userSelected) {
      setIsAnimating(true);
      changeImage(0);
      generateRandomChoice().then((result) => {
        setRandomChoices(result);
        checkWin(userSelected, result, setScore);
      });
    }
  }, [userSelected]);

  const getResultText = () => {
    if (!randomChoices) return "Waiting...";
    if (userSelected === randomChoices) return "It's a Draw!";
    if (
      (userSelected === "rock" && randomChoices === "scissor") ||
      (userSelected === "paper" && randomChoices === "rock") ||
      (userSelected === "scissor" && randomChoices === "paper")
    ) {
      return "You Win!";
    }
    return "You Lose!";
  };

  return (
    <div className="space-y-8 overflow-hidden">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            {getResultText()}
          </h2>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-center">
        <div className="relative flex justify-center items-center h-64 w-full max-w-2xl">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-0 z-10 bg-white dark:bg-gray-700 p-4 rounded-full shadow-xl border-4 border-blue-400 dark:border-blue-500"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <img 
                src={`src/assets/${userSelected}.png`} 
                alt={userSelected} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center mt-2 font-medium text-blue-600 dark:text-blue-300">You</div>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">VS</span>
            </div>
          </div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute right-0 z-10 bg-white dark:bg-gray-700 p-4 rounded-full shadow-xl border-4 border-purple-400 dark:border-purple-500"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <img 
                src={`src/assets/${randomChoices || alternateChoices}.png`} 
                alt={randomChoices || alternateChoices} 
                className={`w-full h-full object-contain ${isAnimating ? 'animate-pulse' : ''}`}
              />
            </div>
            <div className="text-center mt-2 font-medium text-purple-600 dark:text-purple-300">Computer</div>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:from-red-500 hover:to-green-600 transition-all shadow-lg cursor-pointer"
          onClick={() => {
            setUserSelected("");
            setAlternateChoices("rock");
          }}
          disabled={randomChoices ? false : true}
        >
          Play Again
        </motion.button>
      </div>
    </div>
  );
}

export default GameEngine;