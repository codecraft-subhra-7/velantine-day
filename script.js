const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContainer = document.getElementById('main-container');
const successMessage = document.getElementById('success-message');
const music = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle-btn');

// Make the "No" button run away
if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        const randomX = Math.floor(Math.random() * (windowWidth - btnWidth));
        const randomY = Math.floor(Math.random() * (windowHeight - btnHeight));
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    });
}

// Handle "Yes" button click
if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        successMessage.style.display = 'block';

        // Unmute and play music if it was paused/muted
        if (music) {
            music.muted = false;
            music.play();
            if (musicToggleBtn) musicToggleBtn.innerHTML = '🎵';
        }

        createBurstAnimation();
    });

    // Start falling hearts animation only on index.html
    createAmbientHearts();
}

// Music Toggle and Autoplay Handling
if (music && musicToggleBtn) {
    // Start with music muted for browser autoplay policies
    music.muted = true;

    musicToggleBtn.addEventListener('click', () => {
        if (music.muted) {
            music.muted = false;
            music.play(); // Ensure it plays
            musicToggleBtn.innerHTML = '🎵';
        } else {
            music.muted = true;
            musicToggleBtn.innerHTML = '🔇';
        }
    });
}

function createBurstAnimation() {
    const particleCount = 40;
    const emojis = ['💖', '✨', '❤️', '🌟'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 150 + 50;
        
        const x = Math.cos(angle * (Math.PI / 180)) * distance * 2;
        const y = Math.sin(angle * (Math.PI / 180)) * distance * 2;

        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.fontSize = `${Math.random() * 1 + 1}rem`;
        
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function createAmbientHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('ambient-heart');
        heart.innerHTML = '❤️';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 5 + 's';
        heart.style.fontSize = Math.random() * 1 + 0.8 + 'rem';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 800);
}

// Add a sparkling cursor trail effect
document.addEventListener('mousemove', (e) => {
    // Control the density of the trail
    if (Math.random() > 0.3) return; 

    const trail = document.createElement('div');
    trail.innerHTML = ['✨', '💖', '💕', '🌸'][Math.floor(Math.random() * 4)];
    trail.style.position = 'absolute';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.fontSize = `${Math.random() * 10 + 10}px`;

    document.body.appendChild(trail);

    // Use Web Animations API so no extra CSS is required
    const animation = trail.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(-50%, ${-50 - Math.random() * 50}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800 + Math.random() * 500,
        easing: 'ease-out'
    });

    animation.onfinish = () => {
        trail.remove();
    };
});
