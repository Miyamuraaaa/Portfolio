"use client";

import { useContext, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import PaperInk from "./PaperInk";
import { HeroScrollContext } from "./HeroScrollContext";

type Pointer = RefObject<{ x: number; y: number }>;

// Reuse rotation targets across frames to avoid allocation in the animation loop.
const euler = new THREE.Euler();
const quaternion = new THREE.Quaternion();

function FloatingObject({ children, position, rotation, strength, pointer, departure = [0, 0, 0, 0] }: {
  children: ReactNode;
  position: [number, number, number];
  rotation: [number, number, number];
  strength: number;
  pointer: Pointer;
  departure?: [number, number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const handoff = useContext(HeroScrollContext);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const progress = handoff.current.progress;
    euler.set(
      rotation[0] + pointer.current.y * strength * 0.25 + Math.sin(time * 0.23) * 0.025,
      rotation[1] + pointer.current.x * strength * 0.35,
      rotation[2] + Math.sin(time * 0.3) * strength * 0.045 + departure[3] * progress
    );
    quaternion.setFromEuler(euler);
    ref.current.quaternion.slerp(quaternion, 1 - Math.exp(-3 * Math.min(delta, 0.05)));
    ref.current.position.y = position[1] + progress * departure[1];
    ref.current.position.z = position[2] + progress * departure[2];
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, position[0] + progress * departure[0] + pointer.current.x * strength * 0.12, 3, delta);
  });
  return <Float speed={0.65} rotationIntensity={0} floatIntensity={strength * 0.3} floatingRange={[-0.12, 0.12]}>
    <group ref={ref} position={position} rotation={rotation}>{children}</group>
  </Float>;
}

function Pen() {
  return <group>
    <mesh>
      <cylinderGeometry args={[0.085, 0.105, 2.95, 24]} />
      <meshStandardMaterial color="#777181" metalness={0.72} roughness={0.28} />
    </mesh>
    <mesh position={[0, -1.25, 0]}>
      <cylinderGeometry args={[0.11, 0.11, 0.65, 24]} />
      <meshStandardMaterial color="#25252d" metalness={0.25} roughness={0.6} />
    </mesh>
    {[0, 1, 2, 3, 4, 5].map((i) => <mesh key={i} position={[0, -1.03 - i * 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.109, 0.006, 5, 20]} />
      <meshStandardMaterial color="#77717d" roughness={0.5} />
    </mesh>)}
    <mesh position={[0, -1.77, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[0.105, 0.38, 24]} />
      <meshStandardMaterial color="#d1bd99" metalness={0.85} roughness={0.23} />
    </mesh>
    <mesh position={[0, -1.98, 0]}>
      <sphereGeometry args={[0.024, 10, 8]} />
      <meshStandardMaterial color="#272732" metalness={0.7} roughness={0.3} />
    </mesh>
    <mesh position={[0, 1.48, 0]}>
      <cylinderGeometry args={[0.09, 0.09, 0.12, 20]} />
      <meshStandardMaterial color="#cfbb97" metalness={0.8} roughness={0.24} />
    </mesh>
    <mesh position={[0, 1.61, 0]}>
      <cylinderGeometry args={[0.06, 0.06, 0.15, 20]} />
      <meshStandardMaterial color="#a19b9f" metalness={0.85} roughness={0.2} />
    </mesh>
    <mesh position={[0.1, 1.07, 0.04]} rotation={[0, 0, -0.025]}>
      <boxGeometry args={[0.035, 0.83, 0.045]} />
      <meshStandardMaterial color="#cfbb97" metalness={0.85} roughness={0.24} />
    </mesh>
  </group>;
}

function Paper({ width = 1.75, height = 2.35, color = "#e9e3d6", variant = 0 }: { width?: number; height?: number; color?: string; variant?: number }) {
  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(width, height, 12, 16);
    const positions = plane.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i);
      positions.setZ(i, 0.085 * Math.pow(x / width, 2) + 0.1 * Math.pow(y / height, 2));
    }
    plane.computeVertexNormals();
    return plane;
  }, [width, height]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <group>
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.92} side={THREE.DoubleSide} />
    </mesh>
    <PaperInk geometry={geometry} variant={variant} />
  </group>;
}

