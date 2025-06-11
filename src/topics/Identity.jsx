import React, { useState } from "react";
import Navbar from './Navbar'
import './CSS/topic.css'

export default function Identity() {
  const [input, setInput] = useState("");

  // Parse expressions like "a+0" or "a*1"
  // Supports any variable name and checks for identity element
  const parseExpression = (expr) => {
    expr = expr.replace(/\s/g, "");

    // Match var + 0 or 0 + var
    const addPattern = /^([\w\d]+)\+0$|^0\+([\w\d]+)$/;
    // Match var * 1 or 1 * var
    const mulPattern = /^([\w\d]+)\*1$|^1\*([\w\d]+)$/;

    let match = expr.match(addPattern);
    if (match) {
      return { op: "+", varName: match[1] || match[2] };
    }

    match = expr.match(mulPattern);
    if (match) {
      return { op: "*", varName: match[1] || match[2] };
    }

    return null;
  };

  const parsed = parseExpression(input);

  const renderIdentity = (parsed) => {
    if (!parsed)
      return "Invalid expression or no identity property detected.\nTry expressions like 'a + 0' or '1 * x'.";

    const { op, varName } = parsed;

    if (op === "+") {
      return `${varName} + 0 = ${varName}`;
    } else if (op === "*") {
      return `${varName} * 1 = ${varName}`;
    }
  };

  return (
    <>
      <Navbar/>
      <div id="contain">
      <h2>Identity Property Checker</h2>
      <p>Combining a value with an identity element leaves the value unchanged.</p>

      <input
        id="inputContain"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="a + 0 or 1 * x"
      />

      <div id="output">
        {input ? renderIdentity(parsed) : ""}
      </div> 
      </div> 
    </>
  );
}
