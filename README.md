# CS_Lab_1 (Message Feature with Web Crypto API)
A simple class portal where students can log in, set a fun personal message on their page, and update their password.

## Assignment Implementation: Web Crypto API
This repository implements Web Crypto API Message Feature. The application uses the browser's native `crypto.subtle` API to ensure messages are completely encrypted before being sent to the server.

- **Zero-Knowledge Architecture:** The plaintext message and the password used to encrypt it never leave the browser.
- **Client-Side Cryptography:**
  - The password is hashed using SHA-256 and used as an AES-GCM key.
  - A random Initialization Vector (IV) is generated for each message.
  - The message is encrypted entirely on the client side.
- **Secure Storage:** Only the ciphertext and the IV are transmitted to the server and stored in the SQLite database.
- **Client-Side Decryption:** To view the message, the user enters their password on the account page, and the message is decrypted entirely within the browser without any additional network requests.

## Installation Guidelines
Make sure you have Node.js installed.
Clone this repository and navigate to the project directory:
```bash
git clone https://github.com/rutwikhere/CS_Lab1_Assignment.git
cd CS_Lab1_Assignment
```
Install the required dependencies:
```bash
npm install
```

## Execution Guidelines
Start the local Express server:
```bash
npm start
```
Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)

*Note: A fresh `classmates.db` database is created automatically upon startup with a few sample accounts to log in with.*



### App Walkthrough
- **Log In Page:** [Log In](#)
- **Empty Account Page (No message set):** [Empty Account](#)
- **Setting a Message (before encryption):** [Set Message](#)

### Assignment Requirements
- **Database showing ciphertext stored (not readable text):** [Database](#)
- **The DevTools Network tab on Save (showing only ciphertext/IV):** [Network Save](#)
- **The locked account page:** [Locked Account](#)
- **The Network tab during Unlock (showing no request was made):** [Network Unlock](#)
- **The unlocked/decrypted account page:** [Unlocked Account](#)

## Tech Stack
- **Backend:** Node.js with Express
- **Database:** better-sqlite3
- **Frontend:** Plain HTML/CSS, Vanilla JavaScript
- **Security:** Native Browser Web Crypto API (crypto.subtle)
