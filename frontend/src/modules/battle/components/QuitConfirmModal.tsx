import { useNavigate } from "react-router-dom";
import socket from "../../../lib/socket";

type Props = {
  roomID: string;
  onClose: () => void;
};

export default function QuitConfirmModal({ roomID, onClose }: Props) {
  const navigate = useNavigate();

  const confirmQuit = () => {
    socket.emit("player_quit", { roomID });
    onClose();
    navigate("/pd");
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-96 text-center">
        <h2 className="text-xl font-bold text-red-400">Quit Battle?</h2>
        <p className="text-gray-400 text-sm mt-2">
          You will lose this match.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
            Cancel
          </button>
          <button onClick={confirmQuit} className="px-4 py-2 bg-red-600 rounded">
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
