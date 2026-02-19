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
    enterBtn.addEventListener("click", function (e) {
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
    let targetAmount = 250000000;
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
        // Europe
        "Luca", "Sofia", "Mateo", "Giulia", "Noah", "Emma", "Oliver", "Charlotte",
        "Hugo", "Camille", "Liam", "Freya", "Marta", "Alejandro", "Isabella",
        "Sebastian", "Elena", "Nikolai", "Anastasia", "Erik", "Ingrid",
        "Rafael", "Beatriz", "Tomas", "Zoe",

        // Asia
        "Hiroshi", "Yuki", "Arjun", "Priya", "Wei", "Mei", "Jin", "Soo-min",
        "Omar", "Fatima", "Chen", "Ananya", "Rahul", "Aiko", "Min-jun",
        "Kazuki", "Rina", "Tenzin", "Niran", "Siti", "Azlan",
        "Reza", "Leila", "Thao", "Bao",

        // North America
        "James", "Olivia", "Ethan", "Ava", "Logan", "Mia", "Benjamin", "Amelia",
        "Elijah", "Harper", "Lucas", "Emily", "Daniel", "Scarlett",
        "Jack", "Chloe", "Wyatt", "Lily", "Owen", "Grace",
        "Caleb", "Victoria", "Isaac", "Hannah",

        // South America
        "Thiago", "Valentina", "Santiago", "Camila", "Mateus", "Antonella",
        "Diego", "Gabriela", "Juan", "Mariana", "Carlos", "Luisa",
        "Andres", "Fernanda", "Bruno", "Isadora", "Renato", "Paula",
        "Joaquin", "Daniela",

        // Oceania
        "Jack", "Isla", "Noah", "Matilda", "Leo", "Ruby",
        "Hunter", "Aria", "Zara", "Finn"
    ];

    const cities = [
        // Europe
        "London", "Paris", "Berlin", "Madrid", "Rome", "Lisbon", "Amsterdam",
        "Vienna", "Prague", "Dublin", "Warsaw", "Athens", "Copenhagen",
        "Barcelona", "Milan", "Munich", "Brussels", "Stockholm",
        "Budapest", "Zurich", "Edinburgh",

        // Asia
        "Tokyo", "Beijing", "Shanghai", "Seoul", "Bangkok", "Singapore",
        "Mumbai", "Delhi", "Jakarta", "Manila", "Kuala Lumpur", "Dubai",
        "Osaka", "Hong Kong", "Hanoi", "Taipei", "Doha",
        "Riyadh", "Colombo", "Kathmandu",

        // North America
        "New York", "Los Angeles", "Chicago", "Toronto", "Vancouver",
        "Mexico City", "Houston", "Miami", "San Francisco", "Boston",
        "Seattle", "Atlanta", "Montreal", "Las Vegas",
        "Philadelphia", "San Diego", "Dallas",

        // South America
        "São Paulo", "Rio de Janeiro", "Buenos Aires", "Santiago",
        "Lima", "Bogotá", "Caracas", "Quito", "Montevideo",
        "Asunción", "La Paz", "Medellín", "Curitiba",

        // Oceania
        "Sydney", "Melbourne", "Brisbane", "Perth",
        "Auckland", "Wellington", "Adelaide", "Gold Coast"
    ];



    const actions = [
        "just entered the draw!",
        "purchased 5 tickets!",
        "joined the Rugby Lottery!",

        // Major winning actions (minimum $1,200,000)
        "won $1,200,000!",
        "won $1,500,000!",
        "won $2,000,000!",
        "won $5,000,000!",
        "won $10,000,000!",
        "won $25,000,000!",
        "won $50,000,000!",
        "won $100,000,000!",
        "won $250,000,000!",

        // Big prize variations
        "won the $1,200,000 grand prize!",
        "hit the $5,000,000 jackpot!",
        "claimed $2,500,000 in winnings!",
        "secured a $3,000,000 cash reward!",
        "won $7,500,000 in the weekly draw!",
        "took home $15,000,000!",
        "just scored $4,000,000!",
        "won a $6,000,000 bonus prize!",
        "won the $20,000,000 mega prize!",
        "just doubled their $1,200,000 winnings!",
        "won an exclusive $8,000,000 reward!",
        "won big today - $12,000,000!"
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
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
