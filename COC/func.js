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

function ostravskyGuru(x, y, orientation, addedMovement){

    ctx.save()
    ctx.translate(x, y)

    ctx.fillStyle = '#00ace6'
    ctx.fillRect(-28,-16,24,32)
    ctx.fillRect(28,-16,-24,32)

    ctx.fillStyle = '#ffd9b3'
    ctx.fillRect(-20,-20,40,40)

    ctx.fillStyle = ''

    ctx.fillStyle = 'white'
    ctx.fillRect(-2,-2,4,4)

    ctx.restore()
}