import { useState } from "react";
import Editor from "@monaco-editor/react";
import socket from "../../../lib/socket";
import useEditorSync from "../hooks/useEditorSync";

type CodeEditorProps = {
  roomID: string;
};

const languageToJudgeId: Record<string, number> = {
  python: 71,      // Python (3.8.1) – adjust if needed
  cpp: 54,         // C++ (GCC)
  javascript: 63,  // Node.js
  java: 62,        // Java (OpenJDK 17) - Judge0 ID
};

export default function CodeEditor({ roomID }: CodeEditorProps) {
  const { code, setCodeLocal } = useEditorSync();
  const [lang, setLang] = useState<"python" | "cpp" | "javascript" | "java">("python");

  const run = () => {
    const language_id = languageToJudgeId[lang] ?? 71;

    socket.emit("run_code", {
      roomID,
      language_id,
      source_code: code,
      stdin: "",
    });
  };

  const submit = () => {
    socket.emit("submit_code", { roomID });
  };

  const handleEditorChange = (value: string | undefined) => {
    // useEditorSync already handles typing + preview emit
    setCodeLocal(value ?? "");
  };

  // Map UI lang to Monaco lang string
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
      {/* Top bar: label + controls */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">Your Code</span>

        <div className="flex gap-2 items-center">
          <select
            className="bg-black/40 p-1 text-sm rounded border border-white/20"
            value={lang}
            onChange={(e) =>
              setLang(e.target.value as "python" | "cpp" | "javascript" | "java")
            }
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={run}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs"
          >
            Run
          </button>
          <button
            onClick={submit}
            className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-xs"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
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
            fontLigatures: true,
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            padding: { top: 10, bottom: 10 },
          }}
        />
      </div>
    </div>
  );
}
