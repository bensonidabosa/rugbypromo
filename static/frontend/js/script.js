// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.querySelector(".custom-navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// ================= PARTICLES GENERATOR =================
const particlesContainer = document.querySelector(".particles");
if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particlesContainer.appendChild(particle);
    }
}

// ================= SCROLL REVEAL =================
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);

// ================= CONFETTI EFFECT =================
function launchConfetti() {
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            ["#f4b400", "#e10600", "#ffffff"][Math.floor(Math.random() * 3)];
        confetti.style.animationDuration = (2 + Math.random() * 3) + "s";

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Trigger confetti safely
const enterBtn = document.querySelector(".hero-btn");
if (enterBtn) {
    enterBtn.addEventListener("click", function(e) {
        e.preventDefault();
        launchConfetti();

        const link = this.href;
        if (link) {
            setTimeout(() => window.location.href = link, 1000);
        }
    });
}

// Run confetti on page load if button exists
if (enterBtn) launchConfetti();

// Run confetti every 25 seconds
setInterval(launchConfetti, 25000);

// ================= JACKPOT COUNTER =================
const counterElement = document.getElementById("jackpotCounter");
if (counterElement) {
    let targetAmount = 500000;
    let current = 0;

    function updateCounter() {
        const increment = targetAmount / 200;
        if (current < targetAmount) {
            current += increment;
            counterElement.innerText = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counterElement.innerText = targetAmount.toLocaleString();
        }
    }
    updateCounter();
}

// ================= COUNTDOWN TIMER =================
const countdownElement = document.getElementById("countdown");
if (countdownElement) {
    const nextDraw = new Date();
    nextDraw.setDate(nextDraw.getDate() + 3);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextDraw - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        countdownElement.innerHTML = `${days}D : ${hours}H : ${minutes}M`;
    }
    setInterval(updateCountdown, 1000);
}

// ================= LIVE ACTIVITY POPUPS =================
const liveActivity = document.getElementById("liveActivity");
const liveMessage = document.getElementById("liveMessage");

if (liveActivity && liveMessage) {
    const names = [
        "Luca", "Sofia", "Mateo", "Giulia", "Noah", "Emma", "Oliver", "Charlotte",
        "Hiroshi", "Yuki", "Arjun", "Priya", "James", "Olivia", "Thiago", "Valentina",
        "Jack", "Isla", "Leo", "Ruby", "Hunter", "Aria", "Zara", "Finn"
    ];
    const cities = [
        "London", "Paris", "Berlin", "Tokyo", "Beijing", "New York", "Los Angeles",
        "São Paulo", "Rio de Janeiro", "Sydney", "Melbourne", "Auckland"
    ];
    const actions = [
        "just entered the draw!", "won $250!", "purchased 5 tickets!",
        "won the grand prize!", "hit the jackpot!", "won free tickets!"
    ];

    function showLiveActivity() {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        liveMessage.innerHTML = `<strong>${randomName}</strong> from <strong>${randomCity}</strong> ${randomAction}`;
        liveActivity.classList.add("show");

        setTimeout(() => liveActivity.classList.remove("show"), 4000);
    }

    setInterval(showLiveActivity, 15000);
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
