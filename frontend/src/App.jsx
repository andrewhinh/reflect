import NavBar from "./components/nav/NavBar.jsx";
import Header from "./components/util/Header.jsx";
import HomePage from "./components/home/HomePage.jsx";
import Footer from "./components/util/Footer.jsx";
import "./styles/App.css";

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
