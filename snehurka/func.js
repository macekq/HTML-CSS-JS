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
function drawOp(x, y, orientation, health, addedMovement, shirtColor, hatColor){

    console.log(addedMovement, orientation)

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation + addedMovement)

    ctx.fillStyle = 'rgb(255, 213, 171)'
    ctx.fillRect(-26,-10,52,20)
    ctx.fillStyle = shirtColor
    ctx.fillRect(-22,-10,44,20)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = 'white'
    ctx.fillRect(-12,8,24,16)
    ctx.fillStyle = 'rgb(255, 213, 171)'
    ctx.fillRect(-4,0,8,20)
    ctx.strokeRect(-4,0,8,20)

    ctx.fillStyle = hatColor
    ctx.fillRect(-16,-18,32,28)
    ctx.strokeRect(-16,-18,32,28)
    ctx.fillRect(-12,-24,24,20)
    ctx.strokeRect(-12,-24,24,20)

    ctx.fillStyle = 'white'
    ctx.fillRect(-5,-28,10,10)
    ctx.strokeRect(-5,-28,10,10)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = 'red'
    ctx.fillRect(-25,-40,health/2,4)

    ctx.restore()
}