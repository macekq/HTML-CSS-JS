/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect()

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

    speed: 3,
    movement:{
        up: false, down: false, left: false, right: false
    }
}
var CURSOR = {
    x: canvas.width/2, y: 0
}
function playerOrientation(){
    let X = CURSOR.x - rect.left, Y = CURSOR.y - rect.top

    X -= CINDERELLA.x
    Y -= CINDERELLA.y

    CINDERELLA.orientation = Math.atan2(Y, X) + Math.PI/2
}
window.addEventListener('mousemove', e => {
    CURSOR.x = e.clientX, CURSOR.y = e.clientY

    playerOrientation()
})

window.addEventListener('keydown', e => {

    switch(e.key.toLowerCase()){
        case 'a':
            CINDERELLA.movement.left = true
            break
        case 'd':
            CINDERELLA.movement.right = true
            break
        case 'w':
            CINDERELLA.movement.up = true
            break
        case 's':
            CINDERELLA.movement.down = true
            break
    }
})
window.addEventListener('keyup', e => {

    switch(e.key.toLowerCase()){
        case 'a':
            CINDERELLA.movement.left = false
            break
        case 'd':
            CINDERELLA.movement.right = false
            break
        case 'w':
            CINDERELLA.movement.up = false
            break
        case 's':
            CINDERELLA.movement.down = false
            break
    }
})

drawCinderella()

var shoulderRotation = 0
const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]
var shArrIndex = 0

var mainInterval = setInterval(() => {

    //pohyb hrace
    if(CINDERELLA.movement.left) CINDERELLA.x -= CINDERELLA.speed
    if(CINDERELLA.movement.right) CINDERELLA.x += CINDERELLA.speed
    if(CINDERELLA.movement.up) CINDERELLA.y -= CINDERELLA.speed
    if(CINDERELLA.movement.down) CINDERELLA.y += CINDERELLA.speed

    //rotace ramen
    if(CINDERELLA.movement.left || CINDERELLA.movement.right || CINDERELLA.movement.up || CINDERELLA.movement.down){
        shArrIndex += 0.7
    
    }else{
        if(shArr[Math.floor(shArrIndex)] != 0) shArrIndex++
    }
    shArrIndex %= shArr.length

    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCinderella(shArr[Math.floor(shArrIndex)])

    //kurzor
    customCursor(CURSOR.x, CURSOR.y)

    

}, 15);