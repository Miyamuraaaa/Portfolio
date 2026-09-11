"use client";

import { useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroScrollContext } from "./HeroScrollContext";

type InkSurface = { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D; texture: THREE.CanvasTexture; stage: number };

// A small canvas texture follows the actual bent sheet geometry. No font/model downloads.
export default function PaperInk({ geometry, variant = 0 }: { geometry: THREE.BufferGeometry; variant?: number }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const surface = useRef<InkSurface | null>(null);
  const handoff = useContext(HeroScrollContext);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 384;
    const context = canvas.getContext("2d");
    if (!context || !material.current) return;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    material.current.map = texture;
    material.current.needsUpdate = true;
    surface.current = { canvas, context, texture, stage: -1 };
    return () => { texture.dispose(); surface.current = null; };
  }, []);

  useFrame(() => {
    const ink = surface.current;
    if (!ink) return;
    // The same scrubbed progress drives object separation, DOM handoff, and reversible ink.
    const progress = handoff.current.progress;
    const writing = THREE.MathUtils.clamp((progress - 0.06 - variant * 0.035) / 0.48, 0, 1);
    const notes = THREE.MathUtils.clamp((progress - 0.4) / 0.35, 0, 1);
    const stage = Math.floor(writing * 32) * 20 + Math.floor(notes * 19);
    if (stage === ink.stage) return;
    ink.stage = stage;
    const c = ink.context;
    c.clearRect(0, 0, 256, 384);
    c.lineCap = "round";
    c.strokeStyle = "#776c7d";
    c.fillStyle = "#776c7d";
    c.globalAlpha = 0.55;
    c.fillRect(37, 47, 62, 3);
    c.globalAlpha = 0.23;
    c.fillRect(28, 74, 0.7, 220);
    c.fillRect(37, 61, 176, 0.6);
    c.globalAlpha = 0.55;
    for (let row = 0; row < 8; row++) {
      const progress = THREE.MathUtils.clamp(writing * 10 - row, 0, 1);
      const length = (row === 7 ? 91 : 143 + Math.sin(row * 2 + variant) * 18) * progress;
      if (!length) continue;
      c.beginPath();
      c.lineWidth = 1;
      for (let x = 0; x <= length; x += 2) {
        const y = 94 + row * 17 + Math.sin(x * 0.23 + row) * 1.4 + Math.sin(x * 0.6) * 0.6;
        if (x === 0) c.moveTo(38, y);
        else c.lineTo(38 + x, y);
      }
      c.stroke();
    }
    c.globalAlpha = 0.4 * writing;
    c.beginPath();
    c.moveTo(39, 241);
    c.bezierCurveTo(52, 228, 59, 252, 73, 239);
    c.bezierCurveTo(80, 231, 94, 247, 103, 239);
    c.stroke();
    // Underline and margin check become a little clearer as the visitor scrolls.
    c.globalAlpha = 0.22 * writing + notes * 0.4;
    c.strokeStyle = "#8c758a";
    c.lineWidth = 1.3;
    c.beginPath();
    c.moveTo(39, 135); c.quadraticCurveTo(83, 138, 125 + notes * 24, 135); c.stroke();
    c.beginPath();
    c.moveTo(218, 178);
    if (notes < 0.35) c.lineTo(218 + 5 * notes / 0.35, 178 + 5 * notes / 0.35);
    else { c.lineTo(223, 183); c.lineTo(223 + 9 * (notes - 0.35) / 0.65, 183 - 13 * (notes - 0.35) / 0.65); }
    c.stroke();
    c.beginPath(); c.moveTo(22, 227); c.lineTo(17, 227); c.lineTo(17, 227 + notes * 35); c.stroke();
    c.globalAlpha = 0.18 + notes * 0.3;
    c.beginPath();
    c.ellipse(199, 278, 19, 10, -0.18, 0, Math.PI * 2); c.stroke();
    c.font = "italic 12px Georgia";
    c.fillStyle = "#776c7d";
    c.fillText(["a", "b", "c"][variant % 3], 197, 282);
    c.globalAlpha = 1;
    ink.texture.needsUpdate = true;
  });

  return <mesh geometry={geometry} position={[0, 0, 0.003]}>
    <meshBasicMaterial ref={material} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-1} side={THREE.FrontSide} toneMapped={false} />
  </mesh>;
}
