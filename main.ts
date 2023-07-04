input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Fahren = !(Fahren)
    if (Fahren) {
        basic.setLedColor(0x00ff00)
    } else {
        basic.turnRgbLedOff()
    }
})
let Richtung = 0
let Geschwindigkeit = 0
let LedY = 0
let LedX = 0
let NeigungY = 0
let NeigungX = 0
let Fahren = false
let NeigungMax = 30
radio.setGroup(1)
Fahren = false
basic.turnRgbLedOff()
serial.redirectToUSB()
basic.forever(function () {
    if (Fahren) {
        NeigungX = input.rotation(Rotation.Roll)
        NeigungY = input.rotation(Rotation.Pitch)
        NeigungX = Math.constrain(NeigungX, NeigungMax * -1, NeigungMax)
        NeigungY = Math.constrain(NeigungY, NeigungMax * -1, NeigungMax)
        led.unplot(LedX, LedY)
        LedX = Math.map(NeigungX, NeigungMax * -1, NeigungMax, 0, 4)
        LedY = Math.map(NeigungY, NeigungMax * -1, NeigungMax, 0, 4)
        led.plot(LedX, LedY)
        Geschwindigkeit = 0
        Richtung = Math.map(NeigungX, NeigungMax * -1, NeigungMax, -100, 100)
        serial.writeValue("G", Geschwindigkeit)
        serial.writeValue("R", Richtung)
        radio.sendValue("F", 1)
        radio.sendValue("G", Geschwindigkeit)
        radio.sendValue("R", Richtung)
        radio.sendValue("X", LedX)
        radio.sendValue("Y", LedY)
        basic.pause(50)
    } else {
        radio.sendValue("F", 0)
        basic.clearScreen()
    }
})
