"use client";

import dynamic from "next/dynamic";
import { portfolioConfig } from "@/config/portfolio";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Scene = dynamic(() => import("@/components/3d/Scene").then(m => ({ default: m.Scene })), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    // Delay 3D scene load so text appears first
    const timer = setTimeout(() => setShowScene(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showScene && <Scene />}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-blue-600 dark:text-blue-400 font-semibold tracking-[0.2em] uppercase mb-4 text-xs"
          >
            {portfolioConfig.subject} &middot; {portfolioConfig.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-white"
          >
            {portfolioConfig.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl font-normal text-neutral-600 dark:text-neutral-400 mb-6 italic"
          >
            &ldquo;{portfolioConfig.subtitle}&rdquo;
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed"
          >
            {portfolioConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/journey"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm"
            >
              Explore Portfolio
            </Link>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              or interact with the room
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 animate-bounce text-neutral-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </div>
    </>
  );
}
