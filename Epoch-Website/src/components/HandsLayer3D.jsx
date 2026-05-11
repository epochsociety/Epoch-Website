import { Canvas } from '@react-three/fiber'

function HandUnit({ flip = false }) {
  return (
    <group rotation={[flip ? Math.PI : 0, 0, flip ? 0.3 : -0.3]}>
      {/* Abstract hand-like fallback geometry */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.28, 1.0, 10, 16]} />
        <meshStandardMaterial color="#d6ffe8" roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[-0.26, 0.3, 0.05]} rotation={[0.15, 0.25, 0.15]} castShadow>
        <capsuleGeometry args={[0.1, 0.55, 8, 12]} />
        <meshStandardMaterial color="#dcfff0" roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0.22, 0.35, 0.08]} rotation={[0.15, -0.25, -0.1]} castShadow>
        <capsuleGeometry args={[0.11, 0.65, 8, 12]} />
        <meshStandardMaterial color="#d8ffe8" roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  )
}

function HandsLayer3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color="#e3fff2" />
        <directionalLight position={[-3, -2, 1]} intensity={0.75} color="#87f5b8" />
        <group position={[0, 1.45, 0]}>
          <HandUnit />
        </group>
        <group position={[0, -1.45, 0]}>
          <HandUnit flip />
        </group>
      </Canvas>
    </div>
  )
}

export default HandsLayer3D

