# 🔐 CS Lab 1 – Message Feature with Web Crypto API

A simple class portal where students can log in, set a fun personal message on their page, and update their password.

---

## 📖 Assignment Implementation – Web Crypto API

This repository implements the **Web Crypto API Message Feature**. The application uses the browser's native `crypto.subtle` API to ensure messages are completely encrypted **before being sent to the server**.

### ✨ Features

- **🔒 Zero-Knowledge Architecture**
  - The plaintext message and the password used to encrypt it never leave the browser.

- **🛡️ Client-Side Cryptography**
  - Password is hashed using **SHA-256**.
  - The hash is used as an **AES-GCM** encryption key.
  - A random **Initialization Vector (IV)** is generated for every message.
  - Encryption is performed entirely in the browser.

- **💾 Secure Storage**
  - Only the **ciphertext** and **IV** are transmitted to the server and stored in the SQLite database.

- **🔓 Client-Side Decryption**
  - Users enter their password on the account page.
  - The stored message is decrypted completely in the browser.
  - No additional network request is made during decryption.

---

## 🚀 Installation

Make sure you have **Node.js** installed.

### Clone the repository

```bash
git clone https://github.com/rutwikhere/CS_Lab1_Assignment.git
cd CS_Lab1_Assignment
```

### Install dependencies

```bash
npm install
```

---

## ▶️ Running the Project

Start the Express server:

```bash
npm start
```

Open your browser and visit:

```
http://localhost:3000
```

> **Note:** A fresh `classmates.db` database is automatically created on startup with a few sample accounts for testing.

---

## ✅ Assignment Requirements

| Requirement | 
|------------|------------|
| Database showing ciphertext stored (not readable text) | 
| DevTools Network tab on Save (showing only ciphertext/IV) | 
| Locked Account Page | 
| Network tab during Unlock (showing no request was made) | 
| Unlocked/Decrypted Account Page |

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Node.js + Express |
| **Database** | better-sqlite3 |
| **Frontend** | Plain HTML/CSS, Vanilla JavaScript |
| **Security** | Native Browser Web Crypto API (`crypto.subtle`) |

---

<p align="center">
  Built using the native <strong>Web Crypto API</strong> with client-side encryption for secure message storage.
</p>
