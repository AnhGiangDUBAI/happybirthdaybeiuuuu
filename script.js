// Music control (only if button exists)
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

if (musicBtn) {
    let isPlaying = false;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = '🎵 Bật nhạc';
            isPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.textContent = '🎵 Tắt nhạc';
            isPlaying = true;
        }
    });
}

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '-1';
    heart.style.transition = 'all 4s ease-in-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.bottom = '120%';
        heart.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Create hearts periodically
setInterval(createHeart, 800);

// Click effect on cake (only if cake exists)
const cake = document.querySelector('.cake');
if (cake) {
    cake.addEventListener('click', () => {
        cake.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => {
            cake.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            createConfetti();
        }
    });
    
    cake.style.cursor = 'pointer';
    cake.style.transition = 'transform 0.3s ease';
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#ff6b9d', '#c44569', '#ffd700', '#ff9ff3', '#54a0ff'];
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    
    document.body.appendChild(confetti);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let x = 0, y = 0;
    const gravity = 500;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        x = vx * elapsed;
        y = vy * elapsed + 0.5 * gravity * elapsed * elapsed;
        
        confetti.style.transform = `translate(${x}px, ${y}px)`;
        confetti.style.opacity = 1 - elapsed;
        
        if (elapsed < 1) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    }
    
    animate();
}

// Gift box functionality
const giftBox = document.getElementById('giftBox');

if (giftBox) {
    let giftOpened = false;
    
    giftBox.addEventListener('click', () => {
        if (!giftOpened) {
            giftOpened = true;
            giftBox.classList.add('opened');
            
            // Create confetti explosion
            for (let i = 0; i < 30; i++) {
                setTimeout(() => createConfetti(), i * 20);
            }
            
            // Redirect to gift page after animation
            setTimeout(() => {
                window.location.href = 'gift.html';
            }, 1000);
        }
    });
}
