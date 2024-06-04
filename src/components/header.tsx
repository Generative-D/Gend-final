import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1>Header</h1>
      <NavBox>
        <NavItem onClick={() => navigate("/")}>Generate</NavItem>
        <NavItem onClick={() => navigate("/mine")}>Mine</NavItem>
        <NavItem onClick={() => navigate("/market")}>Market</NavItem>
      </NavBox>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col w-screen 
  border-solid border-x-0 border-t-0 border-black p-4
`;

const NavBox = tw.div`
  flex gap-4
`;

const NavItem = tw.div`
  cursor-pointer
`;

export default Header;
