"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useCursor } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// ─── Interactive Object Wrapper ───────────────────────────────────
function InteractiveObject({
  position,
  label,
  href,
  children,
}: {
  position: [number, number, number];
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const router = useRouter();

  useCursor(hovered);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = hovered ? 1.03 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
  });

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(href);
    },
    [href, router]
  );

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {children}
      {hovered && (
        <Html center position={[0, 2.2, 0]} className="pointer-events-none select-none">
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-xl shadow-xl text-sm font-medium whitespace-nowrap border border-neutral-200 dark:border-neutral-700">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Bookshelf ────────────────────────────────────────────────────
function Bookshelf() {
  const woodColor = "#A0785A";
  const darkWood = "#7B5B3A";

  return (
    <group>
      {/* Main frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 3.6, 0.6]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} />
      </mesh>
      {/* Shelves */}
      {[-1.2, -0.3, 0.6, 1.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[2.0, 0.06, 0.55]} />
          <meshStandardMaterial color={darkWood} roughness={0.6} />
        </mesh>
      ))}
      {/* Books - varied colors and sizes */}
      {[
        { pos: [-0.6, -0.75, 0], size: [0.12, 0.7, 0.4], color: "#3B5998" },
        { pos: [-0.35, -0.8, 0], size: [0.1, 0.6, 0.38], color: "#8B4513" },
        { pos: [-0.1, -0.72, 0], size: [0.14, 0.72, 0.42], color: "#2E8B57" },
        { pos: [0.15, -0.78, 0], size: [0.08, 0.64, 0.36], color: "#DC143C" },
        { pos: [0.35, -0.74, 0], size: [0.12, 0.68, 0.4], color: "#4169E1" },
        { pos: [0.55, -0.76, 0], size: [0.1, 0.66, 0.38], color: "#DAA520" },
        // Second shelf
        { pos: [-0.5, 0.15, 0], size: [0.12, 0.7, 0.4], color: "#556B2F" },
        { pos: [-0.25, 0.12, 0], size: [0.14, 0.64, 0.42], color: "#8B0000" },
        { pos: [0.0, 0.18, 0], size: [0.1, 0.72, 0.36], color: "#2F4F4F" },
        { pos: [0.2, 0.14, 0], size: [0.12, 0.66, 0.4], color: "#B8860B" },
        // Third shelf
        { pos: [-0.4, 1.05, 0], size: [0.12, 0.68, 0.38], color: "#483D8B" },
        { pos: [-0.15, 1.08, 0], size: [0.1, 0.72, 0.4], color: "#006400" },
        { pos: [0.1, 1.02, 0], size: [0.14, 0.62, 0.42], color: "#8B4513" },
      ].map((book, i) => (
        <mesh key={`book-${i}`} position={book.pos as [number, number, number]} castShadow>
          <boxGeometry args={book.size as [number, number, number]} />
          <meshStandardMaterial color={book.color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Desk with Monitor ───────────────────────────────────────────
function DeskWithMonitor() {
  return (
    <group>
      {/* Desk surface */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.08, 1.2]} />
        <meshStandardMaterial color="#C4A882" roughness={0.5} />
      </mesh>
      {/* Desk legs */}
      {[
        [-1.3, -0.45, -0.5],
        [1.3, -0.45, -0.5],
        [-1.3, -0.45, 0.5],
        [1.3, -0.45, 0.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color="#8B7355" roughness={0.6} />
        </mesh>
      ))}
      {/* Monitor */}
      <group position={[0, 0.5, -0.2]}>
        {/* Screen */}
        <mesh castShadow>
          <boxGeometry args={[1.0, 0.65, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Screen face (slightly emissive) */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.9, 0.55]} />
          <meshStandardMaterial color="#1e3a5f" emissive="#1e3a5f" emissiveIntensity={0.15} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.4, 0.1]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.08]} />
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.46, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.2]} />
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      {/* Keyboard */}
      <mesh position={[0, 0.06, 0.25]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

// ─── Notebook Stack ──────────────────────────────────────────────
function NotebookStack() {
  return (
    <group>
      {/* Table / small shelf */}
      <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.5, 0.7]} />
        <meshStandardMaterial color="#D4C4A8" roughness={0.7} />
      </mesh>
      {/* Notebooks stacked */}
      {[
        { y: 0.16, color: "#2E5090", h: 0.04 },
        { y: 0.22, color: "#4A7C59", h: 0.05 },
        { y: 0.29, color: "#8B3A3A", h: 0.04 },
      ].map((nb, i) => (
        <mesh key={i} position={[0, nb.y, 0]} rotation={[0, (i * 0.15) - 0.1, 0]} castShadow>
          <boxGeometry args={[0.6, nb.h, 0.45]} />
          <meshStandardMaterial color={nb.color} roughness={0.5} />
        </mesh>
      ))}
      {/* Pen */}
      <mesh position={[0.35, 0.35, 0.1]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// ─── Desk Lamp ───────────────────────────────────────────────────
function DeskLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.04, 16]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.6]} />
        <meshStandardMaterial color="#555" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <coneGeometry args={[0.12, 0.15, 16, 1, true]} />
        <meshStandardMaterial color="#F5E6CC" side={THREE.DoubleSide} roughness={0.8} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} intensity={0.6} distance={3} color="#FFEEDD" castShadow />
    </group>
  );
}

