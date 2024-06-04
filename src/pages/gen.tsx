import Creature from "../components/creature";

import tw from "twin.macro";
import { IconUp } from "../components/icon";
import { useState } from "react";

const Gen = () => {
  const [promptValue, setPromptValue] = useState<string>("");

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
  };
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
      <InputWrapper>
        <InputBox>
          <Input
            type="text"
            placeholder="Prompt"
            value={promptValue}
            onChange={handlePromptChange}
          />
          <SendButton type="submit">
            <IconUp color={promptValue ? "blue" : "black"} />
          </SendButton>
        </InputBox>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center w-screen 
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
const InputWrapper = tw.div`
  flex w-screen box-border p-12
`;
const InputBox = tw.div`
  flex w-full  items-center gap-8 border-solid border-2 border-black
  p-12
`;

const Input = tw.input`
  w-full h-16 border-none
  focus:outline-none
`;

const SendButton = tw.button`
  
`;

export default Gen;
