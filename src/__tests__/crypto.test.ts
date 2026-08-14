import { describe, it, expect } from 'vitest';
import nacl from 'tweetnacl';
import {
  base64ToUint8Array,
  uint8ArrayToBase64,
  stringToUint8Array,
  encryptWithPublicKey,
} from '../utils/crypto';

describe('TweetNaCl Crypto Utilities', () => {
  it('should convert Uint8Array to Base64 and back accurately', () => {
    const originalBytes = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
    const b64 = uint8ArrayToBase64(originalBytes);
    const resultBytes = base64ToUint8Array(b64);
    
    expect(resultBytes).toEqual(originalBytes);
  });

  it('should convert String to Uint8Array', () => {
    const text = 'SpooVault Security';
    const bytes = stringToUint8Array(text);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBe(text.length);
  });

  it('should encrypt message with recipient public key in x25519 payload format', () => {
    const keypair = nacl.box.keyPair();
    const pubKeyB64 = uint8ArrayToBase64(keypair.publicKey);

    const message = 'Guardian Key Share Payload';
    const encryptedJsonString = encryptWithPublicKey(message, pubKeyB64);
    const parsed = JSON.parse(encryptedJsonString);

    expect(parsed.version).toBe('x25519-xsalsa20-poly1305');
    expect(parsed.nonce).toBeDefined();
    expect(parsed.ephemPublicKey).toBeDefined();
    expect(parsed.ciphertext).toBeDefined();
  });
});
