import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gen from "./pages/gen";
import Market from "./pages/market";
import Mine from "./pages/mine";
import Header from "./components/header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Gen />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
