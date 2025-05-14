const sandbox = document.getElementById("sandbox");
const generateBtn = document.getElementById("generateGridBtn");
const startBtn = document.getElementById("startSimBtn");
const sizeRange = document.getElementById("sizeRange");
const resetBtn = document.getElementById("resetBtn");
let gridSize = 50;
let grid = [];
let simulationRunning = false;

generateGrid(gridSize);

// cell drawing funcionality
let isMouseDown = false;

sandbox.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("cell")) {
    isMouseDown = true;
  }
});

sandbox.addEventListener("mousemove", (e) => {
  if (isMouseDown && e.target.classList.contains("cell")) {
    toggleCell(e.target);
  }
});

sandbox.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Update the cell's click event handler
function generateGrid(size) {
  // ...
  cell.addEventListener("click", () => {
    if (!isMouseDown) {
      cell.setAttribute("alive", cell.getAttribute("alive") === "true" ? "false" : "true");
    }
  });
  // ...
}

function toggleCell(cell) {
  cell.setAttribute("alive", cell.getAttribute("alive") === "true" ? "false" : "true");
}

generateBtn.addEventListener("click", () => {
  gridSize = sizeRange.value;
  generateGrid(gridSize);
});

startBtn.addEventListener("click", () => {
    if (!simulationRunning) {
      simulationRunning = true;
      startBtn.textContent = "Stop Simulation";
      getNextFrame(gridSize);
    } else {
      simulationRunning = false;
      startBtn.textContent = "Start Simulation";
    }
});

resetBtn.addEventListener("click", () => {
    simulationRunning = false;
    startBtn.textContent = "Start Simulation";
    generateGrid(gridSize);
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
      cell.addEventListener("click", () => {
        cell.setAttribute("alive", cell.getAttribute("alive") === "true" ? "false" : "true");
      });

      row.appendChild(cell);
      grid[i][j] = cell; // store cell in array
    }

    sandbox.appendChild(row);
  }
}

function getNextFrame(gridSize) {
  if (!simulationRunning) return;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[i][j];
      const alive = cell.getAttribute("alive") === "true";
      const neighbors = countNeighbors(cell);
      if (alive && (neighbors < 2 || neighbors > 3)) {
        cell.setAttribute("alive", "false");
      } else if (!alive && neighbors === 3) {
        cell.setAttribute("alive", "true");
      }
    }
  }

  setTimeout(() => getNextFrame(gridSize), 500);
}

function countNeighbors(cell) {
  let id = cell.id.split("_").map(Number);
  let [row, col] = id;
  let neighborOffsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  let count = 0;

  neighborOffsets.forEach(([rowOffset, colOffset]) => {
    let neighborRow = row + rowOffset;
    let neighborCol = col + colOffset;

    if (neighborRow >= 0 && neighborRow < grid.length &&
      neighborCol >= 0 && neighborCol < grid[0].length) {
      let neighborCell = grid[neighborRow][neighborCol];
      if (neighborCell.getAttribute("alive") === "true") {
        count++;
      }
    }
  });

  return count;
}