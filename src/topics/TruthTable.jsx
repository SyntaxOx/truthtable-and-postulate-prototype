import { useState } from 'react';
import Truth from './Logic/Truth';
import Navbar from './Navbar'

const Home = () => {
  const [expression, setExpression] = useState('');

  const handleOperationClick = (op) => {
    setExpression((prev) => (prev ? prev + ' ' + op : op));
  };

  return (
    <>
      <Navbar/>
      <div id="container">        
        <h1 id="title">Operators and Postulates Truth Table Calculator</h1>
        <div id="buttons">
          <button id="clicked" onClick={() => handleOperationClick('∧')}>
            ∧
          </button>
          <button id="clicked" onClick={() => handleOperationClick('∨')}>
            ∨
          </button>
          <button id="clicked" onClick={() => handleOperationClick('→')}>
            →
          </button>
          <button id="clicked" onClick={() => handleOperationClick('↔')}>
            ↔
          </button>
          <button id="clicked" onClick={() => handleOperationClick('¬')}>
            ¬
          </button>
        </div>

        <input
          id="inputExpression"
          placeholder="Enter Logical Expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value.toUpperCase())}
        />

        <Truth expression={expression} />
      </div>
    </>
  );
};

export default Home;

