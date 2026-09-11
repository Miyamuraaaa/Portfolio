"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Room } from "./Room";

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} color="#fff5e6" />
        <directionalLight
          castShadow
          position={[5, 8, 4]}
          intensity={1.2}
          color="#fff8f0"
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.001}
        />
        <pointLight position={[-2, 3, 2]} intensity={0.3} color="#ffeedd" />
        <Suspense fallback={null}>
          <Room />
          <Environment preset="apartment" background={false} blur={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}
