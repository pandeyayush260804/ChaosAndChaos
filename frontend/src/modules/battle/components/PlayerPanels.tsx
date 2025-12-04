import { motion } from "framer-motion";
import type { Player } from "../BattlePage";

type Props = {
  you: Player;
  opponent: Player;
};

const PlayerPanels = ({ you, opponent }: Props) => {
  return (
    <div className="flex gap-20">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 border border-white/20 p-6 rounded-2xl w-64 text-center backdrop-blur-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-blue-300">You</h2>
        <p className="mt-2 text-gray-200">{you.email}</p>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-4xl font-bold text-white tracking-wider"
      >
        VS
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 border border-white/20 p-6 rounded-2xl w-64 text-center backdrop-blur-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-purple-300">Opponent</h2>
        <p className="mt-2 text-gray-200">{opponent.email}</p>
      </motion.div>
    </div>
  );
};

export default PlayerPanels;
