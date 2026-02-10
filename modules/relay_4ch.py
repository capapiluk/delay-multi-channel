from machine import Pin

_CHANNELS = {
    1: Pin(18, Pin.OUT),
    2: Pin(19, Pin.OUT),
    3: Pin(21, Pin.OUT),
    4: Pin(22, Pin.OUT),
}

def on(ch):
    ch = int(ch)
    if ch in _CHANNELS:
        _CHANNELS[ch].value(1)

def off(ch):
    ch = int(ch)
    if ch in _CHANNELS:
        _CHANNELS[ch].value(0)

def on_all():
    for pin in _CHANNELS.values():
        pin.value(1)

def off_all():
    for pin in _CHANNELS.values():
        pin.value(0)
