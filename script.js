"use strict";

// select html elements
const grid = document.querySelector(".grid"); // container for etch a sketch grid
const gridSizeDisplay = document.querySelector(".grid-size > p > span");
const gridSizeInput = document.querySelector(".grid-size > input");

const colorPicker = document.querySelector("input.color-picker");
const randomBtn = document.querySelector("button.random");
const shadingBtn = document.querySelector("button.shading");
const eraserBtn = document.querySelector("button.eraser");
const clearGridBtn = document.querySelector("button.clear");

let randomColors = false;
let shading = false;
let eraser = false;
let color = "rgb(0,0,0)";

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

// helper functions
function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${blue}, ${green})`;
}

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
    if (eraser) {
      e.target.style.opacity = "0";
    } else {
      if (randomColors) {
        e.target.style.backgroundColor = generateRandomColor();
      } else {
        e.target.style.backgroundColor = color;
      }

      if (shading) {
        const currentOpacity = +e.target.style.opacity;
        const newOpacity =
          currentOpacity + 0.1 > 1 ? 100 : currentOpacity + 0.1;
        e.target.style.opacity = `${newOpacity}`;
      } else {
        e.target.style.opacity = "1";
      }
    }
  }
}

function clearGrid() {
  document.querySelectorAll(".square").forEach((square) => {
    square.style.opacity = "0";
  });
}

function toggleRandom() {
  randomColors = !randomColors;
  randomBtn.classList.toggle("active");
}

function toggleShading() {
  shading = !shading;
  shadingBtn.classList.toggle("active");
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
randomBtn.addEventListener("click", toggleRandom);
shadingBtn.addEventListener("click", toggleShading);
eraserBtn.addEventListener("click", toggleEraser);
clearGridBtn.addEventListener("click", clearGrid);

// init
setGridSizeDisplay();
setGridSize();
addSquaresToGrid(defaultGridSize);
attachSquareEventListeners();
