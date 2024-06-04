import styled from "@emotion/styled/macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import ConnectWallet from "./connect-wallet";
import { useWallet } from "@txnlab/use-wallet";

const Header = () => {
  const navigate = useNavigate();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const toggleWalletModal = () => {
    setOpenWalletModal((prev) => !prev);
  };
  const { activeAddress } = useWallet();
  return (
    <>
      <Wrapper>
        <HeaderBox>
          <Title>Gen D</Title>

          <LogInBox>
            {activeAddress ? (
              <LogOut>activeAddress</LogOut>
            ) : (
              <LogIn onClick={toggleWalletModal}>LogIn</LogIn>
            )}
          </LogInBox>
        </HeaderBox>

        <NavBox>
          <NavItem
            onClick={() => navigate("/")}
            onNav={window.location.pathname === "/"}
          >
            Home
          </NavItem>

          <NavItem
            onClick={() => navigate("/mine")}
            onNav={window.location.pathname === "/mine"}
          >
            Mine
          </NavItem>
          <NavItem
            onClick={() => navigate("/market")}
            onNav={window.location.pathname === "/market"}
          >
            Market
          </NavItem>
        </NavBox>
      </Wrapper>
      <ConnectWallet
        openModal={openWalletModal}
        closeModal={toggleWalletModal}
      />
    </>
  );
};

const Wrapper = tw.div`
  flex flex-col
  w-screen p-12 gap-8 relative box-border
  border-solid border-x-0 border-t-0 border-black 
 
  
`;

const HeaderBox = tw.div`
  flex justify-between items-center
`;
const Title = tw.div`
  font-xxxxl-b
`;
const NavBox = tw.div`
  flex gap-8
`;

interface NavItemProps {
  onNav: boolean;
}

const NavItem = styled.div<NavItemProps>((props) => [
  tw`cursor-pointer font-l-m`,
  props.onNav && tw`font-l-b  border-b-2 border-black`,
]);

const LogInBox = tw.div`
  flex gap-4
`;

const LogIn = tw.button`
  cursor-pointer
`;

const LogOut = tw.button`
  cursor-pointer
`;

export default Header;
