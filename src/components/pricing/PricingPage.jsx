import React from "react";
    import Header from "../layout/Header";
    import Footer from "../layout/Footer";
    import PricingContent from "./PricingContent";

    const PricingPage = () => {
      return (
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <div className="grow">
            <PricingContent />
          </div>
          <Footer />
        </div>
      );
    };

    export default PricingPage;