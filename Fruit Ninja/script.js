const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let fruits = [];
let score = 0;

function getRandomFruit() {
    const fruits = ['🍎', '🍌', '🍉', '🍇', '🍓'];
    return fruits[Math.floor(Math.random() * fruits.length)];
}

function spawnFruit() {
    const fruit = {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        speed: Math.random() * 3 + 2,
        emoji: getRandomFruit()
    };
    fruits.push(fruit);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the colorful background
    ctx.fillStyle = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    ctx.fillStyle.addColorStop(0, '#f06');
    ctx.fillStyle.addColorStop(1, '#ffba08');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];
        fruit.y -= fruit.speed;
        ctx.font = '30px Arial';
        ctx.fillText(fruit.emoji, fruit.x, fruit.y);
    }

    fruits = fruits.filter(fruit => fruit.y > -20);

    requestAnimationFrame(update);
}

canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];
        const fruitWidth = 30;
        const fruitHeight = 30;
        if (mouseX > fruit.x && mouseX < fruit.x + fruitWidth &&
            mouseY > fruit.y && mouseY < fruit.y + fruitHeight) {
            fruits.splice(i, 1);
            score += 1;
            document.title = `Score: ${score}`;
            break;
        }
    }
});

setInterval(spawnFruit, 1000);
update();
