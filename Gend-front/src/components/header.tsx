import styled from "@emotion/styled/macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import ConnectWallet from "./connect-wallet";
import { Provider, useWallet } from "@txnlab/use-wallet";
import { ellipseAddress } from "../utils/string";
import logo from "../assets/gend.png";

const Header = () => {
  const navigate = useNavigate();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const toggleWalletModal = () => {
    setOpenWalletModal((prev) => !prev);
  };
  const { activeAddress, providers } = useWallet();
  return (
    <>
      <Wrapper>
        <HeaderBox>
          <LogoBox>
            <Logo onClick={() => navigate("/")} src={logo} />
            <Title>Gen-D</Title>
          </LogoBox>

          <LogInBox>
            {activeAddress ? (
              <AddressWrapper>
                <Address>{ellipseAddress(activeAddress)}</Address>
                {providers?.map((provider: Provider) => (
                  <button onClick={() => provider.disconnect()}>
                    Disconnect
                  </button>
                ))}
              </AddressWrapper>
            ) : (
              <LogIn onClick={toggleWalletModal}>LogIn</LogIn>
            )}
          </LogInBox>
        </HeaderBox>

        <NavBox>
          <NavItem
            key="home"
            onClick={() => navigate("/")}
            onNav={window.location.pathname === "/"}
          >
            Home
          </NavItem>

          <NavItem
            key="market"
            onClick={() => navigate("/market")}
            onNav={window.location.pathname === "/market"}
          >
            Market
          </NavItem>
          <NavItem
            key="my-page"
            onClick={() => navigate("/my-page")}
            onNav={window.location.pathname === "/my-page"}
          >
            My Page
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
  border-solid border-x-0 border-t-0 border-green  
`;

const Logo = tw.img`
  w-64 h-64
  cursor-pointer
`;

const LogoBox = tw.div`
  flex items-center gap-8
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

const AddressWrapper = tw.div`
  flex items-center gap-4
`;

const Address = tw.div`
  flex items-center gap-4
  font-l-m border-solid border-3 border-gray-400 p-4 rounded-md 
`;

export default Header;
