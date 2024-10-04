function drawCinderella(addedMovement){

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation + addedMovement)
    
    ctx.fillStyle = 'lightblue'
    ctx.fillRect(-35, -25, 70, 50)
    ctx.fillRect(-25, -30, 50, 60)

    ctx.fillStyle = 'rgb(255, 215, 150)'
    ctx.fillRect(-32, -10, 64, 20)
    ctx.strokeRect(-32, -10, 64, 20)

    ctx.fillStyle = 'rgb(100,100,255)'
    ctx.fillRect(-26, -10, 52, 20)

    ctx.restore()
    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation)

    ctx.fillStyle = 'rgb(255, 215, 150)'
    ctx.fillRect(-20, -20, 40, 40)
    ctx.strokeRect(-20, -20, 40, 40)

    ctx.fillStyle = 'rgb(250, 226, 70)'
    ctx.fillRect(-20, -10, 40, 30)
    ctx.strokeRect(-20, -10, 40, 30)
    
    ctx.fillStyle = 'black'
    ctx.fillRect(-1, -10, 2, 30)

    ctx.restore()
}