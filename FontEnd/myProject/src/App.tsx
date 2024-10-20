// import { BrowserRouter } from 'react-router-dom';
import Footer from "./components/commons/footer/Footer";
import Header from "./components/commons/header/Header";
import AppRoutes from "./configs/Routes/RouteConfig";

import Signup from "./components/commons/register/Signup";

function App() {
  return (
    <>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Signup></Signup>
      <Footer></Footer>
    </>
  );
}

export default App;
