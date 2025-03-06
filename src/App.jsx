import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const predefinedColors = [
  { hex: '#FF0000', name: 'Red' },
  { hex: '#00FF00', name: 'Green' },
  { hex: '#0000FF', name: 'Blue' },
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#FF00FF', name: 'Magenta' },
  { hex: '#00FFFF', name: 'Cyan' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#800080', name: 'Purple' },
  { hex: '#008000', name: 'Dark Green' },
  { hex: '#FFC0CB', name: 'Pink' },
  { hex: '#800000', name: 'Maroon' },
  { hex: '#008080', name: 'Teal' }
];

function ColorGame() {
  window.open('/game', '_blank');
}

function App() {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [showShades, setShowShades] = useState(false);
  const [gradientColor1, setGradientColor1] = useState('#FF0000');
  const [gradientColor2, setGradientColor2] = useState('#0000FF');
  const [copiedColor, setCopiedColor] = useState('');
  const [funColor, setFunColor] = useState('#FF0000');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageColor, setPageColor] = useState('#f3f4f6'); // default bg-gray-100

  useEffect(() => {
    // Apply dark mode and page color
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.style.backgroundColor = pageColor;
  }, [isDarkMode, pageColor]);

  const generateShades = (color) => {
    return chroma.scale(['white', color, 'black']).mode('lch').colors(9);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 1000);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowShades(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Color Palette Master</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Create beautiful gradients and explore color shades</p>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Choose Page Color:</label>
            <div className="relative">
              <HexColorPicker color={pageColor} onChange={setPageColor} />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Gradient Preview */}
          <div
            className="gradient-preview"
            style={{
              background: `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`
            }}
          />

          {/* Gradient Controls */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 color-picker-container">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Color 1</label>
              <HexColorPicker color={gradientColor1} onChange={setGradientColor1} />
            </div>
            <div className="flex-1 color-picker-container">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Color 2</label>
              <HexColorPicker color={gradientColor2} onChange={setGradientColor2} />
            </div>
          </div>

          {/* Predefined Colors */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Sample Colors</h2>
            <div className="grid grid-cols-6 gap-4">
              {predefinedColors.map(({ hex, name }) => (
                <div
                  key={hex}
                  className="text-center"
                  onClick={() => handleColorSelect(hex)}
                >
                  <div
                    className="color-swatch mx-auto mb-2"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Color Wheel */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Fun Color Wheel</h2>
            <div className="inline-block">
              <HexColorPicker color={funColor} onChange={setFunColor} />
            </div>
          </div>

          {/* Color Game Button */}
          <div className="text-center mb-8">
            <button
              onClick={ColorGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Play Color Game
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link dark:text-gray-400 dark:hover:text-white">
              GitHub
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link dark:text-gray-400 dark:hover:text-white">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link dark:text-gray-400 dark:hover:text-white">
              LinkedIn
            </a>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">© 2024 Color Palette Master. All rights reserved.</p>
        </div>
      </footer>

      {/* Shades Modal */}
      {showShades && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Shades of {selectedColor}</h3>
              <button
                onClick={() => setShowShades(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="shade-grid">
              {generateShades(selectedColor).map((shade) => (
                <div
                  key={shade}
                  className="relative group"
                  onClick={() => copyToClipboard(shade)}
                >
                  <div
                    className="color-swatch group-hover:ring-2 ring-offset-2 ring-blue-500"
                    style={{ backgroundColor: shade }}
                  />
                  <div className="mt-1 text-sm text-center text-gray-800 dark:text-gray-200">
                    {shade.toUpperCase()}
                    {copiedColor === shade && (
                      <ClipboardDocumentIcon className="w-4 h-4 inline-block ml-1 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;