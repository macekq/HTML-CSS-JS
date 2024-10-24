const connection = new WebSocket("ws://localhost:8080");

var ME = {
    x: 0, y: 0,
    up: false, down: false, left: false, right: false,
    speed: 5,
    id: 2
}   
var OP = {
    x: 0, y: 0,
    id: 2
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
    console.log("Message received from the server:", event.data);

    const data = JSON.parse(event.data.toString());
    console.log(data)

    if(ME.id == OP.id){
        connection.send(JSON.stringify(data));
        
        ME.id = Math.floor(Math.random()*1000)
        data.id = Math.floor(Math.random()*1000)
    }
    if(data.id!=ME.id) OP.x = data.x, OP.y = data.y, OP.id = data.id
}

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect()

function drawME(){
    ctx.save()

    ctx.fillStyle = 'red'
    ctx.translate(ME.x, ME.y)
    ctx.fillRect(-10,-10,20,20)

    ctx.restore()
}
function drawOP(){
    ctx.save()

    ctx.fillStyle = 'blue'
    ctx.translate(OP.x, OP.y)
    ctx.fillRect(-10,-10,20,20)

    ctx.restore()

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
var mainInterval = setInterval(() => {

    if(ME.up) ME.y-=ME.speed
    if(ME.down) ME.y+=ME.speed
    if(ME.left) ME.x-=ME.speed
    if(ME.right) ME.x+=ME.speed

    const data = {
        x: ME.x, y: ME.y,
        id: ME.id
    }

    connection.send(JSON.stringify(data));

    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawME()
    drawOP()

}, 15)