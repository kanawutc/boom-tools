// Boom Tools - Password Gate
// Change HASH to update password. Generate: echo -n "yourpassword" | shasum -a 256
const HASH = 'e40ae2f84c9319b323d3ce59a7f932a7d61e9388fb3534fad15343ed6155a114';
const STORAGE_KEY = 'boom_tools_auth';
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

(function() {
  // Check if already authenticated
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const { hash, ts } = JSON.parse(saved);
      if (hash === HASH && (Date.now() - ts) < EXPIRY_MS) return; // OK
    } catch(e) {}
    localStorage.removeItem(STORAGE_KEY);
  }

  // Block page
  document.documentElement.style.overflow = 'hidden';
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <style>
      #auth-overlay {
        position: fixed; inset: 0; z-index: 99999;
        background: #0d1117;
        display: flex; align-items: center; justify-content: center;
        font-family: -apple-system, 'Segoe UI', sans-serif;
      }
      #auth-box {
        background: #161b22; border: 1px solid #21262d; border-radius: 16px;
        padding: 40px; text-align: center; max-width: 360px; width: 90%;
      }
      #auth-box h1 {
        background: linear-gradient(135deg, #f0883e, #ffd700);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        font-size: 1.6rem; margin-bottom: 8px;
      }
      #auth-box p { color: #8b949e; font-size: 0.88rem; margin-bottom: 20px; }
      #auth-input {
        width: 100%; padding: 12px 16px; border-radius: 8px;
        border: 1px solid #30363d; background: #0d1117; color: #c9d1d9;
        font-size: 1rem; text-align: center; outline: none;
      }
      #auth-input:focus { border-color: #f0883e; }
      #auth-input.shake {
        animation: shake 0.4s ease-in-out;
        border-color: #f85149;
      }
      #auth-btn {
        width: 100%; margin-top: 12px; padding: 12px;
        background: #f0883e; color: #0d1117; border: none;
        border-radius: 8px; font-size: 1rem; font-weight: 600;
        cursor: pointer;
      }
      #auth-btn:hover { background: #d2762f; }
      #auth-error { color: #f85149; font-size: 0.82rem; margin-top: 8px; min-height: 20px; }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
      }
    </style>
    <div id="auth-box">
      <h1>Boom Tools</h1>
      <p>กรุณาใส่รหัสผ่านเพื่อเข้าใช้งาน</p>
      <input type="password" id="auth-input" placeholder="Password" autocomplete="off" />
      <button id="auth-btn" onclick="checkPw()">เข้าสู่ระบบ</button>
      <div id="auth-error"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Enter key
  setTimeout(() => {
    const input = document.getElementById('auth-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', e => { if (e.key === 'Enter') checkPw(); });
    }
  }, 100);

  window.checkPw = async function() {
    const input = document.getElementById('auth-input');
    const pw = input.value;
    if (!pw) return;

    const encoded = new TextEncoder().encode(pw);
    const hashBuf = await crypto.subtle.digest('SHA-256', encoded);
    const hashHex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2,'0')).join('');

    if (hashHex === HASH) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ hash: HASH, ts: Date.now() }));
      overlay.remove();
      document.documentElement.style.overflow = '';
    } else {
      input.classList.add('shake');
      document.getElementById('auth-error').textContent = 'รหัสผ่านไม่ถูกต้อง';
      setTimeout(() => input.classList.remove('shake'), 400);
    }
  };
})();
