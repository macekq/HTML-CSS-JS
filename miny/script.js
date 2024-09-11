/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var TABLE = {
    size: 0
}

function makeTable(){
    
    TABLE.size = parseInt(document.getElementById('fieldSize').value)

    
}