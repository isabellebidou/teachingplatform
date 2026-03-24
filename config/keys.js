//keys.js figure out what set of credentials to return
import prod from './prod.js';

let keys;

if (process.env.NODE_ENV === 'production') {
  keys = prod;
} else {
  const dev = await import('./dev.js'); // dynamic ESM import
  keys = dev.default;
}

export default keys;