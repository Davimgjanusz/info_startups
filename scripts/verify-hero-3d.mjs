import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const endpoint = process.env.CDP_ENDPOINT ?? 'http://127.0.0.1:9222';
const targetUrl = process.env.TARGET_URL ?? 'http://127.0.0.1:5173/';
const targets = await fetch(`${endpoint}/json`).then(response => response.json());
const page = targets.find(target => target.type === 'page') ?? targets[0];
assert.ok(page?.webSocketDebuggerUrl, 'Chrome DevTools page target not found');

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let messageId = 0;

socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

function send(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: targetUrl });
await new Promise(resolve => setTimeout(resolve, 1800));

const before = await evaluate(`(() => {
  const canvas = document.querySelector('.hero-bulb3d-canvas canvas');
  if (!canvas) return { exists: false };
  const rect = canvas.getBoundingClientRect();
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return { exists: true, webgl: false, width: rect.width, height: rect.height };
  const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  let colored = 0;
  for (let index = 0; index < pixels.length; index += 16) {
    if (pixels[index] + pixels[index + 1] + pixels[index + 2] + pixels[index + 3] > 10) colored++;
  }
  return { exists: true, webgl: true, width: rect.width, height: rect.height, colored, overflowX: document.documentElement.scrollWidth - window.innerWidth };
})()`);

assert.equal(before.exists, true, '3D canvas was not mounted');
assert.equal(before.webgl, true, '3D canvas did not expose a WebGL context');
assert.ok(before.width >= 220 && before.height >= 300, `3D canvas is too small (${before.width}x${before.height})`);
assert.ok(before.colored > 100, '3D canvas appears blank');
assert.ok(before.overflowX <= 2, `Homepage has horizontal overflow (${before.overflowX}px)`);

const after = await evaluate(`(() => {
  const canvas = document.querySelector('.hero-bulb3d-canvas canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  let colored = 0;
  for (let index = 0; index < pixels.length; index += 16) {
    if (pixels[index] + pixels[index + 1] + pixels[index + 2] + pixels[index + 3] > 10) colored++;
  }
  return { colored };
})()`);

assert.ok(after.colored > 100, '3D light bulb appears blank after rendering');

const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await writeFile('.tmp-chrome/hero-3d.png', Buffer.from(screenshot.data, 'base64'));
socket.close();

console.log(`PASS: 3D light bulb rendered (${Math.round(before.width)}x${Math.round(before.height)}), and screenshot was saved to .tmp-chrome/hero-3d.png.`);
