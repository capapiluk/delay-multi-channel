from machine import Pin
import time

_relays = []
_timers = []

def init(num_channels, pins):
    global _relays, _timers
    _relays = []
    _timers = [0] * num_channels

    for p in pins[:num_channels]:
        pin = Pin(int(p), Pin.OUT)
        pin.off()
        _relays.append(pin)

def turn_on(ch, delay_ms=0):
    idx = int(ch) - 1
    if idx < 0 or idx >= len(_relays):
        return
    _relays[idx].on()
    if delay_ms > 0:
        _timers[idx] = time.ticks_add(time.ticks_ms(), int(delay_ms))

def turn_off(ch):
    idx = int(ch) - 1
    if idx < 0 or idx >= len(_relays):
        return
    _relays[idx].off()
    _timers[idx] = 0

def turn_off_all():
    for i in range(len(_relays)):
        _relays[i].off()
        _timers[i] = 0

def is_on(ch):
    idx = int(ch) - 1
    if idx < 0 or idx >= len(_relays):
        return False
    return _relays[idx].value() == 1

def time_left(ch):
    idx = int(ch) - 1
    if idx < 0 or idx >= len(_timers):
        return 0
    if _timers[idx] == 0:
        return 0
    return max(0, time.ticks_diff(_timers[idx], time.ticks_ms()))

def update():
    now = time.ticks_ms()
    for i in range(len(_timers)):
        if _timers[i] and time.ticks_diff(_timers[i], now) <= 0:
            _relays[i].off()
            _timers[i] = 0
