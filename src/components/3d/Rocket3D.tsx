"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Aerodynamic body profile via LatheGeometry (30% shorter) ── */
function useBodyGeometry() {
  return useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // 0→1 from tip to base
      let r: number;
      if (t < 0.15) {
        r = 0.38 * Math.sin((t / 0.15) * Math.PI * 0.5);
      } else if (t < 0.85) {
        const bt = (t - 0.15) / 0.7;
        r = 0.38 + 0.03 * Math.sin(bt * Math.PI);
      } else {
        const bt = (t - 0.85) / 0.15;
        r = 0.41 * (1 - bt * 0.25);
      }
      const y = 1.4 - t * 1.96; // 30% shorter: top 1.4 → bottom -0.56
      pts.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(pts, 48);
  }, []);
}

/* ── Single fin extending radially outward (triangular swept) ── */
function Fin({ angle }: { angle: number }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.1);          // top, at body surface
    s.lineTo(0.3, -0.02);      // tip sweeps outward
    s.lineTo(0.12, -0.44);     // bottom outer
    s.lineTo(0, -0.36);        // back at body surface
    s.closePath();
    return s;
  }, []);

  return (
    <group rotation={[0, angle, 0]}>
      <mesh position={[0.3, -0.08, -0.015]}>
        <extrudeGeometry
          args={[
            shape,
            { depth: 0.03, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006 },
          ]}
        />
        <meshStandardMaterial
          color="#5a5660"
          metalness={0.6}
          roughness={0.25}
          emissive="#504a53"
          emissiveIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── Main rocket group ── */
function Rocket() {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const bodyGeo = useBodyGeometry();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Bobbing & slight tilt
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;

    // Spin on own axis
    if (spinRef.current) {
      spinRef.current.rotation.y = t * 0.5;
    }

    // Animate exhaust flame flicker
    if (exhaustRef.current) {
      const scale = 1 + Math.sin(t * 12) * 0.12 + Math.sin(t * 18) * 0.06;
      exhaustRef.current.scale.set(1, scale, 1);
    }
    if (glowRef.current) {
      const opacity = 0.5 + Math.sin(t * 8) * 0.2;
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.1} rotation={[0.25, 0, 0.1]}>
        <group ref={spinRef}>
          {/* ── Body ── */}
          <mesh geometry={bodyGeo}>
            <meshStandardMaterial
              color="#7a7878"
              metalness={0.55}
              roughness={0.28}
              emissive="#48464a"
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* ── Rim-light edge glow ── */}
          <mesh geometry={bodyGeo} scale={[1.03, 1.01, 1.03]}>
            <meshStandardMaterial
              color="#AD60E1"
              emissive="#AD60E1"
              emissiveIntensity={0.8}
              transparent
              opacity={0.08}
              side={THREE.BackSide}
            />
          </mesh>

          {/* ── Window ring (golden bezel) ── */}
          <mesh position={[0, 0.42, 0.39]}>
            <torusGeometry args={[0.12, 0.022, 16, 48]} />
            <meshStandardMaterial
              color="#E7FB79"
              emissive="#E7FB79"
              emissiveIntensity={0.4}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>

          {/* ── Window glass ── */}
          <mesh position={[0, 0.42, 0.38]}>
            <circleGeometry args={[0.1, 32]} />
            <meshStandardMaterial
              color="#1A3A2A"
              metalness={0.4}
              roughness={0.1}
              emissive="#2A5A3A"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* ── Window inner reflection ── */}
          <mesh position={[0.025, 0.445, 0.395]}>
            <circleGeometry args={[0.025, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* ── Fins (3 at 120° intervals, extending outward) ── */}
          <Fin angle={0} />
          <Fin angle={(Math.PI * 2) / 3} />
          <Fin angle={(Math.PI * 4) / 3} />

          {/* ── Body accent stripe ── */}
          <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.01, 8, 64]} />
            <meshStandardMaterial
              color="#aca75f"
              emissive="#9c965a"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* ── Engine nozzle ── */}
          <mesh position={[0, -0.54, 0]} rotation={[Math.PI, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.25, 0.14, 32]} />
            <meshStandardMaterial
              color="#5a5660"
              metalness={0.7}
              roughness={0.2}
              emissive="#48464a"
              emissiveIntensity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* ── Exhaust flame (yellow core) ── */}
          <mesh ref={exhaustRef} position={[0, -0.9, 0]}>
            <coneGeometry args={[0.15, 0.7, 24]} />
            <MeshDistortMaterial
              color="#E7FB79"
              emissive="#E7FB79"
              emissiveIntensity={3}
              distort={0.25}
              speed={8}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* ── Exhaust outer glow (purple halo) ── */}
          <mesh ref={glowRef} position={[0, -0.82, 0]}>
            <coneGeometry args={[0.22, 0.55, 24]} />
            <meshStandardMaterial
              color="#AD60E1"
              emissive="#AD60E1"
              emissiveIntensity={1.5}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/* ── Floating star particles ── */
function Stars() {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      arr.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2,
      ]);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const [bx, by, bz] = positions[i];
      dummy.position.set(
        bx + Math.sin(t * 0.3 + i) * 0.2,
        by + Math.cos(t * 0.4 + i * 0.7) * 0.15,
        bz
      );
      const s = 0.3 + Math.sin(t * 2 + i * 1.5) * 0.15;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.03, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={2}
      />
    </instancedMesh>
  );
}

/* ── Floating accent orbs ── */
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
      camera={{ position: [0, 0.3, 5], fov: 42 }}
      style={{ pointerEvents: "none" }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Strong lighting for visibility without environment map */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-4, 3, 2]} intensity={1.0} color="#AD60E1" />
      <directionalLight position={[0, -2, 5]} intensity={0.8} color="#E7FB79" />
      <pointLight position={[-3, 2, 3]} intensity={1.5} color="#AD60E1" distance={10} />
      <pointLight position={[3, -1, 3]} intensity={1.2} color="#E7FB79" distance={10} />
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#ff6600" distance={8} />
      <Rocket />
      <Stars />
      <Orbs />
    </Canvas>
  );
}
