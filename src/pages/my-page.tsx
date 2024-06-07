import React from "react";
import Creature from "../components/creature";
import tw from "twin.macro";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { myGenImages } from "../dummy/images";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyPage = () => {
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

      <Creature />
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
                {image.priceRatio && (
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
  flex flex-col gap-8 items-center
`;

const PriceTitle = tw.div`
  font-xxl-b
`;

const ImageBox = tw.div`
  flex gap-8 box-border
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

export default MyPage;
