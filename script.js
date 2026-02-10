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
    currentHeroIndex++;
    if (currentHeroIndex >= heroImages.length) currentHeroIndex = 0;
    heroImageElement.src = heroImages[currentHeroIndex];
}

// Change hero image every 3 seconds
setInterval(changeHeroImage, 3000);


// ---------------------- PRODUCTS ----------------------
const slippers = [
    { name: "Cozy Slippers", price: "GHS 15", image: "slipper1.jpg", category: "men" },
    { name: "Summer Slippers", price: "GHS 12", image: "slipper2.jpg", category: "women" },
    { name: "Winter Slippers", price: "GHS 20", image: "slipper3.jpg", category: "kids" },
    { name: "Fancy Slippers", price: "GHS 25", image: "slipper4.jpeg", category: "women" },
    { name: "Classic Slippers", price: "GHS 18", image: "slipper5.jpeg", category: "men" },
    { name: "Cute Slippers", price: "GHS 22", image: "slipper6.jpeg", category: "kids" }
];

const productsDiv = document.getElementById("products");

// Display products with optional filter and search
function displaySlippers(filter = "all", search = "") {
    productsDiv.innerHTML = "";

    slippers.forEach(slipper => {
        if ((filter === "all" || slipper.category === filter) &&
            slipper.name.toLowerCase().includes(search.toLowerCase())) {

            const col = document.createElement("div");
            col.className = "col-sm-6 col-md-4 col-lg-3"; // responsive

            col.innerHTML = `
                <div class="card mb-4">
                    <img src="${slipper.image}" class="card-img-top" alt="${slipper.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${slipper.name}</h5>
                        <p class="card-text">${slipper.price}</p>
                        <button class="btn btn-success" onclick="buyNow('${slipper.name}', '${slipper.image}')">
                            Buy Now
                        </button>
                    </div>
                </div>
            `;

            productsDiv.appendChild(col);
        }
    });
}

// ---------------------- HERO TEXT ROTATION ----------------------
const heroTexts = [
    {
        heading: "Welcome to AB Collections",
        subtext: "Your home of comfortable, stylish and quality slippers!"
    },
    {
        heading: "Buy today and buy always!",
        subtext: "Feel free to go through our available quality products"
    },
    {
        heading: "We deliver to your doorstep",
        subtext: "Enjoy the convenience of shopping from home with our fast delivery service"
    },
    {
        heading: "Affordable Prices",
        subtext: "Get the best value for your money with our competitively priced slippers"
    },
    {
        heading: "Customer Satisfaction Guaranteed",
        subtext: "We are committed to providing excellent customer service and high-quality products"
    },
    {
        heading: "Shop with Confidence",
        subtext: "Our secure payment options and hassle-free return policy ensure a worry-free shopping experience"
    }
];

let currentTextIndex = 0;
const heroHeadingElement = document.getElementById("heroHeading");
const heroSubtextElement = document.getElementById("heroSubtext");

// Initial text
heroHeadingElement.textContent = heroTexts[0].heading;
heroSubtextElement.textContent = heroTexts[0].subtext;

// Change hero text with fade effect
function changeHeroText() {
    // Fade out
    heroHeadingElement.style.opacity = 0;
    heroSubtextElement.style.opacity = 0;

    setTimeout(() => {
        currentTextIndex++;
        if (currentTextIndex >= heroTexts.length) currentTextIndex = 0;

        heroHeadingElement.textContent = heroTexts[currentTextIndex].heading;
        heroSubtextElement.textContent = heroTexts[currentTextIndex].subtext;

        // Fade in
        heroHeadingElement.style.opacity = 1;
        heroSubtextElement.style.opacity = 1;
    }, 500); // half-second fade
}

// Change text every 4 seconds
setInterval(changeHeroText, 4000);

// ---------------------- BUY NOW ----------------------
function buyNow(name, image) {
    const phone = "447588261010"; // Replace with your WhatsApp number
    const imageUrl = `${window.location.origin}/${image}`; 
    const message = `Hi! I want to buy the ${name} from your Collections.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// Initial display
displaySlippers();

// ---------------------- FILTER BUTTONS ----------------------
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const searchValue = document.getElementById("searchInput").value;
        displaySlippers(btn.getAttribute("data-category"), searchValue);
    });
});

// ---------------------- SEARCH INPUT ----------------------
document.getElementById("searchInput").addEventListener("input", function() {
    const searchValue = this.value;
    displaySlippers("all", searchValue);

});


