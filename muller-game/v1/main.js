/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect()

var GOBLINS = {
    speed: 1,
    
    1:{
        x: 200, y: 200,
        shIndex: 3,
        atack: 0
    },
    2:{
        x: 200, y:600,
        shIndex: 0,
        atack: 0
    },
    3:{
        x: 200, y: 1000,
        shIndex: 9,
        atack: 0
    }
}
var PLAYER = {
    x: window.innerWidth/2, y: window.innerHeight/2,
    orientation: 0,
    hair: 'rgb(200,200,200)',
    body: 'rgb(120,60,0)',
    movement: {
        up: false, down: false,
        left: false, right: false
    },
    speed: 2
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
function playerOrientation(userX, userY){
    let X = userX - rect.left, Y = userY - rect.top

    X -= PLAYER.x
    Y -= PLAYER.y

    PLAYER.orientation = Math.atan2(Y, X) + Math.PI/2
}
function determineOrientation(x1, y1, x2, y2){
    let X = x1 - rect.left, Y = y1 - rect.top

    X -= x2
    Y -= y2

    return Math.atan2(Y, X) + Math.PI/2
}

drawCharacter(0)

window.addEventListener('resize', canvasWindowRatio)
window.addEventListener('mousemove', e => {
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
        shArrIndex += 0.7
    
    }else{
        if(shArr[Math.floor(shArrIndex)] != 0) shArrIndex++
    }
    shArrIndex %= shArr.length
        
    shoulderRotation = shArr[Math.floor(shArrIndex)]
    
    playerOrientation(CURSOR.x, CURSOR.y)
    drawCharacter(shoulderRotation)

    for(let i = 1; i<=3; i++){
        
        GOBLINS[i].orientation = determineOrientation(GOBLINS[i].x, GOBLINS[i].y, PLAYER.x, PLAYER.y)

        let toAddX = Math.sin(GOBLINS[i].orientation) * GOBLINS.speed
        let toAddY = Math.cos(GOBLINS[i].orientation) * GOBLINS.speed

        GOBLINS[i].x -= toAddX, GOBLINS[i].y += toAddY
        
        GOBLINS[i].shIndex += 0.7
        GOBLINS[i].shIndex %= shArr.length

        displayGoblin(
            GOBLINS[i].x, GOBLINS[i].y, GOBLINS[i].orientation, shArr[Math.floor(GOBLINS[i].shIndex)], 0
        )
    
    }

    customCursor(CURSOR.x, CURSOR.y)
},15)

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
