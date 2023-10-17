import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Container = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Container;
