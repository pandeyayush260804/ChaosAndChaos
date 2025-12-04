import { useState, useCallback } from "react";
import socket from "../../../lib/socket";

export default function useEditorSync() {
  const [code, setCode] = useState("");

  const setCodeLocal = useCallback(
    (value: string) => {
      setCode(value);

      socket.emit("typing", { typing: true });
      socket.emit("code_update", { code: value });

      const preview = value.split("\n").slice(0, 8).join("\n");
      socket.emit("code_preview", { preview });

      clearTimeout((setCodeLocal as any)._t);
      (setCodeLocal as any)._t = setTimeout(() => {
        socket.emit("typing", { typing: false });
      }, 900);
    },
    []
  );

  return { code, setCodeLocal };
}
