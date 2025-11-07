import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';


const CameraController = () => {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ camera }) => {
    const targetZ = 1 + scrollRef.current * 0.003;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
};

 ///////////////////////////////////////////////////////////////////////////////////////// 
// Shooting star: circle head + line trail
const ShootingStar = () => {
  const headRef = useRef();
  const trailRef = useRef();
  const [start, setStart] = useState(getRandomStart());
  const [end, setEnd] = useState(getRandomEnd());
  const progress = useRef(0);

  const updatePosition = () => {
    const pos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      progress.current
    );
    return pos;
  };

  useFrame((_, delta) => {
    progress.current += delta * 0.1; // slow speed

    if (progress.current >= 1) {
      setStart(getRandomStart());
      setEnd(getRandomEnd());
      progress.current = 0;
    }

    const currentPos = updatePosition();
    if (headRef.current) {
      headRef.current.position.set(currentPos.x, currentPos.y, currentPos.z);
    }

    if (trailRef.current) {
      const points = [
        new THREE.Vector3(...start),
        currentPos,
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      trailRef.current.geometry.setFromPoints(curve.getPoints(10));
    }
  });

  return (
    <>
      {/* Trail */}
      <line ref={trailRef}>
        <bufferGeometry />
        <lineBasicMaterial color="white" transparent opacity={0.5} />
      </line>

      {/* Head (bright white) */}
      <mesh ref={headRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="white" transparent opacity={0.95} />
      </mesh>
    </>
  );
};

const getRandomStart = () => [
  Math.random() * -40 - 10,
  Math.random() * 20 + 10,
  Math.random() * -10 - 5,
];

const getRandomEnd = () => [
  Math.random() * 40 + 20,
  Math.random() * -20 - 10,
  Math.random() * -10 - 5,
];

const AnimatedBackground = () => {
  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      camera={{ position: [0, 0, 1], fov: 75 }}
    >
      {/* Scene Setup */}
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 10, 40]} />
      <ambientLight intensity={1.4} />
      <pointLight position={[0, 0, 0]} intensity={1.2} />

      {/* Scroll-aware camera */}
      <CameraController />

      {/* Dense, twinkly stars */}
      <Stars
        radius={120}
        depth={100}
        count={40000}
        factor={15}
        saturation={0}
        fade
        speed={2}
      />

      {/* Shooting Stars */}
      {[...Array(4)].map((_, i) => (
        <ShootingStar key={i} />
      ))}

    </Canvas>
  );
};

export default AnimatedBackground;
