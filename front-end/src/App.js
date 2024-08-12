import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Countdown from './components/Countdown';
import Dashboard from './components/Dashboard';

import './App.css';

function Home({ bannerData, toggleBanner, showBanner }) {
  return (
    <div className={`App ${!showBanner ? 'blurred-banner' : ''}`}>
      <div className="banner">
        <h1>{bannerData.description}</h1>
        <Countdown timer={bannerData.timer} isActive={showBanner} />
        <a href={bannerData.link} className="banner-link">Learn More</a>
      </div>
    </div>
  );
}

function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: 3600,
    link: '',
    visible: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await fetch('http://localhost:3001/api/banner');
        const bannerData = await bannerResponse.json();
        setBannerData(bannerData);
        setShowBanner(bannerData.visible);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleBanner = (visibility) => setShowBanner(visibility);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home bannerData={bannerData} toggleBanner={toggleBanner} showBanner={showBanner} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
