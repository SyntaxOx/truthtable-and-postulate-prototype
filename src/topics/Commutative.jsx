import React, { useState } from "react";
import Navbar from './Navbar'
import './CSS/topic.css'

export default function Commutative() {
  const [input, setInput] = useState("");

  // Parse input expressions like "a+b" or "foo*bar"
  // Supports any alphanumeric variable names without spaces
  const parseExpression = (expr) => {
    expr = expr.replace(/\s/g, "");

    // Match pattern var op var, e.g. a+b or foo*bar
    const pattern = /^([\w\d]+)([+*])([\w\d]+)$/;
    const match = expr.match(pattern);

    if (!match) return null;

    const [, left, op, right] = match;
    return { left, op, right };
  };

  const parsed = parseExpression(input);

  const renderCommutative = (parsed) => {
    if (!parsed) return "Invalid expression or unsupported format.";

    const { left, op, right } = parsed;
    const opSymbol = op === "+" ? "+" : "*";

    return `${left} ${opSymbol} ${right} = ${right} ${opSymbol} ${left}`;
  };

  return (
    <>
      <Navbar/>
      <div id="contain">
      <h2>Commutative Property Checker</h2>
      <p>The order of the operands does not affect the result.</p>

      <input
          id="inputContain"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="a+b or x*y"
      />

      <div id="output">
        {input ? renderCommutative(parsed) : ""}
      </div>
      </div>
    </>
  );
}
