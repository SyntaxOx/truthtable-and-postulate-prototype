import React, { useState } from "react";
import Navbar from './Navbar'
import './CSS/topic.css'

export default function Inverse() {
  const [input, setInput] = useState("");

  // Remove spaces and parse input
  // Supports expressions like: a+(-a), (-a)+a, x*(1/x), (1/x)*x
  const parseExpression = (expr) => {
    expr = expr.replace(/\s/g, "");

    // Addition inverse: a + (-a) or (-a) + a
    const addPattern = /^([\w\d]+)\+\(-\1\)$|^\(-([\w\d]+)\)\+\2$/;

    // Multiplication inverse: a*(1/a) or (1/a)*a
    const mulPattern = /^([\w\d]+)\*\(1\/\1\)$|^\(1\/([\w\d]+)\)\*\2$/;

    if (addPattern.test(expr)) {
      const match = expr.match(addPattern);
      // extract variable name either group 1 or 2
      const varName = match[1] || match[2];
      return { op: "+", varName };
    }

    if (mulPattern.test(expr)) {
      const match = expr.match(mulPattern);
      const varName = match[1] || match[2];
      return { op: "*", varName };
    }

    return null;
  };

  const parsed = parseExpression(input);

  const renderInverse = (parsed) => {
    if (!parsed)
      return (
        "Invalid expression or no inverse property detected.\n" +
        "Try expressions like 'a + (-a)' or 'x * (1/x)'."
      );

    const { op, varName } = parsed;
    if (op === "+") {
      return `${varName} + (-${varName}) = 0`;
    } else if (op === "*") {
      return `${varName} * (1/${varName}) = 1`;
    }
  };

  return (
    <>
      <Navbar/>
      <div id="contain">
      <h2>Inverse Property Checker</h2>
      <p>For every element, there exists another element (its inverse) that combines with it to produce the identity element.</p>

      <input
        id="inputContain"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="a + (-a) or x * (1/x)"
      />

        <div id="output">
          {input ? renderInverse(parsed) : ""}
        </div>
      </div>
    </>
  );
}