function Board() {
  return <group>
    {[-1.43, 1.43].map(x => <mesh key={x} position={[x, 0, 0.064]}><planeGeometry args={[0.009, 3.62]} /><meshStandardMaterial color="#55505a" roughness={1} /></mesh>)}
    {[-1.81, 1.81].map(y => <mesh key={y} position={[0, y, 0.064]}><planeGeometry args={[2.86, 0.009]} /><meshStandardMaterial color="#55505a" roughness={1} /></mesh>)}
    {[-0.9, -0.3, 0.3, 0.9].map(x => <mesh key={x} position={[x, -0.35, 0.064]}><planeGeometry args={[0.004, 2.6]} /><meshStandardMaterial color="#30313b" roughness={1} /></mesh>)}
    <mesh><boxGeometry args={[3.05, 3.85, 0.1]} /><meshStandardMaterial color="#262730" metalness={0.1} roughness={0.95} /></mesh>
    <mesh position={[0, 0, 0.057]}><planeGeometry args={[2.85, 3.65]} /><meshStandardMaterial color="#1c1e27" roughness={1} /></mesh>
    <mesh position={[0, 1.86, 0.08]}><boxGeometry args={[0.7, 0.12, 0.08]} /><meshStandardMaterial color="#998977" metalness={0.65} roughness={0.5} /></mesh>
    {[0, 1, 2, 3, 4].map(i => <mesh key={i} position={[-0.66, 1.15 - i * 0.22, 0.063]}>
      <planeGeometry args={[0.8, 0.008]} /><meshStandardMaterial color="#41414b" roughness={1} />
    </mesh>)}
  </group>;
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => Float32Array.from({ length: 40 * 3 }, (_, i) =>
    (Math.sin(i * 127.1 + 31.7) * 43758.5453 % 1) * 8), []);
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.008; });
  return <points ref={ref}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial size={0.013} color="#c4b59b" transparent opacity={0.24} sizeAttenuation />
  </points>;
}

function Composition({ pointer }: { pointer: Pointer }) {
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 10.6, viewport.height / 5.5);
  useFrame(({ camera }, delta) => {
    const progress = Math.min(window.scrollY / window.innerHeight, 1.2);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 8 - progress * 0.35, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -progress * 0.2, 3, delta);
    camera.lookAt(0, 0, 0);
  });
  return <group scale={scale}>
    <FloatingObject position={[3.35, 0.15, -2]} rotation={[-0.12, -0.2, -0.13]} strength={0.15} departure={[0.1, 0.2, -0.2, 0.04]} pointer={pointer}><Board /></FloatingObject>
    <FloatingObject position={[3.25, 0.55, -0.9]} rotation={[0.15, -0.32, -0.24]} strength={0.4} departure={[0.45, 0.5, -0.2, -0.18]} pointer={pointer}><Paper color="#bcb2b8" variant={1} /></FloatingObject>
    <FloatingObject position={[2.35, 0.25, -0.15]} rotation={[-0.1, 0.2, 0.19]} strength={0.6} departure={[-0.9, -1.3, 0.35, -0.38]} pointer={pointer}><Paper /></FloatingObject>
    <FloatingObject position={[3.8, -1.15, 0.15]} rotation={[0.2, -0.25, -0.35]} strength={0.5} departure={[0.6, -0.35, 0, 0.2]} pointer={pointer}><Paper width={1.35} height={1.8} color="#d6cbbb" variant={2} /></FloatingObject>
    <FloatingObject position={[2.35, 0.25, 1.35]} rotation={[0.1, -0.15, -0.62]} strength={1} departure={[1.1, 0.45, -0.15, 0.7]} pointer={pointer}><Pen /></FloatingObject>
  </group>;
}

export default function Scene({ eventSource, active = true, handoff }: { eventSource: RefObject<HTMLElement | null>; active?: boolean; handoff: RefObject<{ progress: number }> }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [contextLost, setContextLost] = useState(false);
  useEffect(() => {
    const element = eventSource.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.current.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const leave = () => { pointer.current = { x: 0, y: 0 }; };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    return () => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); };
  }, [eventSource]);
  if (contextLost) return null;
  return <Canvas camera={{ position: [0, 0, 8], fov: 38 }} dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    frameloop={active ? "always" : "never"} fallback={null}
    onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", () => setContextLost(true), { once: true }); }}
    style={{ background: "transparent", pointerEvents: "none" }}>
    <ambientLight intensity={1.5} />
    <directionalLight position={[-3, 5, 6]} intensity={3} color="#fff1dc" />
    <directionalLight position={[6, -1, 3]} intensity={1.8} color="#b0a5c7" />
    <HeroScrollContext.Provider value={handoff}><ParticleField /><Composition pointer={pointer} /></HeroScrollContext.Provider>
  </Canvas>;
}
