"use strict";

// select html elements
const grid = document.querySelector(".grid"); // container for etch a sketch grid
const gridSizeDisplay = document.querySelector(".grid-size > p > span");
const gridSizeInput = document.querySelector(".grid-size > input");

const colorPicker = document.querySelector("input.color-picker");
const eraserBtn = document.querySelector("button.eraser");
const clearGridBtn = document.querySelector("button.clear");

let eraser = false;
let color = "#000";

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
  if (e.buttons === 1) {
    eraser
      ? (e.target.style.backgroundColor = "#fff")
      : (e.target.style.backgroundColor = color);
  }
}

function clearGrid() {
  document.querySelectorAll(".square").forEach((square) => {
    square.style.backgroundColor = "#fff";
  });
}

function toggleEraser() {
  eraser = !eraser;
  eraserBtn.classList.toggle("active");
}

function changeColor(e) {
  color = e.target.value;
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

colorPicker.addEventListener("change", changeColor);
eraserBtn.addEventListener("click", toggleEraser);
clearGridBtn.addEventListener("click", clearGrid);

// init
setGridSizeDisplay();
setGridSize();
addSquaresToGrid(defaultGridSize);
attachSquareEventListeners();
