"use strict";

const grid = document.querySelector(".grid"); // container for etch a sketch grid

const gridSize = 16; // will change this later to be adjustable by user
const cellSize = "2rem";

grid.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize})`;
grid.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize})`;

for (let i = 0; i < gridSize ** 2; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  grid.appendChild(square);
}
