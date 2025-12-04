import { useEffect, useState } from "react";
import socket from "../../../lib/socket";
import useEditorSync from "../hooks/useEditorSync";

export default function CodeEditor({ roomID }: { roomID: string }) {
  const { code, setCodeLocal } = useEditorSync();
  const [lang, setLang] = useState("python");

  const run = () => {
    socket.emit("run_code", {
      roomID,
      language_id: lang === "python" ? 71 : 63,
      source_code: code,
      stdin: "",
    });
  };

  const submit = () => socket.emit("submit_code", { roomID });

  return (
    <div className="bg-white/5 p-4 border border-white/15 rounded-xl min-h-[320px] flex flex-col">
      <div className="flex justify-between mb-3">
        <span className="text-sm text-gray-400">Your Code</span>

        <div className="flex gap-2">
          <select
            className="bg-black/40 p-1 text-sm rounded"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
          </select>

          <button onClick={run} className="px-3 py-1 bg-blue-600 rounded text-xs">
            Run
          </button>
          <button onClick={submit} className="px-3 py-1 bg-green-600 rounded text-xs">
            Submit
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCodeLocal(e.target.value)}
        className="flex-1 bg-black/40 border border-white/10 rounded p-3 text-sm font-mono"
        placeholder="// Monaco editor coming next..."
      />
    </div>
  );
}
