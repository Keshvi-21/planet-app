import React, { useState } from 'react';
import Etheron from './assets/images/Etheron.svg';
import Lumenara from './assets/images/Lumenara.svg';
import Theronix from './assets/images/Theronix.svg';
import Orionis from './assets/images/Orionis.svg';
import Space from './assets/images/Space.svg';

const planetsData = [
  {
    name: 'ETHERON',
    galaxy: 'Andromeda-IV',
    diameter: '16,400 km',
    dayLength: '26 Earth hours',
    avgTemperature: '-20°C to 0°C',
    climate: 'Polar',
    neighbors: ['ORIONIS', 'LUMENARA'],
    image: Etheron,
  },
  {
    name: 'ORIONIS',
    galaxy: 'Virgo A',
    diameter: '120,780 km',
    dayLength: '4 Earth hours',
    avgTemperature: '10°C to 40°C',
    climate: 'Temperate',
    neighbors: ['THERONIX', 'ETHERON'],
    image: Orionis,
  },
  {
    name: 'THERONIX',
    galaxy: 'Sombrero',
    diameter: '56,780 km',
    dayLength: '12 Earth hours',
    avgTemperature: '60°C to 90°C',
    climate: 'Tropical',
    neighbors: ['LUMENARA', 'ORIONIS'],
    image: Theronix,
  },
  {
    name: 'LUMENARA',
    galaxy: 'Andromeda-IV',
    diameter: '11,540 km',
    dayLength: '56 Earth hours',
    avgTemperature: '10°C to 30°C',
    climate: 'Tropical',
    neighbors: ['ETHERON', 'THERONIX'],
    image: Lumenara,
  }
];

function App() {
  const [currentPlanet, setCurrentPlanet] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [bgKey, setBgKey] = useState(0);

  const planet = planetsData[currentPlanet];

  const handlePlanetChange = (index) => {
    if (index !== currentPlanet && !transitioning) {
      setTransitioning(true);
      setBgKey(prev => prev + 1);
      setTimeout(() => {
        setCurrentPlanet(index);
        setTimeout(() => setTransitioning(false), 100);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-[linear-gradient(120.56deg,#1D2948_-2.28%,#141D33_21.31%,#0F1628_33.91%,#050A16_92.75%)]">

      {/* Starfield */}
      <div className="absolute inset-0 opacity-50">
        {[...Array(150)].map((_, i) => (
          <div key={i} className="absolute w-px h-px bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex gap-6 md:gap-16 text-xs md:text-sm">
          <button className="hover:text-blue-300 font-satoshi font-light">Home</button>
          <button className="hover:text-blue-300 font-satoshi font-light">About</button>
          <button className="hover:text-blue-300 font-satoshi font-light">Contact</button>
        </div>

        <h1 className="text-lg md:text-2xl tracking-[0.3em] font-satoshi font-medium">METEORA</h1>

        <div className="flex gap-6 md:gap-16 text-xs md:text-sm">
          <button className="hover:text-blue-300 font-satoshi font-light">Galaxies</button>
          <button className="hover:text-blue-300 font-satoshi font-light">Solar System</button>
          <button className="hover:text-blue-300 font-satoshi font-light">Earth</button>
        </div>
      </nav>

      {/* Main */}
      <div className="relative z-10 flex flex-col items-center pt-4">

        {/* Planet name */}
        <h2 className={`text-4xl md:text-8xl tracking-[0.35em] font-satoshi font-medium mb-8 md:mb-10 transition-opacity duration-300 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {planet.name}
        </h2>

        {/* Details */}
        <div className={`flex flex-wrap justify-center gap-6 md:gap-24 mb-8 transition-opacity duration-300 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {[
            ['GALAXY', planet.galaxy],
            ['DIAMETER', planet.diameter],
            ['DAY LENGTH', planet.dayLength],
            ['AVG TEMP', planet.avgTemperature],
            ['CLIMATE', planet.climate]
          ].map(([label, value], idx) => (
            <div key={idx} className="text-center">
              <div className="text-[10px] md:text-xs text-gray-400 tracking-[0.2em] mb-1 font-satoshi font-medium">{label}</div>
              <div className="text-sm md:text-lg font-satoshi font-medium">{value}</div>
            </div>
          ))}
        </div>

        {/* Solar View */}
        <div className="relative w-full max-w-[1400px] h-[450px] md:h-[750px] mx-auto mt-4">

          {/* Rotating Background */}
          <div 
            key={bgKey}
            className="absolute inset-0 flex items-center justify-center pointer-events-none bg-rotate"
            style={{
              backgroundImage: `url(${Space})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Planet Area */}
          <div className="absolute inset-0 flex items-center justify-center">

            {/* Left Neighbor */}
            {planet.neighbors[0] && (() => {
              const i = planetsData.findIndex(p => p.name === planet.neighbors[0]);
              const np = planetsData[i];
              return (
                <button 
                  onClick={() => handlePlanetChange(i)}
                  className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 hover:scale-105 transition-all">
                  
                  <div className="flex items-center gap-2 md:gap-4">
                    <img src={np.image} className="w-20 h-20 md:w-40 md:h-40" />
                    <span className="text-sm md:text-lg tracking-[0.25em] font-satoshi">{np.name}</span>
                  </div>
                </button>
              );
            })()}

            {/* Center Planet */}
            <div 
              className={`relative transition-all duration-700 ${
                transitioning ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <img 
                src={planet.image}
                className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[600px] md:h-[600px] lg:w-[900px] lg:h-[900px]"
              />
            </div>

            {/* Right Neighbor */}
            {planet.neighbors[1] && (() => {
              const i = planetsData.findIndex(p => p.name === planet.neighbors[1]);
              const np = planetsData[i];
              return (
                <button 
                  onClick={() => handlePlanetChange(i)}
                  className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 hover:scale-105 transition-all">
                  
                  <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-sm md:text-lg tracking-[0.25em] font-satoshi">{np.name}</span>
                    <img src={np.image} className="w-20 h-20 md:w-40 md:h-40" />
                  </div>
                </button>
              );
            })()}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
