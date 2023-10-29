import LogoCloud from "./LogoCloud";
import HeroSection from "./HeroSection";
import TutorialSection from "./TutorialSection";
import InfoSection from "./InfoSection";

const Home = () => {
    return (
        <div className="bg-white px-6 py-10 lg:px-8">
            <LogoCloud />
            <HeroSection />
            <TutorialSection />
            <InfoSection />
        </div>
    );
};

export default Home;
