type Props = {
  result: any;
};

export default function WinnerModal({ result }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-8 rounded-xl text-center w-96">

        {result.type === "draw" ? (
          <h2 className="text-3xl font-bold text-yellow-400">🤝 Draw</h2>
        ) : result.type === "winner" ? (
          <h2 className="text-3xl font-bold text-green-400">🎉 You Won!</h2>
        ) : (
          <h2 className="text-3xl font-bold text-red-400">😔 You Lost</h2>
        )}

        {result.score !== undefined && (
          <p className="text-gray-400 mt-2">Score: {result.score}%</p>
        )}

        {result.reason === "opponent_quit" && (
          <p className="text-gray-400 mt-2">Opponent quit</p>
        )}
      </div>
    </div>
  );
}
