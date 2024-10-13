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
var bulletIntrv, realoadIntrv
var CINDERELLA = {
    x: canvas.width/2, y: canvas.height/2,
    health: 100,
    orientation: 0,
    amo: 30,

    speed: 3,
    movement:{
        up: false, down: false, left: false, right: false
    }
}
var OPS = {
    damage: 1,
    all:[]
}
var CURSOR = {
    x: canvas.width/2, y: -100
}
var APPLE = {
    x: 0, y: 0,
    orientation: 10,
    display: false,
    ready: true,
    speed: 0,
    frames: 0,
    damage: 50,
    knocback: 5
}
var BULLETS = {
    damage: 10,
    speed: 10,
    ready: true,
    active: false,
    all:[]
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

        speed: Math.random()*0.8 + 0.8,
        shirtColor: colors[Math.floor(Math.random()*colors.length)],
        hatColor: colors[Math.floor(Math.random()*colors.length)]
    }

}
function createBullet(){

    let id = 0
    while(BULLETS.all.includes(id)) id = Math.floor(Math.random()*1000)

    BULLETS.all.push(id)

    BULLETS[id] = {
        x: CINDERELLA.x, y: CINDERELLA.y, 
        orientation: CINDERELLA.orientation - Math.PI/2 - 0.1 + Math.random()*0.2
    }
}
function handleBullets(){

    for(let id of BULLETS.all){

        BULLETS[id].x += Math.cos(BULLETS[id].orientation)*BULLETS.speed
        BULLETS[id].y += Math.sin(BULLETS[id].orientation)*BULLETS.speed

        if(BULLETS[id].x < -50 || BULLETS[id].x > canvas.width +50 || BULLETS[id].y < -50 || BULLETS[id].y > canvas.height +50){

            BULLETS.all.splice(BULLETS.all.indexOf(id), 1)
            BULLETS[id] = undefined
        }else{
        
            drawBullet(BULLETS[id].x, BULLETS[id].y, BULLETS[id].orientation + Math.PI/2)
            
            for(let i of OPS.all){
                try{
                    if(BULLETS[id].x > OPS[i].x - 20 && BULLETS[id].x < OPS[i].x + 20 &&
                        BULLETS[id].y > OPS[i].y - 20 && BULLETS[id].y < OPS[i].y + 20){

                            BULLETS.all.splice(BULLETS.all.indexOf(id), 1)
                            BULLETS[id] = undefined

                            OPS[i].health -= BULLETS.damage
                    }
                }catch(error){}
            }
        }
    }
}
function handleDwarfs(){

    for(let i of OPS.all){

        if(OPS[i].health <= 0){

            killedOps++
            OPS.all.splice(OPS.all.indexOf(i), 1)
            OPS[i] = undefined

        }else{
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
}
function startAppleMovement(destX, destY){

    APPLE.ready = false
    APPLE.display = true

    APPLE.x = CINDERELLA.x, APPLE.y = CINDERELLA.y
    APPLE.speed = 10
    APPLE.orientation = 5

    let Cx = CINDERELLA.x, Cy = CINDERELLA.y

    angle = Math.atan((CINDERELLA.y - destY)/(CINDERELLA.x - destX))
    if(angle<0) angle *= -1

    setInterval(() => {
        APPLE.ready = true
    }, 2000)

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
            APPLE.display = false
            clearInterval(appleIntr)

            APPLE.frames = 1
        }

    }, 15)

}
function handleExplosion(){

    if(APPLE.frames > 10){

        drawExplodedApple(APPLE.x, APPLE.y, Math.random()*1)

        for(let i of OPS.all){
            if(OPS[i].x > APPLE.x - 75 && OPS[i].x < APPLE.x + 75 &&
                OPS[i].y > APPLE.y - 75 && OPS[i].y < APPLE.y +75){

                    OPS[i].health -= APPLE.damage
                    
                    let X = OPS[i].x - APPLE.x, Y = OPS[i].y - APPLE.y
                    if(X<0)X*=-1
                    if(Y<0)Y*=-1

                    let distace = Math.sqrt(X*X + Y*Y)
                    let ratio = (distace + APPLE.knocback)/distace

                    X *= ratio, Y *= ratio
                    if(OPS[i].x > APPLE.x) OPS[i].x += X
                    else OPS[i].x -= X

                    if(OPS[i].y > APPLE.y) OPS[i].y += Y
                    else OPS[i].y -= Y
                }
        }

    }else if(APPLE.frames > 0){

        drawExplodingApple2(APPLE.x, APPLE.y, Math.random()*1)

    }

    if(APPLE.frames<=15 && APPLE.frames>0) APPLE.frames++
    else if(APPLE.frames>15) APPLE.frames = 0
}
function spawnOp(){

    let X, Y
    switch(Math.floor(Math.random()*4)){
        case 0:
            X = Math.floor(Math.random()*canvas.width)
            Y = canvas.height + 100
            break
        case 1:
            X = Math.floor(Math.random()*canvas.width)
            Y = -100
            break
        case 2:
            X = canvas.width + 100
            Y = Math.floor(Math.random()*canvas.height)
            break
        case 3:
            X = -100
            Y = Math.floor(Math.random()*canvas.height)
            break
    }
    createOp(X, Y)
}
function updateStats(){
    document.getElementById('amo').innerText = CINDERELLA.amo

    document.getElementById('killedOps').innerText = killedOps
    document.getElementById('opsToKill').innerText = 700 - killedOps
}
function reaload(){
    realoadIntrv = setInterval(() => {
        
        if(CINDERELLA.amo>=30) clearInterval(realoadIntrv)
        else CINDERELLA.amo++

    }, 100)
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
        case 'r':
            reaload()
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

    if(e.button == 2 && APPLE.ready){
        startAppleMovement(e.clientX, e.clientY)
    }

    if(e.button == 0 && BULLETS.ready){

        BULLETS.active = true
        
        try{clearInterval(realoadIntrv)}catch(error){}

        BULLETS.ready = false
        bulletIntrv = setInterval(() => {
            if(CINDERELLA.amo > 0){
                createBullet()
                CINDERELLA.amo--
            }else{
                reaload()
                clearInterval(bulletIntrv)
                BULLETS.active = false
                setTimeout(() => {
                    BULLETS.ready = true
                }, 100)
            }

        }, 100);
    }
})
window.addEventListener('mouseup', e => {
    if(e.button == 0){
        BULLETS.active = false
        clearInterval(bulletIntrv)
        setTimeout(() => {
            BULLETS.ready = true
        }, 100)
    } 
})
drawCinderella()

var shoulderRotation = 0
const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]
var shArrIndex = 0
var opCounter = 0
var killedOps = 0

var OPinterval = setInterval(() => {
    opCounter++

    spawnOp()

    if(opCounter == 700) clearInterval(OPinterval)
}, 1000)
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

    handleExplosion()

    handleBullets()
    updateStats()

    if(APPLE.display) drawApple(APPLE.x, APPLE.y, APPLE.orientation)
    
        
    if(killedOps>=700){
        window.alert('vyhrali jste!!!\nhrat znova?')
        window.location.assign('https://2nejlepsiostravskyrapper.guru/snehurka')
    }
    if(CINDERELLA.health<=0){    
        window.alert('projebal jsi!!!\nhrat znova?')
        window.location.assign('https://2nejlepsiostravskyrapper.guru/snehurka')
    }

    //kurzor
    customCursor(CURSOR.x, CURSOR.y)

}, 15);

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});