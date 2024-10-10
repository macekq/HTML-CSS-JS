function drawCinderella(addedMovement){

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation + addedMovement/-2)
    
    ctx.fillStyle = 'lightblue'
    ctx.fillRect(-35, -25, 70, 50)
    ctx.fillRect(-25, -30, 50, 60)

    ctx.restore()

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation + addedMovement)

    ctx.fillStyle = 'rgb(255, 215, 150)'
    ctx.fillRect(-32, -10, 64, 20)
    ctx.strokeRect(-32, -10, 64, 20)

    ctx.fillStyle = 'rgb(100,100,255)'
    ctx.fillRect(-26, -10, 52, 20)

    ctx.restore()

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation)

    ctx.fillStyle = 'rgb(255, 213, 171)'
    ctx.fillRect(-20, -20, 40, 40)
    ctx.strokeRect(-20, -20, 40, 40)

    ctx.fillStyle = 'rgb(250, 226, 70)'
    ctx.fillRect(-20, -10, 40, 30)
    ctx.strokeRect(-20, -10, 40, 30)
    
    ctx.fillStyle = 'black'
    ctx.fillRect(-1, -10, 2, 30)

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
function drawOp(x, y, orientation, health){

    ctx.save()
    ctx.fillStyle = ['#99ccff','#00cc66','#ff9933','#333399','#9900cc','#ffcc66'][Math.floor(math.random()*6)]

}