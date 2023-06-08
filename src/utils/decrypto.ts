import CryptoJS from "crypto-js"

export function decrypto(str: string) {
      const encryptedPassword = str; 
      const encryptionKey = process.env.NEXT_PUBLIC_ENCRIPTO_KEY; 
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, `${encryptionKey}`);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedPassword;
}