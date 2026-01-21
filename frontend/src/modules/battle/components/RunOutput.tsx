// RunOutput.tsx
import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

type Props = {
  roomID?: string;
};

export default function RunOutput({ roomID }: Props) {
  const [result, setResult] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 🔹 RUN result listener
    const onRunResult = (res: any) => {
      // prevent cross‑room leaks
      if (roomID && res.roomID && res.roomID !== roomID) return;

      console.log("received code_result", res);
      setResult({ type: "run", data: res });
      setVisible(true);
    };

    // 🔹 SUBMIT result listener
    const onSubmitResult = (res: any) => {
      console.log("received submit_result", res);
      setResult({ type: "submit", data: res });
      setVisible(true);
    };

    socket.on("code_result", onRunResult);
    socket.on("submit_result", onSubmitResult);

    return () => {
      socket.off("code_result", onRunResult);
      socket.off("submit_result", onSubmitResult);
    };
  }, [roomID]);

  if (!visible || !result) return null;

  /* ---------------- RUN OUTPUT NORMALIZATION ---------------- */
  const run = result.type === "run" ? result.data : null;

  const stdout = run?.stdout ?? run?.output ?? "";
  const stderr = run?.stderr ?? run?.error ?? "";
  const compile_output = run?.compile_output ?? null;
  const status = run?.status?.description ?? run?.status ?? "";
  const time = run?.time ?? run?.cpu_time ?? null;
  const memory = run?.memory ?? null;

  /* ---------------- SUBMIT OUTPUT ---------------- */
  const submit = result.type === "submit" ? result.data : null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[520px] max-w-[90%]">
      <div className="bg-black/80 border border-white/20 rounded-xl p-4 shadow-lg backdrop-blur">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold text-blue-300">
              {result.type === "run" ? "Run Output" : "Submit Result"}
            </h3>

            {result.type === "run" && (
              <p className="text-xs text-gray-400">
                Status: <span className="font-mono">{String(status)}</span>
              </p>
            )}
          </div>

          <button
            onClick={() => setVisible(false)}
            className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* ---------------- SUBMIT VIEW ---------------- */}
        {submit && (
          <div className="mb-3">
            <p className="text-sm text-green-400 font-semibold">
              Score: {submit.score}%
            </p>
            <p className="text-xs text-gray-400">
              Passed {submit.passed} / {submit.total} testcases
            </p>
          </div>
        )}

        {/* ---------------- RUN VIEW ---------------- */}
        {compile_output && (
          <div className="mb-2">
            <p className="text-xs text-red-400 font-mono">Compile Output</p>
            <pre className="text-xs text-gray-200 max-h-36 overflow-auto bg-black/60 p-2 rounded">
              {compile_output}
            </pre>
          </div>
        )}

        {stderr && (
          <div className="mb-2">
            <p className="text-xs text-red-400 font-mono">Stderr</p>
            <pre className="text-xs text-gray-200 max-h-36 overflow-auto bg-black/60 p-2 rounded">
              {stderr}
            </pre>
          </div>
        )}

        {run && (
          <div>
            <p className="text-xs text-green-300 font-mono">Stdout</p>
            <pre className="text-xs text-gray-200 max-h-48 overflow-auto bg-black/60 p-2 rounded">
              {stdout || "// (no output)"}
            </pre>
          </div>
        )}

        {/* FOOTER */}
        {run && (
          <div className="mt-3 text-xs text-gray-400 flex justify-between">
            <div>
              Time: <span className="font-mono">{time ?? "—"}</span>
            </div>
            <div>
              Memory: <span className="font-mono">{memory ?? "—"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
