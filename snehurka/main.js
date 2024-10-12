/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect()
const colors = ['#99ccff','#00cc66','#ff9933','#333399','#9900cc','#ffcc66']
const health = document.getElementById('health')

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
var OPS = {
    damage: 1,
    speed: 1,
    all:[]
}
var CURSOR = {
    x: canvas.width/2, y: 0
}
var APPLE = {
    x: 0, y: 0,
    orientation: 10,
    ready: true,
    speed: 0
}
function playerOrientation(){
    let X = CURSOR.x - rect.left, Y = CURSOR.y - rect.top

    X -= CINDERELLA.x
    Y -= CINDERELLA.y

    CINDERELLA.orientation = Math.atan2(Y, X) + Math.PI/2
}
function determineOrientation(x1, y1, x2, y2){
    let X = x1 - rect.left, Y = y1 - rect.top

    X -= x2
    Y -= y2

    return Math.atan2(Y, X) + Math.PI/2
}
function displayDwarfs(){

    for(let i of OPS.all){
        
        try{
            OPS[i].orientation = determineOrientation(OPS[i].x, OPS[i].y, CINDERELLA.x, CINDERELLA.y)
            drawOp(OPS[i].x, OPS[i].y, OPS[i].orientation, OPS[i].health, shArr[Math.floor(OPS[i].shIndex)], OPS[i].shirtColor, OPS[i].hatColor)        
        }catch(error){}
    }
}
function createOp(X, Y){

    let id = 0
    while(OPS.all.includes(id)) id = Math.floor(Math.random()*1000)

    OPS.all.push(id)

    OPS[id] = {
        x: X, y: Y,
        shIndex: Math.floor(Math.random()*shArr.length),
        orientation: determineOrientation(X, Y, CINDERELLA.x, CINDERELLA.y),
        health: 100,

        speed: Math.random()*1.2 + 0.4,
        shirtColor: colors[Math.floor(Math.random()*colors.length)],
        hatColor: colors[Math.floor(Math.random()*colors.length)]
    }

}
function handleDwarfs(){

    for(let i of OPS.all){

        if(OPS[i].x > CINDERELLA.x - 20 && OPS[i].x < CINDERELLA.x + 20 && OPS[i].y > CINDERELLA.y - 20 && OPS[i].y < CINDERELLA.y + 20){
        
            if(CINDERELLA.health>0) CINDERELLA.health -= OPS.damage

        }else{
            let addX = Math.sin(OPS[i].orientation)*OPS[i].speed
            let addY = Math.cos(OPS[i].orientation)*OPS[i].speed
            
            OPS[i].x -= addX, OPS[i].y += addY
        }

        OPS[i].shIndex += 0.5
        OPS[i].shIndex %= shArr.length
    }
}
function startAppleMovement(destX, destY){

    APPLE.ready = false
    APPLE.x = CINDERELLA.x, APPLE.y = CINDERELLA.y
    APPLE.speed = 10
    APPLE.orientation = 5
    let Cx = CINDERELLA.x, Cy = CINDERELLA.y
    let end = false


    angle = Math.atan((CINDERELLA.y - destY)/(CINDERELLA.x - destX))
    if(angle<0) angle *= -1
    console.log(angle)

    let appleIntr = setInterval(() => {
        
        let addX = Math.cos(angle)*APPLE.speed
        let addY = Math.sin(angle)*APPLE.speed

        if(Cx < destX) APPLE.x += addX
        else APPLE.x -= addX

        if(Cy < destY) APPLE.y += addY
        else APPLE.y -= addY

        APPLE.speed *= 0.95
        APPLE.orientation *= 0.99

        if(APPLE.speed<0.3){
            APPLE.ready = true
            clearInterval(appleIntr)
        }
        if(end){
            
        }

    }, 15)

}
window.addEventListener('mousemove', e => {
    CURSOR.x = e.clientX, CURSOR.y = e.clientY
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
window.addEventListener('mousedown', e => {
    if(e.button == 0 && APPLE.ready){
        startAppleMovement(e.clientX, e.clientY)
    }
    console.log(e.clientX - 200, e.clientY - 200)
})
window.addEventListener('mouseup', e =>{
    console.log(e.clientX - 200, e.clientY - 200)
})

drawCinderella()

var shoulderRotation = 0
const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]
var shArrIndex = 0

for(let i = 0; i<5; i++){
    createOp(100*(i+1), 200)
}

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
    //aktualizovat zivoty
    health.style.width = `${CINDERELLA.health}%`
    health.innerText = `${CINDERELLA.health}hp`


    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    playerOrientation()
    drawCinderella(shArr[Math.floor(shArrIndex)])

    displayDwarfs()
    handleDwarfs()
    
    drawExplodedApple(200,200,0)
    drawExplodingApple2(500,200,0)

    if(!APPLE.ready) drawApple(APPLE.x, APPLE.y, APPLE.orientation)
    //kurzor
    customCursor(CURSOR.x, CURSOR.y)

}, 15);