const unclickable = document.getElementById('unclickable')
const offset = 100

unclickable.addEventListener('click', () => {
    alert('nice try')
    window.close()
})

document.addEventListener('mousemove', (e) => {
    const x = e.pageX
    const y = e.pageY
    const buttonBox = unclickable.getBoundingClientRect()
    const hDistance = distanceFromCenter(buttonBox.x, x, buttonBox.width)
    const vDistance = distanceFromCenter(buttonBox.y, y, buttonBox.height)
    const hOffset = buttonBox.width / 2 + offset
    const vOffset = buttonBox.height / 2 + offset
    if (Math.abs(hDistance) <= hOffset && Math.abs(vDistance) <= vOffset) {
        setButtonPosition(
        buttonBox.x + hOffset / hDistance * 5,
        buttonBox.y + vOffset / vDistance * 5
        )
    }
})

function setButtonPosition(left, top){
    const windowBox = document.body.getBoundingClientRect()
    const buttonBox = unclickable.getBoundingClientRect()

    if(distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
        left = windowBox.right - buttonBox.width - offset
    }
    if(distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
        left = windowBox.left + offset
    }
    if(distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
        top = windowBox.bottom - buttonBox.height - offset
    }
    if(distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
        top = windowBox.top + offset
    }
    unclickable.style.left = `${left}px`
    unclickable.style.top = `${top}px`
}

function distanceFromCenter(boxPos, mousePos, boxSize){
    return boxPos - mousePos + boxSize / 2
}