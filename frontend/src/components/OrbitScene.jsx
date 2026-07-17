import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_CONFIG = [
  {
    radius: 2.6,
    speed: 0.35,
    size: 0.14,
    color: "#5B6EF5",
    tilt: 0.1,
    label: "Vendors",
  },
  {
    radius: 3.4,
    speed: -0.22,
    size: 0.1,
    color: "#22D3EE",
    tilt: -0.25,
    label: "Products",
  },
  {
    radius: 4.1,
    speed: 0.18,
    size: 0.12,
    color: "#F5A623",
    tilt: 0.4,
    label: "Orders",
  },
  {
    radius: 4.8,
    speed: -0.14,
    size: 0.09,
    color: "#8891FA",
    tilt: -0.15,
    label: "Customers",
  },
];

function OrbitRing({ radius, tilt }) {
  const points = useMemo(() => {
    const pts = [];

    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
      );
    }

    return pts;
  }, [radius]);

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points],
  );

  return (
    <line geometry={geometry} rotation={[tilt, 0, 0]}>
      <lineBasicMaterial color="#2A3350" transparent opacity={0.5} />
    </line>
  );
}

function OrbitNode({ radius, speed, size, color, tilt }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;

    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 2) * 0.15,
        Math.sin(t) * radius,
      );
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function Hub() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#5B6EF5"
        emissive="#5B6EF5"
        emissiveIntensity={1}
        wireframe
      />
    </mesh>
  );
}

export default function OrbitScene() {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} />

      <Hub />

      {NODE_CONFIG.map((node) => (
        <group key={node.label}>
          <OrbitRing radius={node.radius} tilt={node.tilt} />
          <OrbitNode {...node} />
        </group>
      ))}
    </Canvas>
  );
}
