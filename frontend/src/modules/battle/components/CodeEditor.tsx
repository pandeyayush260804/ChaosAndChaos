import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import socket from "../../../lib/socket";
import useEditorSync from "../hooks/useEditorSync";

type CodeEditorProps = {
  roomID: string;
};

export default function CodeEditor({ roomID }: CodeEditorProps) {
  const { code, setCodeLocal } = useEditorSync();
  const [lang, setLang] =
    useState<"python" | "cpp" | "javascript" | "java">("python");

  const [battleActive, setBattleActive] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // 🔥 throttle typing events
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    socket.on("timer_end", () => setBattleActive(false));
    return () => {
      socket.off("timer_end");
    };
  }, []);

  const run = () => {
    if (!battleActive || !code.trim()) return;
    socket.emit("run_code", {
      roomID,
      language: lang,
      source_code: code,
      stdin: "",
    });
  };

  const submit = () => {
    if (!battleActive || !code.trim()) return;
    setSubmitted(true);
    socket.emit("submit_code", {
      roomID,
      language: lang,
      source_code: code,
    });
  };

  const handleEditorChange = (value?: string) => {
    const newCode = value ?? "";
    setCodeLocal(newCode);

    // 🔥 emit typing (throttled)
    if (typingTimer.current) clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(() => {
      socket.emit("opponent_typing", {
        roomID,
        code: newCode.slice(0, 500), // safety limit
      });
    }, 300);
  };

  const monacoLanguage =
    lang === "cpp"
      ? "cpp"
      : lang === "javascript"
      ? "javascript"
      : lang === "java"
      ? "java"
      : "python";

  return (
    <div className="flex flex-col h-[420px]">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">Your Code</span>

        <div className="flex gap-2 items-center">
          <select
            disabled={submitted}
            className="bg-black/40 p-1 text-sm rounded border border-white/20"
            value={lang}
            onChange={(e) =>
              setLang(e.target.value as any)
            }
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={run}
            disabled={!battleActive}
            className="px-3 py-1 bg-blue-600 rounded text-xs"
          >
            Run
          </button>

          <button
            onClick={submit}
            disabled={!battleActive || submitted}
            className="px-3 py-1 bg-green-600 rounded text-xs"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex-1 border border-white/15 rounded-xl overflow-hidden bg-black/60">
        <Editor
          height="100%"
          theme="vs-dark"
          language={monacoLanguage}
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
