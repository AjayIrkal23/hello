import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideComponent =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <main className="App">
        {!hideComponent && <Navbar />}
        <Outlet />
        {/* {!hideComponent && <Footer />} */}
      </main>
    </>
  );
};

export default Layout;
