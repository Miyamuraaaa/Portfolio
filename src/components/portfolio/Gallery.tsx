"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentViewer } from "../ui/DocumentViewer";

export type PortfolioItem = {
  id: string;
  folderName: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  score?: string | null;
  reflection?: string | null;
  order: number;
  mainFile: string | null;
  mainFileType: string | null;
  thumbnail: string | null;
};

export function Gallery({
  items,
  title,
  description,
}: {
  items: PortfolioItem[];
  title: string;
  description: string;
}) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">{title}</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-2xl">{description}</p>
      </motion.div>

      {items.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <div className="text-neutral-400 dark:text-neutral-600 mb-2">
            <svg className="mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="text-neutral-500 dark:text-neutral-500 font-medium">No items uploaded yet</p>
          <p className="text-neutral-400 dark:text-neutral-600 text-sm mt-1">Add files to the portfolio-content folder</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              key={item.id}
              className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Thumbnail / Preview */}
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden flex items-center justify-center">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-neutral-300 dark:text-neutral-600 flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-widest">
                      {item.mainFileType || "FILE"}
                    </span>
                  </div>
                )}
                {item.score && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                    {item.score}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-1.5 font-medium">{item.date}</div>
                <h3 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{item.subtitle}</p>
                )}
                <p className="text-neutral-500 dark:text-neutral-500 text-sm line-clamp-2 mb-4 flex-1">
                  {item.description || item.reflection || "Click to view"}
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  View Work
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <DocumentViewer item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
