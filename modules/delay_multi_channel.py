# ========================================
# Delay Multi Channel Module
# MicroPython
# ========================================

import time
from machine import Pin

# เก็บข้อมูลช่อง
_channels = []
_states = []
_end_times = []
_num_channels = 0


def _now():
    # รองรับ MicroPython ทุกบอร์ด
    return time.ticks_ms()


# ----------------------------------------
# init
# ----------------------------------------
def init(num_channels, pins):
    global _channels, _states, _end_times, _num_channels

    _num_channels = num_channels
    _channels = []
    _states = [False] * num_channels
    _end_times = [0] * num_channels

    for i in range(num_channels):
        p = Pin(pins[i], Pin.OUT)
        p.off()
        _channels.append(p)


# ----------------------------------------
# turn on
# ----------------------------------------
def turn_on(ch, delay_ms=0):
    idx = ch - 1
    if idx < 0 or idx >= _num_channels:
        return

    _channels[idx].on()
    _states[idx] = True

    if delay_ms > 0:
        _end_times[idx] = time.ticks_add(_now(), int(delay_ms))
    else:
        _end_times[idx] = 0


# ----------------------------------------
# turn off
# ----------------------------------------
def turn_off(ch):
    idx = ch - 1
    if idx < 0 or idx >= _num_channels:
        return

    _channels[idx].off()
    _states[idx] = False
    _end_times[idx] = 0


# ----------------------------------------
# turn off all
# ----------------------------------------
def turn_off_all():
    for i in range(_num_channels):
        _channels[i].off()
        _states[i] = False
        _end_times[i] = 0


# ----------------------------------------
# is on
# ----------------------------------------
def is_on(ch):
    idx = ch - 1
    if idx < 0 or idx >= _num_channels:
        return False
    return _states[idx]


# ----------------------------------------
# time left (ms)
# ----------------------------------------
def time_left(ch):
    idx = ch - 1
    if idx < 0 or idx >= _num_channels:
        return 0

    if not _states[idx] or _end_times[idx] == 0:
        return 0

    remaining = time.ticks_diff(_end_times[idx], _now())
    return max(0, remaining)


# ----------------------------------------
# update (ต้องเรียกใน loop)
# ----------------------------------------
def update():
    now = _now()
    for i in range(_num_channels):
        if _states[i] and _end_times[i] > 0:
            if time.ticks_diff(now, _end_times[i]) >= 0:
                _channels[i].off()
                _states[i] = False
                _end_times[i] = 0


# ----------------------------------------
# turn on multiple channels
# ----------------------------------------
def turn_on_multiple(channels, delay_ms=0):
    for ch in channels:
        turn_on(ch, delay_ms)
