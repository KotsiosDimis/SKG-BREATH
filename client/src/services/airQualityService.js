// src/services/airQualityService.js

export const getAirQuality = async () => {
    const response = await fetch('https://skg-breath.onrender.com/api/open-weather');
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }
    return response.json();
  };
  