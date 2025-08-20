// Simple smoke test for image-loader.js behavior in dev and prod
import loader from '../image-loader.js';

function testCase(env, input, label) {
  const prev = process.env.NODE_ENV;
  process.env.NODE_ENV = env;
  const out = loader(input);
  process.env.NODE_ENV = prev;
  return {env, label, input, out};
}

const inputs = [
  {
    label: 'API uploads path',
    input: {src: '/uploads/foo.jpg', width: 800, quality: 75},
  },
  {
    label: 'Local public asset (optimized via _next/image)',
    input: {src: '/assets/images/logo/flag_05.png', width: 800, quality: 75},
  },
  {
    label: 'Placehold.co placeholder',
    input: {src: 'https://placehold.co/400', width: 400},
  },
  {
    label: 'External absolute URL passthrough',
    input: {src: 'https://example.com/img.jpg', width: 800, quality: 80},
  },
];

const results = [];
for (const i of inputs) {
  results.push(testCase('development', i.input, i.label));
  results.push(testCase('production', i.input, i.label));
}

console.log('\nImage loader smoke test results:\n');
for (const r of results) {
  console.log(`- [${r.env}] ${r.label}`);
  console.log(`  src: ${r.input.src}`);
  console.log(`  width: ${r.input.width}, quality: ${r.input.quality ?? 'n/a'}`);
  console.log(`  => ${r.out}\n`);
}
