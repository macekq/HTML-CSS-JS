/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var PLAYER = {
    x: 300, y: 300,
    orientation: 0,
    hair: 'rgb(200,200,200)',
    body: 'rgb(120,60,0)',
    movement: {
        up: false, down: false,
        left: false, right: false
    },
    speed: 4
}
var CURSOR = {
    x: -50, y: -50
}
const canvasWindowRatio = () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
}
canvasWindowRatio()

function drawCharacter(addedMovement){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.save()
    ctx.translate(PLAYER.x, PLAYER.y)
    ctx.rotate(PLAYER.orientation + addedMovement)

    ctx.fillStyle = PLAYER.body
    ctx.strokeStyle = 'black'
    ctx.fillRect(-96/2, -24/2, 96, 24)
    ctx.strokeRect(-96/2, -24/2, 96, 24)

    ctx.restore()

    ctx.save()
    ctx.translate(PLAYER.x, PLAYER.y)
    ctx.rotate(PLAYER.orientation)
    
    ctx.fillStyle = PLAYER.hair
    ctx.strokeStyle = 'black'
    ctx.fillRect(-48/2, -48/2, 48, 48)
    
    ctx.fillStyle = 'rgb(80,80,80)'
    ctx.fillRect(-48/2, -48/2 + 20, 48, 28)
    ctx.fillRect(-48/2 + 16, -48/2 + 8, 16, 40)
    
    ctx.strokeRect(-48/2, -48/2, 48, 48)

    ctx.restore()
}
function customCursor(X, Y){

    ctx.save()
    ctx.translate(X, Y)

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'

    for(let i = 0; i<4; i++){

        ctx.rotate(i*Math.PI/2)

        ctx.fillRect(5,-2, 16, 5)
        ctx.strokeRect(5, -2, 16, 5)
    }

    ctx.restore()

}
drawCharacter(0)

window.addEventListener('resize', canvasWindowRatio)
window.addEventListener('mousemove', e => {
    
    const rect = canvas.getBoundingClientRect()
    let X = e.clientX - rect.left, Y = e.clientY - rect.top

    X -= PLAYER.x
    Y -= PLAYER.y

    PLAYER.orientation = Math.atan2(Y, X) + Math.PI/2

    CURSOR.x = e.clientX, CURSOR.y = e.clientY
})
window.addEventListener('keydown', e => {

    switch(e.key.toLowerCase()){
        case 'a':
            PLAYER.movement.left = true
            break
        case 'd':
            PLAYER.movement.right = true
            break
        case 'w':
            PLAYER.movement.up = true
            break
        case 's':
            PLAYER.movement.down = true
            break
    }
})
window.addEventListener('keyup', e => {

    switch(e.key.toLowerCase()){
        case 'a':
            PLAYER.movement.left = false
            break
        case 'd':
            PLAYER.movement.right = false
            break
        case 'w':
            PLAYER.movement.up = false
            break
        case 's':
            PLAYER.movement.down = false
            break
    }
})

var shoulderRotation = 0
const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]
var shArrIndex = 0
var mainInterval = setInterval(() => {
    
    if(PLAYER.movement.left) PLAYER.x -= PLAYER.speed
    if(PLAYER.movement.right) PLAYER.x += PLAYER.speed
    if(PLAYER.movement.up) PLAYER.y -= PLAYER.speed
    if(PLAYER.movement.down) PLAYER.y += PLAYER.speed

    
    if(PLAYER.movement.left || PLAYER.movement.right || PLAYER.movement.up || PLAYER.movement.down){
        shArrIndex++
    
    }else{
        if(shArr[shArrIndex] != 0) shArrIndex++
    }
    shArrIndex %= shArr.length
        
    shoulderRotation = shArr[shArrIndex]
        
    drawCharacter(shoulderRotation)
    customCursor(CURSOR.x, CURSOR.y)
},16)