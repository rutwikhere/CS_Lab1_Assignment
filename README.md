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

### Step 2: Client-Side Message Encryption
- Modified `routes/message.js` (`/set-message` route) to intercept form submission on the client side.
- Implemented logic using the Web Crypto API to:
  - Hash the user's password using `SHA-256`.
  - Use the hash as the AES-GCM encryption key.
  - Generate a 12-byte random IV.
  - Encrypt the message.
  - Base64 encode both the ciphertext and IV before sending to the server.
- The server now receives and saves only the ciphertext (`message`) and the `iv` in the database.

### Step 3: Client-Side Message Decryption
- Modified `routes/account.js` to initially display a "locked" state if a message exists.
- The UI requests the user's password and, without network requests, decodes the Base64 IV and ciphertext.
- It then uses Web Crypto API (identical key generation from the user's password hash) to decrypt the message client-side and dynamically inject it into the DOM upon success.
