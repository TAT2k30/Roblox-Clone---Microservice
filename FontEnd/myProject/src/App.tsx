// import { BrowserRouter } from 'react-router-dom';
import Footer from "./components/commons/footer/Footer";
import Header from "./components/commons/header/Header";
import AppRoutes from "./configs/Routes/RouteConfig";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <AppRoutes></AppRoutes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
