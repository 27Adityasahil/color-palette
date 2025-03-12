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

const gradientDirections = [
  { value: 'to right', label: 'Left to Right' },
  { value: 'to left', label: 'Right to Left' },
  { value: 'to bottom', label: 'Top to Bottom' },
  { value: 'to top', label: 'Bottom to Top' },
  { value: 'to bottom right', label: 'Top Left to Bottom Right' },
  { value: 'to bottom left', label: 'Top Right to Bottom Left' },
  { value: 'to top right', label: 'Bottom Left to Top Right' },
  { value: 'to top left', label: 'Bottom Right to Top Left' }
];

function ColorGame() {
  window.open('/game', '_blank');
}

function App() {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [showShades, setShowShades] = useState(false);
  const [gradientColors, setGradientColors] = useState([
    '#FF0000',
    '#0000FF',
    '#00FF00'
  ]);
  const [numberOfColors, setNumberOfColors] = useState(2);
  const [gradientDirection, setGradientDirection] = useState('to right');
  const [copiedColor, setCopiedColor] = useState('');
  const [funColor, setFunColor] = useState('#FF0000');
  const [useFunColorInGradient, setUseFunColorInGradient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageColor, setPageColor] = useState('#f3f4f6');
  const [showCssCode, setShowCssCode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.style.backgroundColor = pageColor;
  }, [isDarkMode, pageColor]);

  useEffect(() => {
    const newColors = [...gradientColors];
    if (numberOfColors > gradientColors.length) {
      for (let i = gradientColors.length; i < numberOfColors; i++) {
        newColors.push(chroma.random().hex());
      }
    } else if (numberOfColors < gradientColors.length) {
      newColors.splice(numberOfColors);
    }
    setGradientColors(newColors);
  }, [numberOfColors]);

  const generateShades = (color) => {
    return chroma.scale(['white', color, 'black']).mode('lch').colors(9);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(''), 1000);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowShades(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getGradientStyle = () => {
    return `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
  };

  const getCssCode = () => {
    return `.gradient {\n  background: ${getGradientStyle()};\n  /* For older browsers */\n  background: -webkit-${getGradientStyle()};\n  background: -moz-${getGradientStyle()};\n}`;
  };

  const handleColorChange = (index, color) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
  };

  useEffect(() => {
    if (useFunColorInGradient && gradientColors.length > 1) {
      handleColorChange(1, funColor);
    }
  }, [funColor, useFunColorInGradient]);

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
          <div className="mb-8">
            <div
              className="gradient-preview"
              style={{ background: getGradientStyle() }}
            />
            <button
              onClick={() => setShowCssCode(!showCssCode)}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showCssCode ? 'Hide CSS' : 'Show CSS'}
            </button>
            {showCssCode && (
              <div className="mt-2 relative">
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  <code className="text-sm text-gray-800 dark:text-gray-200">{getCssCode()}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(getCssCode())}
                  className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {copiedColor ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
            )}
          </div>
          <div className="mb-8">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Number of Colors
                  </label>
                  <select
                    value={numberOfColors}
                    onChange={(e) => setNumberOfColors(Number(e.target.value))}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Color' : 'Colors'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-grow">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Gradient Direction
                  </label>
                  <select
                    value={gradientDirection}
                    onChange={(e) => setGradientDirection(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {gradientDirections.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`grid ${numberOfColors <= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'} gap-4`}>
                {gradientColors.map((color, index) => (
                  <div key={index} className="flex-1">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Color {index + 1}
                    </label>
                    <HexColorPicker
                      color={color}
                      onChange={(newColor) => handleColorChange(index, newColor)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Sample Colors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Fun Color Wheel</h2>
            <div className="flex flex-col items-center">
              <div className="color-wheel">
                <HexColorPicker color={funColor} onChange={setFunColor} />
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="useFunColor"
                  checked={useFunColorInGradient}
                  onChange={(e) => setUseFunColorInGradient(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="useFunColor" className="text-gray-700 dark:text-gray-300">
                  Use in gradient
                </label>
              </div>
            </div>
          </div>
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
            <a href="https://github.com/27Adityasahil" target="_blank" rel="noopener noreferrer" className="social-link dark:text-gray-400 dark:hover:text-white">
              GitHub
            </a>
            <a href="https://www.instagram.com/saditya_27" target="_blank" rel="noopener noreferrer" className="social-link dark:text-gray-400 dark:hover:text-white">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/adityar27/" target="_blank" rel="noopener noreferrer" className="social-link dark:text-gray-400 dark:hover:text-white">
              LinkedIn
            </a>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">© 2024 Color Palette Master. All rights reserved.</p>
        </div>
      </footer>

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