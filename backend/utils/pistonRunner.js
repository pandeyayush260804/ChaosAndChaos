// backend/utils/pistonRunner.js
import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const languageMap = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  cpp: { language: "cpp", version: "10.2.0" },
  java: { language: "java", version: "15.0.2" }
};

export async function runWithPiston({ language, source_code, stdin }) {
  const langConfig = languageMap[language];

  if (!langConfig) {
    return {
      stdout: "",
      stderr: "Unsupported language",
      error: true
    };
  }

  try {
    const res = await axios.post(PISTON_URL, {
      language: langConfig.language,
      version: langConfig.version,   // ✅ REQUIRED
      files: [
        {
          content: source_code
        }
      ],
      stdin: stdin || ""
    });

    return {
      stdout: res.data.run.stdout || "",
      stderr: res.data.run.stderr || "",
      error: false
    };
  } catch (err) {
    console.error("🔥 Piston error:", err.response?.data || err.message);

    return {
      stdout: "",
      stderr:
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message,
      error: true
    };
  }
}
