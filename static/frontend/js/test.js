// Navbar scroll effect
window.addEventListener("scroll", function() {
    let navbar = document.querySelector(".custom-navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ================= PARTICLES GENERATOR =================

const particlesContainer = document.querySelector(".particles");

for (let i = 0; i < 40; i++) {
    let particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (5 + Math.random() * 10) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);
}

// ================= SCROLL REVEAL =================

function revealOnScroll() {
    let reveals = document.querySelectorAll(".reveal");

    reveals.forEach(element => {
        let windowHeight = window.innerHeight;
        let elementTop = element.getBoundingClientRect().top;
        let revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


// ================= CONFETTI EFFECT =================

const enterBtn = document.querySelector(".hero-btn");

function launchConfetti() {
    for (let i = 0; i < 80; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            ["#f4b400", "#e10600", "#ffffff"][Math.floor(Math.random() * 3)];

        confetti.style.animationDuration = (2 + Math.random() * 3) + "s";

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// 🎉 Run on page load / refresh
window.addEventListener("load", launchConfetti);

// 🎉 Run every 10 seconds
setInterval(launchConfetti, 25000);

enterBtn.addEventListener("click", function(e) {
    e.preventDefault();          // stop immediate navigation
    launchConfetti();            // run confetti

    const link = this.href;      // get href from the link
    // Delay navigation so user sees confetti
    setTimeout(() => {
        window.location.href = link;
    }, 1000); // adjust to confetti duration
});

// ================= JACKPOT COUNTER =================

let counterElement = document.getElementById("jackpotCounter");
let targetAmount = 50000;
let current = 0;

function updateCounter() {
    let increment = targetAmount / 200;

    if (current < targetAmount) {
        current += increment;
        counterElement.innerText = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
    } else {
        counterElement.innerText = targetAmount.toLocaleString();
    }
}

updateCounter();


// ================= COUNTDOWN TIMER =================

let countdownElement = document.getElementById("countdown");

// Set next draw (example: 3 days from now)
let nextDraw = new Date();
nextDraw.setDate(nextDraw.getDate() + 3);

function updateCountdown() {
    let now = new Date().getTime();
    let distance = nextDraw - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    countdownElement.innerHTML =
        days + "D : " + hours + "H : " + minutes + "M";
}

setInterval(updateCountdown, 1000);



// ================= LIVE ACTIVITY POPUPS =================

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
    "won $250!",
    "purchased 5 tickets!",
    "joined the Rugby Lottery!",

    // More winning actions
    "won $500!",
    "won $1,000!",
    "won the grand prize!",
    "hit the jackpot!",
    "claimed their prize!",
    "just scored a big win!",
    "won a bonus prize!",
    "won free tickets!",
    "secured a cash reward!",
    "won the weekly draw!",
    "won the mega prize!",
    "just doubled their winnings!",
    "won an exclusive reward!",
    "took home the top prize!",
    "won big today!"
];


const liveActivity = document.getElementById("liveActivity");
const liveMessage = document.getElementById("liveMessage");

function showLiveActivity() {

    let randomName = names[Math.floor(Math.random() * names.length)];
    let randomCity = cities[Math.floor(Math.random() * cities.length)];
    let randomAction = actions[Math.floor(Math.random() * actions.length)];

    liveMessage.innerHTML =
        `<strong>${randomName}</strong> from <strong>${randomCity}</strong> ${randomAction}`;

    liveActivity.classList.add("show");

    setTimeout(() => {
        liveActivity.classList.remove("show");
    }, 4000);
}

// Show every 6 seconds
setInterval(showLiveActivity, 15000);

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

