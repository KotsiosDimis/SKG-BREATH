import React from 'react';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white text-black border border-red-500">
      <h1 className="text-4xl font-bold mb-4 bg-yellow-200 p-4">Welcome to SkgBreath</h1>
      <p className="text-lg text-gray-700 bg-blue-200 p-2">Real-time air quality data in Thessaloniki.</p>
    </main>
  );
};

export default Home;
