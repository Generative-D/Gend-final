import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import tw from "twin.macro";

const CreatureModel = ({ scene }: { scene: THREE.Group }) => {
  useFrame(() => {
    if (scene) {
      scene.rotation.y += 0.005; // Y축을 기준으로 회전
      scene.position.z = -5; // 회전축을 뒤로 이동
    }
  });

  return (
    <group>
      <primitive
        object={scene}
        scale={[1.5, 1.5, 1.5]} // 모델 크기 조절
        rotation={[0, -Math.PI / 2, 0]} // 모델 회전 조절 (Y축 기준 -90도 회전)
      />
    </group>
  );
};

const Creature = () => {
  const gltf = useGLTF("src/public/models/creature.glb");
  const [scene, setScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (gltf) {
      console.log("GLTF loaded successfully:", gltf);
      setScene(gltf.scene);
    }
  }, [gltf]);

  return (
    <Wrapper>
      <Canvas>
        <Suspense fallback={null}>
          {scene && <CreatureModel scene={scene} />}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  w-200 h-200
`;

export default Creature;
