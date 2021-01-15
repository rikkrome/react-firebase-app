/* eslint-disable no-undef */
// LOG
//
export function log(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('🐲', ...args);
  }
}

export function dlog(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.trace('👺️', ...args);
    debugger;
  }
}
