import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function FloatingObject() {
  const groupRef = useRef(null)
  const targetRot = useMemo(() => new THREE.Vector2(0, 0), [])
  const targetPos = useMemo(() => new THREE.Vector2(0, 0), [])

  useFrame(({ clock, mouse }, delta) => {
    const t = clock.getElapsedTime()

    // gentle idle motion
    const floatY = Math.sin(t * 1.15) * 0.18
    const idleRot = Math.sin(t * 0.6) * 0.12

    // mouse-driven parallax targets (mouse is -1..1)
    targetRot.set(mouse.y * 0.55, mouse.x * 0.75)
    targetPos.set(mouse.x * 0.35, mouse.y * 0.18)

    const g = groupRef.current
    if (!g) return

    // Smooth damping (no jerky motion)
    const d = 1 - Math.pow(0.001, delta)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRot.x + idleRot, d)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRot.y, d)
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetPos.x, d)
    g.position.y = THREE.MathUtils.lerp(g.position.y, floatY, d)
  })

  return (
    <group ref={groupRef}>
      {/* Placeholder "hand-like" abstract object; swap with GLTF hand later */}
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.7, 0.22, 220, 32]} />
        <meshStandardMaterial
          color="#a78bfa"
          roughness={0.25}
          metalness={0.6}
          emissive="#2b1a55"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  )
}

function HeroHand3D() {
  return (
    <div className="pointer-events-none absolute right-[-28px] top-16 h-[240px] w-[240px] opacity-90 sm:h-[300px] sm:w-[300px] md:right-0 md:top-10 md:h-[440px] md:w-[440px]">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 3, 3]} intensity={1.35} />
        <directionalLight position={[-3, -2, 2]} intensity={0.55} color="#ff91fd" />
        <Suspense fallback={null}>
          <FloatingObject />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroHand3D
