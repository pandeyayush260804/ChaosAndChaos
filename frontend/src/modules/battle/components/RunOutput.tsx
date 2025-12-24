// RunOutput.tsx
import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function RunOutput({ roomID }: { roomID?: string }) {
  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Listen for code_result (Judge0 response)
    const onResult = (res: any) => {
      console.log("received code_result", res);
      setResult(res);
      setVisible(true);
    };

    socket.on("code_result", onResult);
    return () => {
      socket.off("code_result", onResult);
    };
  }, []);

  if (!visible || !result) return null;

  // Normalize display fields (Judge0 has many variants)
  const stdout = result.stdout ?? result.output ?? "";
  const stderr = result.stderr ?? result.stderr ?? "";
  const status = result.status?.description ?? result.status;
  const compile_output = result.compile_output ?? null;
  const time = result.time ?? result.cpu_time ?? null;
  const memory = result.memory ?? null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[520px] max-w-[90%]">
      <div className="bg-black/80 border border-white/20 rounded-xl p-4 shadow-lg backdrop-blur">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold text-blue-300">Run Output</h3>
            <p className="text-xs text-gray-400">Status: <span className="font-mono">{String(status)}</span></p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                setVisible(false);
              }}
              className="text-xs px-2 py-1 rounded bg-white/5"
            >
              Close
            </button>
          </div>
        </div>

        {compile_output ? (
          <div className="mb-2">
            <p className="text-xs text-red-400 font-mono">Compile Output</p>
            <pre className="text-xs text-gray-200 max-h-36 overflow-auto bg-black/60 p-2 rounded">{compile_output}</pre>
          </div>
        ) : null}

        {stderr ? (
          <div className="mb-2">
            <p className="text-xs text-red-400 font-mono">Stderr</p>
            <pre className="text-xs text-gray-200 max-h-36 overflow-auto bg-black/60 p-2 rounded">{stderr}</pre>
          </div>
        ) : null}

        <div>
          <p className="text-xs text-green-300 font-mono">Stdout</p>
          <pre className="text-xs text-gray-200 max-h-48 overflow-auto bg-black/60 p-2 rounded">{stdout || "// (no output)"}</pre>
        </div>

        <div className="mt-3 text-xs text-gray-400 flex justify-between">
          <div>Time: <span className="font-mono">{time ?? "—"}</span></div>
          <div>Memory: <span className="font-mono">{memory ?? "—"}</span></div>
        </div>
      </div>
    </div>
  );
}
