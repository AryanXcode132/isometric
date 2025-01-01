const pages = document.querySelectorAll(".page");
pages.forEach((page) => {
    const frontAndBacks = page.querySelectorAll(".front, .back");
    frontAndBacks.forEach((frontAndBack) => {
        frontAndBack.addEventListener('click', () => {
            turnPage(page); // Pass the index of the page
        });
    });
});

let currPage = 0;
const totalPages = 9; // Use the actual number of pages

function setZindex(target, zIndex) {
    setTimeout(() => {
        target.style.zIndex = zIndex;
    }, 1000);
}

function turnPage(target) {
    if (target.classList.contains('turned')) {
        setZindex(target, totalPages * 2 - --currPage); // Set zIndex based on current page
    } else {
        setZindex(target, currPage++); // Set zIndex based on current page
    }
    target.classList.toggle('turned');
    target.classList.toggle('unturned');
}

// Select the canvas element and set up its context
// Select the canvas element and set up its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to resize the canvas to cover the full page
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // Cover full page height
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize

// Array of neon colors for the shapes
const colors = ['#BF3F30', '#2FBF30', '#2F3FBF', '#BF9F30', '#6E2C91', '#BF3F3F', '#39FF14', '#FF6EC7', '#FFFF33', '#1B03A3', '#FF4500', '#9400D3', '#0FF0FC', '#FF073A'];

let shapes = []; // Initialize the shapes array

// Function to create a new shape
function createShape() {
    const shapeType = Math.random() < 0.5 ? 'circle' : 'rectangle'; // Randomly choose shape type
    const color = colors[Math.floor(Math.random() * colors.length)]; // Use neon colors
    const x = Math.random() * canvas.width; // Random x-position
    const y = 0; // Start from the top of the canvas
    const size = Math.random() * 50 + 10; // Random size between 10 and 60
    const dy = Math.random() * 2 + 1; // Move downward at a random speed

    shapes.push({ shapeType, color, x, y, size, dy });
}

// Create initial shapes
for (let i = 0; i < 10; i++) {
    createShape();
}

// Add new shapes every 5 seconds
setInterval(() => {
    for (let i = 0; i < 10; i++) { // Add 10 shapes every 5 seconds
        createShape();
    }
}, 5000);

// Function to draw and update shapes
function drawShapes() {
    // Remove shapes that have moved out of the canvas at the bottom
    shapes = shapes.filter((shape) => shape.y - shape.size < canvas.height);

    // Iterate through each shape and draw it
    shapes.forEach((shape) => {
        ctx.fillStyle = shape.color;

        // Add neon glow effect
        ctx.shadowColor = shape.color;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        if (shape.shapeType === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (shape.shapeType === 'rectangle') {
            ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        }

        // Move the shape downwards
        shape.y += shape.dy;
    });
}

// Function to draw neon lines
function drawNeonLines(offsetY) {
    const lineCount = 10; // Number of lines to draw
    const maxLineLength = 100; // Maximum line length

    for (let i = 0; i < lineCount; i++) {
        const color = `rgba(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200}, ${Math.abs(Math.sin(Date.now() / 1000 + i))})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.random() * 5 + 1;

        // Glow effect
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();

        const startX = Math.random() * canvas.width;
        const startY = offsetY + Math.random() * window.innerHeight;

        const endX = startX + (Math.random() * maxLineLength - maxLineLength / 2);
        const endY = startY + (Math.random() * maxLineLength - maxLineLength / 2);

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

// Animation loop
function animate() {
    // Clear the canvas before each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update neon lines
    const sections = Math.ceil(document.body.scrollHeight / window.innerHeight);
    for (let s = 0; s < sections; s++) {
        drawNeonLines(s * window.innerHeight);
    }

    // Draw and update shapes
    drawShapes();

    // Request the next frame for smooth animation
    requestAnimationFrame(animate);
}

// Start the animation
animate();
document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.querySelector('.logo-container');
    const numLogos = 6;  // Number of logos (changed from 3 to 5)
    const logos = [];

    // Create logos and add them to the page
    for (let i = 0; i < numLogos; i++) {
        const logo = document.createElement('img');
        logo.src = 'logo-removebg-preview.png';  // Path to your logo image
        logo.classList.add('logo');
        logoContainer.appendChild(logo);
        logos.push(logo);
        animateLogo(logo);  // Animate the logo
        
    }

    // Function to animate logos with random direction and speed
    function animateLogo(logo) {
        // Set the initial position and movement speed
        let x = Math.random() * window.innerWidth;  // Random horizontal start position
        let y = Math.random() * window.innerHeight;  // Random vertical start position
        let dx = (Math.random() - 0.5) * 4;  // Random horizontal speed (-2 to 2)
        let dy = (Math.random() - 0.5) * 4;  // Random vertical speed (-2 to 2)
        const logoWidth = logo.width;  // Get the logo's width
        const logoHeight = logo.height;  // Get the logo's height
        let angle = 0;  // Initialize the angle for continuous rotation

        function move() {
            // Update position
            x += dx;
            y += dy;

            // Bounce when hitting the vertical edges (left and right)
            if (x <= 0 || x + logoWidth >= window.innerWidth) {
                dx *= -1;  // Reverse the horizontal direction
            }

            // Bounce when hitting the top or bottom edges (vertical movement)
            if (y <= 0 || y + logoHeight >= window.innerHeight) {
                dy *= -1;  // Reverse the vertical direction
            }

            // Increment the angle for continuous rotation
            angle += 2;  // Adjust this value for rotation speed

            // Apply the new position and continuous rotation
            logo.style.left = `${x}px`;
            logo.style.top = `${y}px`;
            logo.style.transform = `rotate(${angle}deg)`;  // Continuous rotation

            // Call move again on next frame
            requestAnimationFrame(move);
        }

        // Start moving and rotating the logo
        move();
    }
});
