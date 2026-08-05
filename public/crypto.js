async function hashPassword(password) {
  const enc = new TextEncoder();
  return await crypto.subtle.digest('SHA-256', enc.encode(password));
}

async function getKey(password) {
  const hash = await hashPassword(password);
  return await crypto.subtle.importKey(
    'raw',
    hash,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

function generateIV() {
  return crypto.getRandomValues(new Uint8Array(12));
}

async function encryptData(key, iv, plaintext) {
  const enc = new TextEncoder();
  return await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(plaintext)
  );
}

async function decryptData(key, iv, ciphertext) {
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ciphertext
  );
  const dec = new TextDecoder();
  return dec.decode(decrypted);
}

function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for(let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str);
}

function base64ToBuffer(b64) {
  const str = atob(b64);
  const bytes = new Uint8Array(str.length);
  for(let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
