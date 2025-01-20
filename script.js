// background animation

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
const fontSizes = [16, 20, 24, 28, 32]
const lineMax = 12;
let lineCount = 0;
const squareMax = 5;
let animationContainer = document.getElementById("animation-container");
let windowWidth = animationContainer.offsetWidth;
let windowHeight = animationContainer.offsetHeight;
let currentLefts = [];

//starts animation
function startAnimation() {
    background_matrix();
    setInterval(() => {
        changeLetter();
    }, 400);
    setInterval(() => {
        changeHeight();
    }, 1200);
}

// gets random number
function getRandom(length) {
    return Math.floor(Math.random() * length)
}

//creates single matrix line every 3 seconds
function background_matrix(){
    //check line count limit
    if (lineCount < lineMax) {
        let randomSize = fontSizes[getRandom(fontSizes.length)];
        let randomLeft = getRandomLeft();
        createLine(randomLeft, randomSize);
        lineCount ++;
    }
    setTimeout(background_matrix, 3000);
}

//matrix line logic
function createLine(leftPosition, size){
    //create & style line
    this.leftPosition = leftPosition;
    this.size = size;
    let zIndex = (size/4) - 8;
    let top = -(size * 6) - 10;
    let matrixLine = document.createElement("div");
    matrixLine.classList.add("matrix-line");
    matrixLine.style.top = top +"px";
    matrixLine.style.left = leftPosition + "%";
    matrixLine.style.fontSize = size + "px";
    matrixLine.style.zIndex = zIndex;

    //make squares
    for (let squareCount = 0; squareCount < squareMax; squareCount++) {
        createSquare(matrixLine);
    }
    animationContainer.appendChild(matrixLine);
}

//square logic
function createSquare(parentElement) {
    //create element
    let lineBox = document.createElement("div");
    lineBox.classList.add("matrix-line-box");

    //get random letter for box
    let randomChar = chars[getRandom(chars.length)];
    lineBox.textContent = randomChar;
    parentElement.appendChild(lineBox);
}

//change letter logic
function changeLetter() {
    let boxes = document.querySelectorAll(".matrix-line-box");
    boxes.forEach(box => {
        box.textContent = chars[getRandom(chars.length)];
    });    
}


//avoid overlap logic
function getRandomLeft() {
    let left = getRandom(19) * 5;
    let leftInArr = currentLefts.indexOf(left) !== -1;
    while (leftInArr) {
        left += 5;
        left %= 100;
        leftInArr = currentLefts.indexOf(left) !== -1;
    }
    currentLefts.push(left);
    return left;
}


//change height logic
function changeHeight() {
    let lines = document.querySelectorAll(".matrix-line");
    lines.forEach(line => {
        let moveSpeed = Number(line.style.fontSize.slice(0, -2));
        let lineTop = Number(line.style.top.slice(0, -2));

        //if out of frame, delete line
        if (lineTop < windowHeight) {
            //lower element
            lineTop += moveSpeed;
            lineTop += "px";
            line.style.top = lineTop;
        } else {
            //remove left value from array
            let lineLeft = Number(line.style.left.slice(0, -1));
            let leftIndex = currentLefts.indexOf(lineLeft);
            currentLefts.splice(leftIndex, 1);

            //remove line
            line.remove();
            lineCount -= 1;
        } 
    });
}




//------------- Start Animation----------

startAnimation();
