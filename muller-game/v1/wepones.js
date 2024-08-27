function displayClock(x, y, rotation){

    let img = new Image()
    img.src = 'assets/clock.png'

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.drawImage(img, -40, -40, 80 , 80)
    ctx.restore()
}

function displayMelee(x, y, orientation, radius){

    ctx.save()

    ctx.fillStyle = 'rgba(255,255,255,0.3)'

    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillRect(-2, 0, 4, -radius)
    ctx.fillRect(-2, 0, 6, -radius*0.8)
    ctx.fillRect(-2, 0, 10, -radius*0.4)
    ctx.fillRect(-2, 0, 6, -radius*0.9)
    ctx.fillRect(-2, 0, 10, -radius*0.6)


    ctx.restore()

}