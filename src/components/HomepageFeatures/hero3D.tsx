import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Number of floating points
const NUM_POINTS = 200;
// Maximum distance to link points
const LINK_DISTANCE = 2.5;

// Generate random positions for the points
const useRandomPositions = () => {
  return useMemo(() => {
    const positions = new Float32Array(NUM_POINTS * 3);
    for (let i = 0; i < NUM_POINTS * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10; // X
      positions[i + 1] = (Math.random() - 0.5) * 6; // Y
      positions[i + 2] = (Math.random() - 0.5) * 8; // Z
    }
    return positions;
  }, []);
};

function LinkedParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useRandomPositions();
  const [mousePosition, setMousePosition] = useState(new THREE.Vector3(0, 0, 0)); // Use Vector3 for 3D interaction

  // Handle mouse movement
  const onMouseMove = (event: MouseEvent) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition(new THREE.Vector3(mouseX, mouseY, 0)); // Set Z as 0 for 2D mouse position
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Smooth floating effect
  useFrame(() => {
    if (!ref.current) return;

    const positionsArray = positions;
    const pointsArray: THREE.Vector3[] = [];

    // Convert position array to a readable format
    for (let i = 0; i < positionsArray.length; i += 3) {
      pointsArray.push(
        new THREE.Vector3(positionsArray[i], positionsArray[i + 1], positionsArray[i + 2])
      );
    }

    // Animate points to move in a smooth floating way
    for (let i = 0; i < pointsArray.length; i++) {
      const point = pointsArray[i];

      // Add some sine wave-based motion to the points for smooth floating effect
      point.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
      point.x += Math.sin(Date.now() * 0.001 + i * 1.5) * 0.01;
      point.z += Math.sin(Date.now() * 0.001 + i * 2) * 0.01;

      // Interaction with mouse (points repulse from the mouse position)
      const mouseDistance = point.clone().sub(mousePosition).length();
      if (mouseDistance < 2) {
        const direction = point.clone().sub(mousePosition).normalize();
        point.add(direction.multiplyScalar(0.05)); // Push points away from mouse more significantly
      }
    }

    // Update positions of points
    ref.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsArray, 3)
    );
  });

  return (
    <>
      {/* Points */}
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          color="white"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </Points>
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      camera={{ position: [0, 0, 10] }}
    >
      <ambientLight intensity={0.5} />
      <LinkedParticles />
    </Canvas>
  );
}
