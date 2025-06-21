import { motion } from "framer-motion";

interface ScoreCardType {
  win: number;
  loss: number;
  draw: number;
};

const ScoreCard = ({ win, loss, draw }: ScoreCardType) => {

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl mt-4 p-4 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between gap-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-1 bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 py-3 px-4 rounded-lg shadow text-center"
        >
          <div className="text-white font-bold text-sm">WIN</div>
          <div className="text-white text-2xl font-extrabold">{win}</div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-1 bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 py-3 px-4 rounded-lg shadow text-center"
        >
          <div className="text-white font-bold text-sm">LOSS</div>
          <div className="text-white text-2xl font-extrabold">{loss}</div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-1 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 py-3 px-4 rounded-lg shadow text-center"
        >
          <div className="text-white font-bold text-sm">DRAW</div>
          <div className="text-white text-2xl font-extrabold">{draw}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ScoreCard;