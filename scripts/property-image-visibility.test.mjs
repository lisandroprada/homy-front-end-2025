import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/utils/property-image-visibility.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
const exports = {};
runInNewContext(outputText, { exports });
const filter = exports.filterPropertyImageVisibility;

test('excluded photos cannot become a card or metadata cover, including fallback', () => {
  const hidden = { name: 'Hidden', thumbWeb: 'hidden.jpg', contentApproved: false };
  const visible = { name: 'Visible', thumbWeb: 'visible.jpg', contentApproved: true };
  const input = { imgCover: hidden, img: [hidden, visible] };
  const result = filter(input);
  assert.equal(result.img.length, 1);
  assert.equal(result.imgCover.thumbWeb, 'visible.jpg');
  assert.equal(input.img.length, 2, 'Do not mutate SWR cached input');
  assert.equal(filter({ imgCover: hidden, img: [hidden] }).imgCover, undefined);
  assert.equal(filter({ imgCover: hidden }).imgCover, undefined);
});

test('list and marker payloads honor exclusion and old payloads remain initially approved', () => {
  const hidden = { thumbWeb: 'hidden.jpg', contentApproved: false };
  assert.equal(filter({ items: [{ imgCover: hidden, img: [hidden] }] }).items[0].img.length, 0);
  assert.equal(filter([{ imgCover: hidden }])[0].imgCover, undefined);
  const legacy = { imgCover: { thumbWeb: 'old.jpg' }, img: [{ thumb: 'old-thumb.jpg' }] };
  assert.equal(filter(legacy).img.length, 1);
  assert.equal(filter(legacy).imgCover.thumbWeb, 'old.jpg');
});
