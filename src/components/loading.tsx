import React from "react";
import tw from "twin.macro";
import lottie from "lottie-web/build/player/lottie_light";
import loading from "../assets/loading-circle.json";

const Loading = () => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!wrapperRef.current) return;
    lottie.loadAnimation({
      container: wrapperRef.current,
      animationData: loading,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
    return () => {
      lottie.destroy();
    };
  }, [wrapperRef]);
  return (
    <Wrapper>
      <LottieWrapper ref={wrapperRef} />
    </Wrapper>
  );
};

const Wrapper = tw.div`
  absolute flex min-h-screen w-full h-full absolute-center bg-black bg-opacity-50
  z-50
`;

const LottieWrapper = tw.div`
  w-100 h-100 absolute absolute-center
`;

export default Loading;
