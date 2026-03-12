"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Rocket() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.3;

    // Slow rotation
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.2} rotation={[0.2, 0, 0.15]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.35, 1.2, 16, 32]} />
          <meshStandardMaterial color="#1A1A24" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Nose cone */}
        <mesh position={[0, 1.1, 0]}>
          <coneGeometry args={[0.35, 0.6, 32]} />
          <meshStandardMaterial color="#AD60E1" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Window */}
        <mesh position={[0, 0.4, 0.33]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial
            color="#E7FB79"
            emissive="#E7FB79"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Fin left */}
        <mesh position={[-0.35, -0.6, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.3, 0.5, 0.05]} />
          <meshStandardMaterial color="#AD60E1" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Fin right */}
        <mesh position={[0.35, -0.6, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.3, 0.5, 0.05]} />
          <meshStandardMaterial color="#AD60E1" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Fin back */}
        <mesh position={[0, -0.6, -0.35]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.3]} />
          <meshStandardMaterial color="#AD60E1" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Engine glow */}
        <mesh position={[0, -0.9, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <MeshDistortMaterial
            color="#E7FB79"
            emissive="#E7FB79"
            emissiveIntensity={2}
            distort={0.4}
            speed={5}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Exhaust trail */}
        <mesh position={[0, -1.3, 0]}>
          <coneGeometry args={[0.2, 0.8, 16]} />
          <meshStandardMaterial
            color="#AD60E1"
            emissive="#AD60E1"
            emissiveIntensity={1.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Orbs() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref1.current) {
      ref1.current.position.x = Math.sin(t * 0.4) * 3;
      ref1.current.position.y = Math.cos(t * 0.3) * 2;
    }
    if (ref2.current) {
      ref2.current.position.x = Math.cos(t * 0.5) * 2.5;
      ref2.current.position.y = Math.sin(t * 0.6) * 1.5;
    }
  });

  return (
    <>
      <mesh ref={ref1} position={[2, 1, -2]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#E7FB79" emissive="#E7FB79" emissiveIntensity={3} />
      </mesh>
      <mesh ref={ref2} position={[-2, -1, -1]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#AD60E1" emissive="#AD60E1" emissiveIntensity={3} />
      </mesh>
    </>
  );
}

export default function Rocket3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ pointerEvents: "none" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#AD60E1" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#E7FB79" />
      <Rocket />
      <Orbs />
    </Canvas>
  );
}
