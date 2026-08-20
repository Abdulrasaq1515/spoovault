import { describe, it, expect } from "vitest";
import nacl from "tweetnacl";
import {
  base64ToUint8Array,
  uint8ArrayToBase64,
  stringToUint8Array,
  uint8ArrayToString,
  utf8ToBase64,
  base64ToUtf8,
<<<<<<< HEAD
  generateECIESKeyPair,
  exportECIESPublicKey,
  exportECIESPrivateKey,
  importECIESPublicKey,
  importECIESPrivateKey,
  generateECIESKeyPairBase64,
  encryptWithPublicKey,
  decryptWithPrivateKey,
  ECIES_VERSION,
  LEGACY_X25519_VERSION,
} from "../utils/crypto";

describe("Web Crypto API ECIES & Encoding Utilities", () => {
  describe("Base64 <-> Uint8Array conversions", () => {
    it("should convert Uint8Array to Base64 and back accurately", () => {
=======
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../utils/crypto';

describe('TweetNaCl & Encoding Crypto Utilities', () => {
  describe('Base64 <-> Uint8Array conversions', () => {
    it('should convert Uint8Array to Base64 and back accurately', () => {
>>>>>>> main
      const originalBytes = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
      const b64 = uint8ArrayToBase64(originalBytes);
      const resultBytes = base64ToUint8Array(b64);

      expect(resultBytes).toEqual(originalBytes);
    });

<<<<<<< HEAD
    it("should handle empty Uint8Array and empty Base64 string", () => {
      const emptyBytes = new Uint8Array(0);
      const b64 = uint8ArrayToBase64(emptyBytes);
      expect(b64).toBe("");
=======
    it('should handle empty Uint8Array and empty Base64 string', () => {
      const emptyBytes = new Uint8Array(0);
      const b64 = uint8ArrayToBase64(emptyBytes);
      expect(b64).toBe('');
>>>>>>> main
      const decoded = base64ToUint8Array(b64);
      expect(decoded).toEqual(emptyBytes);
    });

<<<<<<< HEAD
    it("should correctly parse URL-safe Base64 strings with - and _ and missing padding", () => {
      const bytes = new Uint8Array([251, 255, 254, 253, 252]);
      const standardB64 = uint8ArrayToBase64(bytes);
      const urlSafeB64 = standardB64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
=======
    it('should correctly parse URL-safe Base64 strings with - and _ and missing padding', () => {
      const bytes = new Uint8Array([251, 255, 254, 253, 252]);
      // Standard base64 might be "+//+/fw="
      // URL-safe base64 would be "-__-_fw" without padding
      const standardB64 = uint8ArrayToBase64(bytes);
      const urlSafeB64 = standardB64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
>>>>>>> main

      const decodedFromUrlSafe = base64ToUint8Array(urlSafeB64);
      expect(decodedFromUrlSafe).toEqual(bytes);
    });

<<<<<<< HEAD
    it("should ignore whitespace in Base64 strings", () => {
=======
    it('should ignore whitespace in Base64 strings', () => {
>>>>>>> main
      const originalBytes = new Uint8Array([1, 2, 3, 4, 5]);
      const b64 = uint8ArrayToBase64(originalBytes);
      const b64WithSpaces = `  ${b64.slice(0, 2)} \n ${b64.slice(2)}  \t `;
      const decoded = base64ToUint8Array(b64WithSpaces);
      expect(decoded).toEqual(originalBytes);
    });
  });

<<<<<<< HEAD
  describe("String <-> Uint8Array (UTF-8) conversions", () => {
    it("should convert ASCII String to Uint8Array and back", () => {
      const text = "SpooVault Security";
=======
  describe('String <-> Uint8Array (UTF-8) conversions', () => {
    it('should convert ASCII String to Uint8Array and back', () => {
      const text = 'SpooVault Security';
>>>>>>> main
      const bytes = stringToUint8Array(text);
      expect(bytes).toBeInstanceOf(Uint8Array);
      expect(bytes.length).toBe(text.length);
      expect(uint8ArrayToString(bytes)).toBe(text);
    });

<<<<<<< HEAD
    it("should correctly encode and decode multi-byte UTF-8 characters and emojis", () => {
      const complexText = "🔐 SpooVault 🚀 ~ Accents: café, naïve, español — Multilingual: 日本語, 中文, العربية, Русский — Special: 🌟✨⚡️🔥";
      const bytes = stringToUint8Array(complexText);
      expect(bytes).toBeInstanceOf(Uint8Array);
=======
    it('should correctly encode and decode multi-byte UTF-8 characters and emojis', () => {
      const complexText = '🔐 SpooVault 🚀 ~ Accents: café, naïve, español — Multilingual: 日本語, 中文, العربية, Русский — Special: 🌟✨⚡️🔥';
      const bytes = stringToUint8Array(complexText);
      expect(bytes).toBeInstanceOf(Uint8Array);
      // Multi-byte UTF-8 string has more bytes than character length
>>>>>>> main
      expect(bytes.length).toBeGreaterThan(complexText.length);

      const decoded = uint8ArrayToString(bytes);
      expect(decoded).toBe(complexText);
    });

<<<<<<< HEAD
    it("should handle empty string in String <-> Uint8Array conversion", () => {
      const empty = "";
=======
    it('should handle empty string in String <-> Uint8Array conversion', () => {
      const empty = '';
>>>>>>> main
      const bytes = stringToUint8Array(empty);
      expect(bytes.length).toBe(0);
      expect(uint8ArrayToString(bytes)).toBe(empty);
    });
  });

<<<<<<< HEAD
  describe("Direct UTF-8 Base64 Helpers", () => {
    it("should encode and decode UTF-8 string to Base64 without DOMException or character corruption", () => {
      const utf8Data = "Document with Emojis: 📄 🔑 🛡️ and Symbols: © ® ™ € £ ¥";
      const base64 = utf8ToBase64(utf8Data);
      expect(typeof base64).toBe("string");
=======
  describe('Direct UTF-8 Base64 Helpers', () => {
    it('should encode and decode UTF-8 string to Base64 without DOMException or character corruption', () => {
      const utf8Data = 'Document with Emojis: 📄 🔑 🛡️ and Symbols: © ® ™ € £ ¥';
      const base64 = utf8ToBase64(utf8Data);
      expect(typeof base64).toBe('string');
>>>>>>> main
      expect(base64.length).toBeGreaterThan(0);

      const decoded = base64ToUtf8(base64);
      expect(decoded).toBe(utf8Data);
    });
  });

<<<<<<< HEAD
  describe("Web Crypto ECIES (ECDH P-256 + AES-256-GCM) Key Management", () => {
    it("should generate valid ECDH P-256 CryptoKeyPair", async () => {
      const keyPair = await generateECIESKeyPair();
      expect(keyPair.publicKey).toBeDefined();
      expect(keyPair.privateKey).toBeDefined();
      expect(keyPair.publicKey.algorithm.name).toBe("ECDH");
      expect((keyPair.publicKey.algorithm as EcKeyGenParams).namedCurve).toBe("P-256");
    });

    it("should export and import public and private keys in Base64 format", async () => {
      const keyPair = await generateECIESKeyPair();
      const pubB64 = await exportECIESPublicKey(keyPair.publicKey);
      const privB64 = await exportECIESPrivateKey(keyPair.privateKey);

      expect(typeof pubB64).toBe("string");
      expect(typeof privB64).toBe("string");

      const importedPub = await importECIESPublicKey(pubB64);
      const importedPriv = await importECIESPrivateKey(privB64);

      expect(importedPub.algorithm.name).toBe("ECDH");
      expect(importedPriv.algorithm.name).toBe("ECDH");
    });

    it("should generate keypair directly with generateECIESKeyPairBase64 helper", async () => {
      const { publicKey, privateKey } = await generateECIESKeyPairBase64();
      expect(publicKey).toBeDefined();
      expect(privateKey).toBeDefined();
      expect(publicKey.length).toBeGreaterThan(0);
      expect(privateKey.length).toBeGreaterThan(0);

      const importedPub = await importECIESPublicKey(publicKey);
      expect(importedPub.type).toBe("public");
    });
  });

  describe("Web Crypto ECIES Encryption & Decryption", () => {
    it("should encrypt message with recipient public key in standardized ECIES payload format", async () => {
      const { publicKey } = await generateECIESKeyPairBase64();
      const message = "Guardian Key Share Payload #1";

      const encryptedJsonString = await encryptWithPublicKey(message, publicKey);
      const parsed = JSON.parse(encryptedJsonString);

      expect(parsed.version).toBe(ECIES_VERSION);
      expect(parsed.iv).toBeDefined();
=======
  describe('Asymmetric Encryption & Decryption (X25519-XSalsa20-Poly1305)', () => {
    it('should encrypt message with recipient public key in x25519 payload format', () => {
      const keypair = nacl.box.keyPair();
      const pubKeyB64 = uint8ArrayToBase64(keypair.publicKey);

      const message = 'Guardian Key Share Payload';
      const encryptedJsonString = encryptWithPublicKey(message, pubKeyB64);
      const parsed = JSON.parse(encryptedJsonString);

      expect(parsed.version).toBe('x25519-xsalsa20-poly1305');
      expect(parsed.nonce).toBeDefined();
>>>>>>> main
      expect(parsed.ephemPublicKey).toBeDefined();
      expect(parsed.ciphertext).toBeDefined();
    });

<<<<<<< HEAD
    it("should encrypt and decrypt messages containing UTF-8 multi-byte characters and emojis", async () => {
      const receiver = await generateECIESKeyPairBase64();

      const secretDocument = JSON.stringify({
        title: "Confidential Payroll & Document 💼🔒",
        owner: "Alice 👩‍💻",
        notes: "Includes emojis 🚀🎉, accents éàü, and asian chars 繁體中文 / にほんご",
        secretKey: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      });

      const encryptedPayload = await encryptWithPublicKey(secretDocument, receiver.publicKey);
      const decrypted = await decryptWithPrivateKey(encryptedPayload, receiver.privateKey);
=======
    it('should encrypt and decrypt messages containing UTF-8 multi-byte characters and emojis', () => {
      const receiverKeypair = nacl.box.keyPair();
      const receiverPubKeyB64 = uint8ArrayToBase64(receiverKeypair.publicKey);
      const receiverSecretKeyB64 = uint8ArrayToBase64(receiverKeypair.secretKey);

      const secretDocument = JSON.stringify({
        title: 'Confidential Payroll & Document 💼🔒',
        owner: 'Alice 👩‍💻',
        notes: 'Includes emojis 🚀🎉, accents éàü, and asian chars 繁體中文 / にほんご',
        secretKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      });

      const encryptedPayload = encryptWithPublicKey(secretDocument, receiverPubKeyB64);
      const decrypted = decryptWithPrivateKey(encryptedPayload, receiverSecretKeyB64);
>>>>>>> main

      expect(decrypted).toBe(secretDocument);
      expect(JSON.parse(decrypted)).toEqual(JSON.parse(secretDocument));
    });

<<<<<<< HEAD
    it("should accept parsed EncryptedPayload object in decryptWithPrivateKey", async () => {
      const receiver = await generateECIESKeyPairBase64();
      const secretText = "Testing object payload input 📦";

      const encryptedJsonString = await encryptWithPublicKey(secretText, receiver.publicKey);
      const payloadObj = JSON.parse(encryptedJsonString);

      const decrypted = await decryptWithPrivateKey(payloadObj, receiver.privateKey);
      expect(decrypted).toBe(secretText);
    });

    it("should fail decryption when using wrong private key", async () => {
      const receiver = await generateECIESKeyPairBase64();
      const wrongReceiver = await generateECIESKeyPairBase64();

      const encryptedPayload = await encryptWithPublicKey("Secret data", receiver.publicKey);

      await expect(
        decryptWithPrivateKey(encryptedPayload, wrongReceiver.privateKey)
      ).rejects.toThrow("Failed to decrypt ciphertext with provided private key");
    });

    it("should fail decryption when ciphertext has been tampered with", async () => {
      const receiver = await generateECIESKeyPairBase64();
      const encryptedJsonString = await encryptWithPublicKey("Original secret", receiver.publicKey);
      const payload = JSON.parse(encryptedJsonString);

      // Tamper ciphertext
      const cipherBytes = base64ToUint8Array(payload.ciphertext);
      cipherBytes[0] ^= 0xff;
      payload.ciphertext = uint8ArrayToBase64(cipherBytes);

      await expect(
        decryptWithPrivateKey(JSON.stringify(payload), receiver.privateKey)
      ).rejects.toThrow("Failed to decrypt ciphertext with provided private key");
    });

    it("should fail decryption when IV is missing or tampered", async () => {
      const receiver = await generateECIESKeyPairBase64();
      const encryptedJsonString = await encryptWithPublicKey("Original secret", receiver.publicKey);
      const payload = JSON.parse(encryptedJsonString);

      delete payload.iv;
      delete payload.nonce;

      await expect(
        decryptWithPrivateKey(JSON.stringify(payload), receiver.privateKey)
      ).rejects.toThrow("Missing IV in encrypted ECIES payload");
    });
  });

  describe("Legacy TweetNaCl (X25519) Backward Compatibility", () => {
    it("should seamlessly decrypt legacy x25519-xsalsa20-poly1305 payloads", async () => {
      const keypair = nacl.box.keyPair();
      const pubKeyB64 = uint8ArrayToBase64(keypair.publicKey);
      const secretKeyB64 = uint8ArrayToBase64(keypair.secretKey);

      // Create a legacy TweetNaCl payload
      const ephemeralKeypair = nacl.box.keyPair();
      const receiverPubKey = base64ToUint8Array(pubKeyB64);
      const message = "Legacy Shamir Share from MetaMask eth_decrypt era";
      const messageBytes = stringToUint8Array(message);
      const nonce = nacl.randomBytes(nacl.box.nonceLength);

      const ciphertext = nacl.box(
        messageBytes,
        nonce,
        receiverPubKey,
        ephemeralKeypair.secretKey
      );

      const legacyPayload = {
        version: LEGACY_X25519_VERSION,
        nonce: uint8ArrayToBase64(nonce),
        ephemPublicKey: uint8ArrayToBase64(ephemeralKeypair.publicKey),
        ciphertext: uint8ArrayToBase64(ciphertext),
      };

      const decrypted = await decryptWithPrivateKey(JSON.stringify(legacyPayload), secretKeyB64);
      expect(decrypted).toBe(message);
    });

    it("should throw error when decrypting legacy payload with wrong secret key", async () => {
      const keypair = nacl.box.keyPair();
      const wrongKeypair = nacl.box.keyPair();

      const pubKeyB64 = uint8ArrayToBase64(keypair.publicKey);
      const wrongSecretKeyB64 = uint8ArrayToBase64(wrongKeypair.secretKey);

      const ephemeralKeypair = nacl.box.keyPair();
      const receiverPubKey = base64ToUint8Array(pubKeyB64);
      const messageBytes = stringToUint8Array("Secret data");
      const nonce = nacl.randomBytes(nacl.box.nonceLength);

      const ciphertext = nacl.box(
        messageBytes,
        nonce,
        receiverPubKey,
        ephemeralKeypair.secretKey
      );

      const legacyPayload = {
        version: LEGACY_X25519_VERSION,
        nonce: uint8ArrayToBase64(nonce),
        ephemPublicKey: uint8ArrayToBase64(ephemeralKeypair.publicKey),
        ciphertext: uint8ArrayToBase64(ciphertext),
      };

      await expect(
        decryptWithPrivateKey(JSON.stringify(legacyPayload), wrongSecretKeyB64)
      ).rejects.toThrow("Failed to decrypt ciphertext with provided private key");
    });

    it("should throw error when payload version is unsupported", async () => {
      const receiver = await generateECIESKeyPairBase64();

      const invalidPayload = JSON.stringify({
        version: "unsupported-crypto-algorithm-v99",
        nonce: uint8ArrayToBase64(new Uint8Array(24)),
        ephemPublicKey: receiver.publicKey,
        ciphertext: uint8ArrayToBase64(new Uint8Array(32)),
      });

      await expect(
        decryptWithPrivateKey(invalidPayload, receiver.privateKey)
      ).rejects.toThrow("Unsupported encryption version: unsupported-crypto-algorithm-v99");
=======
    it('should accept parsed EncryptedPayload object in decryptWithPrivateKey', () => {
      const receiverKeypair = nacl.box.keyPair();
      const receiverPubKeyB64 = uint8ArrayToBase64(receiverKeypair.publicKey);
      const receiverSecretKeyB64 = uint8ArrayToBase64(receiverKeypair.secretKey);

      const secretText = 'Testing object payload input 📦';
      const encryptedJsonString = encryptWithPublicKey(secretText, receiverPubKeyB64);
      const payloadObj = JSON.parse(encryptedJsonString);

      const decrypted = decryptWithPrivateKey(payloadObj, receiverSecretKeyB64);
      expect(decrypted).toBe(secretText);
    });

    it('should throw error when decrypting with wrong secret key', () => {
      const receiverKeypair = nacl.box.keyPair();
      const wrongKeypair = nacl.box.keyPair();

      const receiverPubKeyB64 = uint8ArrayToBase64(receiverKeypair.publicKey);
      const wrongSecretKeyB64 = uint8ArrayToBase64(wrongKeypair.secretKey);

      const encryptedPayload = encryptWithPublicKey('Secret data', receiverPubKeyB64);

      expect(() => {
        decryptWithPrivateKey(encryptedPayload, wrongSecretKeyB64);
      }).toThrow('Failed to decrypt ciphertext with provided private key');
    });

    it('should throw error when payload version is unsupported', () => {
      const keypair = nacl.box.keyPair();
      const secretKeyB64 = uint8ArrayToBase64(keypair.secretKey);

      const invalidPayload = JSON.stringify({
        version: 'unsupported-crypto-algorithm-v2',
        nonce: uint8ArrayToBase64(new Uint8Array(24)),
        ephemPublicKey: uint8ArrayToBase64(new Uint8Array(32)),
        ciphertext: uint8ArrayToBase64(new Uint8Array(32)),
      });

      expect(() => {
        decryptWithPrivateKey(invalidPayload, secretKeyB64);
      }).toThrow('Unsupported encryption version: unsupported-crypto-algorithm-v2');
>>>>>>> main
    });
  });
});
