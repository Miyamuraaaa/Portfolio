"use client";

import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import type { PortfolioItem } from "../portfolio/Gallery";

export function DocumentViewer({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isImage = ["png", "jpg", "jpeg", "webp"].includes(item.mainFileType || "");
  const isPdf = item.mainFileType === "pdf";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 md:p-6 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white truncate">{item.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-sm text-neutral-400">{item.date}</span>
              {item.score && (
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md text-xs font-semibold">
                  {item.score}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-4 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {(item.description || item.reflection) && (
            <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                {item.reflection ? "Reflection" : "Description"}
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {item.reflection || item.description}
              </p>
            </div>
          )}

          <div className="flex items-center justify-center min-h-[40vh] bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden">
            {!item.mainFile ? (
              <p className="text-neutral-400 text-sm">No document attached</p>
            ) : isImage ? (
              <img src={item.mainFile} alt={item.title} className="max-w-full max-h-[65vh] object-contain" />
            ) : isPdf ? (
              <iframe src={item.mainFile} className="w-full h-[65vh] border-0" title={item.title} />
            ) : (
              <div className="text-center p-8">
                <p className="text-neutral-500 mb-3 text-sm">Preview not available for this file type</p>
                <a
                  href={item.mainFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Download File
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {item.mainFile && (
          <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center shrink-0">
            <button onClick={onClose} className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              ← Back
            </button>
            <a
              href={item.mainFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open Original
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
