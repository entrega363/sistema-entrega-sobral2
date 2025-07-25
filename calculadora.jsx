import React, { useState } from 'react';

export default function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-150 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-sm mx-auto mt-8 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <h1 className="text-white text-xl font-bold text-center">Calculadora</h1>
      </div>

      {/* Display */}
      <div className="bg-black p-6">
        <div className="text-right text-white text-4xl font-light min-h-[60px] flex items-center justify-end overflow-hidden">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          onClick={clear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
        >
          C
        </Button>
        <Button
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          ⌫
        </Button>
        <Button
          onClick={() => performOperation('÷')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          onClick={() => inputNumber(7)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          7
        </Button>
        <Button
          onClick={() => inputNumber(8)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          8
        </Button>
        <Button
          onClick={() => inputNumber(9)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          9
        </Button>
        <Button
          onClick={() => performOperation('×')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          onClick={() => inputNumber(4)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          4
        </Button>
        <Button
          onClick={() => inputNumber(5)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          5
        </Button>
        <Button
          onClick={() => inputNumber(6)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          6
        </Button>
        <Button
          onClick={() => performOperation('-')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          -
        </Button>

        {/* Row 4 */}
        <Button
          onClick={() => inputNumber(1)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          1
        </Button>
        <Button
          onClick={() => inputNumber(2)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          2
        </Button>
        <Button
          onClick={() => inputNumber(3)}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          3
        </Button>
        <Button
          onClick={() => performOperation('+')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          onClick={() => inputNumber(0)}
          className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          .
        </Button>
        <Button
          onClick={handleEquals}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
}