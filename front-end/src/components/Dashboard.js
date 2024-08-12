import React, { useState, useEffect } from 'react';
import '../App.css'; // Make sure your CSS file includes the styles for success and error messages

function Dashboard() {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(3600);
  const [link, setLink] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/banner');
        const data = await response.json();
        setDescription(data.description);
        setTimer(data.timer);
        setLink(data.link);
        setBannerVisible(data.visible);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await fetch('http://localhost:3001/api/banner', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, timer, link, visible: bannerVisible }),
      });
      setMessage('Banner data updated successfully');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error updating data:', error);
      setMessage('Error updating banner data');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className='dash-container'>
      {message && (
        <div className={`message ${messageType}-message`}>
          {message}
        </div>
      )}
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        <label>
          Banner Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Timer (seconds):
          <input
            type="number"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
          />
        </label>
        <label>
          Banner Link:
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
        <label>
          Banner Visible:
          <input
            type="checkbox"
            checked={bannerVisible}
            onChange={(e) => setBannerVisible(e.target.checked)}
          />
        </label>
        <button className='btn' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Dashboard;
