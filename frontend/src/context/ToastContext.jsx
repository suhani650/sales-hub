import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Overlay Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="pointer-events-auto flex items-center justify-between gap-3 bg-panel/85 border border-white/10 backdrop-blur-md px-4 py-3.5 rounded-xl shadow-xl"
              style={{
                borderLeft: `4px solid ${
                  t.type === "success"
                    ? "#38bdf8" // Sky blue
                    : t.type === "error"
                    ? "#f43f5e" // Rose
                    : "#6366f1" // Indigo
                }`,
              }}
            >
              <div className="flex items-center gap-2.5">
                {t.type === "success" && (
                  <HiCheckCircle size={20} className="text-sky shrink-0" />
                )}
                {t.type === "error" && (
                  <HiExclamationCircle size={20} className="text-rose shrink-0" />
                )}
                {t.type === "info" && (
                  <HiInformationCircle size={20} className="text-indigo shrink-0" />
                )}
                <span className="text-xs font-medium text-white/95">{t.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-muted hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0.5"
              >
                <HiXMark size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
