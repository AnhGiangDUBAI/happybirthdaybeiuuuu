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

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#667eea', '#764ba2', '#ffd700', '#ff9ff3', '#54a0ff'];
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

// Auto confetti on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createConfetti(), i * 30);
        }
    }, 500);
});

// Wishes functionality
const wishInput = document.getElementById('wishInput');
const saveBtn = document.getElementById('saveBtn');
const savedWishesDiv = document.getElementById('savedWishes');

if (wishInput && saveBtn) {
    // Google Sheets URL
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx_vTUoO0tqUZtV2crCByg-c8Fb1ICOW1Mkq3BVFKkUzAe-Bc-t5eskN4-c09nNnZC47g/exec';
    
    // Save new wish (lưu vào Google Sheets)
    saveBtn.addEventListener('click', async () => {
        const wishText = wishInput.value.trim();
        if (wishText === '') {
            alert('Hãy viết gì đó đi em! 💕');
            return;
        }

        // Confirm before saving
        if (!confirm('Lời chúc sẽ được lưu vĩnh viễn và không thể xóa. Bạn có chắc chắn?')) {
            return;
        }

        // Disable button while saving
        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ Đang lưu...';

        const newWish = {
            text: wishText,
            timestamp: new Date().toLocaleString('vi-VN'),
            id: Date.now()
        };

        try {
            // Save to Google Sheets
            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newWish)
            });

            // Also save to localStorage as backup
            const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
            wishes.unshift(newWish);
            localStorage.setItem('birthdayWishes', JSON.stringify(wishes));

            wishInput.value = '';
            
            // Show success
            saveBtn.textContent = '✓ Đã lưu thành công!';
            alert('Lời chúc đã được gửi! Cảm ơn em yêu! 💕');
            
        } catch (error) {
            console.error('Error:', error);
            saveBtn.textContent = '❌ Lỗi! Thử lại';
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            saveBtn.disabled = false;
            setTimeout(() => {
                saveBtn.textContent = '💾 Lưu lại';
            }, 3000);
        }
    });
}
