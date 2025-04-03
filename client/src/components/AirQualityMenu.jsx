import React, { useState } from 'react';

const AirQualityMenu = ({ onChange }) => {
  const [selections, setSelections] = useState({
    co2: false,
    pm25: false,
    no2: false,
  });
  const [minimized, setMinimized] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedSelections = { ...selections, [name]: checked };
    setSelections(updatedSelections);
    onChange(updatedSelections);
  };

  const toggleMenu = () => {
    setMinimized((prev) => !prev);
  };

  return (
    <div style={menuStyles}>
      <button onClick={toggleMenu} style={toggleButtonStyles}>
        {minimized ? "Expand" : "Minimize"}
      </button>
      {!minimized && (
        <div>
          <h3>Air Quality Metrics</h3>
          <label>
            <input
              type="checkbox"
              name="co2"
              checked={selections.co2}
              onChange={handleCheckboxChange}
            />
            CO2
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="pm25"
              checked={selections.pm25}
              onChange={handleCheckboxChange}
            />
            PM2.5
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="no2"
              checked={selections.no2}
              onChange={handleCheckboxChange}
            />
            NO₂
          </label>
        </div>
      )}
    </div>
  );
};

const menuStyles = {
  position: 'absolute',
  top: '20px',
  right: '20px', // Positioned on the right
  zIndex: 1000,
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '10px',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
};

const toggleButtonStyles = {
  marginBottom: '10px',
  padding: '5px 10px',
  cursor: 'pointer'
};

export default AirQualityMenu;
