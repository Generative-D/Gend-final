import styled from "@emotion/styled/macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

const Header = () => {
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false);
  return (
    <Wrapper>
      <HeaderBox>
        <Title>Gen D</Title>

        <LogInBox>
          {isLogIn ? (
            <LogIn
              onClick={() => {
                setIsLogIn(false);
              }}
            >
              LogIn
            </LogIn>
          ) : (
            <LogOut
              onClick={() => {
                setIsLogIn(true);
              }}
            >
              LogOut
            </LogOut>
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
  );
};

const Wrapper = tw.div`
  flex flex-col w-screen
  border-solid border-x-0 border-t-0 border-black p-4
`;

const HeaderBox = tw.div`
  flex justify-between items-center
`;
const Title = tw.div`
  font-xxxxl-b
`;
const NavBox = tw.div`
  flex gap-4
`;

interface NavItemProps {
  onNav: boolean;
}

const NavItem = styled.div<NavItemProps>((props) => [
  tw`cursor-pointer`,
  props.onNav && tw`font-bold  border-b-2 border-black`,
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
