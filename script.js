const grid = document.getElementById('puzzle-grid');
const message = document.getElementById('message');
let tiles = [];

// Create the initial tiles configuration
function createTiles() {
    for (let i = 1; i <= 8; i++) {
        tiles.push({ order: i, pos: null });
    }
    tiles.push({ order: null, pos: null }); // Blank tile
}

// Set the background image for each tile
function setTileBackground() {
    const imageUrl = 'https://i.postimg.cc/HnS45zCm/Nobita-And-Shizuka-Drawing.jpg';
    const tileWidth = 100;
    const tileHeight = 100;

    for (let i = 0; i < 8; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        tiles[i].pos = `-${col * tileWidth}px -${row * tileHeight}px`;
    }
}

// Shuffle the tiles
function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

// Render the tiles into the grid
function renderGrid() {
    grid.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');

        if (tile.order === null) {
            tileElement.classList.add('blank');
        } else {
            tileElement.style.backgroundImage = `url('https://i.postimg.cc/HnS45zCm/Nobita-And-Shizuka-Drawing.jpg')`;
            tileElement.style.backgroundSize = '300px 300px';
            tileElement.style.backgroundPosition = tile.pos;
            tileElement.dataset.index = index;
            addClickListeners(tileElement);
        }
        grid.appendChild(tileElement);
    });
}

// Handle click to move tiles
function addClickListeners(tileElement) {
    tileElement.addEventListener('click', () => handleMove(tileElement));
    tileElement.addEventListener('touchstart', (event) => {
        event.preventDefault();
        handleMove(tileElement);
    });
}

// Move the tile if adjacent to the blank space
function handleMove(tileElement) {
    const index = parseInt(tileElement.dataset.index);
    const blankIndex = tiles.findIndex(tile => tile.order === null);
    if (isValidMove(index, blankIndex)) {
        [tiles[index], tiles[blankIndex]] = [tiles[blankIndex], tiles[index]];
        renderGrid();
        checkWin();
    }
}

// Validate if the move is possible (adjacent to blank space)
function isValidMove(index, blankIndex) {
    const validMoves = [index - 1, index + 1, index - 3, index + 3];
    if (index % 3 === 0 && blankIndex === index - 1) return false;
    if (index % 3 === 2 && blankIndex === index + 1) return false;
    return validMoves.includes(blankIndex);
}

// Check if the puzzle is solved
function checkWin() {
    const isSolved = tiles.slice(0, 8).every((tile, index) => tile.order === index + 1);
    if (isSolved) {
        message.innerText = "Congratulations! You've solved the puzzle!";
    } else {
        message.innerText = '';
    }
}

// Shuffle button functionality
document.getElementById('shuffle-button').addEventListener('click', () => {
    shuffleTiles();
    renderGrid();
    message.innerText = '';
});

// Initialize tiles and render
createTiles();
setTileBackground();
shuffleTiles();
renderGrid();

