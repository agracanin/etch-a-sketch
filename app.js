const board = document.querySelector("#board");
const clearBtn = document.querySelector('#clear');
const slider = document.querySelector("#slider");
const valueText = document.querySelector("#sizeValue");
const colorPicker = document.querySelector("#color");
const optionBtns = document.querySelectorAll(".options-btn");


let mouseIsDown = false;

document.body.onmousedown = () => (mouseIsDown = true)
document.body.onmouseup = () => (mouseIsDown = false)

let size = slider.value;
let color = colorPicker.value;
let mode = "color";

clearBtn.onclick = () => clearGrid()

colorPicker.addEventListener("input", () => {
    color = colorPicker.value;
})

slider.addEventListener("input", () => {
    valueText.innerHTML = `${slider.value} x ${slider.value}`;
    size = slider.value;
    clearGrid();
})

optionBtns.forEach(function (button) {
    button.addEventListener('click', function () {
        optionBtns.forEach(function (btn) {
            btn.classList.remove('active');
        });

        this.classList.add('active');
        mode = this.id;
    });
});


function createBoard(size) {

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (i = 0; i <= size * size; i++) {
        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        board.appendChild(div);
        div.addEventListener("mouseover", changeColor)
        div.addEventListener("mousedown", changeColor);
        div.addEventListener("touchstart", changeColor);
        div.addEventListener("touchmove", changeColor);
        div.addEventListener("mousedown", (e) => e.preventDefault());
        div.addEventListener("touchstart", (e) => e.preventDefault());
        div.addEventListener("touchmove", (e) => e.preventDefault());
    }
}

function changeColor(e) {
    if (e.type === "mouseover" && !mouseIsDown) {
        return
    }
    if (mode === "color") {
        e.target.style.backgroundColor = color;
    } else if (mode === "rainbow") {
        const randR = Math.floor(Math.random() * 256)
        const randG = Math.floor(Math.random() * 256)
        const randB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`
    } else if (mode === "eraser") {
        e.target.style.backgroundColor = "white";
    }
}

function clearGrid() {
    board.innerHTML = ''
    createBoard(size);
}


window.onload = () => {
    createBoard(size);
}