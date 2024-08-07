function displayGoblin(X, Y, rotation, addedMovement, atackStage){

    ctx.save()
    ctx.translate(X, Y)
    ctx.rotate(rotation + addedMovement)

    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'black'
    ctx.fillRect(-64/2, -16/2, 64, 16)
    ctx.strokeRect(-64/2, -16/2, 64, 16)

    ctx.restore()


    ctx.save()
    ctx.translate(X, Y)
    ctx.rotate(rotation)

    ctx.fillStyle = 'rgb(0,160,40)'
    ctx.strokeStyle = 'black'
    ctx.fillRect(-32/2, -32/2, 32, 32)
    ctx.strokeRect(-32/2, -32/2, 32, 32)

    ctx.restore()

    if(document.getElementById('displayDestination').checked){
        ctx.beginPath()
        ctx.moveTo(X, Y)
        ctx.lineTo(PLAYER.x, PLAYER.y)
        ctx.strokeStyle = 'red'
        ctx.stroke()
    }
}