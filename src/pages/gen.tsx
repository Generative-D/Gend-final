/* eslint-disable @typescript-eslint/no-explicit-any */
import Creature from "../components/my-creature";
import tw from "twin.macro";
import { IconUp } from "../components/icon";
import { Suspense, startTransition, useEffect, useState } from "react";
import { useGenQuery } from "../hooks/query/useGENQuery";
import { useWallet } from "@txnlab/use-wallet";
import Loading from "../components/loading";
import { useAtom } from "jotai";
import { algorandClientAtom, helloWorldClientAtom } from "../atom";
import { getHelloWorldClient } from "../utils/getHelloworldClient";
import * as methods from "../method";
import { getAlgodConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";
import { AlgorandClient } from "@algorandfoundation/algokit-utils/types/algorand-client";
import { HelloWorldClient } from "../contracts/gend";
import { helloWorldAppId } from "../utils/helloWorldAppId";

interface aiStatInterface {
  active: number;
  color: string;
  emotion: number;
  intelligence: number;
  seneitive: number;
  size: number;
}

const Gen = () => {
  const [promptValue, setPromptValue] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imageStats, setImageStats] = useState<any>(null);
  const [aiStats, setAiStats] = useState<aiStatInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [algorandClient, setAlgorandClient] = useAtom(algorandClientAtom);
  const [helloWorldAppClient, setHelloWorldAppClient] =
    useAtom(helloWorldClientAtom);

  const [chainAddress, setChainAddress] = useState<string>("");

  const { signer, activeAddress, clients, activeAccount } = useWallet();

  const {
    useCreateImageByPrompt,
    useCreateImageWithoutPrompt,
    useGetUserAi,
    useMine,
    useApplyStats,
  } = useGenQuery();

  const { data: userAiData, refetch } = useGetUserAi(activeAddress || "") || {};

  useEffect(() => {
    if (userAiData) {
      setAiStats(userAiData.basic);
      console.log(aiStats);
    } else {
      console.log("No userAiData");
    }
  }, [userAiData]);

  const { mutateAsync: createImageByPrompt } = useCreateImageByPrompt({
    onSuccess: (data) => {
      console.log(data);
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
    },
    onMutate: (variables) => {
      console.log(variables);
      setIsLoading(true);
    },
  });

  const { mutateAsync: createImageWithoutPrompt } = useCreateImageWithoutPrompt(
    {
      onSuccess: (data) => {
        console.log(data);
        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
      onMutate: (variables) => {
        console.log(variables);
        setIsLoading(true);
      },
    }
  );

  const { mutateAsync: mine } = useMine({
    onSuccess: (data) => {
      console.log(data);
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
    },
    onMutate: (variables) => {
      console.log(variables);
      setIsLoading(true);
    },
  });

  const { mutateAsync: applyStats } = useApplyStats({
    onSuccess: (data) => {
      console.log(data);
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
    },
    onMutate: (variables) => {
      console.log(variables);
      setIsLoading(true);
    },
  });

  const handleApply = async () => {
    if (!activeAddress) {
      alert("Wallet is required");
      return;
    }
    try {
      await applyStats({
        address: activeAddress,
        chain_address: chainAddress, //"test1_nft"
      });
      refetch(); // Apply 성공 후 데이터 갱신
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      handleReset();
      alert("Apply Success!");
    }
  };

  const handleReset = () => {
    setImageStats(null);
    setImgSrc("");
  };

  const handleGenerateByPrompt = async () => {
    if (!activeAddress) {
      alert("Wallet is required");
      return;
    }
    try {
      const result: any = await createImageByPrompt({
        prompt: promptValue,
        address: activeAddress,
      });
      setImgSrc(result.datas[0].image);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleGenerateWithoutPrompt = async () => {
    if (!activeAddress) {
      alert("Wallet is required");
      return;
    }
    try {
      const result: any = await createImageWithoutPrompt(activeAddress);
      setImgSrc(result.datas[0].image);
      // console.log(result.datas[0].stats);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // 컨트랙트대신 집어넣을 가짜 함수
  const getContractAddress = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleMine = async () => {
    if (!activeAddress) {
      alert("Wallet is required");
      return;
    }
    try {
      setIsLoading(true);
      await callStoreMyNft();

      const randomChainAddress = getContractAddress(10);
      setChainAddress(randomChainAddress);
      const result: any = await mine({
        address: activeAddress,
        prompt: promptValue,
        chain_address: randomChainAddress,
      });
      console.log(result);
      setImageStats(result.contents.stats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      setIsLoading(false);
    }
  };

  const callStoreMyNft = async () => {
    setIsLoading(true);

    if (!signer || !activeAddress || !clients || !activeAccount) {
      console.error("Signer, activeAddress, clients, or activeAccount is null");
      setIsLoading(false);

      return;
    }

    if (!algorandClient || !helloWorldAppClient) {
      console.error("AlgorandClient or HelloWorldAppClient is null");
      console.log(algorandClient, helloWorldAppClient);
      setIsLoading(false);

      return;
    }

    const helloWorldClient = await getHelloWorldClient(
      algorandClient,
      activeAddress,
      signer
    );
    try {
      await methods.storeMyNft(helloWorldClient, activeAddress);
    } catch (error) {
      console.error("Error storing NFT:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
  };

  useEffect(() => {
    if (activeAddress) {
      const algodConfig = getAlgodConfigFromViteEnvironment();
      const algorandClient = AlgorandClient.fromConfig({ algodConfig });
      algorandClient.setDefaultSigner(signer);
      startTransition(() => {
        setAlgorandClient(algorandClient);
      });
    }
  }, [activeAddress]);

  useEffect(() => {
    if (activeAddress && algorandClient) {
      const helloWorldClient = new HelloWorldClient(
        {
          resolveBy: "id",
          id: helloWorldAppId,
          sender: { addr: activeAddress, signer },
        },
        algorandClient.client.algod
      );
      startTransition(() => {
        setHelloWorldAppClient(helloWorldClient);
      });
    }
  }, [algorandClient]);

  return (
    <>
      <Wrapper>
        {isLoading && <Loading />}
        <button onClick={callStoreMyNft}>Call Store My NFT</button>

        <AiWrapper>
          {userAiData && (
            <>
              <Suspense fallback={<Loading />}>
                <Creature />
              </Suspense>

              <AiStatsBox>
                <AiStatsTitle>My Creature Stats</AiStatsTitle>
                <AiStatsItem>
                  Active :{" "}
                  {parseFloat(userAiData?.ai_stats.basic.active).toFixed(1)}
                </AiStatsItem>
                <AiStatsItem
                  style={{ backgroundColor: userAiData?.ai_stats.basic.color }}
                >
                  Color : {userAiData?.ai_stats.basic.color}
                </AiStatsItem>
                <AiStatsItem>
                  Emotion :{" "}
                  {parseFloat(userAiData?.ai_stats.basic.emotion).toFixed(1)}
                </AiStatsItem>
                <AiStatsItem>
                  Intelligence :{" "}
                  {parseFloat(userAiData?.ai_stats.basic.inteligence).toFixed(
                    1
                  )}
                </AiStatsItem>
                <AiStatsItem>
                  Sensitive :{" "}
                  {parseFloat(userAiData?.ai_stats.basic.seneitive).toFixed(1)}
                </AiStatsItem>
                <AiStatsItem>
                  Size :{" "}
                  {parseFloat(userAiData?.ai_stats.basic.size).toFixed(1)}
                </AiStatsItem>
              </AiStatsBox>
            </>
          )}
        </AiWrapper>
        <GenerateWrapper>
          <InputWrapper>
            <InputBox>
              <Input
                type="text"
                placeholder="Prompt"
                value={promptValue}
                onChange={handlePromptChange}
              />
              <SendButton type="submit" onClick={handleGenerateByPrompt}>
                <IconUp color={promptValue ? "blue" : "black"} />
              </SendButton>
            </InputBox>
          </InputWrapper>
          <GenerateByNoPromptButton onClick={handleGenerateWithoutPrompt}>
            {isLoading ? "Loading..." : "Generate without Prompt"}
          </GenerateByNoPromptButton>
        </GenerateWrapper>
        {imgSrc && (
          <MineWrapper>
            <MineImageWrapper>
              <Base64Image base64String={imgSrc} />
              {imageStats && (
                <StatsBox>
                  <StatsTitle>Stats</StatsTitle>
                  <StatsItem>
                    <StatsLabel>Color:</StatsLabel>
                    <StatsValue
                      style={{
                        backgroundColor: imageStats.color,
                      }}
                    >
                      {imageStats.color}
                    </StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsLabel>Size : </StatsLabel>
                    <StatsValue>{imageStats.size} </StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsLabel>Intelligence : </StatsLabel>
                    <StatsValue>{imageStats.inteligence}</StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsLabel>Active : </StatsLabel>
                    <StatsValue>{imageStats.active}</StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsLabel>Emotion : </StatsLabel>
                    <StatsValue>{imageStats.emotion}</StatsValue>
                  </StatsItem>
                  <StatsItem>
                    <StatsLabel>Sensitive : </StatsLabel>
                    <StatsValue>{imageStats.seneitive}</StatsValue>
                  </StatsItem>
                </StatsBox>
              )}
            </MineImageWrapper>
            <MineButtonWrapper>
              {!imageStats && (
                <MineButton onClick={handleMine}>Mine</MineButton>
              )}
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
    </>
  );
};

const Base64Image = ({ base64String }: { base64String: string }) => {
  return (
    <img
      src={`data:image/png;base64,${base64String}`}
      alt="Base64 Image"
      width="300"
      height="300"
    />
  );
};

const Wrapper = tw.div`
  flex flex-col items-center w-screen pt-24 gap-12
  box-border
`;

const AiWrapper = tw.div`
  flex w-screen items-center gap-48 justify-center
`;

const AiStatsBox = tw.div`
  flex flex-col gap-8
`;

const AiStatsTitle = tw.h3`
  font-xxl-b
`;

const AiStatsItem = tw.div`
  font-xxl-b
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
