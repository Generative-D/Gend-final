import { Suspense, useEffect, useRef, useState, startTransition } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import tw from "twin.macro";
import lottie from "lottie-web/build/player/lottie_light";
import heart from "../assets/heart.json";

const CreatureModel = ({
  onClick,
  scene,
}: {
  onClick: () => void;
  scene: THREE.Group;
}) => {
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
        onClick={onClick}
        scale={[1.5, 1.5, 1.5]} // 모델 크기 조절
        // rotation={[0, -Math.PI / 2, 0]} // 모델 회전 조절 (Y축 기준 -90도 회전)
      />
    </group>
  );
};

const MarketCreature = () => {
  const gltf = useGLTF("src/public/models/clodsire.glb");
  const [scene, setScene] = useState<THREE.Group | null>(null);

  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startTransition(() => {
      if (gltf) {
        console.log("GLTF loaded successfully:", gltf);
        setScene(gltf.scene);
      }
    });
  }, [gltf]);

  const handleClick = () => {
    console.log("click");
  };

  return (
    <Wrapper>
      <Canvas>
        <Suspense fallback={null}>
          {scene && <CreatureModel onClick={handleClick} scene={scene} />}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center justify-center relative 
  w-300 h-300
  
`;

export default MarketCreature;
