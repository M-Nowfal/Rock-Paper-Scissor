
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ScoreCard from "./ScoreCard";
import UserSelection from "./UserSelection";
import GameEngine from "./GameEngine";

const GameLayout = () => {
  const [score, setScore] = useState({ win: 0, loss: 0, draw: 0 });
  const [userSelected, setUserSelected] = useState<string>("");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
        Rock Paper Scissors
      </h1>
      
      <ScoreCard win={score.win} loss={score.loss} draw={score.draw} />
      
      <div className="mt-10">
        <AnimatePresence mode="wait">
          {!userSelected ? (
            <UserSelection 
              setUserSelected={setUserSelected} 
              setScore={setScore} 
            />
          ) : (
            <GameEngine 
              userSelected={userSelected} 
              setUserSelected={setUserSelected} 
              setScore={setScore} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GameLayout;