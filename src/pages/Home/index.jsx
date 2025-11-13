// import HeroSection from "../../components/Home/Home";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
// import HowItWorksSection from "../../components/Home/HowItWorks";
import LandingPage from "../../components/landing/LandingPage";
const HomePage = () => {
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
        <LandingPage />
            {/* <div className="min-h-screen bg-background">
                <Header isLandingPage={true} scrollToSection={scrollToSection} />
                <main>
                    <HeroSection
                        navigate={navigate}
                        scrollToSection={scrollToSection}
                    />
                    <HowItWorksSection/>
                </main>
                <Footer isLandingPage={true} scrollToSection={scrollToSection} />
            </div> */}
        </>
    );
};

export default HomePage;
