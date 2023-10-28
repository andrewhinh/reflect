import { useAuth } from "./authContext.jsx";
import { Outlet } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar.jsx";
import Footer from "../Components/Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

export const Layout = () => {
    return (
        <main>
            <ScrollToTop />
            <NavigationBar />
            <Outlet />
            <Footer />
        </main>
    );
};
