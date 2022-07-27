"use strict";

const grid = document.querySelector(".grid"); // container for etch a sketch grid

const gridSize = 16; // will change this later to be adjustable by user
const cellSize = "2rem";

// grid cells depend on grid size
// cell size based on root font-size
grid.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize})`;
grid.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize})`;

// add square to the grid
for (let i = 0; i < gridSize ** 2; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  grid.appendChild(square);
}

function fillSquare(e) {
  if (e.buttons === 1) e.target.classList.add("filled");
}

function eraseSquare(e) {
  e.target.classList.remove("filled");
}

document.querySelectorAll(".square").forEach((square) => {
  square.addEventListener("mousedown", fillSquare);
  square.addEventListener("mouseover", fillSquare);
});
