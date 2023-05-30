const board = document.querySelector("#board");
const clearBtn = document.querySelector('#clear');
const slider = document.querySelector("#slider");
const valueText = document.querySelector("#sizeValue")
let mouseIsDown = false;

let size = slider.value;

clearBtn.onclick = () => clearGrid()

slider.addEventListener("input", function () {
    valueText.innerHTML = `${slider.value} x ${slider.value}`;
    size = slider.value;
    clearGrid();
})

function createBoard(size) {

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (i = 0; i <= size * size; i++) {
        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        board.appendChild(div);

        div.addEventListener("mousedown", function (event) {
            event.preventDefault();
            div.style.backgroundColor = 'red';
            mouseIsDown = true;
        })

        div.addEventListener("mouseover", function () {
            if (mouseIsDown) {
                div.style.backgroundColor = 'red';
            }
        })

        div.addEventListener("mouseup", function () {
            mouseIsDown = false;
        })
    }
}


document.addEventListener("mouseup", function () {
    mouseIsDown = false;
});

function clearGrid() {
    board.innerHTML = ''
    createBoard(size);
}


window.onload = () => {
    createBoard(size);
}