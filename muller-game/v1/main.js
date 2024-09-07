/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect()

var GOBLINS = {
    speed: 1,
    
    1:{
        x: 200, y: 200,
        shIndex: 3,
        atack: 0,
        health: 50
    },
    2:{
        x: 200, y:600,
        shIndex: 0,
        atack: 0,
        health: 50
    },
    3:{
        x: 200, y: 1000,
        shIndex: 9,
        atack: 0,
        health: 50
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
    speed: 2,
    health: 100,
    rangeWepon: 'clock',
    meleeWepon: 'sesitOdMamy'
}
var PROJECTILES = {
    'clock': {
        speed: 7,
        knockback: 10,
        damage: 3,
        reaload: 1000, //1s
        ready: true
    },
    amount: 0
}
var MELEE = {
    'sesitOdMamy':{
        range: 120, //60deg na kazdou stranu
        reaload: 400, //0,4s
        ready: true,
        crrAngle: null,
        active: false,
        radius: 120,
        knockback: 10,
        damage: 1 // x10 pssst
    },
    swingPhase: 0,
    entitiesHit: 0
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

const healthElement = document.getElementById('totalHealth')

function displayHealth(){
    healthElement.style.width = `${PLAYER.health}%`
    healthElement.innerText = PLAYER.health
}

function partCircle(x, y, startAngle, endAngle, radius){

    ctx.save()
    ctx.beginPath();
    
    // Draw the arc
    ctx.arc(x, y, radius, startAngle, endAngle);

    // Set the line width and stroke color
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255,0,0,0.4)';

    // Stroke the arc (outline it)
    ctx.stroke();
    ctx.restore()
}

function inRange(x1, y1 ,x2 ,y2, radius){

    let z = Math.sqrt((x1 -x2)**2 + (y1 -y2)**2)

    if(z <= radius) return true

    return false
}

function inView(x1, y1, x2, y2, viewRange, orientation){ // in rads

    let angle = Math.atan((y1 -y2) / (x1 -x2))
    
    if(angle<0) angle *= -1

    if(angle >= Math.PI/2 - viewRange/2 + orientation) return true
    
    return false
}

displayHealth()

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


window.addEventListener('mousedown', e => {


    if(e.button  == 0 && MELEE[PLAYER.meleeWepon].ready){

        MELEE[PLAYER.meleeWepon].active = true

        MELEE.swingPhase = (Math.PI*(-MELEE[PLAYER.meleeWepon].range/2))/180

        setTimeout(() => {
            MELEE[PLAYER.meleeWepon].active = false
        }, 11*16)

        let addAngle = (Math.PI*(MELEE[PLAYER.meleeWepon].range)/180)/10
        
        for(let i = 1; i<=10; i++){

            setTimeout(() => {

                MELEE.swingPhase += addAngle

            }, i*16)

        }

    }

    if(e.button == 2){
        
        if(PROJECTILES[PLAYER.rangeWepon].ready){
           
            let crr = PROJECTILES.amount
            PROJECTILES.amount++

            PROJECTILES[crr] = {}
            PROJECTILES[crr].x = PLAYER.x, PROJECTILES[crr].y = PLAYER.y
            PROJECTILES[crr].rotation = PLAYER.orientation - Math.PI/2
            PROJECTILES[crr].spin = 0
            PROJECTILES[crr].type = PLAYER.rangeWepon
            PROJECTILES[crr].entitiesHit = 0
        
            PROJECTILES[PLAYER.rangeWepon].ready = false
            setTimeout(() => {
                PROJECTILES[PLAYER.rangeWepon].ready = true
            }, PROJECTILES[PLAYER.rangeWepon].reaload);

        }
    }

    if(e.button == 1){

        console.log(
            'correct player orientation:', PLAYER.orientation*180/Math.PI + 90
        )
    }
})
var shoulderRotation = 0
const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]
var shArrIndex = 0

