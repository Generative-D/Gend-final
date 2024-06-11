/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorBoundary from "../components/error-boundary";
import MarketCreature from "../components/market-creature";
import tw from "twin.macro";
import { useMarketQuery } from "../hooks/query/useMARKETQuery";
import Loading from "../components/loading";
import { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";

const Market = () => {
  const { useGetNftList, useGetAiList, useBuyImg } = useMarketQuery();
  const { activeAddress } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const { data: imageList } = useGetNftList();
  const { data: aiList } = useGetAiList();
  const { mutate: buyImg } = useBuyImg({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  console.log(imageList);

  const handleBuyImg = (
    prompt: string,
    chain_address: string,
    address: string
  ) => {
    buyImg({ prompt, chain_address, address });
  };

  if (!imageList) {
    return <Loading />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <Wrapper>
        <CreaturesWrapper>
          <CreaturesTitle>Other Creatures</CreaturesTitle>
          <ErrorBoundary>
            <CreaturesBox>
              {aiList?.data.map((item: any) => (
                <MarketCreature
                  key={item.id}
                  id={item.id}
                  stats={item.ai_stats.basic}
                />
              ))}
            </CreaturesBox>
          </ErrorBoundary>
        </CreaturesWrapper>
        <ImagesWrapper>
          <ImagesTitle>Items for Sale</ImagesTitle>

          <ErrorBoundary>
            <ImagesBox>
              {imageList?.data.map((item: any) => (
                <Item>
                  <Base64Image base64String={item.image} />
                  <ItemStats>
                    <ItemStat>
                      <ItemStatTitle>Image Stats</ItemStatTitle>
                      <Stat>
                        <StatTitle>Size : </StatTitle>
                        <StatValue>{item.stats.size}</StatValue>
                      </Stat>
                      <Stat>
                        <StatTitle>Color : </StatTitle>
                        <StatValue
                          style={{ backgroundColor: item.stats.color }}
                        >
                          {item.stats.color}
                        </StatValue>
                      </Stat>
                      <Stat>
                        <StatTitle>Intelligence : </StatTitle>
                        <StatValue>{item.stats.inteligence}</StatValue>
                      </Stat>
                      <Stat>
                        <StatTitle>Active : </StatTitle>
                        <StatValue>{item.stats.active}</StatValue>
                      </Stat>
                      <Stat>
                        <StatTitle>Emotion : </StatTitle>
                        <StatValue>{item.stats.emotion}</StatValue>
                      </Stat>
                      <Stat>
                        <StatTitle>Sensitive : </StatTitle>
                        <StatValue>{item.stats.seneitive}</StatValue>
                      </Stat>
                      <BuyButton
                        onClick={() =>
                          handleBuyImg(
                            item.prompt,
                            item.chain_address,
                            activeAddress || ""
                          )
                        }
                      >
                        Buy
                      </BuyButton>
                    </ItemStat>
                  </ItemStats>
                </Item>
              ))}
            </ImagesBox>
          </ErrorBoundary>
        </ImagesWrapper>
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
  flex flex-col gap-8 p-48 max-w-screen-lg mx-auto
  overflow-x-hidden box-border
`;

const CreaturesWrapper = tw.div`
  flex flex-col gap-24 items-center
`;

const CreaturesTitle = tw.div`
  font-xxxxl-b 
`;

const CreaturesBox = tw.div`
  flex items-center w-800 overflow-x-auto gap-24
`;

const ImagesWrapper = tw.div`
  flex flex-col  w-full max-w-screen-lg mx-auto
  overflow-x-hidden
`;

const ImagesTitle = tw.div`
  font-xxxxl-b
`;

const ImagesBox = tw.div`
  flex flex-col gap-24 grid grid-cols-2 p-12 
`;

const Item = tw.div`
  flex gap-24
`;

const ItemStats = tw.div`
  flex flex-col gap-8
`;

const ItemStat = tw.div`
  flex flex-col gap-8
`;

const BuyButton = tw.button`

`;

const ItemStatTitle = tw.div`
  font-xxl-b
`;

const Stat = tw.div`
  flex gap-8
`;

const StatTitle = tw.div`
  font-xxl-b
`;

const StatValue = tw.div`
  font-xxl-l
`;

export default Market;
