import React, { useState } from "react";
import Navbar from './Navbar'
import './CSS/topic.css'

export default function Distributive() {
  const [input, setInput] = useState("");

  // Parse expressions like a*(b+c) or (a+b)*c with + or *
  // Support any alphanumeric variables
  // Return null if not matching
  const parseExpression = (expr) => {
    expr = expr.replace(/\s/g, "");

    // Match a*(b+c)
    const pattern1 = /^([\w\d]+)\*\(([\w\d]+)([+*])([\w\d]+)\)$/;
    // Match (a+b)*c
    const pattern2 = /^\(([\w\d]+)([+*])([\w\d]+)\)\*([\w\d]+)$/;

    let match = expr.match(pattern1);
    if (match) {
      const [, a, b, op, c] = match;
      return { form: "left", a, b, c, op };
    }

    match = expr.match(pattern2);
    if (match) {
      const [, a, op, b, c] = match;
      return { form: "right", a, b, c, op };
    }

    return null;
  };

  const renderDistributive = (parsed) => {
    if (!parsed)
      return "Invalid expression or unsupported format.\nTry: a*(b+c) or (a+b)*c";

    const { form, a, b, c, op } = parsed;
    const opSymbol = op === "+" ? "+" : "*";
    const mulSymbol = "*";

    if (form === "left") {
      // a*(b+c) = a*b + a*c
      return `${a}*(${b} ${opSymbol} ${c}) = ${a}*${b} ${opSymbol} ${a}*${c}`;
    } else {
      // (a+b)*c = a*c + b*c
      return `(${a} ${opSymbol} ${b})*${c} = ${a}*${c} ${opSymbol} ${b}*${c}`;
    }
  };

  const parsed = parseExpression(input);

  return (
    <>
      <Navbar/>
      <div id="contain">
      <h2>Distributive Property Checker</h2>
      <p>One operation can be distributed over another within an expression.</p>

      <input
          id="inputContain"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="a*(b+c) or (a+b)*c"
      />

      <div id="output">
        {input ? renderDistributive(parsed) : ""}
      </div>
      </div>
    </>
  );
}
