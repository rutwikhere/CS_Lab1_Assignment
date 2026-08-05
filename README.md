# CS_Lab_1

A simple class portal where students can log in, set a fun personal
message on their page, and update their password.

## Features

- Log in with a username and password
- View your own page with a welcome message
- Set a short personal message that shows up on your page
- Change your password any time

## Tech Stack

- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for storage
- Plain HTML/CSS, no front-end framework

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open your browser to [http://localhost:3000](http://localhost:3000)

The database (`classmates.db`) is created automatically the first time
you run the app, with a few sample accounts to log in with.

## Project Structure

```
classmate-hub/
├── server.js              # app entry point
├── db.js                  # database setup
├── views.js                # shared page template
├── routes/
│   ├── login.js           # login page
│   ├── account.js         # account page + logout
│   ├── message.js         # set message page
│   └── password.js        # change password page
└── public/
    └── style.css           # styling
```

## Configuration

By default the app runs on port `3000`. To use a different port, set
the `PORT` environment variable before starting:

```bash
PORT=8080 npm start
```

## Changes Implemented (Part B)

### Step 1: Database Schema Update
- Modified `db.js` to include a new `iv` (Initialization Vector) column of type `TEXT` in the `accounts` table.
- Updated the `INSERT INTO` queries to populate the `iv` column with `null` initially.

### Step 2: Centralized Web Crypto Module
- Created exactly one new file: `public/crypto.js`.
- It acts as a thin wrapper around `crypto.subtle` with functions like `getKey(password)`, `encryptData()`, and `decryptData()`. No logic is duplicated in the route files.
- This ensures all cryptography runs client-side and maintains a single source of truth for cryptographic operations.

### Step 3: Client-Side Message Encryption
- Modified `routes/message.js` (`/set-message` route) to include `<script src="/public/crypto.js"></script>` and intercept form submission.
- Calls `getKey()` to hash the password (SHA-256) into an AES-GCM encryption key.
- Generates a 12-byte random IV.
- Encrypts the plaintext message.
- Base64 encodes the ciphertext and IV, sending only the encrypted data to the server.

### Step 4: Client-Side Message Decryption
- Modified `routes/account.js` to initially display a "locked" UI if an encrypted message and IV exist.
- Included `<script src="/public/crypto.js"></script>`.
- The user inputs their password, which triggers `getKey()` to regenerate the AES key client-side (no network request).
- Base64 decodes the IV and Ciphertext, then calls `decryptData()`.
- Dynamically injects the decoded message into the DOM upon success.