var mainInterval = setInterval(() => {

    ctx.clearRect(0,0,canvas.width,canvas.height)

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

   if(MELEE[PLAYER.meleeWepon].active) displayMelee(PLAYER.x, PLAYER.y, PLAYER.orientation + MELEE.swingPhase, MELEE[PLAYER.meleeWepon].radius)
    drawCharacter(shoulderRotation)

    customCursor(CURSOR.x, CURSOR.y)
    partCircle(PLAYER.x, PLAYER.y, PLAYER.orientation-Math.PI/3 - Math.PI/2, PLAYER.orientation+Math.PI/3 - Math.PI/2, MELEE[PLAYER.meleeWepon].radius)



    for(let i = 1; i<=3; i++){
        
        if(GOBLINS[i].health > 0){

            GOBLINS[i].orientation = determineOrientation(GOBLINS[i].x, GOBLINS[i].y, PLAYER.x, PLAYER.y)

            let toAddX = Math.sin(GOBLINS[i].orientation) * GOBLINS.speed
            let toAddY = Math.cos(GOBLINS[i].orientation) * GOBLINS.speed

            GOBLINS[i].x -= toAddX, GOBLINS[i].y += toAddY

            GOBLINS[i].shIndex += 0.7
            GOBLINS[i].shIndex %= shArr.length

            displayGoblin(
                GOBLINS[i].x, GOBLINS[i].y, GOBLINS[i].orientation, shArr[Math.floor(GOBLINS[i].shIndex)], 0, GOBLINS[i].health
            )
            
            let x1 = PLAYER.x, y1 = PLAYER.y
            let x2 = GOBLINS[i].x, y2 = GOBLINS[i].y

            if(inRange(x1, y1, x2, y2, MELEE[PLAYER.meleeWepon].radius + 20) && MELEE[PLAYER.meleeWepon].active && inView(x1, y1, x2, y2, (MELEE[PLAYER.meleeWepon].range/180)*Math.PI, PLAYER.orientation)){
                
                let subtX = Math.cos(GOBLINS[i].orientation) * MELEE[PLAYER.meleeWepon].knockback
                let subtY = Math.sin(GOBLINS[i].orientation) * MELEE[PLAYER.meleeWepon].knockback   

                GOBLINS[i].x -= subtX, GOBLINS[i].y += subtY

                GOBLINS[i].health -= MELEE[PLAYER.meleeWepon].damage
            }
        }
    
    }

    for(let i = 0; i<PROJECTILES.amount; i++){

        if(PROJECTILES[i].x < canvas.width + 100 || PROJECTILES.y < canvas.height + 100 || PROJECTILES.x > -100 || PROJECTILES.y > -100){
        
            switch(PROJECTILES[i].type){
                
                case 'clock':

                    if(PROJECTILES[i].entitiesHit < 5){

                        displayClock(PROJECTILES[i].x, PROJECTILES[i].y, PROJECTILES[i].rotation + (PROJECTILES[i].spin * Math.PI)/180)
                        
                        for(let g = 1; g<=3; g++){

                            if(GOBLINS[g].health > 0){
        
                                if(GOBLINS[g].x - 24 < PROJECTILES[i].x + 30 && GOBLINS[g].x + 24 > PROJECTILES[i].x){ //hitboxy hodin a agoblinů s tolerancí (+-10px)
        
                                    if(GOBLINS[g].y + 24 > PROJECTILES[i].y - 30 && GOBLINS[g].y - 24 < PROJECTILES[i].y +30){
        
                                        let subtX = Math.cos(PROJECTILES[i].rotation) * PROJECTILES['clock'].knockback
                                        let subtY = Math.sin(PROJECTILES[i].rotation) * PROJECTILES['clock'].knockback
        
                                        GOBLINS[g].x += subtX, GOBLINS[g].y += subtY
        
                                        GOBLINS[g].health -= PROJECTILES['clock'].damage
        
                                        PROJECTILES[i].entitiesHit++
                                        
                                    }                               
                                }
                                PROJECTILES[i].spin += PROJECTILES['clock'].speed/2
                            }
                        }
                    
                        
                        PROJECTILES[i].x += Math.cos(PROJECTILES[i].rotation) * PROJECTILES['clock'].speed
                        PROJECTILES[i].y += Math.sin(PROJECTILES[i].rotation) * PROJECTILES['clock'].speed
                    }
                    break
                
                case 'trakturek':

                    break

            }
        }
    }

},15)

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
