// ---------------------- HERO IMAGE ROTATION ----------------------
const heroImages = [
    "slipper1.jpg",
    "slipper2.jpg",
    "slipper3.jpg",
    "slipper4.jpeg",
    "slipper5.jpeg",
    "slipper6.jpeg"
];

let currentHeroIndex = 0;
const heroImageElement = document.getElementById("heroImage");

function changeHeroImage() {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroImageElement.src = heroImages[currentHeroIndex];
}

setInterval(changeHeroImage, 3000);


// ---------------------- PRODUCTS ----------------------
const slippers = [
    { name: "Cozy Slippers", price: "GHS 15", image: "slipper1.jpg", category: "men", colors: ["Black", "Brown", "Blue"] },
    { name: "Summer Slippers", price: "GHS 12", image: "slipper2.jpg", category: "women", colors: ["Pink", "White", "Purple"] },
    { name: "Winter Slippers", price: "GHS 20", image: "slipper3.jpg", category: "kids", colors: ["Red", "Grey"] },
    { name: "Fancy Slippers", price: "GHS 25", image: "slipper4.jpeg", category: "women", colors: ["Gold", "Black"] },
    { name: "Classic Slippers", price: "GHS 18", image: "slipper5.jpeg", category: "men", colors: ["Black", "Brown"] },
    { name: "Cute Slippers", price: "GHS 22", image: "slipper6.jpeg", category: "kids", colors: ["Yellow", "Pink"] }
];

const productsDiv = document.getElementById("products");

// ---------------------- SIZE OPTIONS ----------------------
function generateSizes() {
    let options = `<option value="">Select size</option>`;
    for (let i = 25; i <= 45; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

// ---------------------- DISPLAY PRODUCTS ----------------------
function displaySlippers(filter = "all", search = "") {
    productsDiv.innerHTML = "";

    slippers.forEach(slipper => {
        if ((filter === "all" || slipper.category === filter) &&
            slipper.name.toLowerCase().includes(search.toLowerCase())) {

            const col = document.createElement("div");
            col.className = "col-sm-6 col-md-4 col-lg-3";

            col.innerHTML = `
                <div class="card mb-4 h-100">
                    <img src="${slipper.image}" class="card-img-top" alt="${slipper.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${slipper.name}</h5>
                        <p class="card-text">${slipper.price}</p>

                        <!-- Size Selector -->
                        <select class="form-select mb-2 size-select">
                            ${generateSizes()}
                        </select>

                        <!-- Colour Circles -->
                        <div class="color-options mb-3">
                            ${slipper.colors.map(color => `
                                <span 
                                    class="color-circle"
                                    style="background:${color.toLowerCase()};"
                                    data-color="${color}">
                                </span>
                            `).join("")}
                        </div>

                        <button class="btn btn-success w-100 buy-now">
                            Buy Now
                        </button>
                    </div>
                </div>
            `;

            productsDiv.appendChild(col);
        }
    });

    // Attach colour click event
    document.querySelectorAll(".color-circle").forEach(circle => {
        circle.addEventListener("click", function () {
            const container = this.parentElement;
            container.querySelectorAll(".color-circle")
                .forEach(c => c.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Attach Buy Now click event
    document.querySelectorAll(".buy-now").forEach(btn => {
        btn.addEventListener("click", function () {
            const cardBody = this.parentElement;
            const sizeSelect = cardBody.querySelector(".size-select");
            const selectedColor = cardBody.querySelector(".color-circle.selected");

            if (!sizeSelect.value || !selectedColor) {
                alert("Please select both size and colour before ordering");
                return;
            }

            const size = sizeSelect.value;
            const color = selectedColor.dataset.color;
            const name = cardBody.querySelector(".card-title").textContent;

            const phone = "447588261010";
            const message =
                `Hello, AB Collections, I want to order the following%0A` +
                `Product: ${name}%0A` +
                `Size: ${size}%0A` +
                `Color: ${color}%0A` +
                `Is it available?`;

            // Open WhatsApp only on click
            window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

            // Reset selections after ordering
            sizeSelect.selectedIndex = 0;
            selectedColor.classList.remove("selected");
        });
    });
}


// ---------------------- HERO TEXT ROTATION ----------------------
const heroTexts = [
    { heading: "Welcome to AB Collections", subtext: "Your home of comfortable, stylish and quality slippers!" },
    { heading: "Buy today and buy always!", subtext: "Feel free to go through our available quality products" },
    { heading: "We deliver to your doorstep", subtext: "Enjoy the convenience of shopping from home with our fast delivery service" },
    { heading: "Affordable Prices", subtext: "Get the best value for your money with our competitively priced slippers" },
    { heading: "Customer Satisfaction Guaranteed", subtext: "We are committed to providing excellent customer service and high-quality products" },
    { heading: "Shop with Confidence", subtext: "Our secure payment options ensure worry-free shopping" }
];

let currentTextIndex = 0;
const heroHeadingElement = document.getElementById("heroHeading");
const heroSubtextElement = document.getElementById("heroSubtext");

heroHeadingElement.textContent = heroTexts[0].heading;
heroSubtextElement.textContent = heroTexts[0].subtext;

function changeHeroText() {
    heroHeadingElement.style.opacity = 0;
    heroSubtextElement.style.opacity = 0;

    setTimeout(() => {
        currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
        heroHeadingElement.textContent = heroTexts[currentTextIndex].heading;
        heroSubtextElement.textContent = heroTexts[currentTextIndex].subtext;
        heroHeadingElement.style.opacity = 1;
        heroSubtextElement.style.opacity = 1;
    }, 500);
}

setInterval(changeHeroText, 4000);


// ---------------------- FILTER BUTTONS ----------------------
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const searchValue = document.getElementById("searchInput").value;
        displaySlippers(btn.getAttribute("data-category"), searchValue);
    });
});


// ---------------------- SEARCH INPUT ----------------------
document.getElementById("searchInput").addEventListener("input", function () {
    displaySlippers("all", this.value);
});

// Initial display
displaySlippers();
