const connection = new WebSocket("ws://localhost:8080");

var ME = {
    x: 0, y: 0,
    up: false, down: false, left: false, right: false,
    speed: 5,
    id: 2,
    orientation: 0,
    char: null,
}   
var cursor = {x: window.innerWidth+100, y: 0}
var OP = {
    x: 0, y: 0,
    id: 2,
    orientation: 0,
    char: null
}

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

const shArr = [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1, -0.12, -0.14, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02]
var mainInterval = setInterval(() => {

    ME.char = document.getElementById('charType').value    

    if(ME.up) ME.y-=ME.speed
    if(ME.down) ME.y+=ME.speed
    if(ME.left) ME.x-=ME.speed
    if(ME.right) ME.x+=ME.speed

    const data = ME

    try{
        connection.send(JSON.stringify(data));
    }catch(error){}


    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    drawCharacter(ME.x, ME.y, ME.orientation, shArr[ME.shArrIndex], ME.char)
    drawCharacter(OP.x, OP.y, OP.orientation, shArr[OP.shArrIndex], OP.char)


    customCursor(cursor.x, cursor.y)

}, 15)