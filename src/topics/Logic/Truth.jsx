import { tokenize, parse, evaluate, getVariables, extractSubexpressions } from './Logic';

function generateRows(variables) {
const rows = [];
const n = variables.length;
const max = 1 << n;
for (let i = max - 1; i >= 0; i--) {
  const valuation = {};
  for (let j = 0; j < n; j++) {
    // Bit j from left (MSB)
    valuation[variables[j]] = Boolean(i & (1 << (n - j - 1)));
  }
  rows.push(valuation);
}
return rows;
}

// Remove outermost parentheses
function cleanParens(expr) {
if (
  expr.startsWith('(') &&
  expr.endsWith(')') &&
  isBalanced(expr.slice(1, -1))
) {
  return expr.slice(1, -1);
}
return expr;
}

// Check if parentheses are balanced in a substring
function isBalanced(expr) {
let count = 0;
for (const char of expr) {
  if (char === '(') count++;
  else if (char === ')') count--;
  if (count < 0) return false;
}
return count === 0;
}

export default function Truth({ expression }) {
if (!expression || expression.trim() === '') {
  return <div id="Mess">Please enter a logical expression.</div>;
}

let tokens;
try {
  tokens = tokenize(expression);
} catch {
  return <div id="warning">Invalid characters in expression.</div>;
}

let ast;
try {
  ast = parse(tokens);
} catch (e) {
  return <div id="warning">
    {/* Parse error: {e.message} */}
    Undefine Expression!!
  </div>;
}

if (!ast) {
  return <div id="warning">Could not parse expression.</div>;
}

const variables = Array.from(getVariables(ast)).sort();
const subexprs = extractSubexpressions(ast).map((s) => ({
  ...s,
  label: cleanParens(s.label)
}));

const rows = generateRows(variables);

return (
  <div id="tables">
    <table>
      <thead>
        <tr>
          {variables.map((v) => (
            <th key={v}>{v}</th>
          ))}
          {subexprs.map(({ label }) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((valuation, i) => (
          <tr key={i}>
            {variables.map((v) => (
              <td key={v}>
                {valuation[v] ? 'T' : 'F'}
              </td>
            ))}
            {subexprs.map(({ node, label }) => {
              try {
                const val = evaluate(node, valuation);
                return (
                  <td key={label}>
                    {val ? 'T' : 'F'}
                  </td>
                );
              } catch {
                return (
                  <td key={label}>
                    Err
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
