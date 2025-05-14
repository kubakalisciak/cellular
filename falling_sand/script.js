const sandbox = document.getElementById("sandbox");
const sizeRange = document.getElementById("sizeRange");
const generateBtn = document.getElementById("generateGridBtn");
const accentInput = document.getElementById("accentInput");
const accentButton = document.getElementById("accentButton");

let grid = [];

generateBtn.addEventListener("click", () => { 
    let gridSize = sizeRange.value;
    generateGrid(gridSize);
});

accentButton.addEventListener("click", () => {
    let accent = accentInput.value;
    document.documentElement.style.setProperty('--accent', accent);
});

function generateGrid(size) {
    sandbox.innerHTML = "";
    sandbox.style.setProperty('--size', size);
    grid = []; // reset the grid
  
    for (let i = 0; i < size; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      grid[i] = []; // make a new row in JS array
  
      for (let j = 0; j < size; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${i}_${j}`;
        cell.setAttribute("alive", false);
  
        // Add the toggle behavior
        cell.addEventListener("mouseover", () => {
          const current = cell.getAttribute("alive") === "true";
          cell.setAttribute("alive", !current);
        });
  
        row.appendChild(cell);
        grid[i][j] = cell; // store cell in array
      }
  
      sandbox.appendChild(row);
    }
  
    simulateGravity(size);
  }

  function simulateGravity(gridSize) {
    for (let i = gridSize - 2; i >= 0; i--) {
      for (let j = 0; j < gridSize; j++) {
        const cell = grid[i][j];
        if (cell.getAttribute("alive") === "true") {
          const below = grid[i + 1][j];
          if (below.getAttribute("alive") === "false") {
            below.setAttribute("alive", true);
            cell.setAttribute("alive", false);
          }
        }
      }
    }
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[gridSize - 1][j];
      if (cell.getAttribute("alive") === "true") {
        setTimeout(() => {
          cell.setAttribute("alive", false);
        }, 1000);
      }
    }
  
    setTimeout(() => simulateGravity(gridSize), 30);
}

generateGrid(50);