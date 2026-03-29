// ── MATRIX RAIN ──
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff41';
  ctx.font = fontSize + 'px Courier New';

  drops.forEach((y, i) => {
    const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

setInterval(drawMatrix, 40);

// ── SCENE 1 LINES TIMING ──
const timings = [800, 2300, 3800, 6200];
const ids = ['l1', 'l2', 'l3', 'l4'];

ids.forEach((id, i) => {
  setTimeout(() => {
    document.getElementById(id).style.opacity = '1';
  }, timings[i]);
});

// ── SHOW CONTINUE BUTTON ──
setTimeout(() => {
  const btn = document.getElementById('continueBtn');
  btn.style.display = 'block';
}, 8200);

// ── CONTINUE → GO TO ARE YOU READY PAGE ──
function goToReady() {
  document.getElementById('scene1').style.display = 'none';
  document.getElementById('readyPage').style.display = 'flex';
}

// ── NO BUTTON CLICKED ──
function clickedNo() {
  const noBtn = document.getElementById('noBtn');
  noBtn.textContent = 'Yes';
  noBtn.classList.remove('no-btn');
  noBtn.classList.add('yes-btn');
  noBtn.setAttribute('onclick', 'goToLetter()');
}

// ── ROSE PETALS ──
function startPetals() {
  const petals = ['🌸', '🌺', '🌹', '❀', '✿'];

  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.fontSize = (Math.random() * 14 + 16) + 'px';
      petal.style.animationDuration = (Math.random() * 4 + 5) + 's';
      petal.style.animationDelay = (Math.random() * 3) + 's';
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 9000);
    }, i * 300);
  }

  setInterval(() => {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (Math.random() * 14 + 16) + 'px';
    petal.style.animationDuration = (Math.random() * 4 + 5) + 's';
    petal.style.animationDelay = '0s';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
  }, 600);
}

// ── CLICK HERE TIMER ──
function startClickHereTimer() {
  setTimeout(() => {
    const btn = document.getElementById('clickHereBtn');
    btn.style.display = 'block';
    btn.style.opacity = '0';

    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 0.05;
      btn.style.opacity = opacity;
      if (opacity >= 1) clearInterval(fadeIn);
    }, 50);

  }, 8000);
}

// ── YES → GO TO LETTER PAGE ──
function goToLetter() {
  document.getElementById('readyPage').style.display = 'none';
  document.getElementById('letterPage').style.display = 'flex';
  startPetals();
  startClickHereTimer();
}

// ── GOLD PARTICLES ──
function startGoldParticles() {
  const goldCanvas = document.getElementById('goldCanvas');
  const gctx = goldCanvas.getContext('2d');
  goldCanvas.width = window.innerWidth;
  goldCanvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * goldCanvas.width,
      y: goldCanvas.height + Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      color: ['#c9a84c', '#f5d769', '#fdfaf3', '#d4af37'][Math.floor(Math.random() * 4)]
    });
  }

  function animateParticles() {
    gctx.clearRect(0, 0, goldCanvas.width, goldCanvas.height);
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.opacity -= 0.0015;
      if (p.y < -10 || p.opacity <= 0) {
        p.y = goldCanvas.height + 10;
        p.x = Math.random() * goldCanvas.width;
        p.opacity = Math.random() * 0.7 + 0.3;
      }
      gctx.beginPath();
      gctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      gctx.fillStyle = p.color;
      gctx.globalAlpha = p.opacity;
      gctx.fill();
    });
    gctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// ── START LETTER SCENE ──
function startRealLetter() {
  startGoldParticles();

  // ✅ Force reveal letter container
  setTimeout(() => {
    const container = document.getElementById('letterContainer');
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
    container.style.transition = 'opacity 1.8s ease, transform 1.8s ease';
  }, 500);

  // ✅ Show lines one by one
  const letterLines = ['rl0','rl1','rl2','rl3','rl4','rl5','rl6','rl7','rl8','rl9','rl10', 'rl11'];
  letterLines.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      }
    }, i * 1800 + 1000);
  });

  // ✅ Show replay button
  setTimeout(() => {
    const footer = document.getElementById('letterFooter');
    if (footer) footer.style.opacity = '1';
  }, letterLines.length * 1800 + 1500);
}

// ── GO TO REAL LETTER ──
function goToRealLetter() {
  document.getElementById('letterPage').style.display = 'none';
  const realPage = document.getElementById('realLetterPage');
  realPage.style.display = 'flex';
  startRealLetter();
}

// ── REPLAY FROM START ──
function replayAll() {
  window.location.reload();
}
