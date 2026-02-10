from machine import Pin
import time

# GPIO fixed ตามโจทย์
_PINS = [18, 19, 21, 22]
_relays = []
_timers = [0, 0, 0, 0]

# init อัตโนมัติ
for p in _PINS:
    r = Pin(p, Pin.OUT)
    r.off()
    _relays.append(r)

def on(ch, delay_sec=0):
    idx = int(ch) - 1
    if idx < 0 or idx > 3:
        return

    _relays[idx].on()

    if delay_sec > 0:
        _timers[idx] = time.ticks_add(
            time.ticks_ms(),
            int(delay_sec * 1000)
        )
    else:
        _timers[idx] = 0

def off_all():
    for i in range(4):
        _relays[i].off()
        _timers[i] = 0

def update():
    now = time.ticks_ms()
    for i in range(4):
        if _timers[i] and time.ticks_diff(_timers[i], now) <= 0:
            _relays[i].off()
            _timers[i] = 0
