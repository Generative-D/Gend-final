import Creature from "../components/creature";

import { Canvas } from "@react-three/fiber";
import Box from "../components/box";
import tw from "twin.macro";

const Gen = () => {
  return (
    <Wrapper>
      <Title>Generate</Title>

      <GpuWrapper>
        <GpuBox>
          <GpuTitle>GPU</GpuTitle>
          <GpuStatus>🔥</GpuStatus>
        </GpuBox>
      </GpuWrapper>

      <QueueWrapper>
        <QueueBox>Queue Length : 0</QueueBox>
      </QueueWrapper>
      <Creature />
      <div>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Box position={[-1.2, 0, 0]} />
        </Canvas>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center
`;

const Title = tw.h1`
  font-xxxxl-b
`;

const GpuWrapper = tw.div`
  flex flex-col items-center
`;

const GpuBox = tw.div`
  flex flex-col items-center
`;

const GpuTitle = tw.h2`
  font-xxl-b
`;

const GpuStatus = tw.div`
  font-xxl-b
`;

const QueueWrapper = tw.div`
  flex flex-col items-center
`;

const QueueBox = tw.div`
  font-xxl-b
`;

export default Gen;
