import Creature from "../components/creature";

import tw from "twin.macro";
import { IconUp } from "../components/icon";
import { useState } from "react";
import { useGenQuery } from "../hooks/query/useGENQuery";
import { GenedImageStat } from "../types/image";

const Gen = () => {
  const [promptValue, setPromptValue] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imageStats, setImageStats] = useState<GenedImageStat | null>(null);

  const dummyImageState: GenedImageStat = {
    color: "black",
    size: 100,
    intelligence: 0.5,
    active: 0.5,
    emotion: 0.5,
    sensitive: 0.5,
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
  };

  const { useCreateImageByPrompt } = useGenQuery();

  const { mutateAsync: createImageByPrompt } = useCreateImageByPrompt({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleSubmitPrompt = async () => {
    // if (!promptValue) {
    //   alert("Prompt is required");
    //   return;
    // }
    // const result = await createImageByPrompt("hi");
    // console.log(result);
    setImgSrc("https://via.placeholder.com/150");
  };

  const handleMine = () => {
    setImageStats(dummyImageState);
  };

  const handleApply = () => {
    alert("Apply");
  };

  const handleReset = () => {
    setImageStats(null);
    setImgSrc("");
  };

  const handleGenerateWithoutPrompt = () => {
    setImgSrc("https://via.placeholder.com/150");
  };

  return (
    <Wrapper>
      <Creature />
      <GenerateWrapper></GenerateWrapper>
      <InputWrapper>
        <InputBox>
          <Input
            type="text"
            placeholder="Prompt"
            value={promptValue}
            onChange={handlePromptChange}
          />
          <SendButton type="submit" onClick={handleSubmitPrompt}>
            <IconUp color={promptValue ? "blue" : "black"} />
          </SendButton>
        </InputBox>
      </InputWrapper>
      <GenerateByNoPromptButton onClick={handleGenerateWithoutPrompt}>
        Generate without Prompt
      </GenerateByNoPromptButton>
      <GenerateWrapper />
      {imgSrc && (
        <MineWrapper>
          <MineImageWrapper>
            <MineImage src={imgSrc} />
            {imageStats && (
              <StatsBox>
                <StatsTitle>Stats</StatsTitle>
                <StatsItem>
                  <StatsLabel>Color : </StatsLabel>
                  <StatsValue>{dummyImageState.color}</StatsValue>
                </StatsItem>
                <StatsItem>
                  <StatsLabel>Size : </StatsLabel>
                  <StatsValue>{dummyImageState.size}</StatsValue>
                </StatsItem>
                <StatsItem>
                  <StatsLabel>Intelligence : </StatsLabel>
                  <StatsValue>{dummyImageState.intelligence}</StatsValue>
                </StatsItem>
                <StatsItem>
                  <StatsLabel>Active : </StatsLabel>
                  <StatsValue>{dummyImageState.active}</StatsValue>
                </StatsItem>
                <StatsItem>
                  <StatsLabel>Emotion : </StatsLabel>
                  <StatsValue>{dummyImageState.emotion}</StatsValue>
                </StatsItem>
                <StatsItem>
                  <StatsLabel>Sensitive : </StatsLabel>
                  <StatsValue>{dummyImageState.sensitive}</StatsValue>
                </StatsItem>
              </StatsBox>
            )}
          </MineImageWrapper>
          <MineButtonWrapper>
            {!imageStats && <MineButton onClick={handleMine}>Mine</MineButton>}
            {imageStats && (
              <ApplyButton onClick={handleApply}>Apply</ApplyButton>
            )}
            {imageStats && (
              <ResetButton onClick={handleReset}>Reset</ResetButton>
            )}
          </MineButtonWrapper>
        </MineWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center w-screen pt-24 gap-12
  box-border
`;

const GenerateWrapper = tw.div`
  flex flex-col items-center gap-12
`;

const InputWrapper = tw.div`
  flex w-screen box-border p-12  
`;
const InputBox = tw.div`
  flex w-full  items-center gap-8 border-solid border-3 border-green
  p-12
`;

const Input = tw.input`
  w-full h-16 border-none bg-transparent
  focus:outline-none
`;

const SendButton = tw.button`
  
`;

const MineWrapper = tw.div`
  flex flex-col items-center justify-center p-24 gap-12
`;

const MineImageWrapper = tw.div`
  flex items-center gap-12
`;

const MineImage = tw.img`
  w-200 h-200
`;

const StatsBox = tw.div`
  flex flex-col gap-8 w-full p-12

`;

const StatsTitle = tw.h3`
  font-xxl-b
`;

const StatsItem = tw.div`
  flex gap-8 items-center
`;

const StatsLabel = tw.div`
  font-xxl-b
`;

const StatsValue = tw.div`
  font-xl-m
`;

const MineButtonWrapper = tw.div`
  flex gap-8
`;

const MineButton = tw.button`
 
`;

const ApplyButton = tw.button`

`;

const ResetButton = tw.button`

`;

const GenerateByNoPromptButton = tw.button`
  
`;

export default Gen;
