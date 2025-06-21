
import { motion } from "framer-motion";
import rock from "../assets/rock.png";
import paper from "../assets/paper.png";
import scissor from "../assets/scissor.png";

const choices = [
  { id: "rock", name: "Rock", color: "from-blue-400 to-blue-600" },
  { id: "paper", name: "Paper", color: "from-green-400 to-green-600" },
  { id: "scissor", name: "Scissor", color: "from-red-400 to-red-600" },
];

const UserSelection = ({ setUserSelected, setScore }: {
  setUserSelected: (value: string) => void,
  setScore: (value: any) => void
}) => {

  function getImage(choice: string) {
    const images: Record<string, string> = {
      rock, paper, scissor
    };
    return images[choice];
  }

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-6 md:gap-10 px-4"
      >
        {choices.map((choice, index) => (
          <motion.div
            key={choice.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ delay: index * 0.10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl shadow-lg bg-gradient-to-br ${choice.color} flex flex-col items-center justify-center p-4 transition-all`}
              onClick={() => setUserSelected(choice.id)}
            >
              <div className="bg-white/20 md:mt-1 rounded-b-full p-2 md:p-4 md:mb-1">
                <img
                  src={getImage(choice.id)}
                  alt={choice.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg">{choice.name}</span>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="font-semibold text-xl text-purple-600 dark:text-purple-300 mb-8">
          Choose your weapon!
        </p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg cursor-pointer"
            onClick={() => {
              setUserSelected("");
              setScore({ win: 0, loss: 0, draw: 0 });
            }}
          >
            Reset Game
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default UserSelection;