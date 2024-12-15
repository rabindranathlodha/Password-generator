import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState('Copy');
  const [buttonBg, setButtonBg] = useState('bg-blue-700');

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "#$%&'()*+,-/:;=?@[]_{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setButtonText('Copied');
    setButtonBg('bg-green-700');
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  // Reset button state when the password changes
  useEffect(() => {
    setButtonText('Copy');
    setButtonBg('bg-blue-700');
  }, [password]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className='w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 text-white font-semibold bg-gray-800'>
          <h1 className="text-center text-white font-serif text-3xl mb-6">🔒 Password Generator</h1>
          <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-gray-700">
            <input
              type="text"
              value={password}
              className='outline-none w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-400'
              placeholder='Generated Password'
              readOnly
              ref={passwordRef}
            />
            <button
              className={`outline-none ${buttonBg} hover:bg-green-500 text-white px-4 py-3 transition-colors duration-300`}
              onClick={copyPassToClipboard}
            >
              {buttonText}
            </button>
          </div>
          <div className='flex flex-col sm:flex-row sm:justify-between text-sm gap-y-4 sm:gap-y-0 sm:gap-x-4'>
            <div className="flex items-center gap-x-2 w-full">
              <label className="flex flex-col items-start text-white w-full">
                Length: {length}
                <input
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer mt-2 w-full'
                  onChange={(e) => { setLength(e.target.value) }}
                />
              </label>
            </div>
            <div className="flex items-center gap-x-2 w-full sm:w-auto">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id='numberInput'
                onChange={() => { setNumAllowed((prev) => !prev) }}
                className="cursor-pointer"
              />
              <label htmlFor="numberInput" className="text-white cursor-pointer">Include Numbers</label>
            </div>
            <div className="flex items-center gap-x-2 w-full sm:w-auto">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id='charInput'
                onChange={() => { setCharAllowed((prev) => !prev) }}
                className="cursor-pointer"
              />
              <label htmlFor="charInput" className="text-white cursor-pointer">Include Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
