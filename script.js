"use strict";

// select html elements
const grid = document.querySelector(".grid"); // container for etch a sketch grid
const gridSizeDisplay = document.querySelector(".grid-size > p > span");
const gridSizeInput = document.querySelector(".grid-size > input");

const clearGridBtn = document.querySelector("button.clear");

const gridDimension = "30rem";

const gridSizeMin = 2;
const gridSizeMax = 100;
const defaultGridSize = 16; // will change this later to be adjustable by user
const cellSize = "1fr";

// give grid a width and height
grid.style.width = gridDimension;
grid.style.height = gridDimension;

// set grid size option defaults
gridSizeInput.min = `${gridSizeMin}`;
gridSizeInput.max = `${gridSizeMax}`;
gridSizeInput.defaultValue = `${defaultGridSize}`;

// event listener callback functions
function addSquaresToGrid(size) {
  for (let i = 0; i < size ** 2; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
  }
}

function fillSquare(e) {
  if (e.buttons === 1) e.target.classList.add("filled");
}

function eraseSquare(e) {
  e.target.classList.remove("filled");
}

function clearGrid() {
  document.querySelectorAll(".square").forEach((square) => {
    square.classList.remove("filled");
  });
}

function setGridSize(e) {
  clearGrid();

  const size = +e?.target.value || defaultGridSize;
  grid.style.gridTemplateColumns = `repeat(${size}, ${cellSize})`;
  grid.style.gridTemplateRows = `repeat(${size}, ${cellSize})`;
  addSquaresToGrid(size);
  attachSquareEventListeners();
}

function setGridSizeDisplay(e) {
  const size = +e?.target.value || defaultGridSize;
  gridSizeDisplay.textContent = `${size} x ${size}`;
}

function attachSquareEventListeners() {
  document.querySelectorAll(".square").forEach((square) => {
    square.addEventListener("mousedown", fillSquare);
    square.addEventListener("mouseover", fillSquare);
  });
}

// add event listeners
gridSizeInput.addEventListener("change", setGridSize);
gridSizeInput.addEventListener("input", setGridSizeDisplay);

clearGridBtn.addEventListener("click", clearGrid);

// init
setGridSizeDisplay();
setGridSize();
addSquaresToGrid(defaultGridSize);
attachSquareEventListeners();
