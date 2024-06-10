import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import speechbubble from "../assets/speech-bubble.png";
import tw from "twin.macro";
import lottie from "lottie-web/build/player/lottie_light";
import heart from "../assets/heart.json";
import styled from "@emotion/styled";

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

const Creature = () => {
  const gltf = useGLTF("/models/creature.glb");
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const [showLottie, setShowLottie] = useState<boolean>(false);
  const [speech, setSpeech] = useState<string>("");

  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gltf) {
      console.log("GLTF loaded successfully:", gltf);
      setScene(gltf.scene);
    }
  }, [gltf]);

  useEffect(() => {
    if (!warpperRef.current) return;
    if (!showLottie) return;
    const animation = lottie.loadAnimation({
      container: warpperRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: heart,
    });

    animation.addEventListener("complete", () => {
      setShowLottie(false);
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, showLottie]);

  const handleClick = () => {
    setShowLottie(true);
    setSpeech("Hello, I'm your AI creature!");
  };

  return (
    <Wrapper>
      <LottieWrapper ref={warpperRef} />
      {/* {speech && ( */}
      <SpeechBubbleWrapper
        speech={speech}
        style={{
          backgroundImage: `url(${speechbubble})`,
        }}
      >
        <Text>{speech}</Text>
      </SpeechBubbleWrapper>
      {/* )} */}
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
  flex flex-col items-center justify-center w-300  h-auto  relative 
  
`;

interface SpeechBubbleProps {
  speech: string;
}

const SpeechBubbleWrapper = styled.div<SpeechBubbleProps>((props) => [
  tw`
  w-300 h-300 relative
  bg-center bg-no-repeat bg-contain
  flex items-center justify-center
  transition-speech
`,
  props.speech ? tw`translate-x-0` : tw`hidden`,
]);

const Text = tw.div`
  font-l-b
  text-center
`;

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

export default Creature;
