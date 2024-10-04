/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})



var CINDERELLA = {
    x: canvas.width/2, y: canvas.height/2,
    health: 100,
    orientation: 0,
}
var CURSOR = {
    x: canvas.width/2, y: 0
}
function playerOrientation(){
    let X = CURSOR.x - rect.left, Y = CURSOR.y - rect.top

    X -= CINDERELLA.x
    Y -= CINDERELLA.y

    return Math.atan2(Y, X) + Math.PI/2
}
window.addEventListener('mousemove', e => {
    CURSOR.x = e.clientX, CURSOR.y = e.clientY

    playerOrientation()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawCinderella()
})
drawCinderella()