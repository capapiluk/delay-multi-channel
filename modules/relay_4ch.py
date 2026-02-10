from machine import Pin
import time

# กำหนด GPIO ตายตัว
_CHANNEL_PINS = {
    1: Pin(18, Pin.OUT),
    2: Pin(19, Pin.OUT),
    3: Pin(21, Pin.OUT),
    4: Pin(22, Pin.OUT),
}

def _delay(sec):
    if sec and sec > 0:
        time.sleep(sec)

def on(ch, delay=0):
    ch = int(ch)
    if ch in _CHANNEL_PINS:
        _delay(delay)
        _CHANNEL_PINS[ch].value(1)

def off(ch, delay=0):
    ch = int(ch)
    if ch in _CHANNEL_PINS:
        _delay(delay)
        _CHANNEL_PINS[ch].value(0)

def off_all():
    for pin in _CHANNEL_PINS.values():
        pin.value(0)
