export function merge(a, b) {
  let out = {};
  for(let key in a) out[key] = a[key];
  for(let key in b) out[key] = b[key];

  return out;
}
export let isArray = Array.isArray;
export const delay = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fn){window.setTimeout(fn)};