export function tokenize(input) {
  const tokens = [];
  const OPERATORS = ['¬', '∧', '∨', '→', '↔', '(', ')'];
  let i = 0;
  while (i < input.length) {
    const c = input[i];
    if (c === ' ' || c === '\t' || c === '\n') {
      i++;
      continue;
    }
    if (c >= 'A' && c <= 'Z') {
      tokens.push({ type: 'VAR', value: c });
      i++;
      continue;
    }
    if (OPERATORS.includes(c)) {
      if (c === '→' || c === '↔') {
        tokens.push({ type: 'OP', value: c });
        i++;
        continue;
      }
      tokens.push({ type: 'OP', value: c });
      i++;
      continue;
    }
    throw new Error(`Unknown character: ${c}`);
  }
  return tokens;
}

export function parse(tokens) {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function consume(expected) {
    const t = tokens[pos];
    if (!t || (expected && t.value !== expected)) {
      throw new Error(`Expected '${expected}', got '${t ? t.value : 'EOF'}'`);
    }
    pos++;
    return t;
  }
  
  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error('Unexpected end of input');
    if (t.type === 'VAR') {
      consume();
      return { type: 'VAR', name: t.value };
    }
    if (t.value === '(') {
      consume('(');
      const expr = parseBicond();
      consume(')');
      return expr;
    }
    if (t.value === '¬') {
      consume('¬');
      const child = parsePrimary();
      return { type: 'NOT', child };
    }
    throw new Error(`Unexpected token: ${t.value}`);
  }

  function parseAnd() {
    let left = parsePrimary();
    while (peek() && peek().value === '∧') {
      consume('∧');
      const right = parsePrimary();
      left = { type: 'AND', left, right };
    }
    return left;
  }

  function parseOr() {
    let left = parseAnd();
    while (peek() && peek().value === '∨') {
      consume('∨');
      const right = parseAnd();
      left = { type: 'OR', left, right };
    }
    return left;
  }

  function parseCond() {
    let left = parseOr();
    while (peek() && peek().value === '→') {
      consume('→');
      const right = parseOr();
      left = { type: 'COND', left, right };
    }
    return left;
  }

  function parseBicond() {
    let left = parseCond();
    while (peek() && peek().value === '↔') {
      consume('↔');
      const right = parseCond();
      left = { type: 'BICOND', left, right };
    }
    return left;
  }

  const expr = parseBicond();

  if (pos < tokens.length) {
    throw new Error(`Unexpected token: ${tokens[pos].value}`);
  }

  return expr;
}

export function evaluate(node, valuation) {
  switch (node.type) {
    case 'VAR':
      return !!valuation[node.name];
    case 'NOT':
      return !evaluate(node.child, valuation);
    case 'AND':
      return evaluate(node.left, valuation) && evaluate(node.right, valuation);
    case 'OR':
      return evaluate(node.left, valuation) || evaluate(node.right, valuation);
    case 'COND':
      return !evaluate(node.left, valuation) || evaluate(node.right, valuation);
    case 'BICOND':
      const l = evaluate(node.left, valuation);
      const r = evaluate(node.right, valuation);
      return (l && r) || (!l && !r);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

export function getVariables(node, vars = new Set()) {
  if (!node) return vars;
  if (node.type === 'VAR') {
    vars.add(node.name);
  } else if (node.type === 'NOT') {
    getVariables(node.child, vars);
  } else {
    if (node.left) getVariables(node.left, vars);
    if (node.right) getVariables(node.right, vars);
  }
  return vars;
}

export function extractSubexpressions(node, map = new Map()) {
  if (!node) return [];

  if (node.type !== 'VAR') {
    const label = stringify(node);
    if (!map.has(label)) {
      map.set(label, node);
    }
  }

  if (node.type === 'NOT' && node.child) {
    extractSubexpressions(node.child, map);
  }

  if (node.left) extractSubexpressions(node.left, map);
  if (node.right) extractSubexpressions(node.right, map);

  // return Array.from(map.entries()).map(([label, node]) => ({ label, node }));
  const result = Array.from(map.entries())
  .map(([label, node]) => ({ label, node }))
  .sort((a, b) => {
    if (a.label.includes(b.label)) return 1;
    if (b.label.includes(a.label)) return -1;
    return a.label.length - b.label.length;
  });

  return result;
}

// Stringify AST node to label string
export function stringify(node) {
  if (!node) return '';
  switch (node.type) {
    case 'VAR':
      return node.name;
    case 'NOT':
      return `¬${stringify(node.child)}`;
    case 'AND':
      return `(${stringify(node.left)} ∧ ${stringify(node.right)})`;
    case 'OR':
      return `(${stringify(node.left)} ∨ ${stringify(node.right)})`;
    case 'COND':
      return `(${stringify(node.left)} → ${stringify(node.right)})`;
    case 'BICOND':
      return `(${stringify(node.left)} ↔ ${stringify(node.right)})`;
    default:
      return '';
  }
}
