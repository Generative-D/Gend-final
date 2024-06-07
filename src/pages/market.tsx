import MarketCreature from "../components/market-creature";
import tw from "twin.macro";

const Market = () => {
  return (
    <Wrapper>
      <CreaturesWrapper>
        <MarketCreature key="creature-1" />
        <MarketCreature key="creature-2" />
        <MarketCreature key="creature-3" />
      </CreaturesWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center
`;

const CreaturesWrapper = tw.div`
  flex gap-8
`;

export default Market;
