import Creature from "../components/my-creature";
import tw from "twin.macro";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { myGenImages } from "../dummy/images";
import { useMyQuery } from "../hooks/query/useMYQuery";
import { useWallet } from "@txnlab/use-wallet";
import { useGenQuery } from "../hooks/query/useGENQuery";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyPage = () => {
  const { activeAddress } = useWallet();
  const { useGetImgByAddress } = useMyQuery();
  const { useGetUserAi } = useGenQuery();

  const { data: myData } = useGetImgByAddress(activeAddress || "") || {};
  const { data: userAiData } = useGetUserAi(activeAddress || "") || {};
  console.log(myData);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <Title>My Page</Title>
      </InfoWrapper>

      <AiWrapper>
        {userAiData && (
          <>
            <Creature />

            <AiStatsBox>
              <AiStatsTitle>My Creature Stats</AiStatsTitle>
              <AiStatsItem>
                Active : {userAiData?.ai_stats.basic.active}
              </AiStatsItem>
              <AiStatsItem
                style={{ backgroundColor: userAiData?.ai_stats.basic.color }}
              >
                Color : {userAiData?.ai_stats.basic.color}
              </AiStatsItem>
              <AiStatsItem>
                Emotion : {userAiData?.ai_stats.basic.emotion}
              </AiStatsItem>
              <AiStatsItem>
                Intelligence : {userAiData?.ai_stats.basic.inteligence}
              </AiStatsItem>
              <AiStatsItem>
                Sensitive : {userAiData?.ai_stats.basic.seneitive}
              </AiStatsItem>
              <AiStatsItem>
                Size : {userAiData?.ai_stats.basic.size}
              </AiStatsItem>
            </AiStatsBox>
          </>
        )}
      </AiWrapper>
      <ImagesWrapper>
        <Title>My Images</Title>
        <ImagesContaimer>
          {myGenImages.map((image) => (
            <ImageBox>
              <InfoBox>
                <Image key={image.id} src={image.src} />
                <StatBox>
                  {Object.entries(image.stats).map(([key, value]) => (
                    <Stat key={key}>
                      <StatTitle>{key} : </StatTitle>
                      <StatValue>{value}</StatValue>
                    </Stat>
                  ))}
                </StatBox>
              </InfoBox>
              <PriceBox>
                {image.priceRatio ? (
                  <>
                    <Doughnut
                      data={{
                        datasets: [
                          {
                            data: image.priceRatio,
                            backgroundColor: image.priceRatio.map(() =>
                              getRandomColor()
                            ),
                          },
                        ],
                      }}
                    />
                    <PriceTitle>Price Ratio</PriceTitle>
                  </>
                ) : (
                  <Yet>Not sold yet</Yet>
                )}
              </PriceBox>
            </ImageBox>
          ))}
        </ImagesContaimer>
      </ImagesWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center
  p-12 gap-8 w-screen box-border

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

const InfoWrapper = tw.div`
  flex w-full box-border p-12
`;

const Title = tw.div`
  font-xxxxl-b
`;

const ImagesWrapper = tw.div`
  flex flex-col w-screen p-36 box-border gap-16
`;

const ImagesContaimer = tw.div`
  flex w-full
  gap-48
  p-12 box-border 
  overflow-x-auto
`;

const InfoBox = tw.div`
  flex flex-col gap-8
`;

const PriceBox = tw.div`
  flex flex-col gap-8 items-center justify-center
`;

const PriceTitle = tw.div`
  font-xxl-b
`;

const ImageBox = tw.div`
  flex gap-16 box-border
`;

const Image = tw.img`
  w-200
`;

const StatBox = tw.div`
  flex flex-col gap-8
`;

const Stat = tw.div`
  flex gap-8 items-center w-full justify-center
`;

const StatTitle = tw.div`
  font-l-b
`;

const StatValue = tw.div`
  font-l-m
`;

const Yet = tw.div`
  font-xxl-b
`;

export default MyPage;
