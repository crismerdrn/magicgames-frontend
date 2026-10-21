import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Edges, Environment, Float, Lightformer, OrbitControls } from '@react-three/drei'

function D20() {
  const mesh = useRef()
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.35
      mesh.current.rotation.x += delta * 0.12
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={mesh} castShadow receiveShadow>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.25} flatShading envMapIntensity={1.1} />
        <Edges threshold={15} color="#93c5fd" />
      </mesh>
    </Float>
  )
}

export default function Dice3D() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.6, 5.2], fov: 45 }}>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, -2, -3]} intensity={30} color="#60a5fa" />
      <spotLight position={[0, 5, -4]} angle={0.5} penumbra={1} intensity={25} color="#a78bfa" />

      <D20 />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      <ContactShadows position={[0, -2.05, 0]} opacity={0.6} scale={8} blur={2.4} far={4} color="#1e3a8a" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#60a5fa" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#a78bfa" position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>
      <OrbitControls enablePan={false} enableZoom minDistance={3} maxDistance={10} enableDamping />
    </Canvas>
  )
}
