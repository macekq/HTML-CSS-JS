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
    ctx.rotate(orientation - addedMovement)

    ctx.fillStyle = '#00ace6'
    ctx.fillRect(-26,-16,22,32)
    ctx.fillRect(26,-16,-22,32)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation + addedMovement)

    ctx.fillStyle = '#e6e6e6'
    ctx.fillRect(-30,-12,60,24)
    ctx.strokeRect(-30,-12,60,24)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = '#ffcc99'
    ctx.fillRect(-20,-20,40,40)

    ctx.fillStyle = '#4d2800'
    ctx.fillRect(-20,-13,40,33)
    ctx.strokeRect(-20,-20,40,40)

    ctx.restore()
}
function kktJohny(x, y, orientation, addedMovement){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation - addedMovement/2)

    ctx.fillStyle = '#ff0000'
    ctx.fillRect(-23,-18,46,36)
    ctx.fillRect(-15,-21,30,20)
    ctx.fillRect(-15,0,30,21)

    ctx.restore()
    
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation + addedMovement)
    
    
    ctx.fillStyle = '#ff8566'
    ctx.fillRect(-28,-12,56,24)
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(-23,-12,46,24)
    ctx.strokeRect(-28,-12,56,24)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = '#ff8566'
    ctx.fillRect(-18,-18,36,36)

    ctx.fillStyle = 'rgba(0,0,0,0.6)'
    ctx.fillRect(-18,-12,36,32)
    ctx.strokeRect(-18,-18,36,36)

    ctx.restore()

}