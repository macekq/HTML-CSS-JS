const connection = new WebSocket("ws://localhost:8080");
const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]


var ME = {
    x: 0, y: 0,
    up: false, down: false, left: false, right: false,
    speed: 5,
    id: 2,
    orientation: 0,
    char: null,
    shIndex: Math.floor(Math.random()*shArr.length)
}   
var cursor = {x: window.innerWidth+100, y: 0}
var OP = {
    x: 0, y: 0,
    id: 2,
    orientation: 0,
    char: null
}
var SMOKE = {
    all: [],
    active: false
}
ME.smoke = SMOKE

connection.onopen = () => {
    console.log("WebSocket is open now.");
};

connection.onclose = () => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
    // console.log("Message received from the server:", event.data);

    const data = JSON.parse(event.data.toString());
    // console.log(data)

    if(ME.id == OP.id){
        connection.send(JSON.stringify(data));
        
        ME.id = Math.floor(Math.random()*1000)
        data.id = Math.floor(Math.random()*1000)

        if(ME.id>data.id) ME.char = 'ostravskyGuru', data.char = 'kktJohny'
        else data.char = 'ostravskyGuru', ME.char = 'kktJohny'
    }
    if(data.id!=ME.id) OP = data
}

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect()

function drawCharacter(x, y, orientation, addedMovement, charId){

    switch(charId){
        case 'ostravskyGuru':
            ostravskyGuru(x, y, orientation, addedMovement)
            break
        case 'kktJohny':
            kktJohny(x, y, orientation, addedMovement)
            break
        
        default: break
    }
}

function playerOrientation(){
    let X = cursor.x - rect.left, Y = cursor.y - rect.top

    X -= ME.x
    Y -= ME.y

    ME.orientation = Math.atan2(Y, X) + Math.PI/2
}
var charType = document.getElementById('charType')

function placeCharacter(){
    ME.char = charType.value

    if(charType.value == 'ostravskyGuru') ME.x = canvas.width/4
    else ME.x = canvas.width/4*3

    ME.y = window.innerHeight/2
}
function determineOrientation(x1, y1, x2, y2){
    let X = x1 - rect.left, Y = y1 - rect.top

    X -= x2
    Y -= y2

    return Math.atan2(Y, X) + Math.PI/2
}
function smokeAttack(){

    let smokeInterval = setInterval(() => {

        let rgbValue = Math.floor(Math.random()*200)
        let id
        
        do {
            id = Math.floor(Math.random()*1000)    
        } while (SMOKE.all.includes(id));

        SMOKE.all.push(id)
        SMOKE[id] = {
            x: ME.x, y: ME.y,
            move: [Math.floor(Math.random()*2), Math.floor(Math.random()*2)],

            color: `rgba(${rgbValue},${rgbValue},${rgbValue},${Math.random()*0.8})` 
        }
        console.log(SMOKE[id])

    }, 100)
    setTimeout(() => {
        SMOKE.active = false
        for(let i of SMOKE.all){
            delete SMOKE[i]
        }
        SMOKE.all = []
        clearInterval(smokeInterval)
    }, 7500) 
}
function handleSmoke(){
    
    for(let i of SMOKE.all){
            
        SMOKE[i].x += SMOKE[i].move[0] == 0 ? -5 : 5
        SMOKE[i].y += SMOKE[i].move[1] == 0 ? -5 : 5
        
        if(SMOKE[i].x > canvas.width + 50 || SMOKE[i].x < -50 || SMOKE[i].y > canvas.height + 50 || SMOKE[i].y < -50){
            
            SMOKE.all.splice(SMOKE.all.indexOf(i), 1)
            delete SMOKE[i]
        }else{
            ctx.save()
            ctx.translate(SMOKE[i].x, SMOKE[i].y)

            ctx.fillStyle = SMOKE[i].color
            ctx.fillRect(-40,-40,80,80)

            ctx.restore()
        }
        console.log(i)
    }
    ME.smoke = SMOKE
}

canvas.width = window.innerWidth, canvas.height = window.innerHeight
window.addEventListener('resize', () => {canvas.width = window.innerWidth, canvas.height = window.innerHeight})

window.addEventListener('keydown', e => {
    switch(e.key.toLowerCase()){
        case 'w':
            ME.up = true
            break
        case 's':
            ME.down = true
            break
        case 'a':
            ME.left = true
            break
        case 'd':
            ME.right = true
            break

        default: break
    }
})
window.addEventListener('keyup', e => {
    switch(e.key.toLowerCase()){
        case 'w':
            ME.up = false
            break
        case 's':
            ME.down = false
            break
        case 'a':
            ME.left = false
            break
        case 'd':
            ME.right = false
            break
            
        default: break
    }
})
window.addEventListener('mousemove', e => {
    cursor.x = e.clientX
    cursor.y = e.clientY
})
window.addEventListener('mousedown', e => {
    if(e.button == '1'){
        smokeAttack()
        SMOKE.active = true
        console.log('smoke attack')
    }
})
placeCharacter()
charType.addEventListener('change', placeCharacter)

var mainInterval = setInterval(() => {


    if(ME.left || ME.right || ME.up || ME.down){
        ME.shIndex++
    
    }else{
        if(shArr[Math.floor(ME.shIndex)] != 0) ME.shIndex++
    }
    ME.shIndex %= shArr.length

    ME.orientation = determineOrientation(cursor.x, cursor.y, ME.x, ME.y)

    if(ME.up) ME.y-=ME.speed
    if(ME.down) ME.y+=ME.speed
    if(ME.left) ME.x-=ME.speed
    if(ME.right) ME.x+=ME.speed

    const data = ME

    try{
        connection.send(JSON.stringify(data));
    }catch(error){}

    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    drawCharacter(ME.x, ME.y, ME.orientation, shArr[Math.floor(ME.shIndex)], ME.char)
    drawCharacter(OP.x, OP.y, OP.orientation, shArr[Math.floor(OP.shIndex)], OP.char)

    if(SMOKE.active) handleSmoke()

    customCursor(cursor.x, cursor.y)

}, 30)