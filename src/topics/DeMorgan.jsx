import React, { useState } from "react";
import Navbar from './Navbar'
import './CSS/topic.css'

export default function DeMorgan() {
  const [input, setInput] = useState("");

  // Parse input expressions like !(A*B) or !(x+y)
  // Supports any alphanumeric variables
  const parseExpression = (expr) => {
    expr = expr.replace(/\s/g, "");

    // Match !(A*B)
    const patternAnd = /^!\(([\w\d]+)\*([\w\d]+)\)$/;
    // Match !(A+B)
    const patternOr = /^!\(([\w\d]+)\+([\w\d]+)\)$/;

    let match = expr.match(patternAnd);
    if (match) {
      const [, a, b] = match;
      return { op: "*", a, b };
    }

    match = expr.match(patternOr);
    if (match) {
      const [, a, b] = match;
      return { op: "+", a, b };
    }

    return null;
  };

  const parsed = parseExpression(input);

  const renderDeMorgan = (parsed) => {
    if (!parsed)
      return (
        "Invalid expression or unsupported format.\n" +
        "Try: !(A*B) or !(x+y)"
      );

    const { op, a, b } = parsed;

    if (op === "*") {
      return `!(${a} * ${b}) = !${a} + !${b}`;
    } else {
      return `!(${a} + ${b}) = !${a} * !${b}`;
    }
  };

  return (
    <>
      <Navbar/>
      <div id="contain">
        <h2>De Morgan's Laws Checker</h2>
        <p>Rules that relate the complement (NOT) of conjunctions and disjunctions.</p>

        <input
          id="inputContain"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="!(A*B) or !(x+y)"
        />

        <div id="output">
          {input ? renderDeMorgan(parsed) : ""}
        </div>
      </div>
    </>
  );
}