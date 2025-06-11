import React, { useState } from "react";
import Navbar from './Navbar'
import './CSS/topic.css'

export default function Associative() {
  const [input, setInput] = useState("");

  // Regex to match expressions like (var1+var2)+var3 or var1+(var2+var3)
  // var can be any alphanumeric string including underscore
  const parseExpression = (expr) => {
    expr = expr.replace(/\s/g, "");

    // pattern1: (var op var) op var
    const pattern1 = /^\(([\w\d]+)([+*])([\w\d]+)\)([+*])([\w\d]+)$/;
    // pattern2: var op (var op var)
    const pattern2 = /^([\w\d]+)([+*])\(([\w\d]+)([+*])([\w\d]+)\)$/;

    let match = expr.match(pattern1);
    if (match) {
      const [, x1, op1, x2, op2, x3] = match;
      if (op1 === op2) {
        return { form: "left", op: op1, vars: [x1, x2, x3] };
      }
      return null;
    }

    match = expr.match(pattern2);
    if (match) {
      const [, x1, op1, x2, op2, x3] = match;
      if (op1 === op2) {
        return { form: "right", op: op1, vars: [x1, x2, x3] };
      }
      return null;
    }

    return null;
  };

  const renderAssociative = (parsed) => {
    if (!parsed) return "Invalid expression or unsupported format.";

    const { form, op, vars } = parsed;
    const [x1, x2, x3] = vars;
    const opSymbol = op === "+" ? "+" : "*";

    if (form === "left") {
      return `(${x1} ${opSymbol} ${x2}) ${opSymbol} ${x3} = ${x1} ${opSymbol} (${x2} ${opSymbol} ${x3})`;
    } else {
      return `${x1} ${opSymbol} (${x2} ${opSymbol} ${x3}) = (${x1} ${opSymbol} ${x2}) ${opSymbol} ${x3}`;
    }
  };

  const parsed = parseExpression(input);

  return (
    <>
      <Navbar/>
      <div id="contain">
      <h2>Associative Expression Checker</h2>
      <p>The grouping of operands does not affect the result.</p>

      <input
        id="inputContain"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="(a+b)+c or x*(y*z)"
      />

      <div id="output">
        {input ? renderAssociative(parsed) : ""}
      </div>
      </div>
    </>
  );
}