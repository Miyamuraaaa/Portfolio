import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);

const filename = fileURLToPath(new URL('../src/components/ui/CosmicAtmosphere.tsx', import.meta.url));
const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function render() {
  const math = Object.create(Math);
  // Runtime meteors may use these, but rendering must never invoke them.
  for (const name of ['sin', 'cos', 'random']) math[name] = () => { throw new Error(`${name} used during star rendering`); };
  const context = { exports: {}, require, Math: math };
  vm.runInNewContext(code, context, { filename });
  return renderToStaticMarkup(React.createElement(context.exports.default));
}

const first = render();
assert.equal(first, render(), 'Independent renders must emit identical markup');
assert.equal([...first.matchAll(/class="cosmic-constellation cosmic-constellation-\d"/g)].length, 3);
assert.equal([...first.matchAll(/<circle /g)].length, 15);
const stars = [...first.matchAll(/class="cosmic-star" style="([^"]+)"/g)];
assert.equal(stars.length, 120);
for (const [, style] of stars) {
  assert.match(style, /(?:^|;)left:\d+\.\d{4}%;/);
  assert.match(style, /;top:\d+\.\d{4}%;/);
  assert.match(style, /;--star-delay:-?\d+\.\d{3}s;/);
  assert.match(style, /;--star-opacity:\d+\.\d{2};/);
  assert.match(style, /;--twinkle-duration:\d+\.\d{3}s;/);
  assert.match(style, /;--star-size:\d+\.\d{2}px(?:;|$)/);
}
console.log('PASS: 120 stable star styles; no render-time random/trigonometric calls; fixed precision for every CSS value.');
