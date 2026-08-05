const express = require("express");
const router = express.Router();
const db = require("../db");
const { page } = require("../views");

router.get("/account", (req, res) => {
  if (!req.cookies.username) {
    return res.redirect("/");
  }

  const me = db.prepare("SELECT * FROM accounts WHERE username = ?").get(req.cookies.username);
  if (!me) {
    res.clearCookie("username");
    return res.redirect("/");
  }

  const messageBlock = me.message && me.iv
    ? `<div class="message-box" id="messageBox">
         <p>🔒 <strong>Message is encrypted</strong></p>
         <input type="password" id="decryptPassword" placeholder="Enter password to unlock" style="margin-bottom: 10px;">
         <button id="unlockBtn" class="btn btn-yellow" style="width: 100%;">Unlock</button>
       </div>
       <script>
         document.getElementById('unlockBtn').addEventListener('click', async () => {
           const pwd = document.getElementById('decryptPassword').value;
           if (!pwd) return alert('Please enter password');
           
           try {
             const ivB64 = '${me.iv}';
             const cipherB64 = '${me.message}';
             
             const ivStr = atob(ivB64);
             const iv = new Uint8Array(ivStr.length);
             for(let i=0; i<ivStr.length; i++) iv[i] = ivStr.charCodeAt(i);
             
             const cipherStr = atob(cipherB64);
             const ciphertext = new Uint8Array(cipherStr.length);
             for(let i=0; i<cipherStr.length; i++) ciphertext[i] = cipherStr.charCodeAt(i);

             const enc = new TextEncoder();
             const pwdHash = await crypto.subtle.digest('SHA-256', enc.encode(pwd));
             const key = await crypto.subtle.importKey(
               'raw',
               pwdHash,
               { name: 'AES-GCM' },
               false,
               ['decrypt']
             );
             
             const decryptedBuffer = await crypto.subtle.decrypt(
               { name: 'AES-GCM', iv: iv },
               key,
               ciphertext
             );
             
             const plaintext = new TextDecoder().decode(decryptedBuffer);
             
             const displayName = '${me.display_name.replace(/'/g, "\\'")}';
             document.getElementById('messageBox').innerHTML = '💬 <strong>' + displayName + '\\'s message:</strong><br>' + plaintext;
           } catch (e) {
             alert('Incorrect password or decryption failed!');
             console.error(e);
           }
         });
       </script>`
    : `<div class="message-box empty">💬 No message set yet.</div>`;

  res.send(page("My Page", `
    <h1>👋 Hi, ${me.display_name}!</h1>
    ${messageBlock}
    <div class="button-row">
      <a href="/set-message" class="btn btn-yellow">✏️ Set My Message</a>
      <a href="/change-password" class="btn btn-green">🔑 Change Password</a>
    </div>
    <a href="/logout" class="btn btn-pink" style="margin-top: 14px; display:inline-block;">Log Out</a>
  `));
});

router.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

module.exports = router;
