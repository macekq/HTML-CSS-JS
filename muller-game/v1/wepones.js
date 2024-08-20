function displayClock(x, y, rotation){

    let img = new Image()
    img.src = 'assets/clock.png'

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.drawImage(img, -40, -40, 80 , 80)
    ctx.restore()
}