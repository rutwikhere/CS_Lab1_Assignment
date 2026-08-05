const express = require("express");
const router = express.Router();
const db = require("../db");
const { page } = require("../views");

router.get("/set-message", (req, res) => {
  if (!req.cookies.username) {
    return res.redirect("/");
  }

  res.send(page("Set My Message", `
    <h1>✏️ Set My Message</h1>
    <p class="subtitle">This will show up on your page.</p>
    <form id="setMessageForm" method="POST" action="/set-message">
      <label>Your message</label>
      <input type="text" id="plainMessage" placeholder="Say something fun!" required autofocus>
      <label>Your password (for encryption)</label>
      <input type="password" id="encryptPassword" placeholder="Enter your password" required>
      <input type="hidden" name="message" id="cipherMessage">
      <input type="hidden" name="iv" id="messageIv">
      <button type="submit" class="btn btn-yellow">Save Message 💾</button>
    </form>
    <a href="/account" class="btn btn-pink" style="margin-top: 14px; display:inline-block;">Back</a>
    <script src="/public/crypto.js"></script>
    <script>
      document.getElementById('setMessageForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('plainMessage').value;
        const pwd = document.getElementById('encryptPassword').value;
        
        try {
          const key = await getKey(pwd);
          const iv = generateIV();
          const ciphertext = await encryptData(key, iv, msg);
          
          document.getElementById('messageIv').value = bufferToBase64(iv);
          document.getElementById('cipherMessage').value = bufferToBase64(ciphertext);
          
          e.target.submit();
        } catch(err) {
          alert('Encryption failed!');
          console.error(err);
        }
      });
    </script>
  `));
});

router.post("/set-message", (req, res) => {
  if (!req.cookies.username) {
    return res.redirect("/");
  }

  db.prepare("UPDATE accounts SET message = ?, iv = ? WHERE username = ?").run(
    req.body.message,
    req.body.iv,
    req.cookies.username
  );

  res.redirect("/account");
});

module.exports = router;
