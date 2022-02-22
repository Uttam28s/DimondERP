import React, { useEffect, useState } from "react";
import SplashScreen from "./splashScreen";
import LoginPage from "./loginPage";

const LandingPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(1);
    }, 2200);
  }, [count]);

  return (
    <div>
      {count === 0 ? (
        <div className="splashScreen_Background">
          <SplashScreen />
        </div>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
