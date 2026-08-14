import { light } from '../domain/index.js';

export function shell() {
  document.querySelector('#app').textContent = light();
}