// ─── Plant ───────────────────────────────────────────────────────
function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.14, 8]} />
        <meshStandardMaterial color="#C4956A" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.02, 8]} />
        <meshStandardMaterial color="#3D2B1F" roughness={0.9} />
      </mesh>
      {/* Leaves (simplified) */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((rot, i) => (
        <mesh key={i} position={[Math.sin(rot) * 0.04, 0.15 + i * 0.02, Math.cos(rot) * 0.04]} rotation={[0.3, rot, 0.2]} castShadow>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial color="#3A7D44" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Main Room ───────────────────────────────────────────────────
export function Room() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle parallax from mouse
  useFrame((state) => {
    if (!groupRef.current) return;
    const tx = (state.pointer.x * Math.PI) / 50;
    const ty = (state.pointer.y * Math.PI) / 60;
    groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, -0.8, -3]}>
      {/* ─── Room Structure ─── */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#E8DDD0" roughness={0.85} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.6, -3]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.95} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-7, 2.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 7]} />
        <meshStandardMaterial color="#F0EBE5" roughness={0.95} />
      </mesh>

      {/* Window on back wall (simple frame) */}
      <group position={[2.5, 2.2, -2.95]}>
        <mesh>
          <boxGeometry args={[1.8, 2.2, 0.05]} />
          <meshStandardMaterial color="#D6E8F0" roughness={0.2} metalness={0.1} transparent opacity={0.4} />
        </mesh>
        {/* Window frame */}
        {[
          [0, 0, 0.03, 1.9, 0.06, 0.08],
          [0, 1.1, 0.03, 1.9, 0.06, 0.08],
          [0, -1.1, 0.03, 1.9, 0.06, 0.08],
          [-0.9, 0, 0.03, 0.06, 2.3, 0.08],
          [0.9, 0, 0.03, 0.06, 2.3, 0.08],
          [0, 0, 0.03, 0.06, 2.3, 0.08],
        ].map((f, i) => (
          <mesh key={i} position={[f[0], f[1], f[2]]} castShadow>
            <boxGeometry args={[f[3], f[4], f[5]]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* ─── Interactive Objects ─── */}

      {/* Bookshelf → Reading Process Worksheets */}
      <InteractiveObject position={[-3.5, 0.9, -2.2]} label="📚 Reading Process Worksheets" href="/reading-process">
        <Bookshelf />
      </InteractiveObject>

      {/* Desk with Monitor → iCARE Activities */}
      <InteractiveObject position={[0, 0, -1]} label="💻 iCARE Activities" href="/icare">
        <DeskWithMonitor />
      </InteractiveObject>

      {/* Notebook area → Reader Responses */}
      <InteractiveObject position={[3.2, 0, -1.5]} label="📝 Reader Responses" href="/reader-responses">
        <NotebookStack />
      </InteractiveObject>

      {/* ─── Decorations ─── */}
      <DeskLamp position={[-1.0, 0.04, -0.6]} />
      <Plant position={[1.6, 0.04, -0.3]} />
      <Plant position={[-5, -0.9, -1.5]} />
    </group>
  );
}
