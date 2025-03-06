import { useState, useEffect } from 'react';

function Game() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const startNewRound = () => {
    const correct = generateRandomColor();
    const newOptions = [correct];
    while (newOptions.length < 3) {
      const color = generateRandomColor();
      if (!newOptions.includes(color)) {
        newOptions.push(color);
      }
    }
    setTargetColor(correct);
    setOptions(newOptions.sort(() => Math.random() - 0.5));
    setMessage('');
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setMessage('Correct! 🎉');
      setTimeout(startNewRound, 1500);
    } else {
      setScore(Math.max(0, score - 1));
      setMessage('Wrong! Try again 😢');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Color Guessing Game</h1>
        <div className="text-center mb-8">
          <p className="text-xl mb-2">Score: {score}</p>
          <div
            className="w-32 h-32 mx-auto rounded-lg mb-4"
            style={{ backgroundColor: targetColor }}
          />
          <p className="text-lg font-medium">Guess this color:</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((color) => (
            <button
              key={color}
              onClick={() => handleGuess(color)}
              className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg font-mono"
            >
              {color}
            </button>
          ))}
        </div>
        {message && (
          <p className="text-center mt-4 text-lg font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Game;