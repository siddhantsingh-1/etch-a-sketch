const slider = document.querySelector('.slider');
const output = document.getElementById('dimensions');
const grid = document.querySelector('.grid-container');
const randomButton = document.querySelector('.random');
const colorPicker = document.getElementById('color-input');
const clearButtonElement = document.querySelector('.clear');
const eraserButtonElement = document.querySelector('.eraser');

slider.oninput = function() {
    output.textContent = `${this.value} x ${this.value}`;
}

//Random Color Generator
function random(number) {
    return Math.floor(Math.random()*(number+1));
}

function randomBackground(e) {
    let rdmColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    e.target.style.backgroundColor = rdmColor;
}

function stillBackground(e) {
    const colorPicker = document.getElementById('color-input');
    const colorValue = colorPicker.value;
    let stillColor = `${colorValue}`;
    e.target.style.backgroundColor = stillColor;
}

function eraserBackground(e) {
    e.target.style.backgroundColor = "#fff";
}

function randomDrawingEffect() {
    const divs = document.querySelectorAll('.grid-item');

    //Removing any previous event listeners
    divs.forEach(div => {
        div.removeEventListener('mouseover', stillBackground);
        div.removeEventListener('mouseover', eraserBackground);
    })

    //Creating the drawing board effect
    divs.forEach(div => {
        div.addEventListener('mouseover', randomBackground);
    });
}

function stillDrawingEffect(){
    const divs = document.querySelectorAll('.grid-item');

    //Removing any previous event listeners
    divs.forEach(div => {
        div.removeEventListener('mouseover', randomBackground);
        div.removeEventListener('mouseover', eraserBackground);
    });

    //Creating the drawing board effect
    divs.forEach(div => {
        div.addEventListener('mouseover', stillBackground);
    });
}

function eraserEffect() {
    const divs = document.querySelectorAll('.grid-item');

    //Removing any previous event listeners
    divs.forEach(div => {
        div.removeEventListener('mouseover', randomBackground);
        div.removeEventListener('mouseover', stillBackground);
    });

    //Creating the drawing board effect
    divs.forEach(div => {
        div.addEventListener('mouseover', eraserBackground);
    });
}

function clearGrid() {
    const divs = document.querySelectorAll('.grid-item');
    divs.forEach(div => {
        div.style.backgroundColor = '#fff';
    })
}

window.addEventListener('load', (event) => {
    slider.value = 16;
    let sliderVal = slider.value;
    output.textContent = `${slider.value} x ${slider.value}`;
    grid.style.gridTemplate = `repeat(${sliderVal}, 1fr) / repeat(${sliderVal}, 1fr)`;

    for(let i = 0; i <= sliderVal**2; i++) {
        let div = document.createElement('div');
        div.classList.add('grid-item');
        div.style.backgroundColor = "#fff";
        grid.appendChild(div);
    }

    randomDrawingEffect();
});

function changeGrid(e) {
    let sliderVal = slider.value;
    grid.style.gridTemplate = `repeat(${sliderVal}, 1fr) / repeat(${sliderVal}, 1fr)`;

    for(let i = 0; i <= sliderVal**2; i++) {
        let div = document.createElement('div');
        div.classList.add('grid-item');
        div.style.backgroundColor = "#fff";
        let grid = document.querySelector('.grid-container');
        grid.appendChild(div);
    }

    randomDrawingEffect();
    clearGrid();
}

slider.addEventListener('input', changeGrid);
randomButton.addEventListener('click', randomDrawingEffect);
colorPicker.addEventListener('mouseup', stillDrawingEffect);
clearButtonElement.addEventListener('click', clearGrid);
eraserButtonElement.addEventListener('click', eraserEffect);