import { createCipheriv, randomBytes, scrypt, createDecipheriv  } from 'crypto';
import { promisify } from 'util';

export async function encryptPassword(password) {
    const iv = randomBytes(16);
    const key = randomBytes(32);
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    let encryptedText = cipher.update(password, 'utf-8', 'hex')
    encryptedText += cipher.final('hex')

    return {
        encryptedPassword: encryptedText,
        iv: iv.toString('hex'),
        key: key.toString('hex')
    }
}

export async function decryptPassword(password, encryptedPassword, key, iv) {
    const encryptionKey = Buffer.from(key, 'hex'); // Your encryption key here
    const encryptionIv = Buffer.from(iv, 'hex'); // Your IV here
    const decipher = createDecipheriv('aes-256-ctr', encryptionKey, encryptionIv);
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decryptedPassword += decipher.final('utf-8');

    return password === decryptedPassword
}